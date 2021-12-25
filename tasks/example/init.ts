import { task } from 'hardhat/config';
import { CONTRACTS } from './constants';

task('game:init', 'Initial game steps').setAction(async (taskArgs, hre) => {
  const { network, ethers } = hre;

  if (Object.values(CONTRACTS).some(v => !v)) {
    throw 'Adresses not set up correctyl!';
  }

  //Get signer information
  const accounts = await ethers.getSigners();
  const signer = accounts[0];

  const nftFactory = await ethers.getContractFactory('GameNft');
  const nftContract = new ethers.Contract(CONTRACTS.nft, nftFactory.interface, signer);
  const traitsFactory = await ethers.getContractFactory('Traits');
  const traitsContract = new ethers.Contract(CONTRACTS.traits, traitsFactory.interface, signer);

  const initSteps = [1, 2];

  const steps: Record<number, () => Promise<void>> = {
    1: async () => {
      console.log('🔥', 'example step 1');
      const tx1 = await nftContract.setContracts(
        CONTRACTS.traits,
        CONTRACTS.temple,
        CONTRACTS.random
      );
      await tx1.wait();
    },
    2: async () => {
      console.log('🔥', 'example step 2');
      const tx2 = await traitsContract.setNftAddress(CONTRACTS.nft);
      await tx2.wait();
    }
  };

  try {
    for (const stepNumber of initSteps) {
      if (steps[stepNumber]) {
        console.log('🔥', `Step: ${stepNumber}:`);
        await steps[stepNumber]();
        console.log('🔥', `Step ${stepNumber} - ✅`);
      }
    }
  } catch (e) {
    console.log('🔥e', e);
  }
});

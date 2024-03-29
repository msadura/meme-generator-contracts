import { task } from 'hardhat/config';
import { CONTRACTS } from './constants';

const initSteps = [1, 2, 3, 4, 5];

task('meme:init', 'Initial game steps').setAction(async (taskArgs, hre) => {
  const { network, ethers } = hre;

  if (Object.values(CONTRACTS).some(v => !v)) {
    throw 'Adresses not set up correctyl!';
  }

  //Get signer information
  const accounts = await ethers.getSigners();
  const signer = accounts[0];

  const nftFactory = await ethers.getContractFactory('ProofOfMeme');
  const nftContract = new ethers.Contract(CONTRACTS.nft, nftFactory.interface, signer);
  const bankFactory = await ethers.getContractFactory('ProofOfMemeBank');
  const bankContract = new ethers.Contract(CONTRACTS.bank, bankFactory.interface, signer);
  // const drawerFactory = await ethers.getContractFactory('MemeDrawer');
  // const drawerContract = new ethers.Contract(CONTRACTS.drawer, drawerFactory.interface, signer);
  const generatorFactory = await ethers.getContractFactory('ProofOfMemeGenerator');
  const generatorContract = new ethers.Contract(
    CONTRACTS.generator,
    generatorFactory.interface,
    signer
  );
  const traitsFactory = await ethers.getContractFactory('ProofOfMemeTraits');
  const traitsContract = new ethers.Contract(CONTRACTS.traits, traitsFactory.interface, signer);

  const steps: Record<number, () => Promise<void>> = {
    1: async () => {
      console.log('🔥', 'nft -> setContracts(traits)');
      const tx = await nftContract.setContracts(CONTRACTS.traits);
      await tx.wait();
    },
    2: async () => {
      console.log('🔥', 'nft -> addAdmin(generator)');
      const tx = await nftContract.addAdmin(CONTRACTS.generator);
      await tx.wait();
    },
    3: async () => {
      console.log('🔥', 'generator -> setContracts(nft, bank)');
      const tx = await generatorContract.setContracts(CONTRACTS.nft, CONTRACTS.bank);
      await tx.wait();
    },
    4: async () => {
      console.log('🔥', 'bank -> addAdmin(generator)');
      const tx = await bankContract.addAdmin(CONTRACTS.generator);
      await tx.wait();
    },
    5: async () => {
      console.log('🔥', 'traits -> setContracts(bank)');
      const tx = await traitsContract.setContracts(CONTRACTS.bank);
      await tx.wait();
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

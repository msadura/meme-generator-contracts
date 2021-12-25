import { task } from 'hardhat/config';
import { CONTRACTS } from './constants';

task('game:toggle', 'get random number from generator')
  .addFlag('pause', 'pauses the game')
  .addFlag('unpause', 'unpauses the game')
  .setAction(async (taskArgs, hre) => {
    const { ethers } = hre;
    const { pause, unpause } = taskArgs;

    if (Object.values(CONTRACTS).some(v => !v)) {
      throw 'Adresses not set up correctlyhh game!';
    }

    if (!pause && !unpause) {
      throw 'Missing param: Should game be paused or unpaused? ';
    }

    const paused = pause;

    //Get signer information
    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    const nftFactory = await ethers.getContractFactory('GameNft');
    const nftContract = new ethers.Contract(CONTRACTS.nft, nftFactory.interface, signer);
    const traitsFactory = await ethers.getContractFactory('Traits');
    const traitsContract = new ethers.Contract(CONTRACTS.traits, traitsFactory.interface, signer);

    console.log('🔥', `Toggling game state - ${paused ? 'PAUSE' : 'UNPAUSE'}`);

    try {
      console.log('🔥', 'setPause - nft');
      try {
        const tx1 = await nftContract.setPaused(paused);
        await tx1.wait();
        console.log('🔥', '✅');
      } catch (e) {}
    } catch (e) {
      console.log('🔥e', e);
    }
  });

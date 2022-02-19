import { task } from 'hardhat/config';
import { CONTRACTS } from './constants';

task('meme:toggle', 'get random number from generator')
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

    const factory = await ethers.getContractFactory('ProofOfMemeGenerator');
    const contract = new ethers.Contract(CONTRACTS.generator, factory.interface, signer);

    console.log('🔥', `Toggling game state - ${paused ? 'PAUSE' : 'UNPAUSE'}`);

    try {
      console.log('🔥', 'setPause  - generator');
      try {
        const tx1 = await contract.setPaused(paused);
        await tx1.wait();
        console.log('🔥', '✅');
      } catch (e) {}
    } catch (e) {
      console.log('🔥e', e);
    }
  });

import { task } from 'hardhat/config';
import { CONTRACTS } from './constants';

task('get-random-number', 'get random number from generator')
  .addPositionalParam('seed', 'tokenId')
  .setAction(async (taskArgs, hre) => {
    const { ethers } = hre;
    const { seed } = taskArgs;

    if (!CONTRACTS.random) {
      throw 'Adresses not set up correctly!';
    }

    //Get signer information
    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    const randomFactory = await ethers.getContractFactory('Random');
    const randomContract = new ethers.Contract(CONTRACTS.random, randomFactory.interface, signer);

    try {
      const res = await randomContract.random(seed);
      console.log('🔥', `Random:`, res.toString());
    } catch (e) {
      console.log('🔥e', e);
    }
  });

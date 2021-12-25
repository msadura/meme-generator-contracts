import { task } from 'hardhat/config';
import { CONTRACTS } from './constants';

task('game:set-wl-root', 'Set whitelist root hash')
  .addPositionalParam('hash', 'root hash')
  .setAction(async (taskArgs, hre) => {
    const { ethers } = hre;
    const { hash } = taskArgs;

    if (!CONTRACTS.whitelist) {
      throw 'Adresses not set up correctly!';
    }

    //Get signer information
    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    const whitelistFactory = await ethers.getContractFactory('WhitelistVerify');
    const wlContract = new ethers.Contract(CONTRACTS.whitelist, whitelistFactory.interface, signer);

    try {
      console.log('🔥', 'Setting whitelist root hash...');
      const tx = await wlContract.setRootHash(hash);
      await tx.wait();
      console.log('✅', `WL - root hash set to:`, hash);
    } catch (e) {
      console.log('🔥e', e);
    }
  });

import { task } from 'hardhat/config';
import { CONTRACTS } from './constants';

task('meme:latest', 'get svg image from drawer').setAction(async (taskArgs, hre) => {
  const { ethers } = hre;
  const { seed } = taskArgs;

  if (!CONTRACTS.nft) {
    throw 'Adresses not set up correctly!';
  }

  //Get signer information
  const accounts = await ethers.getSigners();
  const signer = accounts[0];

  const factory = await ethers.getContractFactory('MemeGenerator');
  const contract = new ethers.Contract(CONTRACTS.generator, factory.interface, signer);

  try {
    const res = await contract.getLatest();
    console.log('🔥', `Latest 10 memes metadata:`, res.toString());
  } catch (e) {
    console.log('🔥e', e);
  }
});

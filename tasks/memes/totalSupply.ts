import { task } from 'hardhat/config';
import { CONTRACTS } from './constants';

task('meme:supply', 'get svg image from drawer').setAction(async (taskArgs, hre) => {
  const { ethers } = hre;
  const { seed } = taskArgs;

  if (!CONTRACTS.nft) {
    throw 'Adresses not set up correctly!';
  }

  //Get signer information
  const accounts = await ethers.getSigners();
  const signer = accounts[0];

  const factory = await ethers.getContractFactory('MemeNft');
  const contract = new ethers.Contract(CONTRACTS.nft, factory.interface, signer);

  try {
    const res = await contract.totalSupply();
    console.log('🔥', `Total supply:`, res.toString());
  } catch (e) {
    console.log('🔥e', e);
  }
});

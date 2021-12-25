import { task } from 'hardhat/config';

task('accounts', 'Prints the list of accounts', async ({}, hre) => {
  const { ethers } = hre;
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {};

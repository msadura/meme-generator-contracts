import { task } from 'hardhat/config';
import { networkConfig, getNetworkIdFromName } from '../helper-hardhat-config';

task('fund-link', 'Funds a contract with LINK')
  .addParam('contract', 'The address of the contract that requires LINK')
  .addOptionalParam('linkaddress', 'Set the LINK token address')
  .setAction(async (taskArgs, hre) => {
    const { network, ethers } = hre;
    const contractAddr = taskArgs.contract;
    const networkId = await getNetworkIdFromName(network.name);
    console.log('🔥', network, networkId);

    if (!networkId) {
      return;
    }

    //Fund with LINK based on network config
    const fundAmount = networkConfig[networkId]['fundAmount'];

    console.log('Funding contract ' + contractAddr + ' on network ' + network.name);
    const linkTokenAddress = networkConfig[networkId]['linkToken'] || taskArgs.linkaddress;
    const LinkToken = await ethers.getContractFactory('LinkToken');

    //Get signer information
    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    //Create connection to LINK token contract and initiate the transfer
    const linkTokenContract = new ethers.Contract(linkTokenAddress, LinkToken.interface, signer);
    const transferTransaction = await linkTokenContract.transfer(contractAddr, fundAmount);
    transferTransaction.wait(1);
    console.log(
      'Contract ' +
        contractAddr +
        ' funded with ' +
        fundAmount / Math.pow(10, 18) +
        ' LINK. Transaction Hash: ' +
        transferTransaction.hash
    );
  });

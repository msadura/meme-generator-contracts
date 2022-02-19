// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, run } from 'hardhat';

const CONTRACT_NAME = 'ProofOfMemeTraits';

export default async function main() {
  const factory = await ethers.getContractFactory(CONTRACT_NAME);

  const contract = await factory.deploy();

  console.log('🔥 gasLimit', contract.deployTransaction.gasLimit.toString());
  console.log('🔥 gasPrice', contract.deployTransaction.gasPrice?.toString());
  console.log(
    '🔥 fee',
    ethers.utils.formatEther(
      contract.deployTransaction.gasLimit.mul(contract.deployTransaction.gasPrice || '0')
    )
  );
  await contract.deployed();

  console.log('Deployed to:', contract.address);

  console.log('🔥', 'Veryfing contract...');
  console.log('🔥', 'Waiting 20s...');

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  await delay(30000);
  console.log('🔥', 'Trying to verify...');

  await run('verify:verify', {
    address: contract.address,
    constructorArguments: []
  });

  console.log('🔥', 'Contract verified successfuly!');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

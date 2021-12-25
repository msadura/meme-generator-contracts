import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { networkConfig } from '../helper-hardhat-config';

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  getChainId
}: HardhatRuntimeEnvironment) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  const additionalMessage = '';

  const linkTokenAddress = networkConfig[chainId]['linkToken'];
  const vrfCoordinatorAddress = networkConfig[chainId]['vrfCoordinator'];

  const keyHash = networkConfig[chainId]['keyHash'];
  const fee = networkConfig[chainId]['fee'];

  const randomNumberConsumer = await deploy('Random', {
    from: deployer,
    args: [vrfCoordinatorAddress, linkTokenAddress, keyHash, fee],
    log: true
  });

  log('Run the following command to fund contract with LINK:');
  log(
    'npx hardhat fund-link --contract ' +
      randomNumberConsumer.address +
      ' --network ' +
      networkConfig[chainId]['name'] +
      additionalMessage
  );
  log('Then run RandomNumberConsumer contract with the following command');
  log(
    'npx hardhat request-random-number --contract ' +
      randomNumberConsumer.address +
      ' --network ' +
      networkConfig[chainId]['name']
  );
  log('----------------------------------------------------');
};

export default func;

func.tags = ['randomOnce'];

import { task } from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
// import 'hardhat-contract-sizer';
import 'hardhat-deploy';
import './tasks';

import dotenv from 'dotenv';
dotenv.config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.6',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true
  },
  defaultNetwork: 'rinkeby',
  networks: {
    rinkeby: {
      url: `https://rinkeby-light.eth.linkpool.io/`,
      chainId: 4,
      accounts: {
        mnemonic: process.env.MNEMONIC
      }
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/d0b94e25c5ae40cb875772a3752108cf`,
      chainId: 1,
      accounts: {
        mnemonic: process.env.MNEMONIC
      }
    },
    arbitrum: {
      url: 'https://rinkeby.arbitrum.io/rpc',
      chainId: 421611,
      // gasPrice: 0,
      accounts: {
        mnemonic: process.env.MNEMONIC
      }
    },
    arbitrumMainnet: {
      url: 'https://arb1.arbitrum.io/rpc',
      chainId: 42161,
      // gasPrice: 0,
      accounts: {
        mnemonic: process.env.MNEMONIC
      }
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  namedAccounts: {
    deployer: 0,
    tokenOwner: 0
  }
};

# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Deploy order:
- Random
- NFT - maxTokens
- Traits
- GameToken
- GameMain
- GameTower

## Deploy Steps:
- Random - get random value from chainlink
- Nft - setContracts(traits, tower, rand)
- Traits - setNftAddreess(nft addr)
- Traits - setBaseURI(api_url)
- GameMain - setContracts(token, traits, nft, alter, random)
- GameTower - setContracts(nft, token, game, random)
- GameAltar ? setBaseUri
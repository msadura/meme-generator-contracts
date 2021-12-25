import { task } from 'hardhat/config';
import { CONTRACTS } from './constants';

const NEW_OWNER = '0x681A39F1a2cFF5b17799fDd9930C2a8cED48f290';

task('change-owner-game', 'Change owner of game contracts').setAction(async (taskArgs, hre) => {
  const { network, ethers } = hre;

  if (Object.values(CONTRACTS).some(v => !v)) {
    throw 'Adresses not set up correctyl!';
  }

  if (!NEW_OWNER) {
    throw 'New owner addr not set!';
  }

  //Get signer information
  const accounts = await ethers.getSigners();
  const signer = accounts[0];

  const nftFactory = await ethers.getContractFactory('GameNft');
  const nftContract = new ethers.Contract(CONTRACTS.nft, nftFactory.interface, signer);
  const traitsFactory = await ethers.getContractFactory('Traits');
  const traitsContract = new ethers.Contract(CONTRACTS.traits, traitsFactory.interface, signer);
  const gameFactory = await ethers.getContractFactory('TnDGame');
  const gameContract = new ethers.Contract(CONTRACTS.game, gameFactory.interface, signer);
  const templeFactory = await ethers.getContractFactory('Temple');
  const templeContract = new ethers.Contract(CONTRACTS.temple, templeFactory.interface, signer);
  const altarFactory = await ethers.getContractFactory('Temple');
  const altarContract = new ethers.Contract(CONTRACTS.altar, altarFactory.interface, signer);
  const randomFactory = await ethers.getContractFactory('Random');
  const randomContract = new ethers.Contract(CONTRACTS.random, randomFactory.interface, signer);
  const tokenFactory = await ethers.getContractFactory('GameToken');
  const tokenContract = new ethers.Contract(CONTRACTS.token, tokenFactory.interface, signer);

  try {
    console.log('🔥', 'Change owner - nft');
    const tx1 = await nftContract.transferOwnership(NEW_OWNER);
    await tx1.wait();
    console.log('🔥', '✅');

    console.log('🔥', 'Change owner - game');
    const tx2 = await gameContract.transferOwnership(NEW_OWNER);
    await tx2.wait();
    console.log('🔥', '✅');

    console.log('🔥', 'Change owner - temple');
    const tx3 = await templeContract.transferOwnership(NEW_OWNER);
    await tx3.wait();
    console.log('🔥', '✅');

    console.log('🔥', 'Change owner - traits');
    const tx4 = await traitsContract.transferOwnership(NEW_OWNER);
    await tx4.wait();
    console.log('🔥', '✅');

    console.log('🔥', 'Change owner - random');
    const tx5 = await randomContract.transferOwnership(NEW_OWNER);
    await tx5.wait();
    console.log('🔥', '✅');

    console.log('🔥', 'Change owner - altar');
    const tx6 = await altarContract.transferOwnership(NEW_OWNER);
    await tx6.wait();
    console.log('🔥', '✅');

    console.log('🔥', 'Change owner - token');
    const tx7 = await tokenContract.transferOwnership(NEW_OWNER);
    await tx7.wait();
    console.log('🔥', '✅');
  } catch (e) {
    console.log('🔥e', e);
  }
});

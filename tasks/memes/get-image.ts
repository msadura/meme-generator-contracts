import { task } from 'hardhat/config';
import { CONTRACTS } from './constants';

task('meme:image', 'get svg image from drawer').setAction(async (taskArgs, hre) => {
  const { ethers } = hre;
  const { seed } = taskArgs;

  if (!CONTRACTS.drawer) {
    throw 'Adresses not set up correctly!';
  }

  //Get signer information
  const accounts = await ethers.getSigners();
  const signer = accounts[0];

  const factory = await ethers.getContractFactory('MemeDrawer');
  const contract = new ethers.Contract(CONTRACTS.drawer, factory.interface, signer);
  console.log('🔥', getImageParams());
  try {
    const res = await contract.getMemeImage(getImageParams());
    console.log('🔥', `Image:`, res.toString());
  } catch (e) {
    console.log('🔥e', e);
  }
});

function getImageParams() {
  const img = {
    image: 'kaljdlkajsd',
    width: 925,
    height: 522,
    textTop: 'Test meme top 1',
    textBottom: 'Test meme top 1',
    textSize: 30,
    textColor: '#ffffff',
    textStroke: '#aaaaaa',
    hashtags: [],
    nftTokenAddress: 0x0,
    nftTokenId: 0
  };

  return Object.values(img);
}

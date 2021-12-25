import path from 'path';
import fs from 'fs';
import pinataSDK from '@pinata/sdk';
import dotenv from 'dotenv';
import { ArtifactsMap } from './types';
import loadIpfsArtifacts from './helpers/loadIpfsArtifacts';
import { ARTIFACTS_PINATA_PATH } from './helpers/constants';

dotenv.config();

const IMAGES_PATH = '../images';
const IMAGE_EXTENSION = '.jpg';
const imagesPath = path.join(__dirname, IMAGES_PATH);

const pinata = pinataSDK(
  process.env.PINATA_API_KEY as string,
  process.env.PINATA_API_SECRET as string
);

addFiles();

async function addFiles() {
  const artifactsMap: ArtifactsMap = await loadIpfsArtifacts(ARTIFACTS_PINATA_PATH);
  const files = fs.readdirSync(imagesPath);
  const filesToAdd = files.filter(f => f.includes(IMAGE_EXTENSION));

  for (const filename of filesToAdd) {
    await addFile(filename, artifactsMap);
    await saveArtifacts(artifactsMap);
  }
}

async function addFile(filename: string, filesMap: ArtifactsMap) {
  const file = `${imagesPath}/${filename}`;
  const fileId = filename.replace(new RegExp(IMAGE_EXTENSION), '');

  // File already uploaded, skip.
  if (filesMap[fileId]) {
    return;
  }

  try {
    const readableStreamForFile = fs.createReadStream(file);
    //   const options = {
    //     pinataMetadata: {
    //         name: MyCustomName,
    //         keyvalues: {
    //             customKey: 'customValue',
    //             customKey2: 'customValue2'
    //         }
    //     },
    //     pinataOptions: {
    //         cidVersion: 0
    //     }
    // };
    const res = await pinata.pinFileToIPFS(readableStreamForFile /*, options*/);

    console.log('🔥', `saved: ${fileId} - ${res.IpfsHash}`);
    filesMap[fileId] = res.IpfsHash;
  } catch (e) {
    console.log(`File error: ${fileId}`, e);
    filesMap[fileId] = '';
  }
}

async function saveArtifacts(artifacts: ArtifactsMap): Promise<void> {
  try {
    const artifactsPath = path.join(__dirname, ARTIFACTS_PINATA_PATH);
    fs.writeFileSync(artifactsPath, JSON.stringify(artifacts, null, 4));
    // console.log('🔥', `Saved ipfs artifacts to ${ARTIFACTS_PINATA_PATH}`);
  } catch (e) {
    console.log('🔥', e);
  }
}

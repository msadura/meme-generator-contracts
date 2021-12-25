import path from 'path';
import fs from 'fs';
import { create } from 'ipfs-http-client';
import { ArtifactsMap } from './types';
import loadIpfsArtifacts from './helpers/loadIpfsArtifacts';
import { ARTIFACTS_PATH } from './helpers/constants';

const IMAGES_PATH = '../images';
const IMAGE_EXTENSION = '.jpg';
const IPFS_API_URL = 'http://localhost:5001/api/v0';

const ipfs = create({ url: IPFS_API_URL });
const imagesPath = path.join(__dirname, IMAGES_PATH);

addFiles();

async function addFiles() {
  const artifactsMap: ArtifactsMap = await loadIpfsArtifacts(ARTIFACTS_PATH);
  const files = fs.readdirSync(imagesPath);
  const filesToAdd = files.filter(f => f.includes(IMAGE_EXTENSION));

  const promises = filesToAdd.map(filename => addFile(filename, artifactsMap));
  await Promise.all(promises);

  console.log('🔥', artifactsMap);
  await saveArtifacts(artifactsMap);
}

async function addFile(filename: string, filesMap: ArtifactsMap) {
  const file = `${imagesPath}/${filename}`;
  const fileId = filename.replace(new RegExp(IMAGE_EXTENSION), '');

  try {
    const ipfsFile = await ipfs.add(
      {
        content: fs.readFileSync(file),
        mtime: fs.statSync(file).mtime
      },
      { pin: true }
    );
    console.log('🔥', `saved: ${fileId}`);
    filesMap[fileId] = ipfsFile.cid.toString();
  } catch (e) {
    filesMap[fileId] = '';
  }
}

async function saveArtifacts(artifacts: ArtifactsMap): Promise<void> {
  try {
    const artifactsPath = path.join(__dirname, ARTIFACTS_PATH);
    fs.writeFileSync(artifactsPath, JSON.stringify(artifacts));
    console.log('🔥', `Saved ipfs artifacts to ${ARTIFACTS_PATH}`);
  } catch (e) {
    console.log('🔥', e);
  }
}

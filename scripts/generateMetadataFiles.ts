import path from 'path';
import fs from 'fs';
import loadIpfsArtifacts from './helpers/loadIpfsArtifacts';
import { ARTIFACTS_PATH } from './helpers/constants';
import { ArtifactsMap } from './types';

const METADATA_PATH = '../metadata';

const METADATA_TEMPLATE = {
  description: 'Bored Cat nft. Being bored all thee time.',
  name: `Test Genies #`,
  image: 'ipfs://QmTmmxdiJ3vbXrS7DC47Wv1ofo1SaxUJXPKfNbFiYaLuWP'
};

generateMetadataFiles();

async function generateMetadataFiles() {
  const ipfsArtifacts = await loadIpfsArtifacts(ARTIFACTS_PATH);
  const ids = Object.keys(ipfsArtifacts);

  ids.forEach(id => {
    const metadata = getMetadata(id, ipfsArtifacts);
    saveFile(id, metadata);
  });
}

function getMetadata(fileName: string, artifacts: ArtifactsMap) {
  const metadata = { ...METADATA_TEMPLATE };
  if (!metadata.image) {
    metadata.image = `ipfs://${artifacts[fileName]}`;
  }

  metadata.name = `${metadata.name}${fileName}`;

  return metadata;
}

async function saveFile(fileName: string, metadata: any): Promise<void> {
  try {
    const metadataPath = path.join(__dirname, METADATA_PATH, fileName);
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 4));
    console.log('🔥', `Saved metadata to ${METADATA_PATH}/${fileName}`);
  } catch (e) {
    console.log('🔥', e);
  }
}

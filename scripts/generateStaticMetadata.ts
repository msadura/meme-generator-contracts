import path from 'path';
import fs from 'fs';
import loadIpfsArtifacts from './helpers/loadIpfsArtifacts';
import { ARTIFACTS_PATH } from './helpers/constants';
import { ArtifactsMap } from './types';
import range from 'lodash/range';

const METADATA_PATH = '../genies_unrevealed_3';

const METADATA_TEMPLATE = {
  name: 'Crypto Genies',
  description:
    "A Collection of 10,000 Mythical Genie NFT's that are trying to rebuild there world as they know it. \n \nA Collection of 10,000 Mythical Genie NFT's that are hiding in the ETH Blockchain to stay safe from going instinct on their apocalyptic planet.",
  image: 'ipfs://QmUQvkSXYtszUs63e4RDuwmz3WgXvygpq5kFtMRkMDnQBu'
};

generateMetadataFiles();

async function generateMetadataFiles() {
  const ids = range(1, 10001).map(n => String(n));

  ids.forEach(id => {
    const metadata = getMetadata(id);
    saveFile(id, metadata);
  });
}

function getMetadata(fileName: string) {
  const metadata = { ...METADATA_TEMPLATE };
  // metadata.name = `${metadata.name}${fileName}`;

  return metadata;
}

async function saveFile(fileName: string, metadata: any): Promise<void> {
  try {
    const metadataPath = path.join(__dirname, METADATA_PATH, fileName);
    fs.writeFileSync(metadataPath, JSON.stringify(metadata));
    console.log('🔥', `Saved metadata to ${METADATA_PATH}/${fileName}`);
  } catch (e) {
    console.log('🔥', e);
  }
}

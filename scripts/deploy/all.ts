import bank from './bank';
import generator from './generator';
import nft from './nft';
import traits from './traits';

async function main() {
  const promises = [nft(), traits()];

  const results = await Promise.all(promises);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

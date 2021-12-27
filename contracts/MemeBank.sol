//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import './Authorizable.sol';
import './interfaces/IMemeNft.sol';
import './interfaces/IMemeGenerator.sol';

contract MemeBank is IMemeGenerator, Pausable, Ownable, Authorizable {
  mapping(uint256 => MemeTraits) public memes;
  mapping(uint256 => bool) public existingIds;

  IMemeNft nft;

  constructor() {
    _pause();
  }

  function generate(MemeTraits memory meme) external whenNotPaused {
    // what should be checked first?
    uint256 tokenId = nft.getNextTokenId();
    memes[tokenId] = meme;
    existingIds[tokenId] = true;
    nft.mint();
  }

  function getMemeTraits(uint256 tokenId) external view override returns (MemeTraits memory) {
    require(existingIds[tokenId], 'Meme not minter or traits are broken');

    return memes[tokenId];
  }

  function setContracts(address _nft) external onlyOwner {
    nft = IMemeNft(_nft);
  }

  function setMemeTraits(uint256 tokenId, MemeTraits memory meme) external onlyAdmin {
    require(existingIds[tokenId], 'Meme not minter or traits are broken');
    memes[tokenId] = meme;
  }
}

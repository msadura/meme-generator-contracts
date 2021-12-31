//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import './Authorizable.sol';
import './interfaces/IMemeNft.sol';
import './interfaces/IMemeBank.sol';

contract MemeBank is IMemeBank, Ownable, Authorizable {
  mapping(uint256 => MemeTraits) public memes;
  mapping(uint256 => bool) public existingIds;

  function getMemeTraits(uint256 tokenId) external view override returns (MemeTraits memory) {
    return memes[tokenId];
  }

  function setMemeTraits(uint256 tokenId, MemeTraits memory meme) external override onlyAdmin {
    memes[tokenId] = meme;
    existingIds[tokenId] = true;
  }

  function doesExist(uint256 tokenId) external view override returns (bool) {
    return existingIds[tokenId];
  }
}

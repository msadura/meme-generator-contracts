//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import './Authorizable.sol';
import './interfaces/IMemeNft.sol';
import './interfaces/IMemeGenerator.sol';
import './interfaces/IMemeBank.sol';

contract MemeGenerator is IMemeGenerator, Pausable, Ownable, Authorizable {
  IMemeNft public nft;
  IMemeBank public bank;

  constructor() {
    _pause();
  }

  function generate(IMemeBank.MemeTraits memory meme) external whenNotPaused {
    require(_msgSender() == tx.origin, 'Cannot mint from contract');

    uint256 tokenId = nft.getNextTokenId();
    bank.setMemeTraits(tokenId, meme);
    nft.mint(_msgSender());

    emit Generate(_msgSender(), tokenId);
  }

  function setContracts(address _nft, address _bank) external onlyOwner {
    nft = IMemeNft(_nft);
    bank = IMemeBank(_bank);
  }

  function setPaused(bool _paused) external onlyOwner {
    if (_paused) _pause();
    else _unpause();
  }

  function getLatest(uint256 count) external view returns (IMemeGenerator.LastItem[] memory) {
    uint256 latestId = nft.totalSupply();
    uint256 firstCheckId = latestId - count;
    IMemeGenerator.LastItem[] memory items;

    for (uint256 i = 0; i < count; i++) {
      uint256 _id = firstCheckId + i;
      items[i] = IMemeGenerator.LastItem(_id, nft.tokenURI(_id));
    }

    return items;
  }
}

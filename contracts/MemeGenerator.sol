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
    // TODO: what should be checked first?
    // min / max valid width and height?
    // width, height + if image + text combination exists?

    uint256 tokenId = nft.getNextTokenId();
    bank.setMemeTraits(tokenId, meme);
    nft.mint(_msgSender());
  }

  function setContracts(address _nft, address _bank) external onlyOwner {
    nft = IMemeNft(_nft);
    bank = IMemeBank(_bank);
  }

  function setPaused(bool _paused) external onlyOwner {
    if (_paused) _pause();
    else _unpause();
  }
}

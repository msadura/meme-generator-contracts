//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import 'base64-sol/base64.sol';
import './Authorizable.sol';
import './interfaces/IMemeTraits.sol';
import './interfaces/IMemeBank.sol';

contract MemeTraits is IMemeTraits, Pausable, Ownable, Authorizable {
  using Strings for uint256;

  IMemeBank public bank;

  function getTokenURI(uint256 tokenId) public view override returns (string memory) {
    IMemeBank.MemeTraits memory meme = bank.getMemeTraits(tokenId);
    //TODO: return attributes / metadata

    string memory metadata = string(
      abi.encodePacked(
        '{"name": "',
        'DAC Meme #',
        tokenId.toString(),
        '", "description": "Best memes in the world generated onchain! Make your meme unique.", "image": "',
        meme.image,
        '", "width": "', meme.width.toString(),
        '", "height": "', meme.height.toString(),
        '", "attributes":',
        compileAttributes(tokenId),
        '}'
      )
    );

    return
      string(abi.encodePacked('data:application/json;base64,', Base64.encode(bytes(metadata))));
  }

  function compileAttributes(uint256 tokenId) internal view returns (string memory) {
    IMemeBank.MemeTraits memory meme = bank.getMemeTraits(tokenId);
    return
      string(
        abi.encodePacked(
          '[',
          '{"trait_type":"Theme","value":"',
          meme.theme,
          '"}]'
        )
      );
  }

  function setContracts(address _generator) external onlyOwner {
    bank = IMemeBank(_generator);
  }
}

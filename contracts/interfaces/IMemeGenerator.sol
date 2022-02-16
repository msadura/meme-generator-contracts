// SPDX-License-Identifier: MIT LICENSE

pragma solidity ^0.8.0;

interface IMemeGenerator {
  struct LastItem {
    uint256 id;
    string tokenURI;
  }

  event Generate(address indexed from, uint256 indexed tokenId);
}

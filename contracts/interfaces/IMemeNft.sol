// SPDX-License-Identifier: MIT LICENSE

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';

interface IMemeNft is IERC721, IERC721Metadata, IERC721Enumerable {
  function getNextTokenId() external view returns (uint256);

  function mint(address toAddress) external;
}

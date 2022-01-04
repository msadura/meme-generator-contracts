// SPDX-License-Identifier: MIT LICENSE

pragma solidity ^0.8.0;

interface IMemeNft {
  function getNextTokenId() external view returns (uint256);

  function mint(address toAddress) external;
}

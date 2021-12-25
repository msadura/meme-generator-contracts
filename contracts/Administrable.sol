// SPDX-License-Identifier: MIT LICENSE
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Administrable is Ownable {
  mapping(address => bool) admins;

  modifier onlyAdmin() {
    require(
      owner() == _msgSender() || admins[_msgSender()] || admins[tx.origin],
      'Only admin can do that!'
    );
    _;
  }

  function addAdmin(address addr) external onlyOwner {
    admins[addr] = true;
  }

  function removeAdmin(address addr) external onlyOwner {
    admins[addr] = false;
  }
}

// SPDX-License-Identifier: MIT LICENSE
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Authorizable is Ownable {
  mapping(address => bool) admins;

  function hasAdmin(address addr) external view returns (bool) {
    return owner() == addr || admins[addr];
  }

  function isAdmin() internal view returns (bool) {
    return owner() == _msgSender() || admins[_msgSender()] || admins[tx.origin];
  }

  modifier onlyAdmin() {
    require(isAdmin(), 'Only admin can do that!');
    _;
  }

  function addAdmin(address addr) external onlyOwner {
    admins[addr] = true;
  }

  function removeAdmin(address addr) external onlyOwner {
    admins[addr] = false;
  }
}

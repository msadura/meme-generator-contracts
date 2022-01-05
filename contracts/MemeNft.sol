//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import './Authorizable.sol';
import './interfaces/IMemeTraits.sol';
import './interfaces/IMemeNft.sol';

contract MemeNft is IMemeNft, ERC721Enumerable, Ownable, Authorizable {
  using SafeMath for uint256;
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIds;
  bool public adminOnlyMint = true;

  IMemeTraits public traits;

  constructor() ERC721('NFT MM', 'NFTMM') {
    _tokenIds.increment();
  }

  function mint(address toAddress) external override {
    if (adminOnlyMint) {
      require(isAdmin(), 'You cannot mint tokens directly!');
    }

    _mintSingle(toAddress);
  }

  function _mintSingle(address addr) private {
    uint256 newTokenID = _tokenIds.current();
    _safeMint(addr, newTokenID);
    _tokenIds.increment();
  }

  function tokensOfOwner(address _owner) external view returns (uint256[] memory) {
    uint256 tokenCount = balanceOf(_owner);
    uint256[] memory tokensId = new uint256[](tokenCount);

    for (uint256 i = 0; i < tokenCount; i++) {
      tokensId[i] = tokenOfOwnerByIndex(_owner, i);
    }

    return tokensId;
  }

  function withdraw() public payable onlyOwner {
    uint256 balance = address(this).balance;
    require(balance > 0, 'No ether left to withdraw');

    (bool success, ) = (msg.sender).call{ value: balance }('');
    require(success, 'Transfer failed.');
  }

  function getNextTokenId() public view override returns (uint256) {
    return _tokenIds.current();
  }

  function setAdminOnlyMint(bool _adminOnly) external onlyOwner {
    adminOnlyMint = _adminOnly;
  }

  function setContracts(address _traits) external onlyOwner {
    traits = IMemeTraits(_traits);
  }

  function tokenURI(uint256 tokenId) public view override returns (string memory) {
    require(_exists(tokenId), "Token ID does not exist");
    return traits.getTokenURI(tokenId);
  }
}

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import './Authorizable.sol';
import './interfaces/IMemeDrawer.sol';
import './interfaces/IMemeNft.sol';

contract NFTMM is IMemeNft, ERC721Enumerable, Ownable, Authorizable {
  using SafeMath for uint256;
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIds;
  bool public adminOnlyMint = true;

  IMemeDrawer public drawer;

  constructor() ERC721('NFT MM', 'NFTMM') {
    _tokenIds.increment();
  }

  function mint() external override {
    if (adminOnlyMint) {
      require(isAdmin(), 'You cannot mint tokens directly!');
    }

    _mintSingle();
  }

  function _mintSingle() private {
    uint256 newTokenID = _tokenIds.current();
    _safeMint(msg.sender, newTokenID);
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

  function setContracts(address _drawer) external onlyOwner {
    drawer = IMemeDrawer(_drawer);
  }

  function tokenURI(uint256 tokenId) public pure override returns (string memory) {
    // get token uri from drawer
    return '';
  }

  // function drawSvg(uint256 tokenId) private {
  //     Meme memory traits = getTokenTraits(tokenId);

  //     string memory svgString = string(abi.encodePacked(
  //     drawTrait(traitData[0 + shift][s.body]),
  //     s.isWizard ? drawTrait(traitData[1 + shift][s.head]) : drawTrait(traitData[1 + shift][s.rankIndex]),
  //     s.isWizard ? drawTrait(traitData[2 + shift][s.spell]) : '',
  //     drawTrait(traitData[3 + shift][s.eyes]),
  //     s.isWizard ? drawTrait(traitData[4 + shift][s.neck]) : '',
  //     drawTrait(traitData[5 + shift][s.mouth]),
  //     s.isWizard ? '' : drawTrait(traitData[6 + shift][s.tail]),
  //     s.isWizard ? drawTrait(traitData[7 + shift][s.wand]) : ''
  // ));

  // return string(abi.encodePacked(
  //   '<svg id="wndNFT" width="100%" height="100%" version="1.1" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">',
  //   svgString,
  //   "</svg>"
  // ));
  // }

  // function drawBg(string img, uint256 width, uint256 height) internal pure returns (string memory) {
  //     return string(abi.encodePacked(
  //         '<image width="',
  //         width,
  //         '" height="',
  //         height,
  //         '"xlink:href="data:image/png;base64,',
  //         bg,
  //         '"/>'
  //     ));
  // }

  // function getTokenTraits(uint256 tokenId) returns (memory Meme) {
  //     return memes[tokenId];
  // }
}

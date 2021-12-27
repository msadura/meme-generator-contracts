// SPDX-License-Identifier: MIT LICENSE

pragma solidity ^0.8.0;

interface IMemeGenerator {
  struct MemeTraits {
    string image;
    uint256 width;
    uint256 height;
    string textTop;
    string textBottom;
    uint256 textSize;
    string textColor;
    string textStroke;
  }

  function getMemeTraits(uint256 tokenId) external view returns (MemeTraits memory);
}

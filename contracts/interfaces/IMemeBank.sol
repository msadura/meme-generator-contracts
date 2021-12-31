// SPDX-License-Identifier: MIT LICENSE

pragma solidity ^0.8.0;

interface IMemeBank {
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
  function setMemeTraits(uint256 tokenId, MemeTraits memory meme) external;
  function doesExist(uint256 tokenId) external view returns (bool);
}

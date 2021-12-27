//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import "@openzeppelin/contracts/utils/Strings.sol";
import 'base64-sol/base64.sol';
import './Authorizable.sol';
import './interfaces/IMemeDrawer.sol';
import './interfaces/IMemeGenerator.sol';

contract MemeDrawer is IMemeDrawer, Pausable, Ownable, Authorizable {
  using Strings for uint256;

  IMemeGenerator public generator;

  function getTokenURI(uint256 tokenId) public view override returns (string memory) {
    IMemeGenerator.MemeTraits memory meme = generator.getMemeTraits(tokenId);
    //TODO: return attributes / metadata
    return drawSvg(meme);
  }

  function getMemeSvg(IMemeGenerator.MemeTraits memory meme) public pure returns (string memory) {
    return drawSvg(meme);
  }

  function getMemeImage(IMemeGenerator.MemeTraits memory meme) public pure returns (string memory) {
    return string(abi.encodePacked('data:image/svg+xml;base64,', Base64.encode(bytes(drawSvg(meme)))));
  }

  function drawSvg(IMemeGenerator.MemeTraits memory meme) internal pure returns (string memory) {
    return
      string(
        abi.encodePacked(
          '<svg id="meme" width="',
          meme.width.toString(),
          '" height="',
          meme.height.toString(),
          '" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">',
          drawBg(meme.image, meme.width, meme.height),
          drawTextTop(meme.textTop, meme.textSize, meme.textColor, meme.textStroke),
          drawTextBottom(meme.textBottom, meme.textSize, meme.textColor, meme.textStroke),
          '</svg>'
        )
      );
  }

  function drawBg(
    string memory image,
    uint256 width,
    uint256 height
  ) internal pure returns (string memory) {
    return
      string(
        abi.encodePacked(
          '<image x="0" y="0" width="',
          width.toString(),
          '" height="',
          height.toString(),
          '"  href="',
          image,
          '"/>'
        )
      );
  }

  function drawTextTop(
    string memory text,
    uint256 size,
    string memory color,
    string memory stroke
  ) internal pure returns (string memory) {
    return
      string(
        abi.encodePacked(
          '<foreignObject x="0" y="0" width="100%" height="50%" style="width: 100%; position: absolute; bottom: 50%; left: 0; top: 0; right:0; "><p xmlns="http://www.w3.org/1999/xhtml" style="position: absolute; left: 20px; right: 20px; top: 20px; ',
          getTextStyle(size, color, stroke),
          '">',
          text,
          '</p></foreignObject>'
        )
      );
  }

  function drawTextBottom(
    string memory text,
    uint256 size,
    string memory color,
    string memory stroke
  ) internal pure returns (string memory) {
    return
      string(
        abi.encodePacked(
          '<foreignObject x="0" y="50%" width="100%" height="50%" style="width: 100%; position: absolute; top: 50%; left: 0; bottom: 0; right:0;"><p xmlns="http://www.w3.org/1999/xhtml" style="position: absolute; left: 20px; right: 20px; bottom: 20px; ',
          getTextStyle(size, color, stroke),
          '">',
          text,
          '</p></foreignObject>'
        )
      );
  }

  function getTextStyle(
    uint256 size,
    string memory color,
    string memory stroke
  ) internal pure returns (string memory) {
    if (bytes(color).length == 0) {
      color = '#ffffff';
    }

    if (bytes(stroke).length == 0) {
      stroke = '#000000';
    }

    if (size == 0) {
      size = 20;
    }

    return
      string(
        abi.encodePacked(
          'text-shadow: -1px -1px 0 ',
          stroke,
          ', 1px -1px 0 ',
          stroke,
          ', -1px 1px 0 ',
          stroke,
          ', 1px 1px 0 ',
          stroke,
          '; color: ',
          color,
          '; font-size: ',
          size.toString(),
          'px; font-weight: bold; font-family: Impact; padding: 0; margin: 0; text-align: center;'
        )
      );
  }

  function setContracts(address _generator) external onlyOwner {
    generator = IMemeGenerator(_generator);
  }
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./interfaces/IWallet.sol";

contract Layer {
  address walletAddr;

  function setWalletAddress(address _walletAddr) public virtual {
    walletAddr = _walletAddr;
  }

  function executeLayer() external {
    require(address(walletAddr) != address(0), "walletAddr is not set");

    executeLayerStarted();
  }

  function executeLayerStarted() private {
    IWallet(walletAddr).handleLayerStarted();
  }

  function executeLayerSuccess() private {
    IWallet(walletAddr).handleLayerSuccess();
  }

  function executeLayerFailure() private {
    IWallet(walletAddr).handleLayerFailure();
  }
}

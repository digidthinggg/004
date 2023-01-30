// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

interface IWallet {
  function handleLayerStarted() external;
  function handleLayerSuccess() external;
  function handleLayerFailure() external;
}

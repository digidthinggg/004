const WALLET_CONTRACT_NAME = process.env.WALLET_CONTRACT_NAME
const LAYER_CONTRACT_NAME = process.env.LAYER_CONTRACT_NAME

async function main() {
  const WalletContract = await ethers.getContractFactory(WALLET_CONTRACT_NAME)
  const walletContract = await WalletContract.deploy()

  console.log("Wallet deployed to address:", walletContract.address)

  const LayerContract = await ethers.getContractFactory(LAYER_CONTRACT_NAME)
  const layerContract = await LayerContract.deploy()

  console.log("Layer deployed to address:", layerContract.address)
}

main().catch(error => {
  console.log(error)
  process.exitCode = 1
})

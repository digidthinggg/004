const ethers = require("ethers")

const WALLET_CONTRACT_ARTIFACT_PATH = process.env.WALLET_CONTRACT_ARTIFACT_PATH
const WALLET_CONTRACT_ADDRESS = process.env.WALLET_CONTRACT_ADDRESS

const LAYER_CONTRACT_ARTIFACT_PATH = process.env.LAYER_CONTRACT_ARTIFACT_PATH
const LAYER_CONTRACT_ADDRESS = process.env.LAYER_CONTRACT_ADDRESS

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const METAMASK_PKEY = process.env.METAMASK_PKEY

const provider = new ethers.providers.AlchemyProvider(network="goerli", ALCHEMY_API_KEY)
const signer = new ethers.Wallet(METAMASK_PKEY, provider)

const WalletContract = require(WALLET_CONTRACT_ARTIFACT_PATH)
const walletContract = new ethers.Contract(WALLET_CONTRACT_ADDRESS, WalletContract.abi, signer)

const LayerContract = require(LAYER_CONTRACT_ARTIFACT_PATH)
const layerContract = new ethers.Contract(LAYER_CONTRACT_ADDRESS, LayerContract.abi, signer)

async function main() {
  console.log(">>> setting layer address in wallet")
  await walletContract.setLayerAddress(LAYER_CONTRACT_ADDRESS)

  console.log(">>> setting wallet address in layer")
  await layerContract.setWalletAddress(WALLET_CONTRACT_ADDRESS)

  await layerContract.executeLayer()
}

main().catch(error => {
  console.log(error)
  process.exitCode = 1
})

walletContract.on("HandleLayerStartedEV", () => {
  console.log("EVENT Wallet: HandleLayerStartedEV")
})

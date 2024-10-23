require("dotenv").config();
const { ethers } = require("ethers");

// Load environment variables from .env file
const provider = new ethers.providers.JsonRpcProvider(
  process.env.BASE_TESTNET_RPC_URL
);
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = "0x932b4902AC3E40b46661881fBcA91268C81DFBf3";
const contractABI = [
  "function balanceOf(address account) public view returns (uint256)",
];

async function getBalance(address) {
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  const balance = await contract.balanceOf(address);
  console.log(
    `Balance of ${address}: ${ethers.utils.formatEther(balance)} ROZI`
  );
}

// Replace with the address you want to check
const userAddress = "ADDRESS_TO_CHECK";
getBalance(userAddress);

const hre = require("hardhat");
const { ethers } = require("hardhat");

/**
 * Helper script to get constructor arguments from deployment transaction
 * 
 * This script helps you find the constructor arguments used during deployment
 * by analyzing the deployment transaction on BaseScan.
 * 
 * Usage:
 *   npx hardhat run scripts/get-constructor-args.js
 */
async function main() {
  const contractAddress = "0x9cb5254319f824a2393ecbf6adcf608867aa1b07";
  
  console.log("Constructor Arguments Helper");
  console.log("============================\n");
  console.log("Contract Address:", contractAddress);
  console.log("\nTo find constructor arguments:");
  console.log("1. Go to BaseScan: https://basescan.org/address/" + contractAddress);
  console.log("2. Click on the 'Contract Creation' transaction");
  console.log("3. Scroll down to 'Input Data' section");
  console.log("4. Copy the constructor arguments (after the function selector)");
  console.log("5. Use an ABI decoder to decode:");
  console.log("   - https://abi.hashex.org/");
  console.log("   - https://www.4byte.directory/");
  console.log("\nConstructor Parameters (in order):");
  console.log("1. address initialOwner");
  console.log("2. address initialTreasury");
  console.log("3. address initialBusiness");
  console.log("4. uint256 initialSupply");
  console.log("\nExample ABI encoding:");
  console.log("Use ethers.js or web3.js to encode:");
  console.log("  const abiCoder = ethers.AbiCoder.defaultAbiCoder();");
  console.log("  const encoded = abiCoder.encode(");
  console.log("    ['address', 'address', 'address', 'uint256'],");
  console.log("    [owner, treasury, business, supply]");
  console.log("  );");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


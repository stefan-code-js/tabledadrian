const hre = require("hardhat");

/**
 * Verification script for TableDadrian token contract
 * 
 * Contract Address: 0x9cb5254319f824a2393ecbf6adcf608867aa1b07
 * Network: Base Mainnet
 * 
 * Usage:
 *   npx hardhat run scripts/verify.js --network base
 * 
 * Make sure to set BASESCAN_API_KEY in your .env file
 * Get API key from: https://basescan.org/myapikey
 */
async function main() {
  const contractAddress = "0x9cb5254319f824a2393ecbf6adcf608867aa1b07";
  
  // Constructor arguments (update these with actual deployment values)
  // Format: [initialOwner, initialTreasury, initialBusiness, initialSupply]
  const constructorArgs = [
    "0x0000000000000000000000000000000000000000", // Replace with actual owner address
    "0x0000000000000000000000000000000000000000", // Replace with actual treasury address
    "0x0000000000000000000000000000000000000000", // Replace with actual business address
    "0", // Replace with actual initial supply (in wei)
  ];

  console.log("Verifying contract on BaseScan...");
  console.log("Contract Address:", contractAddress);
  console.log("Network: Base Mainnet");
  console.log("\nConstructor Arguments:");
  console.log("  Owner:", constructorArgs[0]);
  console.log("  Treasury:", constructorArgs[1]);
  console.log("  Business:", constructorArgs[2]);
  console.log("  Initial Supply:", constructorArgs[3]);

  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: constructorArgs,
      contract: "contracts/contracts/TableDadrian.sol:TableDadrian",
    });
    
    console.log("\n✅ Contract verified successfully!");
    console.log(`View on BaseScan: https://basescan.org/address/${contractAddress}#code`);
  } catch (error) {
    if (error.message.includes("Already Verified")) {
      console.log("\n✅ Contract is already verified!");
    } else {
      console.error("\n❌ Verification failed:", error.message);
      console.log("\nTroubleshooting:");
      console.log("1. Check that BASESCAN_API_KEY is set in .env file");
      console.log("2. Verify constructor arguments match deployment");
      console.log("3. Ensure contract was compiled with same settings");
      console.log("4. Check network configuration");
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


const hre = require("hardhat");

/**
 * Verifies contract using Sourcify (open-source verification service)
 * 
 * Sourcify is a decentralized verification service that doesn't require API keys.
 * 
 * Usage:
 *   npx hardhat run scripts/verify-sourcify.js --network base
 * 
 * Or use Sourcify web interface:
 *   https://sourcify.dev/#/verifier
 */
async function main() {
  const contractAddress = "0x9cb5254319f824a2393ecbf6adcf608867aa1b07";
  
  console.log("Verifying contract using Sourcify...");
  console.log("Contract Address:", contractAddress);
  console.log("Network: Base Mainnet (Chain ID: 8453)");
  
  try {
    // Try to verify using Hardhat's Sourcify plugin if available
    await hre.run("sourcify", {
      address: contractAddress,
      network: "base",
    });
    
    console.log("\n✅ Contract verified on Sourcify!");
    console.log(`View on Sourcify: https://sourcify.dev/#/lookup/${contractAddress}`);
  } catch (error) {
    console.log("\n⚠️  Automated Sourcify verification not available.");
    console.log("\n📋 Manual Sourcify Verification:");
    console.log("1. Go to: https://sourcify.dev/#/verifier");
    console.log("2. Select network: Base (Chain ID: 8453)");
    console.log("3. Enter contract address:", contractAddress);
    console.log("4. Upload contract files:");
    console.log("   - contracts/TableDadrian.sol");
    console.log("   - node_modules/@openzeppelin/contracts/... (all imported files)");
    console.log("5. Or use the flattened contract from scripts/flatten.js");
    console.log("6. Click 'Verify'");
    console.log("\nAlternative: Use Sourcify CLI");
    console.log("Install: npm install -g @sourcify/cli");
    console.log("Run: sourcify verify --chain 8453", contractAddress);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


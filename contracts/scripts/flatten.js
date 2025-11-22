const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

/**
 * Flattens the TableDadrian contract for manual verification
 * 
 * This script creates a single file with all imports resolved,
 * which is required for manual verification on BaseScan.
 * 
 * Usage:
 *   npx hardhat run scripts/flatten.js
 */
async function main() {
  console.log("Flattening TableDadrian contract...");
  
  try {
    // Flatten the contract using Hardhat's flatten task
    const { execSync } = require("child_process");
    
    // Create flattened directory if it doesn't exist
    const outputDir = path.join(__dirname, "..", "flattened");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Use Hardhat's flatten command
    const outputPath = path.join(outputDir, "TableDadrian_Flattened.sol");
    try {
      const flattened = execSync(
        `npx hardhat flatten contracts/TableDadrian.sol`,
        { encoding: "utf-8", cwd: path.join(__dirname, "..") }
      );
      fs.writeFileSync(outputPath, flattened);
    } catch (error) {
      // Alternative: try using the flatten task directly
      const flattened = await hre.run("flatten", {
        files: ["contracts/TableDadrian.sol"],
      });
      if (flattened && typeof flattened === "string") {
        fs.writeFileSync(outputPath, flattened);
      } else {
        throw new Error("Failed to flatten contract");
      }
    }
    
    console.log("\n✅ Contract flattened successfully!");
    console.log(`📄 Output file: ${outputPath}`);
    console.log("\n📋 Next steps:");
    console.log("1. Copy the contents of TableDadrian_Flattened.sol");
    console.log("2. Go to https://basescan.org/address/0x9cb5254319f824a2393ecbf6adcf608867aa1b07");
    console.log("3. Click 'Contract' tab → 'Verify and Publish'");
    console.log("4. Select 'Solidity (Single file)'");
    console.log("5. Paste the flattened code");
    console.log("6. Set Compiler: 0.8.20, Optimization: Yes (200 runs), License: MIT");
    console.log("7. Enter constructor arguments (ABI-encoded)");
    console.log("8. Submit for verification");
  } catch (error) {
    console.error("❌ Error flattening contract:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


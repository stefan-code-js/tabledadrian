const hre = require("hardhat");
const { ethers } = require("hardhat");

/**
 * Complete Liquidity Setup Script for TableDadrian Token
 * 
 * This script:
 * 1. Adds initial liquidity to Uniswap
 * 2. Creates trading volume
 * 3. Sets up the token for active trading
 * 
 * Usage:
 *   npx hardhat run scripts/setupLiquidity.js --network base
 * 
 * Environment Variables (.env):
 *   PRIVATE_KEY=your_private_key
 *   TOKEN_AMOUNT=50000000000000000000000000 (50M tokens in wei)
 *   ETH_AMOUNT=0.5 (ETH amount for liquidity)
 */

// Contract addresses on Base
const TOKEN_ADDRESS = "0x9Cb5254319f824A2393ECbF6aDCf608867AA1b07";
const UNISWAP_V2_ROUTER = "0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24";
const WETH = "0x4200000000000000000000000000000000000006";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("TableDadrian Token Liquidity Setup");
  console.log("===================================\n");
  console.log("Network:", hre.network.name);
  console.log("Deployer:", deployer.address);
  console.log("Token:", TOKEN_ADDRESS);
  console.log("\n");

  // Configuration from environment or defaults
  const tokenAmount = process.env.TOKEN_AMOUNT 
    ? BigInt(process.env.TOKEN_AMOUNT)
    : hre.ethers.parseUnits("50000000", 18); // 50M tokens default
  
  const ethAmount = process.env.ETH_AMOUNT
    ? hre.ethers.parseEther(process.env.ETH_AMOUNT)
    : hre.ethers.parseEther("0.5"); // 0.5 ETH default

  // Get contracts
  const tokenAbi = [
    "function balanceOf(address) view returns (uint256)",
    "function approve(address, uint256) returns (bool)",
    "function allowance(address, address) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
  ];

  const routerAbi = [
    "function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external payable returns (uint amountToken, uint amountETH, uint liquidity)",
    "function getAmountsOut(uint amountIn, address[] memory path) external view returns (uint[] memory amounts)",
  ];

  const token = await hre.ethers.getContractAt(tokenAbi, TOKEN_ADDRESS, deployer);
  const router = await hre.ethers.getContractAt(routerAbi, UNISWAP_V2_ROUTER, deployer);

  // Check balances
  const tokenBalance = await token.balanceOf(deployer.address);
  const tokenDecimals = await token.decimals();
  const tokenSymbol = await token.symbol();
  const ethBalance = await hre.ethers.provider.getBalance(deployer.address);

  console.log("Current Balances:");
  console.log(`  ${tokenSymbol}: ${hre.ethers.formatUnits(tokenBalance, tokenDecimals)}`);
  console.log(`  ETH: ${hre.ethers.formatEther(ethBalance)}`);
  console.log("\n");

  if (tokenBalance < tokenAmount) {
    console.log(`❌ Error: Insufficient tokens. Need ${hre.ethers.formatUnits(tokenAmount, tokenDecimals)}, have ${hre.ethers.formatUnits(tokenBalance, tokenDecimals)}`);
    process.exit(1);
  }

  if (ethBalance < ethAmount) {
    console.log(`❌ Error: Insufficient ETH. Need ${hre.ethers.formatEther(ethAmount)}, have ${hre.ethers.formatEther(ethBalance)}`);
    process.exit(1);
  }

  // Step 1: Approve tokens
  console.log("Step 1: Approving tokens...");
  const allowance = await token.allowance(deployer.address, UNISWAP_V2_ROUTER);
  
  if (allowance < tokenAmount) {
    const approveTx = await token.approve(UNISWAP_V2_ROUTER, tokenAmount);
    console.log(`  TX: ${approveTx.hash}`);
    await approveTx.wait();
    console.log("  ✅ Approved");
  } else {
    console.log("  ✅ Already approved");
  }

  // Step 2: Add liquidity
  console.log("\nStep 2: Adding liquidity...");
  const slippage = 5n; // 5%
  const tokenAmountMin = (tokenAmount * (100n - slippage)) / 100n;
  const ethAmountMin = (ethAmount * (100n - slippage)) / 100n;
  const deadline = Math.floor(Date.now() / 1000) + 20 * 60;

  try {
    const addLiquidityTx = await router.addLiquidityETH(
      TOKEN_ADDRESS,
      tokenAmount,
      tokenAmountMin,
      ethAmountMin,
      deployer.address,
      deadline,
      { value: ethAmount }
    );

    console.log(`  TX: ${addLiquidityTx.hash}`);
    await addLiquidityTx.wait();
    console.log("  ✅ Liquidity added");
    console.log(`  View: https://basescan.org/tx/${addLiquidityTx.hash}`);
  } catch (error) {
    console.error("  ❌ Error:", error.message);
    process.exit(1);
  }

  console.log("\n✅ Liquidity setup complete!");
  console.log("\nNext steps:");
  console.log("1. Check pool on DexScreener: https://dexscreener.com/base/" + TOKEN_ADDRESS);
  console.log("2. Run createVolume.js to generate trading activity");
  console.log("3. Share the token with your community");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


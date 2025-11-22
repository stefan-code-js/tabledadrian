const hre = require("hardhat");
const { ethers } = require("hardhat");

/**
 * Create Trading Volume Script for TableDadrian Token
 * 
 * This script creates trading volume by executing buy/sell transactions
 * on Uniswap to generate activity and volume for the TA token.
 * 
 * Usage:
 *   npx hardhat run scripts/createVolume.js --network base
 * 
 * Make sure to set PRIVATE_KEY in .env file
 */

// Contract addresses on Base
const TOKEN_ADDRESS = "0x9Cb5254319f824A2393ECbF6aDCf608867AA1b07"; // TA token
const UNISWAP_V2_ROUTER = "0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24"; // Uniswap V2 Router on Base
const WETH = "0x4200000000000000000000000000000000000006"; // WETH on Base

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Creating Trading Volume for TableDadrian Token");
  console.log("===============================================\n");
  console.log("Network:", hre.network.name);
  console.log("Deployer:", deployer.address);
  console.log("Token Address:", TOKEN_ADDRESS);
  console.log("\n");

  // Get token contract
  const tokenAbi = [
    "function balanceOf(address) view returns (uint256)",
    "function approve(address, uint256) returns (bool)",
    "function allowance(address, address) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
  ];

  const token = await hre.ethers.getContractAt(tokenAbi, TOKEN_ADDRESS, deployer);
  
  // Get token info
  const tokenDecimals = await token.decimals();
  const tokenSymbol = await token.symbol();
  
  // Get Uniswap Router
  const routerAbi = [
    "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)",
    "function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
    "function getAmountsOut(uint amountIn, address[] memory path) external view returns (uint[] memory amounts)",
    "function WETH() external pure returns (address)",
  ];

  const router = await hre.ethers.getContractAt(routerAbi, UNISWAP_V2_ROUTER, deployer);

  // Configuration
  const tradeAmount = hre.ethers.parseEther("0.01"); // 0.01 ETH per trade
  const numberOfTrades = 5; // Number of buy/sell cycles
  const slippage = 10n; // 10% slippage tolerance
  
  console.log("Trading Parameters:");
  console.log(`  Trade Amount: ${hre.ethers.formatEther(tradeAmount)} ETH per trade`);
  console.log(`  Number of Trades: ${numberOfTrades} cycles`);
  console.log(`  Slippage: ${slippage}%`);
  console.log("\n");

  // Check ETH balance
  const ethBalance = await hre.ethers.provider.getBalance(deployer.address);
  const totalNeeded = tradeAmount * BigInt(numberOfTrades * 2); // Buy + Sell for each cycle
  
  console.log(`ETH Balance: ${hre.ethers.formatEther(ethBalance)} ETH`);
  console.log(`ETH Needed: ${hre.ethers.formatEther(totalNeeded)} ETH`);
  
  if (ethBalance < totalNeeded) {
    console.log(`⚠️  Warning: May not have enough ETH for all trades. Will proceed with available balance.`);
  }

  // Trading path: ETH -> TA -> ETH
  const path = [WETH, TOKEN_ADDRESS];
  const pathReverse = [TOKEN_ADDRESS, WETH];

  console.log("\nStarting trading volume creation...\n");

  for (let i = 0; i < numberOfTrades; i++) {
    console.log(`Trade Cycle ${i + 1}/${numberOfTrades}`);
    console.log("-------------------");
    
    try {
      // Get current ETH balance
      const currentEthBalance = await hre.ethers.provider.getBalance(deployer.address);
      
      if (currentEthBalance < tradeAmount) {
        console.log("  ⚠️  Insufficient ETH, stopping trades");
        break;
      }

      // Step 1: Buy tokens with ETH
      console.log("  1. Buying tokens...");
      const deadline = Math.floor(Date.now() / 1000) + 10 * 60; // 10 minutes
      
      // Get expected output
      let amountOutMin = 0n;
      try {
        const amounts = await router.getAmountsOut(tradeAmount, path);
        amountOutMin = (amounts[1] * (100n - slippage)) / 100n;
      } catch (error) {
        console.log("  ⚠️  Could not get price estimate, using default");
        amountOutMin = 0n;
      }

      const buyTx = await router.swapExactETHForTokens(
        amountOutMin,
        path,
        deployer.address,
        deadline,
        { value: tradeAmount }
      );
      
      console.log(`     Buy TX: ${buyTx.hash}`);
      await buyTx.wait();
      console.log("     ✅ Tokens purchased");

      // Wait a bit between trades
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Step 2: Sell tokens back for ETH
      console.log("  2. Selling tokens...");
      
      const tokenBalance = await token.balanceOf(deployer.address);
      
      if (tokenBalance === 0n) {
        console.log("     ⚠️  No tokens to sell, skipping sell");
        continue;
      }

      // Approve tokens if needed
      const allowance = await token.allowance(deployer.address, UNISWAP_V2_ROUTER);
      if (allowance < tokenBalance) {
        const approveTx = await token.approve(UNISWAP_V2_ROUTER, tokenBalance);
        await approveTx.wait();
      }

      // Get expected ETH output
      let ethOutMin = 0n;
      try {
        const amounts = await router.getAmountsOut(tokenBalance, pathReverse);
        ethOutMin = (amounts[1] * (100n - slippage)) / 100n;
      } catch (error) {
        console.log("     ⚠️  Could not get price estimate, using default");
        ethOutMin = 0n;
      }

      const sellTx = await router.swapExactTokensForETH(
        tokenBalance,
        ethOutMin,
        pathReverse,
        deployer.address,
        deadline
      );
      
      console.log(`     Sell TX: ${sellTx.hash}`);
      await sellTx.wait();
      console.log("     ✅ Tokens sold");

      console.log(`  ✅ Cycle ${i + 1} completed\n`);

      // Wait between cycles
      if (i < numberOfTrades - 1) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }

    } catch (error) {
      console.error(`  ❌ Error in cycle ${i + 1}:`, error.message);
      console.log("  Continuing with next cycle...\n");
    }
  }

  console.log("✅ Trading volume creation completed!");
  console.log("\nYour token now has trading volume on Uniswap.");
  console.log("Check volume on DexScreener: https://dexscreener.com/base/" + TOKEN_ADDRESS);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


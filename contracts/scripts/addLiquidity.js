const hre = require("hardhat");
const { ethers } = require("hardhat");

/**
 * Add Liquidity Script for TableDadrian Token
 * 
 * This script adds liquidity to Uniswap V2/V3 on Base network
 * to create trading volume for the TA token.
 * 
 * Usage:
 *   npx hardhat run scripts/addLiquidity.js --network base
 * 
 * Make sure to set PRIVATE_KEY in .env file
 */

// Contract addresses on Base
const TOKEN_ADDRESS = "0x9Cb5254319f824A2393ECbF6aDCf608867AA1b07"; // TA token
const UNISWAP_V2_ROUTER = "0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24"; // Uniswap V2 Router on Base
const WETH = "0x4200000000000000000000000000000000000006"; // WETH on Base

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Adding Liquidity for TableDadrian Token");
  console.log("=======================================\n");
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
  const tokenBalance = await token.balanceOf(deployer.address);
  const tokenDecimals = await token.decimals();
  const tokenSymbol = await token.symbol();
  
  console.log(`Token Balance: ${hre.ethers.formatUnits(tokenBalance, tokenDecimals)} ${tokenSymbol}`);
  
  if (tokenBalance === 0n) {
    console.log("❌ Error: You don't have any tokens to add as liquidity");
    process.exit(1);
  }

  // Get Uniswap Router
  const routerAbi = [
    "function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external payable returns (uint amountToken, uint amountETH, uint liquidity)",
    "function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB, uint liquidity)",
    "function WETH() external pure returns (address)",
    "function getAmountsOut(uint amountIn, address[] memory path) external view returns (uint[] memory amounts)",
  ];

  const router = await hre.ethers.getContractAt(routerAbi, UNISWAP_V2_ROUTER, deployer);

  // Configuration
  const tokenAmount = tokenBalance / 2n; // Use 50% of tokens for liquidity
  const ethAmount = hre.ethers.parseEther("0.1"); // 0.1 ETH (adjust as needed)
  
  // Slippage tolerance (5%)
  const slippage = 5n; // 5%
  const tokenAmountMin = (tokenAmount * (100n - slippage)) / 100n;
  const ethAmountMin = (ethAmount * (100n - slippage)) / 100n;
  
  // Deadline (20 minutes from now)
  const deadline = Math.floor(Date.now() / 1000) + 20 * 60;

  console.log("Liquidity Parameters:");
  console.log(`  Token Amount: ${hre.ethers.formatUnits(tokenAmount, tokenDecimals)} ${tokenSymbol}`);
  console.log(`  ETH Amount: ${hre.ethers.formatEther(ethAmount)} ETH`);
  console.log(`  Slippage: ${slippage}%`);
  console.log(`  Deadline: ${new Date(deadline * 1000).toLocaleString()}`);
  console.log("\n");

  // Check ETH balance
  const ethBalance = await hre.ethers.provider.getBalance(deployer.address);
  console.log(`ETH Balance: ${hre.ethers.formatEther(ethBalance)} ETH`);
  
  if (ethBalance < ethAmount) {
    console.log(`❌ Error: Insufficient ETH. Need ${hre.ethers.formatEther(ethAmount)} ETH, have ${hre.ethers.formatEther(ethBalance)} ETH`);
    process.exit(1);
  }

  // Approve tokens
  console.log("Step 1: Approving tokens for Uniswap Router...");
  const currentAllowance = await token.allowance(deployer.address, UNISWAP_V2_ROUTER);
  
  if (currentAllowance < tokenAmount) {
    const approveTx = await token.approve(UNISWAP_V2_ROUTER, tokenAmount);
    console.log(`  Transaction: ${approveTx.hash}`);
    await approveTx.wait();
    console.log("  ✅ Tokens approved");
  } else {
    console.log("  ✅ Tokens already approved");
  }

  // Add liquidity
  console.log("\nStep 2: Adding liquidity to Uniswap...");
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
    
    console.log(`  Transaction: ${addLiquidityTx.hash}`);
    console.log("  Waiting for confirmation...");
    
    const receipt = await addLiquidityTx.wait();
    console.log("  ✅ Liquidity added successfully!");
    console.log(`  Block: ${receipt.blockNumber}`);
    
    // Parse events if available
    if (receipt.logs) {
      console.log("\n  Transaction Events:");
      receipt.logs.forEach((log, index) => {
        console.log(`    Event ${index + 1}: ${log.address}`);
      });
    }
    
    console.log("\n✅ Liquidity pool created!");
    console.log(`View on BaseScan: https://basescan.org/tx/${addLiquidityTx.hash}`);
    console.log("\nYour token now has liquidity and can be traded on Uniswap!");
    
  } catch (error) {
    console.error("\n❌ Error adding liquidity:", error.message);
    
    if (error.message.includes("insufficient")) {
      console.log("\nPossible issues:");
      console.log("- Insufficient token balance");
      console.log("- Insufficient ETH balance");
      console.log("- Slippage too high (try increasing slippage tolerance)");
    }
    
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


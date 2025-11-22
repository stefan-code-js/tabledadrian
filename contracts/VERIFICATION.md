# Contract Verification Guide

This guide explains how to verify the TableDadrian token contract on BaseScan using alternative methods (no API key required).

## Prerequisites

1. **Contract Address**: `0x9cb5254319f824a2393ecbf6adcf608867aa1b07`
2. **Constructor Arguments**: The exact values used when deploying the contract
3. **Flattened Contract**: Single file with all imports resolved (generated automatically)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Generate flattened contract (required for manual verification):
```bash
npm run flatten
```

This creates `flattened/TableDadrian_Flattened.sol` with all imports resolved.

3. Get constructor arguments:
```bash
npm run get-args
```

Follow the instructions to find and decode constructor arguments from the deployment transaction.

## Verification Methods (No API Key Required)

### Method 1: Manual Verification via BaseScan Web Interface (Recommended)

**Step 1: Prepare the Contract**
```bash
npm run flatten
```
This creates a single file with all code in `flattened/TableDadrian_Flattened.sol`

**Step 2: Get Constructor Arguments**
1. Go to your contract on BaseScan: https://basescan.org/address/0x9cb5254319f824a2393ecbf6adcf608867aa1b07
2. Click on the "Contract Creation" transaction
3. Scroll to "Input Data" section
4. Copy the constructor arguments (the part after the function selector)
5. Use [ABI Decoder](https://abi.hashex.org/) to decode if needed

**Step 3: Verify on BaseScan**
1. Go to: https://basescan.org/address/0x9cb5254319f824a2393ecbf6adcf608867aa1b07
2. Click the **"Contract"** tab
3. Click **"Verify and Publish"** button
4. Select **"Solidity (Single file)"** as verification type
5. Fill in the form:
   - **Compiler Version**: `v0.8.20+commit.a1b79de6` (or latest 0.8.20)
   - **License**: `MIT`
   - **Optimization**: `Yes` (200 runs)
   - **Contract Name**: `TableDadrian`
   - **Constructor Arguments**: Paste the ABI-encoded constructor arguments
   - **Source Code**: Open `flattened/TableDadrian_Flattened.sol` and copy the entire contents
6. Click **"Verify and Publish"**

### Method 2: Sourcify Verification (Decentralized, No API Key)

1. Go to [BaseScan Contract Page](https://basescan.org/address/0x9cb5254319f824a2393ecbf6adcf608867aa1b07)
2. Click on "Contract" tab
3. Click "Verify and Publish"
4. Fill in the form:
   - **Compiler Version**: `0.8.20`
   - **License**: `MIT`
   - **Optimization**: `Yes` (200 runs)
   - **Contract Name**: `TableDadrian`
   - **Constructor Arguments**: ABI-encoded constructor parameters
   - **Source Code**: Paste the entire `TableDadrian.sol` file

**Option A: Using Sourcify Web Interface**
1. Go to: https://sourcify.dev/#/verifier
2. Select network: **Base (Chain ID: 8453)**
3. Enter contract address: `0x9cb5254319f824a2393ecbf6adcf608867aa1b07`
4. Upload contract files:
   - `contracts/TableDadrian.sol`
   - All OpenZeppelin contracts from `node_modules/@openzeppelin/contracts/`
5. Or upload the flattened contract: `flattened/TableDadrian_Flattened.sol`
6. Click **"Verify"**

**Option B: Using Sourcify CLI**
```bash
npm install -g @sourcify/cli
sourcify verify --chain 8453 0x9cb5254319f824a2393ecbf6adcf608867aa1b07
```

**Option C: Using Hardhat Script**
```bash
npm run verify-sourcify
```

### Method 3: Using Hardhat Verify (If API Key Available)

If you manage to get a BaseScan API key in the future:

```bash
# Set API key in .env file
BASESCAN_API_KEY=your_api_key_here

# Run verification
npm run verify
```

## Getting Constructor Arguments

**Automated Helper:**
```bash
npm run get-args
```

**Manual Method:**
1. Go to BaseScan: https://basescan.org/address/0x9cb5254319f824a2393ecbf6adcf608867aa1b07
2. Click on the "Contract Creation" transaction (the one that created the contract)
3. Scroll to "Input Data" section
4. The constructor arguments are in the "Input Data" field (after the function selector)
5. Use an ABI decoder to decode:
   - [ABI Decoder](https://abi.hashex.org/)
   - [4byte.directory](https://www.4byte.directory/)
   - [MyEtherWallet Decoder](https://www.myetherwallet.com/tools/abi-decoder)

**Constructor Parameters (in order):**
- `address initialOwner` - Contract owner address
- `address initialTreasury` - Treasury wallet address
- `address initialBusiness` - Business wallet address
- `uint256 initialSupply` - Initial supply minted (in wei)

## Verification Checklist

Before verifying, ensure:

- [ ] Contract is deployed on Base mainnet
- [ ] Flattened contract is generated (`npm run flatten`)
- [ ] Constructor arguments are obtained and decoded
- [ ] Solidity compiler version matches (0.8.20)
- [ ] Optimization settings match (enabled, 200 runs)
- [ ] License is set to MIT

## Troubleshooting

### "Contract source code already verified"
- Contract is already verified, no action needed
- View verified code on BaseScan

### "Constructor arguments do not match"
- Double-check constructor arguments
- Ensure values are in correct format (addresses, wei amounts)
- Verify deployment transaction to get exact values

### "Unable to verify contract"
- Ensure network is correct (Base mainnet, Chain ID: 8453)
- Verify compiler version matches exactly (0.8.20)
- Check optimization settings (enabled, 200 runs)
- Ensure flattened contract includes all imports
- Verify constructor arguments are correctly ABI-encoded

### "Contract not found"
- Verify contract address is correct
- Ensure contract is deployed on Base mainnet
- Check network configuration in `hardhat.config.js`

## After Verification

Once verified, you can:
- View source code on BaseScan
- Interact with contract functions via BaseScan UI
- Share verified contract link
- Build trust with community

## Quick Start (Recommended Method)

1. **Generate flattened contract:**
   ```bash
   npm run flatten
   ```

2. **Get constructor arguments:**
   - Visit: https://basescan.org/address/0x9cb5254319f824a2393ecbf6adcf608867aa1b07
   - Click "Contract Creation" transaction
   - Copy constructor arguments from "Input Data"

3. **Verify on BaseScan:**
   - Go to contract page → "Contract" tab → "Verify and Publish"
   - Select "Solidity (Single file)"
   - Paste flattened contract code
   - Enter constructor arguments
   - Submit

## Additional Resources

- [BaseScan Verification Guide](https://info.basescan.org/how-to-verify-contracts/)
- [Sourcify Documentation](https://docs.sourcify.dev/)
- [Hardhat Flatten Command](https://hardhat.org/hardhat-runner/docs/advanced/flattening)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [ABI Decoder Tools](https://abi.hashex.org/)

## Security Note

⚠️ **Never commit your `.env` file or private keys to git!**

The `.env` file is already in `.gitignore` for security.


# Contract Verification Guide

This guide explains how to verify the TableDadrian token contract on BaseScan.

## Prerequisites

1. **BaseScan API Key**: Get your free API key from [BaseScan API Keys](https://basescan.org/myapikey)
2. **Contract Address**: `0x9cb5254319f824a2393ecbf6adcf608867aa1b07`
3. **Constructor Arguments**: The exact values used when deploying the contract

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the `contracts/` directory:
```bash
cp .env.example .env
```

3. Add your BaseScan API key to `.env`:
```
BASESCAN_API_KEY=your_api_key_here
```

4. Update constructor arguments in `scripts/verify.js` with the actual deployment values:
   - `initialOwner`: Address that owns the contract
   - `initialTreasury`: Initial treasury wallet address
   - `initialBusiness`: Initial business wallet address
   - `initialSupply`: Initial supply minted (in wei, e.g., "1000000000000000000000" for 1000 tokens)

## Verification Methods

### Method 1: Using Hardhat Verify Plugin (Recommended)

```bash
npx hardhat run scripts/verify.js --network base
```

Or use the npm script:
```bash
npm run verify
```

### Method 2: Manual Verification via BaseScan

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

### Method 3: Using Hardhat Verify Command Directly

```bash
npx hardhat verify \
  --network base \
  --constructor-args scripts/constructor-args.js \
  0x9cb5254319f824a2393ecbf6adcf608867aa1b07
```

## Getting Constructor Arguments

If you don't have the constructor arguments from deployment, you can:

1. Check the deployment transaction on BaseScan
2. Decode the constructor arguments from the transaction input data
3. Use a tool like [ABI Decoder](https://abi.hashex.org/) to decode the parameters

## Verification Checklist

Before verifying, ensure:

- [ ] Contract is deployed on Base mainnet
- [ ] BaseScan API key is set in `.env`
- [ ] Constructor arguments are correct
- [ ] Solidity compiler version matches (0.8.20)
- [ ] Optimization settings match (enabled, 200 runs)
- [ ] OpenZeppelin contracts are accessible (if using flattened source)

## Troubleshooting

### "Contract source code already verified"
- Contract is already verified, no action needed
- View verified code on BaseScan

### "Constructor arguments do not match"
- Double-check constructor arguments
- Ensure values are in correct format (addresses, wei amounts)
- Verify deployment transaction to get exact values

### "Unable to verify contract"
- Check API key is valid
- Ensure network is correct (Base mainnet)
- Verify compiler version matches
- Check that OpenZeppelin contracts can be resolved

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

## Additional Resources

- [BaseScan Documentation](https://docs.basescan.org/)
- [Hardhat Verify Plugin](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify)
- [Solidity Documentation](https://docs.soliditylang.org/)

## Security Note

⚠️ **Never commit your `.env` file or private keys to git!**

The `.env` file is already in `.gitignore` for security.


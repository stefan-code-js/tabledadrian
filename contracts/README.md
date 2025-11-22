# TableDadrian Token Smart Contract

## Overview

The TableDadrian (TA) token is a premium ERC-20 token designed for the Table d'Adrian luxury culinary brand. This contract implements advanced features for business operations, community engagement, governance, and brand asset management.

**Contract Address:** `0x9cb5254319f824a2393ecbf6adcf608867aa1b07`  
**Network:** Base  
**Symbol:** TA  
**Name:** TableDadrian  
**Max Supply:** 10,000,000 TA

## Features

### Core Functionality
- ✅ ERC-20 compliant token with fixed max supply
- ✅ Owner minting and burning capabilities
- ✅ Emergency pause/unpause functionality
- ✅ Transfer restrictions for compliance

### Business Features
- ✅ Treasury and business wallet management
- ✅ Automated reward distribution (single and batch)
- ✅ VIP allowlist for exclusive access
- ✅ On-chain admin action logging

### Governance
- ✅ Community voting on proposals
- ✅ Quorum-based decision making
- ✅ Transparent proposal system

### Security
- ✅ ReentrancyGuard protection
- ✅ Access control with OpenZeppelin Ownable
- ✅ Pausable functionality
- ✅ Transfer restrictions

## Installation

```bash
npm install
```

## Compilation

```bash
npx hardhat compile
```

## Testing

```bash
npx hardhat test
```

## Deployment

Update deployment parameters in `scripts/deploy.js` and run:

```bash
npx hardhat run scripts/deploy.js --network base
```

## Contract Functions

### Minting & Burning
- `mint(address to, uint256 amount)` - Mint new tokens (owner only)
- `batchMint(address[] recipients, uint256[] amounts)` - Batch mint
- `burn(uint256 amount)` - Burn tokens from caller
- `burnFrom(address from, uint256 amount)` - Burn from address (owner only)

### Rewards
- `distributeReward(address recipient, uint256 amount, string reason)` - Distribute single reward
- `batchDistributeRewards(address[] recipients, uint256[] amounts, string reason)` - Batch rewards

### VIP Management
- `grantVIP(address account, string reason)` - Grant VIP status
- `revokeVIP(address account, string reason)` - Revoke VIP status
- `batchGrantVIP(address[] accounts, string reason)` - Batch grant VIP

### Transfer Restrictions
- `restrictTransfer(address account, string reason)` - Restrict transfers
- `unrestrictTransfer(address account, string reason)` - Remove restriction

### Governance
- `createProposal(string description)` - Create new proposal
- `vote(uint256 proposalId, bool support)` - Vote on proposal
- `executeProposal(uint256 proposalId)` - Execute proposal after voting

### Treasury & Business
- `updateTreasuryWallet(address newTreasury)` - Update treasury wallet
- `updateBusinessWallet(address newBusiness)` - Update business wallet
- `transferToTreasury(uint256 amount)` - Transfer to treasury
- `transferToBusiness(uint256 amount)` - Transfer to business

### Emergency
- `pause()` - Pause all transfers
- `unpause()` - Resume transfers

## Security Considerations

- Contract uses OpenZeppelin's battle-tested contracts
- ReentrancyGuard on all external functions
- Access control on sensitive operations
- Pausable for emergency situations
- Transfer restrictions for compliance

## Audit Recommendations

Before mainnet deployment, consider:
1. Professional smart contract audit
2. Formal verification of critical functions
3. Gas optimization review
4. Comprehensive test coverage
5. Security review of external integrations

## License

MIT


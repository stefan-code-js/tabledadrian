// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title TableDadrian
 * @author Table d'Adrian
 * @notice Premium ERC-20 token for Table d'Adrian luxury culinary brand
 * @dev Advanced token contract with governance, rewards, and business features
 * 
 * Contract Address: 0x9cb5254319f824a2393ecbf6adcf608867aa1b07
 * Symbol: TA
 * Name: TableDadrian
 * 
 * This contract implements a comprehensive token system designed for:
 * - Luxury brand asset management
 * - Community engagement and rewards
 * - Governance and decision-making
 * - Business operations and treasury management
 * - VIP access and exclusive utility
 */
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TableDadrian is ERC20, ERC20Pausable, Ownable, ReentrancyGuard {
    // ============ CONSTANTS ============
    
    /// @notice Maximum total supply of TA tokens (premium capped asset)
    uint256 public constant MAX_SUPPLY = 10_000_000 * 10**18; // 10 million tokens
    
    /// @notice Minimum voting period for governance proposals (in blocks)
    uint256 public constant MIN_VOTING_PERIOD = 17280; // ~3 days at 15s/block
    
    /// @notice Minimum quorum percentage for governance votes
    uint256 public constant MIN_QUORUM = 5; // 5% of total supply
    
    // ============ STATE VARIABLES ============
    
    /// @notice Treasury wallet for business operations and fees
    address public treasuryWallet;
    
    /// @notice Business operations wallet for operational expenses
    address public businessWallet;
    
    /// @notice Mapping of VIP addresses with special access privileges
    mapping(address => bool) public vipAllowlist;
    
    /// @notice Mapping of addresses with transfer restrictions (fraud/compliance)
    mapping(address => bool) public transferRestricted;
    
    /// @notice Mapping of addresses that have received rewards (for tracking)
    mapping(address => uint256) public totalRewardsReceived;
    
    /// @notice Governance proposal structure
    struct Proposal {
        uint256 id;
        string description;
        address proposer;
        uint256 startBlock;
        uint256 endBlock;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
        mapping(address => bool) hasVoted;
    }
    
    /// @notice Array of all governance proposals
    Proposal[] public proposals;
    
    /// @notice Current active proposal ID (0 = no active proposal)
    uint256 public activeProposalId;
    
    /// @notice Event log for admin actions (auditability)
    struct AdminLog {
        uint256 timestamp;
        address admin;
        string action;
        address target;
        uint256 amount;
    }
    
    /// @notice Array of all admin action logs
    AdminLog[] public adminLogs;
    
    /// @notice Counter for admin log entries
    uint256 public logCounter;
    
    // ============ EVENTS ============
    
    /// @notice Emitted when VIP status is granted or revoked
    event VIPStatusChanged(address indexed account, bool isVIP, string reason);
    
    /// @notice Emitted when transfer restriction is applied or removed
    event TransferRestrictionChanged(address indexed account, bool restricted, string reason);
    
    /// @notice Emitted when rewards are distributed
    event RewardsDistributed(address indexed recipient, uint256 amount, string reason);
    
    /// @notice Emitted when a new governance proposal is created
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string description);
    
    /// @notice Emitted when a vote is cast on a proposal
    event VoteCast(address indexed voter, uint256 indexed proposalId, bool support, uint256 votes);
    
    /// @notice Emitted when a proposal is executed
    event ProposalExecuted(uint256 indexed proposalId, bool passed);
    
    /// @notice Emitted when treasury or business wallet is updated
    event WalletUpdated(string walletType, address indexed oldWallet, address indexed newWallet);
    
    /// @notice Emitted when admin action is logged
    event AdminActionLogged(uint256 indexed logId, address indexed admin, string action);
    
    // ============ MODIFIERS ============
    
    /// @notice Ensures address is not transfer-restricted
    modifier notRestricted(address account) {
        require(!transferRestricted[account], "TableDadrian: Address is transfer-restricted");
        _;
    }
    
    /// @notice Ensures function is called during active proposal voting period
    modifier duringVotingPeriod(uint256 proposalId) {
        require(proposalId < proposals.length, "TableDadrian: Invalid proposal ID");
        Proposal storage proposal = proposals[proposalId];
        require(block.number >= proposal.startBlock && block.number <= proposal.endBlock, 
                "TableDadrian: Not in voting period");
        require(!proposal.executed, "TableDadrian: Proposal already executed");
        _;
    }
    
    // ============ CONSTRUCTOR ============
    
    /**
     * @notice Deploys TableDadrian token contract
     * @param initialOwner Address that will own the contract (can transfer ownership)
     * @param initialTreasury Initial treasury wallet address
     * @param initialBusiness Initial business operations wallet address
     * @param initialSupply Initial token supply to mint to owner (must be <= MAX_SUPPLY)
     * 
     * @dev Sets up the token with initial configuration and mints initial supply
     */
    constructor(
        address initialOwner,
        address initialTreasury,
        address initialBusiness,
        uint256 initialSupply
    ) ERC20("TableDadrian", "TA") Ownable(initialOwner) {
        require(initialTreasury != address(0), "TableDadrian: Invalid treasury address");
        require(initialBusiness != address(0), "TableDadrian: Invalid business address");
        require(initialSupply <= MAX_SUPPLY, "TableDadrian: Initial supply exceeds max");
        
        treasuryWallet = initialTreasury;
        businessWallet = initialBusiness;
        
        // Mint initial supply to owner for distribution
        if (initialSupply > 0) {
            _mint(initialOwner, initialSupply);
            _logAdminAction(initialOwner, "Initial Mint", address(0), initialSupply);
        }
        
        emit WalletUpdated("Treasury", address(0), initialTreasury);
        emit WalletUpdated("Business", address(0), initialBusiness);
    }
    
    // ============ MINTING & BURNING ============
    
    /**
     * @notice Mints new tokens (owner only)
     * @param to Address to receive the minted tokens
     * @param amount Amount of tokens to mint
     * 
     * @dev Used for:
     * - Loyalty rewards distribution
     * - Event participation rewards
     * - Strategic business partnerships
     * - Community growth initiatives
     * 
     * @dev Ensures total supply never exceeds MAX_SUPPLY
     */
    function mint(address to, uint256 amount) external onlyOwner whenNotPaused {
        require(to != address(0), "TableDadrian: Cannot mint to zero address");
        require(totalSupply() + amount <= MAX_SUPPLY, "TableDadrian: Would exceed max supply");
        
        _mint(to, amount);
        _logAdminAction(msg.sender, "Mint", to, amount);
    }
    
    /**
     * @notice Batch mint to multiple addresses (owner only)
     * @param recipients Array of addresses to receive tokens
     * @param amounts Array of amounts corresponding to recipients
     * 
     * @dev Efficient for distributing rewards to multiple addresses at once
     * @dev Used for event rewards, loyalty programs, and community initiatives
     */
    function batchMint(address[] calldata recipients, uint256[] calldata amounts) 
        external 
        onlyOwner 
        whenNotPaused 
        nonReentrant 
    {
        require(recipients.length == amounts.length, "TableDadrian: Array length mismatch");
        require(recipients.length > 0, "TableDadrian: Empty arrays");
        
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }
        
        require(totalSupply() + totalAmount <= MAX_SUPPLY, "TableDadrian: Would exceed max supply");
        
        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "TableDadrian: Invalid recipient");
            _mint(recipients[i], amounts[i]);
        }
        
        _logAdminAction(msg.sender, "Batch Mint", address(0), totalAmount);
    }
    
    /**
     * @notice Burns tokens from caller's balance
     * @param amount Amount of tokens to burn
     * 
     * @dev Allows token holders to voluntarily burn tokens
     * @dev Reduces total supply permanently
     */
    function burn(uint256 amount) external whenNotPaused {
        _burn(msg.sender, amount);
    }
    
    /**
     * @notice Burns tokens from specified address (owner only)
     * @param from Address to burn tokens from
     * @param amount Amount of tokens to burn
     * 
     * @dev Used for:
     * - Removing tokens from restricted addresses
     * - Compliance and fraud prevention
     * - Strategic supply management
     */
    function burnFrom(address from, uint256 amount) external onlyOwner whenNotPaused {
        _spendAllowance(from, msg.sender, amount);
        _burn(from, amount);
        _logAdminAction(msg.sender, "Burn From", from, amount);
    }
    
    // ============ REWARD DISTRIBUTION ============
    
    /**
     * @notice Distributes rewards to a single address
     * @param recipient Address to receive rewards
     * @param amount Amount of tokens to distribute
     * @param reason Reason for reward distribution (for logging)
     * 
     * @dev Used for:
     * - Event participation rewards
     * - Booking incentives
     * - Loyalty program rewards
     * - Community participation bonuses
     */
    function distributeReward(
        address recipient,
        uint256 amount,
        string calldata reason
    ) external onlyOwner whenNotPaused nonReentrant {
        require(recipient != address(0), "TableDadrian: Invalid recipient");
        require(balanceOf(msg.sender) >= amount, "TableDadrian: Insufficient balance");
        
        _transfer(msg.sender, recipient, amount);
        totalRewardsReceived[recipient] += amount;
        
        emit RewardsDistributed(recipient, amount, reason);
        _logAdminAction(msg.sender, string.concat("Reward: ", reason), recipient, amount);
    }
    
    /**
     * @notice Batch distributes rewards to multiple addresses
     * @param recipients Array of addresses to receive rewards
     * @param amounts Array of amounts corresponding to recipients
     * @param reason Reason for reward distribution (for logging)
     * 
     * @dev Efficient for distributing rewards to multiple participants
     * @dev Used for event rewards, group bookings, and community initiatives
     */
    function batchDistributeRewards(
        address[] calldata recipients,
        uint256[] calldata amounts,
        string calldata reason
    ) external onlyOwner whenNotPaused nonReentrant {
        require(recipients.length == amounts.length, "TableDadrian: Array length mismatch");
        require(recipients.length > 0, "TableDadrian: Empty arrays");
        
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }
        
        require(balanceOf(msg.sender) >= totalAmount, "TableDadrian: Insufficient balance");
        
        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "TableDadrian: Invalid recipient");
            _transfer(msg.sender, recipients[i], amounts[i]);
            totalRewardsReceived[recipients[i]] += amounts[i];
            emit RewardsDistributed(recipients[i], amounts[i], reason);
        }
        
        _logAdminAction(msg.sender, string.concat("Batch Reward: ", reason), address(0), totalAmount);
    }
    
    // ============ VIP ALLOWLIST ============
    
    /**
     * @notice Grants VIP status to an address
     * @param account Address to grant VIP status
     * @param reason Reason for VIP status grant
     * 
     * @dev VIP status grants:
     * - Exclusive access to premium features
     * - Priority in governance proposals
     * - Early access to NFT drops and events
     * - Special rewards and benefits
     */
    function grantVIP(address account, string calldata reason) external onlyOwner {
        require(account != address(0), "TableDadrian: Invalid address");
        require(!vipAllowlist[account], "TableDadrian: Already VIP");
        
        vipAllowlist[account] = true;
        emit VIPStatusChanged(account, true, reason);
        _logAdminAction(msg.sender, string.concat("Grant VIP: ", reason), account, 0);
    }
    
    /**
     * @notice Revokes VIP status from an address
     * @param account Address to revoke VIP status
     * @param reason Reason for VIP status revocation
     */
    function revokeVIP(address account, string calldata reason) external onlyOwner {
        require(vipAllowlist[account], "TableDadrian: Not VIP");
        
        vipAllowlist[account] = false;
        emit VIPStatusChanged(account, false, reason);
        _logAdminAction(msg.sender, string.concat("Revoke VIP: ", reason), account, 0);
    }
    
    /**
     * @notice Batch grants VIP status to multiple addresses
     * @param accounts Array of addresses to grant VIP status
     * @param reason Reason for VIP status grant
     */
    function batchGrantVIP(address[] calldata accounts, string calldata reason) external onlyOwner {
        require(accounts.length > 0, "TableDadrian: Empty array");
        
        for (uint256 i = 0; i < accounts.length; i++) {
            require(accounts[i] != address(0), "TableDadrian: Invalid address");
            if (!vipAllowlist[accounts[i]]) {
                vipAllowlist[accounts[i]] = true;
                emit VIPStatusChanged(accounts[i], true, reason);
            }
        }
        
        _logAdminAction(msg.sender, string.concat("Batch Grant VIP: ", reason), address(0), 0);
    }
    
    // ============ TRANSFER RESTRICTIONS ============
    
    /**
     * @notice Restricts transfers for a specific address
     * @param account Address to restrict
     * @param reason Reason for restriction (fraud, compliance, etc.)
     * 
     * @dev Used for:
     * - Fraud prevention
     * - Regulatory compliance
     * - Security measures
     * - Dispute resolution
     */
    function restrictTransfer(address account, string calldata reason) external onlyOwner {
        require(account != address(0), "TableDadrian: Invalid address");
        require(!transferRestricted[account], "TableDadrian: Already restricted");
        
        transferRestricted[account] = true;
        emit TransferRestrictionChanged(account, true, reason);
        _logAdminAction(msg.sender, string.concat("Restrict: ", reason), account, 0);
    }
    
    /**
     * @notice Removes transfer restriction from an address
     * @param account Address to unrestrict
     * @param reason Reason for removing restriction
     */
    function unrestrictTransfer(address account, string calldata reason) external onlyOwner {
        require(transferRestricted[account], "TableDadrian: Not restricted");
        
        transferRestricted[account] = false;
        emit TransferRestrictionChanged(account, false, reason);
        _logAdminAction(msg.sender, string.concat("Unrestrict: ", reason), account, 0);
    }
    
    // ============ GOVERNANCE ============
    
    /**
     * @notice Creates a new governance proposal
     * @param description Description of the proposal
     * 
     * @dev Proposals allow token holders to vote on:
     * - Brand direction and partnerships
     * - Reward distribution parameters
     * - Treasury allocation decisions
     * - Feature additions or changes
     * - Community initiatives
     * 
     * @return proposalId The ID of the newly created proposal
     */
    function createProposal(string calldata description) external returns (uint256) {
        require(bytes(description).length > 0, "TableDadrian: Empty description");
        require(activeProposalId == 0 || proposals[activeProposalId - 1].executed, 
                "TableDadrian: Previous proposal still active");
        
        uint256 proposalId = proposals.length;
        Proposal storage proposal = proposals.push();
        proposal.id = proposalId;
        proposal.description = description;
        proposal.proposer = msg.sender;
        proposal.startBlock = block.number;
        proposal.endBlock = block.number + MIN_VOTING_PERIOD;
        proposal.votesFor = 0;
        proposal.votesAgainst = 0;
        proposal.executed = false;
        
        activeProposalId = proposalId + 1;
        
        emit ProposalCreated(proposalId, msg.sender, description);
        _logAdminAction(msg.sender, "Create Proposal", address(0), proposalId);
        
        return proposalId;
    }
    
    /**
     * @notice Votes on an active governance proposal
     * @param proposalId ID of the proposal to vote on
     * @param support true for yes, false for no
     * 
     * @dev Voting power is proportional to token balance
     * @dev Each address can vote once per proposal
     */
    function vote(uint256 proposalId, bool support) 
        external 
        duringVotingPeriod(proposalId) 
        nonReentrant 
    {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.hasVoted[msg.sender], "TableDadrian: Already voted");
        
        uint256 votingPower = balanceOf(msg.sender);
        require(votingPower > 0, "TableDadrian: No voting power");
        
        proposal.hasVoted[msg.sender] = true;
        
        if (support) {
            proposal.votesFor += votingPower;
        } else {
            proposal.votesAgainst += votingPower;
        }
        
        emit VoteCast(msg.sender, proposalId, support, votingPower);
    }
    
    /**
     * @notice Executes a governance proposal after voting period ends
     * @param proposalId ID of the proposal to execute
     * 
     * @dev Proposal passes if:
     * - Voting period has ended
     * - Quorum is met (>= MIN_QUORUM of total supply)
     * - More votes for than against
     * 
     * @return passed Whether the proposal passed
     */
    function executeProposal(uint256 proposalId) external returns (bool) {
        require(proposalId < proposals.length, "TableDadrian: Invalid proposal ID");
        Proposal storage proposal = proposals[proposalId];
        require(block.number > proposal.endBlock, "TableDadrian: Voting still active");
        require(!proposal.executed, "TableDadrian: Already executed");
        
        proposal.executed = true;
        
        uint256 totalVotes = proposal.votesFor + proposal.votesAgainst;
        uint256 quorum = (totalSupply() * MIN_QUORUM) / 100;
        bool passed = totalVotes >= quorum && proposal.votesFor > proposal.votesAgainst;
        
        emit ProposalExecuted(proposalId, passed);
        _logAdminAction(msg.sender, "Execute Proposal", address(0), proposalId);
        
        return passed;
    }
    
    /**
     * @notice Gets proposal details
     * @param proposalId ID of the proposal
     * @return id Proposal ID
     * @return description Proposal description
     * @return proposer Address that created the proposal
     * @return startBlock Block when voting started
     * @return endBlock Block when voting ends
     * @return votesFor Number of votes for
     * @return votesAgainst Number of votes against
     * @return executed Whether proposal has been executed
     */
    function getProposal(uint256 proposalId) 
        external 
        view 
        returns (
            uint256 id,
            string memory description,
            address proposer,
            uint256 startBlock,
            uint256 endBlock,
            uint256 votesFor,
            uint256 votesAgainst,
            bool executed
        ) 
    {
        require(proposalId < proposals.length, "TableDadrian: Invalid proposal ID");
        Proposal storage proposal = proposals[proposalId];
        
        return (
            proposal.id,
            proposal.description,
            proposal.proposer,
            proposal.startBlock,
            proposal.endBlock,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.executed
        );
    }
    
    /**
     * @notice Gets total number of proposals
     * @return count Total number of proposals created
     */
    function getProposalCount() external view returns (uint256) {
        return proposals.length;
    }
    
    // ============ TREASURY & BUSINESS WALLETS ============
    
    /**
     * @notice Updates the treasury wallet address
     * @param newTreasury New treasury wallet address
     * 
     * @dev Treasury wallet is used for:
     * - Business operations funding
     * - Strategic investments
     * - Reserve management
     * - Long-term growth initiatives
     */
    function updateTreasuryWallet(address newTreasury) external onlyOwner {
        require(newTreasury != address(0), "TableDadrian: Invalid address");
        require(newTreasury != treasuryWallet, "TableDadrian: Same address");
        
        address oldTreasury = treasuryWallet;
        treasuryWallet = newTreasury;
        
        emit WalletUpdated("Treasury", oldTreasury, newTreasury);
        _logAdminAction(msg.sender, "Update Treasury", newTreasury, 0);
    }
    
    /**
     * @notice Updates the business operations wallet address
     * @param newBusiness New business wallet address
     * 
     * @dev Business wallet is used for:
     * - Operational expenses
     * - Partnership payments
     * - Event funding
     * - Day-to-day business needs
     */
    function updateBusinessWallet(address newBusiness) external onlyOwner {
        require(newBusiness != address(0), "TableDadrian: Invalid address");
        require(newBusiness != businessWallet, "TableDadrian: Same address");
        
        address oldBusiness = businessWallet;
        businessWallet = newBusiness;
        
        emit WalletUpdated("Business", oldBusiness, newBusiness);
        _logAdminAction(msg.sender, "Update Business", newBusiness, 0);
    }
    
    /**
     * @notice Transfers tokens to treasury wallet
     * @param amount Amount of tokens to transfer
     * 
     * @dev Used for accumulating business funds in treasury
     */
    function transferToTreasury(uint256 amount) external onlyOwner {
        require(balanceOf(msg.sender) >= amount, "TableDadrian: Insufficient balance");
        _transfer(msg.sender, treasuryWallet, amount);
        _logAdminAction(msg.sender, "Transfer to Treasury", treasuryWallet, amount);
    }
    
    /**
     * @notice Transfers tokens to business wallet
     * @param amount Amount of tokens to transfer
     * 
     * @dev Used for operational funding
     */
    function transferToBusiness(uint256 amount) external onlyOwner {
        require(balanceOf(msg.sender) >= amount, "TableDadrian: Insufficient balance");
        _transfer(msg.sender, businessWallet, amount);
        _logAdminAction(msg.sender, "Transfer to Business", businessWallet, amount);
    }
    
    // ============ PAUSE FUNCTIONALITY ============
    
    /**
     * @notice Pauses all token transfers (emergency only)
     * 
     * @dev Used for:
     * - Security incidents
     * - Smart contract vulnerabilities
     * - Regulatory compliance
     * - Emergency situations
     */
    function pause() external onlyOwner {
        _pause();
        _logAdminAction(msg.sender, "Pause Contract", address(0), 0);
    }
    
    /**
     * @notice Unpauses token transfers
     */
    function unpause() external onlyOwner {
        _unpause();
        _logAdminAction(msg.sender, "Unpause Contract", address(0), 0);
    }
    
    // ============ OVERRIDES ============
    
    /**
     * @notice Overrides transfer to enforce restrictions
     */
    function _update(address from, address to, uint256 value) 
        internal 
        override(ERC20, ERC20Pausable) 
    {
        require(!transferRestricted[from], "TableDadrian: Sender is restricted");
        require(!transferRestricted[to], "TableDadrian: Recipient is restricted");
        
        super._update(from, to, value);
    }
    
    // ============ ADMIN LOGGING ============
    
    /**
     * @notice Internal function to log admin actions
     * @param admin Address performing the action
     * @param action Description of the action
     * @param target Target address (if applicable)
     * @param amount Amount involved (if applicable)
     * 
     * @dev Creates on-chain audit trail for all admin actions
     */
    function _logAdminAction(
        address admin,
        string memory action,
        address target,
        uint256 amount
    ) internal {
        adminLogs.push(AdminLog({
            timestamp: block.timestamp,
            admin: admin,
            action: action,
            target: target,
            amount: amount
        }));
        
        logCounter++;
        emit AdminActionLogged(logCounter - 1, admin, action);
    }
    
    /**
     * @notice Gets admin log entry
     * @param logId ID of the log entry
     * @return timestamp Block timestamp
     * @return admin Address that performed action
     * @return action Description of action
     * @return target Target address
     * @return amount Amount involved
     */
    function getAdminLog(uint256 logId) 
        external 
        view 
        returns (
            uint256 timestamp,
            address admin,
            string memory action,
            address target,
            uint256 amount
        ) 
    {
        require(logId < adminLogs.length, "TableDadrian: Invalid log ID");
        AdminLog storage log = adminLogs[logId];
        
        return (log.timestamp, log.admin, log.action, log.target, log.amount);
    }
    
    /**
     * @notice Gets total number of admin logs
     * @return count Total number of log entries
     */
    function getAdminLogCount() external view returns (uint256) {
        return adminLogs.length;
    }
    
    // ============ EXTERNAL API HOOKS (TEMPLATES) ============
    
    /**
     * @notice Template function for future booking system integration
     * @param userAddress Address of the user making booking
     * @param bookingId Unique booking identifier
     * @param tokenAmount Amount of tokens to process
     * 
     * @dev This function can be extended to integrate with off-chain booking systems
     * @dev Example: Process token payments for private chef bookings
     * 
     * TODO: Implement integration with booking API
     * TODO: Add access control for booking service
     * TODO: Add event emission for booking confirmation
     */
    // function processBooking(
    //     address userAddress,
    //     string memory bookingId,
    //     uint256 tokenAmount
    // ) external {
    //     // Implementation for booking integration
    //     // Transfer tokens, update booking status, emit events
    // }
    
    /**
     * @notice Template function for future NFT drop integration
     * @param recipient Address to receive NFT-related tokens
     * @param nftCollectionId Collection identifier
     * @param rewardAmount Token reward amount
     * 
     * @dev This function can be extended to integrate with NFT platforms
     * @dev Example: Distribute tokens to NFT holders or for NFT purchases
     * 
     * TODO: Implement integration with NFT platform API
     * TODO: Add verification for NFT ownership
     * TODO: Add event emission for NFT-related rewards
     */
    // function processNFTReward(
    //     address recipient,
    //     string memory nftCollectionId,
    //     uint256 rewardAmount
    // ) external {
    //     // Implementation for NFT integration
    //     // Verify NFT ownership, distribute rewards, emit events
    // }
    
    /**
     * @notice Template function for future event ticketing integration
     * @param attendee Address of event attendee
     * @param eventId Unique event identifier
     * @param ticketPrice Token price for ticket
     * 
     * @dev This function can be extended to integrate with event management systems
     * @dev Example: Process token payments for exclusive event tickets
     * 
     * TODO: Implement integration with event management API
     * TODO: Add access control for event service
     * TODO: Add event emission for ticket confirmation
     */
    // function processEventTicket(
    //     address attendee,
    //     string memory eventId,
    //     uint256 ticketPrice
    // ) external {
    //     // Implementation for event ticketing integration
    //     // Process payment, issue ticket, emit events
    // }
    
    // ============ VIEW FUNCTIONS ============
    
    /**
     * @notice Gets total rewards received by an address
     * @param account Address to check
     * @return total Total rewards received
     */
    function getTotalRewards(address account) external view returns (uint256) {
        return totalRewardsReceived[account];
    }
    
    /**
     * @notice Checks if an address is VIP
     * @param account Address to check
     * @return isVIP Whether address has VIP status
     */
    function isVIP(address account) external view returns (bool) {
        return vipAllowlist[account];
    }
    
    /**
     * @notice Checks if an address is transfer-restricted
     * @param account Address to check
     * @return restricted Whether address is restricted
     */
    function isRestricted(address account) external view returns (bool) {
        return transferRestricted[account];
    }
    
    /**
     * @notice Gets contract information
     * @return name Token name
     * @return symbol Token symbol
     * @return totalSupply Current total supply
     * @return maxSupply Maximum supply
     * @return treasury Current treasury wallet
     * @return business Current business wallet
     */
    function getContractInfo() 
        external 
        view 
        returns (
            string memory name,
            string memory symbol,
            uint256 totalSupply,
            uint256 maxSupply,
            address treasury,
            address business
        ) 
    {
        return (
            name(),
            symbol(),
            totalSupply(),
            MAX_SUPPLY,
            treasuryWallet,
            businessWallet
        );
    }
}


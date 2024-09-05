// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Organization {
    struct Shareholder {
        address shareholder;
        uint256 shares;
    }

    struct Proposal {
        uint256 proposalId;
        string description;
        address beneficiary;
        uint256 amount;
        bool executed;
        bool disputed;
        uint256 votesFor;
        uint256 votesAgainst;
        mapping(address => bool) voted;
        mapping(address => bool) disputeVoted;
        uint256 disputeVotesFor;
        uint256 disputeVotesAgainst;
    }

    string public name;
    uint256 public sharePrice;
    address public owner;
    uint256 public totalShares;
    uint256 public proposalCounter;
    uint256 public funds;

    mapping(address => Shareholder) public shareholders;
    mapping(uint256 => Proposal) public proposals;

    event ProposalCreated(
        uint256 proposalId,
        string description,
        address beneficiary,
        uint256 amount
    );
    event ProposalExecuted(uint256 proposalId, address beneficiary, uint256 amount);
    event ProposalDisputed(uint256 proposalId);
    event FundsDeposited(address from, uint256 amount);
    event StakeSlashed(uint256 proposalId, address beneficiary);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the organization owner");
        _;
    }

    modifier onlyShareholder() {
        require(shareholders[msg.sender].shares > 0, "Not a shareholder");
        _;
    }

    constructor(
        string memory _name,
        uint256 _sharePrice,
        address _owner
    ) {
        name = _name;
        sharePrice = _sharePrice;
        owner = _owner;
    }

    // Function to allow shareholders to deposit funds
    function depositFunds() external payable {
        funds += msg.value;
        emit FundsDeposited(msg.sender, msg.value);
    }

    // Function to create a new proposal
    function createProposal(
        string memory description,
        address beneficiary,
        uint256 amount
    ) external onlyShareholder {
        require(amount <= funds, "Insufficient funds");

        Proposal storage proposal = proposals[proposalCounter++];
        proposal.proposalId = proposalCounter;
        proposal.description = description;
        proposal.beneficiary = beneficiary;
        proposal.amount = amount;

        emit ProposalCreated(proposalCounter, description, beneficiary, amount);
    }

    // Function to vote on a proposal
    function voteOnProposal(uint256 proposalId, bool support) external onlyShareholder {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.voted[msg.sender], "Already voted");

        proposal.voted[msg.sender] = true;

        if (support) {
            proposal.votesFor += shareholders[msg.sender].shares;
        } else {
            proposal.votesAgainst += shareholders[msg.sender].shares;
        }
    }

    // Function to execute a proposal if votes exceed half of total shareholders
    function executeProposal(uint256 proposalId) external onlyOwner {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");
        require(proposal.votesFor > totalShares / 2, "Insufficient votes");

        proposal.executed = true;
        funds -= proposal.amount;
        payable(proposal.beneficiary).transfer(proposal.amount);

        emit ProposalExecuted(proposalId, proposal.beneficiary, proposal.amount);
    }

    // Function to raise a dispute on a proposal
    function raiseDispute(uint256 proposalId) external onlyShareholder {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.disputed, "Proposal already disputed");

        proposal.disputed = true;
        emit ProposalDisputed(proposalId);
    }

    // Function to vote on a dispute
    function voteOnDispute(uint256 proposalId, bool support) external onlyShareholder {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.disputed, "No dispute raised");
        require(!proposal.disputeVoted[msg.sender], "Already voted on dispute");

        proposal.disputeVoted[msg.sender] = true;

        if (support) {
            proposal.disputeVotesFor += shareholders[msg.sender].shares;
        } else {
            proposal.disputeVotesAgainst += shareholders[msg.sender].shares;
        }
    }

    // Function to resolve dispute and slash the beneficiary's stake
    function resolveDispute(uint256 proposalId) external onlyOwner {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.disputed, "No dispute raised");

        if (proposal.disputeVotesFor > totalShares / 2) {
            uint256 slashAmount = proposal.amount;
            proposal.amount = 0;
            funds += slashAmount;

            emit StakeSlashed(proposalId, proposal.beneficiary);
        }
    }
}

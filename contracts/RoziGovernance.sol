// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RoziGovernance is Ownable, Pausable, ReentrancyGuard {
    IERC20 public roziToken;

    struct Proposal {
        uint256 id;
        address creator;
        string title;
        string description;
        uint256 startTime;
        uint256 endTime;
        uint256 forVotes;
        uint256 againstVotes;
        bool executed;
        mapping(address => bool) hasVoted;
    }

    struct ProposalView {
        uint256 id;
        address creator;
        string title;
        string description;
        uint256 startTime;
        uint256 endTime;
        uint256 forVotes;
        uint256 againstVotes;
        bool executed;
    }

    // State variables
    uint256 public proposalCount;
    uint256 public minTokensToPropose; // Minimum tokens needed to create proposal
    uint256 public votingPeriod; // Duration of voting in seconds
    uint256 public quorum; // Minimum votes needed (percentage)

    mapping(uint256 => Proposal) public proposals;

    // Events
    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed creator,
        string title,
        uint256 startTime,
        uint256 endTime
    );

    event Voted(
        uint256 indexed proposalId,
        address indexed voter,
        bool support,
        uint256 weight
    );

    event ProposalExecuted(uint256 indexed proposalId);
    event MinTokensToProposalUpdated(uint256 newAmount);
    event VotingPeriodUpdated(uint256 newPeriod);
    event QuorumUpdated(uint256 newQuorum);

    constructor(
        address _roziToken,
        uint256 _minTokensToPropose,
        uint256 _votingPeriod,
        uint256 _quorum
    ) Ownable(msg.sender) {
        require(_roziToken != address(0), "Invalid token address");
        require(_quorum <= 100, "Quorum > 100%");

        roziToken = IERC20(_roziToken);
        minTokensToPropose = _minTokensToPropose;
        votingPeriod = _votingPeriod;
        quorum = _quorum;
    }

    function createProposal(
        string calldata _title,
        string calldata _description
    ) external whenNotPaused nonReentrant {
        require(
            roziToken.balanceOf(msg.sender) >= minTokensToPropose,
            "Insufficient tokens to propose"
        );
        require(bytes(_title).length > 0, "Empty title");
        require(bytes(_description).length > 0, "Empty description");

        uint256 proposalId = proposalCount++;
        Proposal storage proposal = proposals[proposalId];

        proposal.id = proposalId;
        proposal.creator = msg.sender;
        proposal.title = _title;
        proposal.description = _description;
        proposal.startTime = block.timestamp;
        proposal.endTime = block.timestamp + votingPeriod;
        proposal.forVotes = 0;
        proposal.againstVotes = 0;
        proposal.executed = false;

        emit ProposalCreated(
            proposalId,
            msg.sender,
            _title,
            block.timestamp,
            proposal.endTime
        );
    }

    function vote(
        uint256 _proposalId,
        bool _support
    ) external whenNotPaused nonReentrant {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp <= proposal.endTime, "Voting ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");

        uint256 voterTokens = roziToken.balanceOf(msg.sender);
        require(voterTokens > 0, "No voting power");

        proposal.hasVoted[msg.sender] = true;

        if (_support) {
            proposal.forVotes += voterTokens;
        } else {
            proposal.againstVotes += voterTokens;
        }

        emit Voted(_proposalId, msg.sender, _support, voterTokens);
    }

    function executeProposal(
        uint256 _proposalId
    ) external whenNotPaused nonReentrant {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp > proposal.endTime, "Voting not ended");
        require(!proposal.executed, "Already executed");

        uint256 totalVotes = proposal.forVotes + proposal.againstVotes;
        uint256 totalSupply = roziToken.totalSupply();

        require(
            (totalVotes * 100) / totalSupply >= quorum,
            "Quorum not reached"
        );

        proposal.executed = true;

        emit ProposalExecuted(_proposalId);
    }

    // View functions
    function getProposal(
        uint256 _proposalId
    ) external view returns (ProposalView memory) {
        Proposal storage proposal = proposals[_proposalId];
        return
            ProposalView({
                id: proposal.id,
                creator: proposal.creator,
                title: proposal.title,
                description: proposal.description,
                startTime: proposal.startTime,
                endTime: proposal.endTime,
                forVotes: proposal.forVotes,
                againstVotes: proposal.againstVotes,
                executed: proposal.executed
            });
    }

    function hasVoted(
        uint256 _proposalId,
        address _voter
    ) external view returns (bool) {
        return proposals[_proposalId].hasVoted[_voter];
    }

    // Admin functions
    function updateMinTokensToPropose(uint256 _newAmount) external onlyOwner {
        minTokensToPropose = _newAmount;
        emit MinTokensToProposalUpdated(_newAmount);
    }

    function updateVotingPeriod(uint256 _newPeriod) external onlyOwner {
        votingPeriod = _newPeriod;
        emit VotingPeriodUpdated(_newPeriod);
    }

    function updateQuorum(uint256 _newQuorum) external onlyOwner {
        require(_newQuorum <= 100, "Quorum > 100%");
        quorum = _newQuorum;
        emit QuorumUpdated(_newQuorum);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}

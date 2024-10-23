// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IRoziWorker {
    function registeredWorkers(address worker) external view returns (bool);
    function updateWorkerStats(address worker, uint256 earnings) external;
}

contract RoziGigMarketplace is Ownable, Pausable, ReentrancyGuard {
    IERC20 public roziToken;
    IRoziWorker public roziWorker;

    struct Gig {
        uint256 id;
        address payable worker;
        string title;
        string description;
        string[] skills;
        uint256 price;
        uint256 duration;
        bool isActive;
        address client;
        GigStatus status;
        uint256 createdAt;
        uint256 startedAt;
        uint256 completedAt;
    }

    enum GigStatus {
        Created,
        Booked,
        Started,
        Completed,
        Cancelled,
        Disputed
    }

    struct Review {
        address reviewer;
        uint256 rating;
        string comment;
        uint256 timestamp;
    }

    uint256 public gigCount;
    uint256 public platformFee = 500; // 5% = 500 basis points
    address public feeCollector;
    uint256 public minGigPrice = 0.01 ether;

    mapping(uint256 => Gig) public gigs;
    mapping(uint256 => Review) public gigReviews;
    mapping(address => uint256[]) public workerGigs;
    mapping(address => uint256[]) public clientGigs;

    event GigCreated(
        uint256 indexed gigId,
        address indexed worker,
        string title,
        uint256 price
    );

    event GigBooked(
        uint256 indexed gigId,
        address indexed client,
        address indexed worker,
        uint256 price
    );

    event GigStarted(uint256 indexed gigId);
    event GigCompleted(uint256 indexed gigId);
    event GigCancelled(uint256 indexed gigId);
    event ReviewAdded(
        uint256 indexed gigId,
        address indexed reviewer,
        uint256 rating
    );
    event PaymentReleased(
        uint256 indexed gigId,
        address indexed worker,
        uint256 amount
    );

    constructor(
        address _roziToken,
        address _roziWorker,
        address _feeCollector
    ) Ownable(msg.sender) {
        require(_roziToken != address(0), "Invalid token address");
        require(_roziWorker != address(0), "Invalid worker address");
        require(_feeCollector != address(0), "Invalid fee collector address");

        roziToken = IERC20(_roziToken);
        roziWorker = IRoziWorker(_roziWorker);
        feeCollector = _feeCollector;
    }

    function createGig(
        string memory _title,
        string memory _description,
        string[] memory _skills,
        uint256 _price,
        uint256 _duration
    ) external whenNotPaused nonReentrant returns (uint256) {
        require(
            roziWorker.registeredWorkers(msg.sender),
            "Not a registered worker"
        );
        require(bytes(_title).length > 0, "Empty title");
        require(bytes(_description).length > 0, "Empty description");
        require(_skills.length > 0, "No skills provided");
        require(_price >= minGigPrice, "Price too low");
        require(_duration > 0, "Invalid duration");

        uint256 gigId = gigCount++;

        Gig storage newGig = gigs[gigId];
        newGig.id = gigId;
        newGig.worker = payable(msg.sender);
        newGig.title = _title;
        newGig.description = _description;
        newGig.skills = _skills;
        newGig.price = _price;
        newGig.duration = _duration;
        newGig.isActive = true;
        newGig.status = GigStatus.Created;
        newGig.createdAt = block.timestamp;

        workerGigs[msg.sender].push(gigId);

        emit GigCreated(gigId, msg.sender, _title, _price);
        return gigId;
    }

    function bookGig(
        uint256 _gigId
    ) external payable whenNotPaused nonReentrant {
        Gig storage gig = gigs[_gigId];
        require(gig.isActive, "Gig not active");
        require(gig.status == GigStatus.Created, "Gig not available");
        require(msg.sender != gig.worker, "Cannot book own gig");
        require(msg.value == gig.price, "Incorrect payment");

        gig.client = msg.sender;
        gig.status = GigStatus.Booked;
        gig.startedAt = block.timestamp;

        clientGigs[msg.sender].push(_gigId);

        emit GigBooked(_gigId, msg.sender, gig.worker, gig.price);
    }

    function startGig(uint256 _gigId) external whenNotPaused {
        Gig storage gig = gigs[_gigId];
        require(msg.sender == gig.worker, "Not the worker");
        require(gig.status == GigStatus.Booked, "Gig not booked");

        gig.status = GigStatus.Started;
        emit GigStarted(_gigId);
    }

    function completeGig(uint256 _gigId) external whenNotPaused nonReentrant {
        Gig storage gig = gigs[_gigId];
        require(msg.sender == gig.client, "Not the client");
        require(gig.status == GigStatus.Started, "Gig not started");

        gig.status = GigStatus.Completed;
        gig.completedAt = block.timestamp;

        uint256 platformFeeAmount = (gig.price * platformFee) / 10000;
        uint256 workerPayment = gig.price - platformFeeAmount;

        (bool feeSuccess, ) = payable(feeCollector).call{
            value: platformFeeAmount
        }("");
        require(feeSuccess, "Fee transfer failed");

        (bool workerSuccess, ) = gig.worker.call{value: workerPayment}("");
        require(workerSuccess, "Worker payment failed");

        roziWorker.updateWorkerStats(gig.worker, workerPayment);

        emit GigCompleted(_gigId);
        emit PaymentReleased(_gigId, gig.worker, workerPayment);
    }

    function cancelGig(uint256 _gigId) external whenNotPaused nonReentrant {
        Gig storage gig = gigs[_gigId];
        require(
            msg.sender == gig.worker || msg.sender == gig.client,
            "Not authorized"
        );
        require(
            gig.status == GigStatus.Created || gig.status == GigStatus.Booked,
            "Cannot cancel"
        );

        if (gig.status == GigStatus.Booked) {
            (bool success, ) = payable(gig.client).call{value: gig.price}("");
            require(success, "Refund failed");
        }

        gig.status = GigStatus.Cancelled;
        gig.isActive = false;

        emit GigCancelled(_gigId);
    }

    function addReview(
        uint256 _gigId,
        uint256 _rating,
        string calldata _comment
    ) external whenNotPaused {
        require(_rating >= 1 && _rating <= 5, "Invalid rating");
        Gig storage gig = gigs[_gigId];
        require(msg.sender == gig.client, "Not the client");
        require(gig.status == GigStatus.Completed, "Gig not completed");

        gigReviews[_gigId] = Review({
            reviewer: msg.sender,
            rating: _rating,
            comment: _comment,
            timestamp: block.timestamp
        });

        emit ReviewAdded(_gigId, msg.sender, _rating);
    }

    function getGig(
        uint256 _gigId
    )
        external
        view
        returns (
            address worker,
            string memory title,
            string memory description,
            string[] memory skills,
            uint256 price,
            uint256 duration,
            bool isActive,
            address client,
            GigStatus status,
            uint256 createdAt,
            uint256 startedAt,
            uint256 completedAt
        )
    {
        Gig storage gig = gigs[_gigId];
        return (
            gig.worker,
            gig.title,
            gig.description,
            gig.skills,
            gig.price,
            gig.duration,
            gig.isActive,
            gig.client,
            gig.status,
            gig.createdAt,
            gig.startedAt,
            gig.completedAt
        );
    }

    function getWorkerGigs(
        address _worker
    ) external view returns (uint256[] memory) {
        return workerGigs[_worker];
    }

    function getClientGigs(
        address _client
    ) external view returns (uint256[] memory) {
        return clientGigs[_client];
    }

    function updatePlatformFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 1000, "Fee too high"); // Max 10%
        platformFee = _newFee;
    }

    function updateFeeCollector(address _newCollector) external onlyOwner {
        require(_newCollector != address(0), "Invalid address");
        feeCollector = _newCollector;
    }

    function updateMinGigPrice(uint256 _newPrice) external onlyOwner {
        minGigPrice = _newPrice;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    receive() external payable {}
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoziToken is ERC20, ERC20Burnable, Pausable, Ownable {
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10 ** 18;

    // Token distribution
    uint256 public constant COMMUNITY_POOL = (MAX_SUPPLY * 25) / 100;
    uint256 public constant WORKER_POOL = (MAX_SUPPLY * 50) / 100;
    uint256 public constant RESERVE_POOL = (MAX_SUPPLY * 25) / 100;

    uint256 public totalMinted;

    event TokensLocked(address indexed account, uint256 amount);
    event TokensUnlocked(address indexed account, uint256 amount);

    constructor() ERC20("Rozi Token", "ROZI") Ownable(msg.sender) {
        // Mint initial distribution
        _mint(msg.sender, COMMUNITY_POOL);
        totalMinted = COMMUNITY_POOL;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalMinted + amount <= MAX_SUPPLY, "Exceeds max supply");
        totalMinted += amount;
        _mint(to, amount);
    }

    // Pause functions
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}

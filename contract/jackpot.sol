// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract BullrunJackpot {
    using SafeERC20 for IERC20;

    struct Round {
        address winner;
        uint256 ticketCount;
        uint256 potAmount;
    }

    Round[] public rounds;

    // Cuts in %
    uint256 public constant POT_CUT = 95;
    uint256 public ticketPrice = 25_000 ether;

    // Contract owner
    address public owner;

    address public resetManager;
    // Is contract paused
    bool public paused;

    IERC20 public immutable bullrun;
    address[] public dailyBuyers;
    mapping(address => uint256) public dailyBuyerTickets;
    uint256 public roundDuration = 24 hours;
    uint256 public nextRound = block.timestamp + roundDuration;
    uint256 public dailyPot = 0;

    constructor(address _bullrun, address _resetManager) {
        owner = msg.sender;
        paused = false;
        bullrun = IERC20(_bullrun);
        resetManager = _resetManager;
    }

    modifier onlyResetManager() {
        require(msg.sender == resetManager, "not reset manager");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not authorized");
        _;
    }

    modifier notPaused() {
        require(paused == false, "paused");
        _;
    }

    function withdrawbullrun() external onlyOwner {
        bullrun.transfer(msg.sender, bullrun.balanceOf(address(this)));
    }

    function setManager(address _resetManager) external onlyOwner {
        resetManager = _resetManager;
    }

    function togglePause() external onlyOwner {
        paused = !paused;
    }

    function setTicketPrice(uint256 price) external onlyOwner {
        ticketPrice = price;
    }

    function setRoundDuration(uint256 duration) external onlyOwner {
        roundDuration = duration;
    }

    function buyTickets(uint256 count) external {
        require(
            count * ticketPrice <= bullrun.balanceOf(msg.sender),
            "incorrect value"
        );
        bullrun.safeTransferFrom(msg.sender, address(this), count * ticketPrice);
        dailyBuyerTickets[msg.sender] += count;
        for (uint256 i = 0; i < count; i++) {
            dailyBuyers.push(msg.sender);
        }
        dailyPot += ((count * ticketPrice) * POT_CUT / 100);
    }

    function resetRound() external onlyResetManager {
        uint256 randomNumber = random();

        rounds.push(
            Round(
                dailyBuyers[randomNumber],
                dailyBuyerTickets[dailyBuyers[randomNumber]],
                dailyPot
            )
        );

        bullrun.transfer(dailyBuyers[randomNumber], dailyPot);
        bullrun.transfer(owner, bullrun.balanceOf(address(this)));

        for (uint256 i = 0; i < dailyBuyers.length; i++) {
            delete dailyBuyerTickets[dailyBuyers[i]];
        }
        delete dailyBuyers;
        nextRound = block.timestamp + roundDuration;
        dailyPot = 0;
    }

    function ticketsForBuyer(address buyer) external view returns (uint256) {
        return dailyBuyerTickets[buyer];
    }

    function totalPaid() external view returns (uint256) {
        uint256 total;
        for (uint256 i = 0; i < rounds.length; i++) {
            total += rounds[i].potAmount;
        }
        return total;
    }

    function random() private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.prevrandao,
                        block.timestamp,
                        dailyBuyers.length
                    )
                )
            ) % dailyBuyers.length;
    }

    function getPreviousRoundStats()
        external
        view
        returns (
            address winner,
            uint256 ticketCount,
            uint256 potAmount
        )
    {
        if (rounds.length > 0) {
            winner = rounds[rounds.length - 1].winner;
            ticketCount = rounds[rounds.length - 1].ticketCount;
            potAmount = rounds[rounds.length - 1].potAmount;
        }
    }
}
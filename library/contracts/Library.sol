// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * TODO:
 * Remove for loops
 * Add configuration for deployment on Goerli. Note and save your deployed contract address.
 * Create Hardhat tasks for deployment
 * Try to hit 100% coverage for your Smart Contract
 * Create subtasks for printing valuable info after deployment
 * Add to the deployment tasks subtasks for Etherscan verification of the contracts
 */
contract Library is Ownable {

    event AddedBook(string title, uint copies);

    struct Book {
        string name;
    }

    mapping (uint => uint) public availableCopies;
    mapping (uint => address[]) private borrowings;
    Book[] public books;

    modifier onlyAvailable(uint _id) {
        require(isAvaliable(_id));
        _;
    }

    function addBook(string memory _name, uint _number) external onlyOwner {
        require(_number > 0, "More than 1 copies please");
        uint id = books.length;
        books.push(Book(_name));
        availableCopies[id] = _number;
        emit AddedBook(_name, _number);
    }

    function getBooks() external view returns (Book[] memory) {
        return books;
    }

    function isAvaliable(uint _id) public view returns (bool) {
        return (availableCopies[_id] > 0);
    }

    function borrow(uint _id) external onlyAvailable(_id) {
        require(isAvaliable(_id), "Not available");
        require(!isAlreadyBorrowed(_id), "Already borrowed");

        availableCopies[_id]--;
        borrowings[_id].push(msg.sender);
    }

    function returnBook(uint _bookId) external {
        require(isAlreadyBorrowed(_bookId), "Cannot return unborrowed book");
        availableCopies[_bookId]++;
        // todo: delete from array without gap
    }

    function isAlreadyBorrowed(uint _bookId) public view returns (bool) {
        for (uint index = 0; index < borrowings[_bookId].length; index++) {
            if (borrowings[_bookId][index] == msg.sender) {
                return true;
            }
        }

        return false;
    }

    function getBorrowings(uint _id) external view returns (address[] memory) {
        return borrowings[_id];
    }

}
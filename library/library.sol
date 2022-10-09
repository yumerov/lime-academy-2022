pragma solidity >=0.8.0 <0.9.0;

/**
* @title Ownable
* @dev The Ownable contract has an owner address, and provides basic authorization control
* functions, this simplifies the implementation of "user permissions".
*/
contract Ownable {
  address private _owner;

  constructor() {
    _owner = msg.sender;
  }

  function owner() internal view returns(address) {
    return _owner;
  }

  modifier onlyOwner() {
    require(isOwner());
    _;
  }

  function isOwner() internal view returns(bool) {
    return msg.sender == _owner;
  }
}


/**
 * The administrator (owner) of the library should be able to add new books and the number of copies in the library. - done
 * Users should be able to see the available books and borrow them by their id. - done
 * Users should be able to return books.
 * A user should not borrow more than one copy of a book at a time. The users should not be able to borrow a book more times than the copies in the libraries unless copy is returned.
 * Everyone should be able to see the addresses of all people that have ever borrowed a given book.
 *
 * todo: type optimization
 * todo: better public interface
 */
contract Library is Ownable {

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
        availableCopies[_id]++;
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
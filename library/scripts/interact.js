const hre = require('hardhat');
const library = require('../artifacts/contracts/Library.sol/Library.json');
const URL = "http://localhost:7545";
const OWNER_KEY = "6750857f2ae077d2a46fe672a7549732b29c61e0d4689f73754aa1b22380ad55";
const CONTRACT_ADDRESS = "0x2771a0af92F2e70bd638112Cf36912e0f3501082"

/**
 * 
 * @param {{wait: Function}} transaciton
 * @param {string} label
 * @returns 
 */
async function waitForTransaction (transaciton, label) {
    console.log(label, transaciton);
    const transactionReceipt = await transaciton.wait();
    if (transactionReceipt.status === 1) {
        return;
    }

    throw new Error(label + " transaction was not successful");
}

(async () => {
    const provider = new hre.ethers.providers.JsonRpcProvider(URL)
    const wallet = new hre.ethers.Wallet(OWNER_KEY, provider);
    /**
     * @type {{addBook:Function, isAvaliable: Function, borrow: Function, returnBook: Function}}
     */
    const libraryContract = new hre.ethers.Contract(CONTRACT_ADDRESS, library.abi, wallet);
    const bookId = 0;

    const addBookTransaction = await libraryContract.addBook('Test book', 1);
    waitForTransaction(addBookTransaction, "addBook");

    console.log('[after addBook] isAvaliable', await libraryContract.isAvaliable(bookId));

    const borrowBookTransaction = await libraryContract.borrow(bookId);
    waitForTransaction(borrowBookTransaction, "borrow");

    console.log('[after borrow] isAvaliable', await libraryContract.isAvaliable(bookId));

    const returnBookTransaction = await libraryContract.returnBook(bookId);
    waitForTransaction(returnBookTransaction, "returnBook");

    console.log('[after returnBook] isAvaliable', await libraryContract.isAvaliable(bookId));
})()
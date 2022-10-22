const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('Library', function () {
    let libraryFactory;
    let library;
    let owner;
    let addr1;

    before(async () => {
        libraryFactory = await ethers.getContractFactory("Library");
        library = await libraryFactory.deploy();
        await library.deployed();
        [owner, addr1] = await ethers.getSigners();
    });

    describe('Add a book', () => {
        it('Non owner should not be able to add a book', async function () {
            await expect(library.connect(addr1).addBook('Book', 2))
                .to.be
                .revertedWith('Ownable: caller is not the owner');
        });

        it('A book with 0(zero) copies should not be added', async function () {
            await expect(library.connect(owner).addBook('Book', 0))
                .to.be
                .revertedWith('More than 1 copies please');
        });

        it ('An owner should be able to add a book with more than 0 copies', async () => {
            const title = 'Solidity 101';
            const copies = 2;

            expect(await library.connect(owner).addBook(title, copies))
                .to.emit(library, 'AddedBook')
                .withArgs(title, copies);
            expect(await library.getBooks()).to.have.length(1);
            expect(await library.books(0)).to.equal(title);
            expect(await library.availableCopies(0)).to.equal(copies);
        });
    });
});
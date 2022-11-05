const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TimeLock", function () {

    describe("Attack", function () {
        it("The target contract should not allow over- and underflow attacks", async () => {
            const [owner] = await ethers.getSigners();

            const TimeLock = await ethers.getContractFactory("TimeLock");
            const timeLock = await TimeLock.deploy();
            await timeLock.deployed();

            const Attack = await ethers.getContractFactory("Attack");
            const attack = await Attack.deploy(timeLock.address);
            await attack.deployed();

            await timeLock.deposit({
                value: ethers.utils.parseEther("1.0")
            });

            await expect(timeLock.withdraw())
                .to
                .be
                .revertedWith('Lock time not expired');

            await expect(attack.attack({
                value: ethers.utils.parseEther("1.0")
            }))
                .to
                .be
                .revertedWith('Cannot overflow');
        });

    });
});

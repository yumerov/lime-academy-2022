const hre = require('hardhat')
const ethers = hre.ethers;

async function deployElectionContract() {
    await hre.run('compile');
    const [deployer] = await ethers.getSigners();

    console.log('Deploying contracts with the account:', deployer.address);
    console.log('Account balance:', (await deployer.getBalance()).toString());

    const Library = await ethers.getContractFactory("Library"); 
    const libraryContract = await Library.deploy();
    console.log('Waiting for Library deployment...');
    await libraryContract.deployed();

    console.log('Library Contract address: ', libraryContract.address);
    console.log('Done!');
}

module.exports = deployElectionContract;
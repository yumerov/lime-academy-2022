const hre = require('hardhat')
const ethers = hre.ethers;

(async function run () {
    const provider = new hre.ethers.providers.JsonRpcProvider("http://localhost:7545")
    const latestBlock = await provider.getBlock("latest")
    console.log(latestBlock)
})()
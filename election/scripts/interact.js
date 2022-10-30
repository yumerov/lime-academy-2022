const hre = require('hardhat');
const USElection = require('../artifacts/contracts/USElection.sol/USElection.json');

(async function run () {
    const provider = new hre.ethers.providers.JsonRpcProvider("http://localhost:7545")
    const wallet = new hre.ethers.Wallet("6750857f2ae077d2a46fe672a7549732b29c61e0d4689f73754aa1b22380ad55", provider);
    const contractAddress = "0x094D4269ba54ea7344687DbAbeBD62109CB04Ca7"
    const electionContract = new hre.ethers.Contract(contractAddress, USElection.abi, wallet);

    const hasEnded = await electionContract.electionEnded();
    console.log("The election has ended:", hasEnded);

    const haveResultsForOhio = await electionContract.resultsSubmitted("Ohio");
    console.log("Have results for Ohio:", haveResultsForOhio);

    const transactionOhio = await electionContract.submitStateResult(["Ohio", 250, 150, 24]);
    const transactionReceipt = await transactionOhio.wait();
    if (transactionReceipt.status != 1) {
        console.log("Transaction was not successful")
        return
    }

    const resultsSubmittedOhioNew = await electionContract.resultsSubmitted("Ohio")
    console.log("Results submitted for Ohio", resultsSubmittedOhioNew)

    const currentLeader = await electionContract.currentLeader()
    console.log("Current leader", currentLeader)

})()
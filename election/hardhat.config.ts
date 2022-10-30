import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: 'ganache',
  networks: {
    hardhat: {},
    ganache: {
      url: 'http://localhost:7545',
      accounts: ['6750857f2ae077d2a46fe672a7549732b29c61e0d4689f73754aa1b22380ad55']
    }
  }
};

task("deploy-testnets", "Deploys contract on a provided network")
  .setAction(async () => {
    const deployElectionContract = require("./scripts/deploy");
    await deployElectionContract();
  });

task("deploy-mainnet", "Deploys contract on a provided network")
  .addParam("privateKey", "Please provide the private key")
  .setAction(async ({ privateKey }) => {
    const deployElectionContract = require("./scripts/deploy-with-param");
    await deployElectionContract(privateKey);
  });

export default config;

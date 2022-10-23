import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config({ path: __dirname + '/.env' })

const GOERLI_RPC_URL: string = process.env.GOERLI_RPC_URL
const GOERLI_PRIVATE_KEY: string = process.env.GOERLI_PRIVATE_KEY

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [GOERLI_PRIVATE_KEY],
      chainId: 5
    }
  },
};

task("deploy", "Deploys contract on the local network")
  .setAction(async () => {
    const deployElectionContract = require("./scripts/deploy");
    await deployElectionContract();
  });

task("deploy-on-testnet", "Deploys contract on a test network")
  .setAction(async () => {
    console.log(GOERLI_RPC_URL, GOERLI_PRIVATE_KEY);
    // const deployElectionContract = require("./scripts/deploy");
    // await deployElectionContract();
  });

export default config;

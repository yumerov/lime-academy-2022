import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { string } from "hardhat/internal/core/params/argumentTypes";
require('dotenv').config({ path: __dirname + '/.env' })

const ALCHEMY_API_KEY: string = process.env.ALCHEMY_API_KEY;
const ALCHEMY_RPC_URL: string = process.env.ALCHEMY_RPC_URL;
const GOERLI_PRIVATE_KEY: string = process.env.GOERLI_PRIVATE_KEY;
const GANACHE_PRIVATE_KEY: string = process.env.GANACHE_PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "ganache",
  networks: {
    hardhat: {},
    ganache: {
      url: `http://localhost:7545`,
      accounts: [GANACHE_PRIVATE_KEY],
    },
    goerli: {
      url: `${ALCHEMY_RPC_URL}/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
      chainId: 5
    }
  },
};

task("deploy", "Deploys contract on the local network")
  .setAction(async () => {
    const deployContract = require("./scripts/deploy");
    await deployContract();
  });

export default config;

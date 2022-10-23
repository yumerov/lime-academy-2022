import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config({ path: __dirname + '/.env' })

const ALCHEMY_API_KEY: string = process.env.ALCHEMY_API_KEY;
const ALCHEMY_RPC_URL: string = process.env.ALCHEMY_RPC_URL;
const GOERLI_PRIVATE_KEY: string = process.env.GOERLI_PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
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

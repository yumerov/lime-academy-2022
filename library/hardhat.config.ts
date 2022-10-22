import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
};

task("deploy", "Deploys contract on the local network")
  .setAction(async () => {
    const deployElectionContract = require("./scripts/deploy");
    await deployElectionContract();
  });

export default config;

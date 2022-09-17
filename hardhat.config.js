require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");

// const fs = require("fs");
// const privateKey = fs.readFileSync(".secret").toString();
// const projectId = "2Dw5bL9EVcnumMw875Po1Xaj7hF";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // mumbai: {
    //   url: `https://polygon-mainnet.infura.io/v3/${projectId}`,
    //   accounts: [privateKey],
    // },
    // mainnet: {
    //   url: `https://mainnet.infura.io/v3/${projectId}`,
    //   accounts: [privateKey],
    // },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    player: {
      default: 1,
    },
  },
  solidity: "0.8.9",
};

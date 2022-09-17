const { network } = require("hardhat");

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  let args = [["Ciprian", "Alin", "Gabriel", "Marius"]];

  const ballot = await deploy("Ballot", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.waitConfirmations || 1,
  });

  log("--------------------------------------------------");
};

module.exports.tags = ["all", "ballot"];

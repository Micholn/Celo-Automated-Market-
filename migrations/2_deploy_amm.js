const AMMContract = artifacts.require("AMMContract");

module.exports = function (deployer) {
  deployer.deploy(AMMContract);
};

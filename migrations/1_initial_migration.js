// Import the Migrations contract using the artifacts.require method provided by Truffle
var Migrations = artifacts.require("./Migrations.sol");

// Export a function that takes a deployer object
module.exports = function(deployer) {
  // Use the deployer to perform a deployment of the Migrations contract
  deployer.deploy(Migrations);
};

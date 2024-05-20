// Import the DVideo contract using the artifacts.require method provided by Truffle
var DVideo = artifacts.require("DVideo");

// Export a function that takes a deployer object
module.exports = function(deployer) {
  // Use the deployer to perform a deployment of the DVideo contract
  deployer.deploy(DVideo);
};

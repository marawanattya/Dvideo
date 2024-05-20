module.exports = {
   // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  // Truffle configuration object
  networks: {
    // Network configuration for local development
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      networkCheckTimeout: 10000 // Increase timeouts for slower networks
    },

    // Configuration for a private network
    private: {
      provider: () => new HDwalletProvider(MNEMONIC, 'https://network.io'), // HD Wallet provider for private network
      host: "127.0.0.1", // Localhost (should be the same as development)
      port: 7545, // Standard Ethereum port (should be the same as development)
      network_id: 2111, // Custom network ID for private network
      production: true // Treats this network as if it was a public net. (default: false)
    },

    // Configuration for the built-in development blockchain
    develop: {
      port: 7545 // Port number to listen on (default: 9545)
    }
  },
  
  // Mocha testing framework configuration
  mocha: {
    timeout: 100000 // Test timeout in milliseconds (default: 2000)
  },

  // Compiler configuration
  compilers: {
    solc: {
      version: "^0.8.13", // Fetch exact version from solc-bin (default: truffle's version)
      docker: false, // Use a version obtained through Docker (default: false)
      settings: {
        optimizer: {
          enabled: false, // Enable solc optimizer (default: false)
          runs: 200 // Optimize for how many times you intend to run the code
        },
        evmVersion: "istanbul" // Select desired EVM version (default: "petersburg")
      }
    }
  }
};

import Web3 from 'web3';

// Define a function to initialize Web3
const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for the window to load to ensure Ethereum provider is available
    window.addEventListener('load', async () => {
      // Check if the browser has an Ethereum provider (MetaMask)
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          // Resolve the promise with the Web3 instance
          resolve(web3);
        } catch (error) {
          // Reject the promise if there's an error
          reject(error);
        }
      } 
      // Check if Web3 has been injected by an older dapp browser (Mist/MetaMask)
      else if (window.web3) {
        const web3 = window.web3;
        // Resolve the promise with the Web3 instance
        resolve(web3);
      } 
      // Fallback to local node / hosted node + Infura if no Ethereum provider
      else {
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        const web3 = new Web3(provider);
        // Resolve the promise with the Web3 instance
        resolve(web3);
      }
    });
  });

export default getWeb3; // Export the function for use in other files

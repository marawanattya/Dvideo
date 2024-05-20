import React, { useState } from 'react'; // Import React and useState hook
import Web3 from 'web3'; // Import Web3 library

const Login = ({ setAccount, setWeb3 }) => {
  const [error, setError] = useState(''); // State variable for error messages

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum); // Create a new Web3 instance
        await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access
        const accounts = await web3.eth.getAccounts(); // Get the user's accounts
        setAccount(accounts[0]); // Set the first account as active account
        setWeb3(web3); // Set the Web3 instance
      } catch (err) {
        setError('Failed to connect wallet.'); // Handle errors
      }
    } else {
      setError('Install MetaMask.'); // Handle missing Ethereum provider
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button> {/* Button to trigger wallet connection */}
      {error && <p>{error}</p>} {/* Display error messages if any */}
    </div>
  );
};

export default Login;

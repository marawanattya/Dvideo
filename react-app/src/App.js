import React, { useState, useEffect } from 'react'; // Import React and hooks
import getWeb3 from './utils/getWeb3'; // Import the getWeb3 function
import { contractABI, contractAddress } from './constant/constant'; // Import contract ABI and address
import Login from './components/Login'; // Import Login component

function App() {
  const [web3, setWeb3] = useState(null); // Initialize state to store Web3 instance
  const [contract, setContract] = useState(null); // Initialize state to store contract instance
  const [account, setAccount] = useState(null); // Initialize state to store the user's account
  const [loading, setLoading] = useState(true); // Initialize state to manage loading status
  const [message, setMessage] = useState(''); // Initialize state to store contract message

  useEffect(() => {
    if (web3 && account) { // Check if web3 and account are set
      const initContract = async () => {
        try {
          // Load the contract
          const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
          setContract(contractInstance);

          // Fetch an example message from the contract (assuming the contract has a 'message' method)
          const message = await contractInstance.methods.message().call();
          setMessage(message);
        } catch (error) {
          console.error('Failed to load contract or message', error);
        } finally {
          setLoading(false); // Update loading state
        }
      };

      initContract();
    } else {
      setLoading(false); // Update loading state if web3 or account is not set
    }
  }, [web3, account]); // Add web3 and account as dependencies

  const setNewMessage = async () => {
    if (contract && account) {
      try {
        await contract.methods.setMessage('Hello, Ethereum!').send({ from: account });
        const newMessage = await contract.methods.message().call();
        setMessage(newMessage);
      } catch (error) {
        console.error('Failed to set new message', error);
      }
    }
  };

  return (
    <div>
      {loading ? (
        <div>Loading Web3...</div>
      ) : (
        web3 ? (
          <div>
            <div>Web3 is loaded and ready!</div>
            <div>Connected Account: {account}</div>
            <div>Message from Contract: {message}</div>
            <button onClick={setNewMessage}>Set New Message</button>
          </div>
        ) : (
          <div>
            <Login setAccount={setAccount} setWeb3={setWeb3} />
            <div>Failed to load Web3.</div>
          </div>
        )
      )}
    </div>
  );
}

export default App;

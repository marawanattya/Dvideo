import React, { useState, useEffect } from 'react'; // Import React and hooks
import getWeb3 from '../utils/getWeb3'; // Import utility to get Web3 instance
import VideoList from '../components/VideoList'; // Import VideoList component
import UploadVideo from '../components/UploadVideo'; // Import UploadVideo component
import Login from '../components/Login'; // Import Login component
import { contractAbi, contractAddress } from '../constant/constant'; // Import contract details

// Define the Home component
const Home = () => {
  const [account, setAccount] = useState(null); // State for account
  const [contract, setContract] = useState(null); // State for contract
  const [filterTag, setFilterTag] = useState(''); // State for filter tag

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3(); // Initialize Web3
        const instance = new web3.eth.Contract(contractAbi, contractAddress); // Create contract instance
        setContract(instance);

        const accounts = await web3.eth.getAccounts(); // Get user accounts
        setAccount(accounts[0]); // Set the first account as active account
      } catch (error) {
        console.error('Error initializing web3:', error); // Log any errors
      }
    };

    init();
  }, []); // Run only once on component mount

  if (!account || !contract) { // If no account or contract, show Login component
    return <Login setAccount={setAccount} />;
  }

  return (
    <div>
      <UploadVideo account={account} contract={contract} /> {/* Upload video component */}
      <input
        type="text"
        placeholder="Filter by tag"
        value={filterTag}
        onChange={e => setFilterTag(e.target.value)} // Update filter tag state
      />
      <VideoList contract={contract} account={account} filterTag={filterTag} /> {/* Video list component */}
    </div>
  );
};

export default Home; // Export Home component

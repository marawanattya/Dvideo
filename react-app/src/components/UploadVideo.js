import React, { useState } from 'react'; // Import React and useState hook
import pinFileToIPFS from '../utils/ipfs'; // Import the IPFS utility for pinning files

// Define the UploadVideo component which takes account and contract as props
const UploadVideo = ({ account, contract }) => {
  const [videoFile, setVideoFile] = useState(null); // State for video file
  const [title, setTitle] = useState(''); // State for video title
  const [tags, setTags] = useState(''); // State for video tags

  // Function to handle the video upload process
  const handleUpload = async () => {
    try {
      const response = await pinFileToIPFS(videoFile); // Pin the video file to IPFS
      const videoHash = response.IpfsHash; // Get the IPFS hash of the video

      await contract.methods.uploadVideo(videoHash, title).send({ from: account }); // Upload video details to the contract

      const videoId = await contract.methods.videoCount().call(); // Get the current video count (new video ID)
      await contract.methods.addTags(videoId, tags.split(',')).send({ from: account }); // Add tags to the uploaded video

      alert('Video uploaded successfully!'); // Notify the user of successful upload
    } catch (error) {
      console.error('Error uploading video:', error); // Log any errors
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setVideoFile(e.target.files[0])} /> {/* Input for video file */}
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /> {/* Input for title */}
      <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} /> {/* Input for tags */}
      <button onClick={handleUpload}>Upload Video</button> {/* Button to trigger upload */}
    </div>
  );
};

export default UploadVideo; // Export UploadVideo component

import axios from 'axios';

// Use your Pinata API credentials
const apiKey = '0692282ff94d4b5a5401';
const apiSecret = '1601b25446717051613425b75627152e14092c203ff92dcd39e331b1aca0362f';

const pinFileToIPFS = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  let data = new FormData();
  data.append('file', file);

  const metadata = JSON.stringify({ name: file.name });
  data.append('pinataMetadata', metadata);

  const pinataOptions = JSON.stringify({ cidVersion: 0 });
  data.append('pinataOptions', pinataOptions);

  const res = await axios.post(url, data, {
    maxContentLength: 'Infinity', // this is needed to prevent axios from erroring out with large files
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: apiKey,
      pinata_secret_api_key: apiSecret,
    },
  });

  return res.data;
};

export default pinFileToIPFS;

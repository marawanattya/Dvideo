import React from 'react';
import UserVideos from '../components/UserVideos';

const UserProfile = ({ contract, account }) => {
  return (
    <div>
      <UserVideos contract={contract} account={account} />
    </div>
  );
};

export default UserProfile;
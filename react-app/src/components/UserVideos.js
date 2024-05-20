import React, { useEffect, useState } from 'react';
import VideoItem from './VideoItem';

const UserVideos = ({ contract, account }) => {
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [dislikedVideos, setDislikedVideos] = useState([]);
  const [commentedVideos, setCommentedVideos] = useState([]);
  const [viewedVideos, setViewedVideos] = useState([]);

  useEffect(() => {
    const loadUserVideos = async () => {
      const uploaded = await contract.methods.getUserVideos(account).call();
      setUploadedVideos(uploaded);
      const liked = await contract.methods.getLikedVideos(account).call();
      setLikedVideos(liked);
      const disliked = await contract.methods.getDislikedVideos(account).call();
      setDislikedVideos(disliked);
      const commented = await contract.methods.getCommentedVideos(account).call();
      setCommentedVideos(commented);
      const viewed = await contract.methods.getViewedVideos(account).call();
      setViewedVideos(viewed);
    };

    loadUserVideos();
  }, [contract, account]);

  return (
    <div>
      <h3>Uploaded Videos</h3>
      {uploadedVideos.slice(0, 5).map(video => <VideoItem key={video.id} video={video} />)}
      {uploadedVideos.length > 5 && <button>View More</button>}

      <h3>Liked Videos</h3>
      {likedVideos.slice(0, 5).map(video => <VideoItem key={video.id} video={video} />)}
      {likedVideos.length > 5 && <button>View More</button>}

      <h3>Disliked Videos</h3>
      {dislikedVideos.slice(0, 5).map(video => <VideoItem key={video.id} video={video} />)}
      {dislikedVideos.length > 5 && <button>View More</button>}

      <h3>Commented Videos</h3>
      {commentedVideos.slice(0, 5).map(video => <VideoItem key={video.id} video={video} />)}
      {commentedVideos.length > 5 && <button>View More</button>}

      <h3>Viewed Videos</h3>
      {viewedVideos.slice(0, 5).map(video => <VideoItem key={video.id} video={video} />)}
      {viewedVideos.length > 5 && <button>View More</button>}
    </div>
  );
};

export default UserVideos;

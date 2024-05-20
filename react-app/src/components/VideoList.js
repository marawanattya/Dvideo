import React, { useEffect, useState } from 'react';
import VideoItem from './VideoItem';

const VideoList = ({ contract, account, filterTag }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (!contract) return;

    const loadVideos = async () => {
      try {
        const videoCount = await contract.methods.videoCount().call();
        let loadedVideos = [];
        for (let i = 1; i <= videoCount; i++) {
          const video = await contract.methods.videos(i).call();
          if (!filterTag || video.tags.includes(filterTag)) {
            loadedVideos.push(video);
          }
        }
        setVideos(loadedVideos);
      } catch (error) {
        console.error('Error loading videos:', error);
      }
    };

    loadVideos();
  }, [contract, filterTag]);

  const handleLike = async (id) => {
    await contract.methods.likeVideo(id).send({ from: account });
  };

  const handleDislike = async (id) => {
    await contract.methods.dislikeVideo(id).send({ from: account });
  };

  const handleComment = async (id, comment) => {
    await contract.methods.addComment(id, comment).send({ from: account });
  };

  return (
    <div>
      {videos.map(video => (
        <VideoItem key={video.id} video={video} onLike={handleLike} onDislike={handleDislike} onComment={handleComment} />
      ))}
    </div>
  );
};

export default VideoList;

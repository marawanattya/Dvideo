import React from 'react';

const VideoItem = ({ video, onLike, onDislike, onComment }) => {
  return (
    <div>
      <video src={`https://gateway.pinata.cloud/ipfs/${video.hash}`} controls />
      <h3>{video.title}</h3>
      <p>Uploaded by: {video.author}</p>
      <button onClick={() => onLike(video.id)}>Like</button>
      <button onClick={() => onDislike(video.id)}>Dislike</button>
      <input type="text" placeholder="Add a comment" onKeyPress={e => e.key === 'Enter' && onComment(video.id, e.target.value)} />
    </div>
  );
};

export default VideoItem;
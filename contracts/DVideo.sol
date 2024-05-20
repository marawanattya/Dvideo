// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// Contract declaration for DVideo, a decentralized video platform
contract DVideo {
    // State variable to keep track of the number of videos
    uint public videoCount = 0;
    // Name of the DVideo platform
    string public name = "DVideo";
    // Mapping from video ID to Video struct
    mapping(uint => Video) public videos;
    // Mapping from video ID to view count
    mapping(uint => uint) public videoViews;
    // Mapping from video ID to list of comments
    mapping(uint => string[]) public videoComments;
    // Mapping from video ID to list of tags
    mapping(uint => string[]) public videoTags;
    // Mapping from user address to list of video IDs they've uploaded
    mapping(address => uint[]) public userVideos;
    // Mapping from video ID to like count
    mapping(uint => uint) public videoLikes;
    // Mapping from video ID to dislike count
    mapping(uint => uint) public videoDislikes;
    // Reverse mapping from tags to an array of video IDs
    mapping(string => uint[]) private tagToVideoIDs;
    // Mapping from user address to list of liked video IDs
    mapping(address => uint[]) private userLikedVideos;
    // Mapping from user address to list of disliked video IDs
    mapping(address => uint[]) private userDislikedVideos;
    // Mapping from user address to list of commented video IDs
    mapping(address => uint[]) private userCommentedVideos;
    // Mapping from user address to list of viewed video IDs
    mapping(address => uint[]) private userViewedVideos;

    // Struct to represent a video
    struct Video {
        uint id; // Unique identifier for the video
        string hash; // IPFS hash for the video content
        string title; // Title of the video
        address author; // Address of the video's author
    }

    // Event emitted when a video is uploaded
    event VideoUploaded(
        uint id,
        string hash,
        string title,
        address author
    );

    // Event emitted when a video is updated
    event VideoUpdated(
        uint id,
        string hash,
        string title
    );

    // Event emitted when a video is viewed
    event VideoViewed(
        uint id,
        uint views
    );

    // Event emitted when a comment is added to a video
    event VideoCommented(
        uint id,
        string comment,
        address commenter
    );

    // Event emitted when a video is liked
    event VideoLiked(
        uint id, 
        uint likes    
    );

    // Event emitted when a video is disliked
    event VideoDisliked(
        uint id, 
        uint dislikes
    );

    // Constructor for the contract
    constructor() {
    }

    // Function to upload a video
    function uploadVideo(string memory _videoHash, string memory _title) public {
        // Ensure the video hash and title are not empty
        require(bytes(_videoHash).length > 0);
        require(bytes(_title).length > 0);
        // Ensure the sender is not the zero address
        require(msg.sender != address(0));

        // Increment the video count
        videoCount++;

        // Create a new video struct and add it to the mapping
        videos[videoCount] = Video(videoCount, _videoHash, _title, msg.sender);
        // Add the video ID to the list of videos uploaded by the sender
        userVideos[msg.sender].push(videoCount);

        // Emit the VideoUploaded event
        emit VideoUploaded(videoCount, _videoHash, _title, msg.sender);
    }

    // Function to increment the view count of a video
    function incrementViewCount(uint _videoId) public {
        // Increment the view count for the video
        videoViews[_videoId]++;
        // Add the video ID to the list of viewed videos by the user
        userViewedVideos[msg.sender].push(_videoId);
        // Emit the VideoViewed event
        emit VideoViewed(_videoId, videoViews[_videoId]);
    }

    // Function to add a comment to a video
    function addComment(uint _videoId, string memory _comment) public {
        // Add the comment to the list of comments for the video
        videoComments[_videoId].push(_comment);
        // Add the video ID to the list of commented videos by the user
        userCommentedVideos[msg.sender].push(_videoId);
        // Emit the VideoCommented event
        emit VideoCommented(_videoId, _comment, msg.sender);
    }

    // Function to like a video
    function likeVideo(uint _videoId) public {
        // Increment the like count for the video
        videoLikes[_videoId]++;
        // Add the video ID to the list of liked videos by the user
        userLikedVideos[msg.sender].push(_videoId);
        // Emit the VideoLiked event
        emit VideoLiked(_videoId, videoLikes[_videoId]);
    }

    // Function to dislike a video
    function dislikeVideo(uint _videoId) public {
        // Increment the dislike count for the video
        videoDislikes[_videoId]++;
        // Add the video ID to the list of disliked videos by the user
        userDislikedVideos[msg.sender].push(_videoId);
        // Emit the VideoDisliked event
        emit VideoDisliked(_videoId, videoDislikes[_videoId]);
    }

    // Function to add tags to a video
    function addTags(uint _videoId, string[] memory _tags) public {
        // Ensure the sender is the author of the video
        require(videos[_videoId].author == msg.sender);

        // Add each tag to the list of tags for the video
        for (uint i = 0; i < _tags.length; i++) {
            videoTags[_videoId].push(_tags[i]);
            tagToVideoIDs[_tags[i]].push(_videoId);
        }
    }
    
    // Function to get the tags for a video
    function getVideoTags(uint _videoId) public view returns (string[] memory) {
        // Return the list of tags for the video
        return videoTags[_videoId];
    }

    // Function to get videos for a tag
    function getVideosForTag(string memory _tag) public view returns (uint[] memory) {
        return tagToVideoIDs[_tag];
    }

    // Function to get a user's uploaded videos
    function getUserVideos(address _user) public view returns (uint[] memory) {
        // Return the list of video IDs uploaded by the user
        return userVideos[_user];
    }

    // Function to get a user's liked videos
    function getLikedVideos(address _user) public view returns (uint[] memory) {
        return userLikedVideos[_user];
    }

    // Function to get a user's disliked videos
    function getDislikedVideos(address _user) public view returns (uint[] memory) {
        return userDislikedVideos[_user];
    }

    // Function to get a user's commented videos
    function getCommentedVideos(address _user) public view returns (uint[] memory) {
        return userCommentedVideos[_user];
    }

    // Function to get a user's viewed videos
    function getViewedVideos(address _user) public view returns (uint[] memory) {
        return userViewedVideos[_user];
    }
}

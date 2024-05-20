// Import the DVideo contract artifact for testing
const DVideo = artifacts.require('./DVideo.sol');

// Define a contract test suite for DVideo
contract('DVideo', (accounts) => {
  // Variable to hold the DVideo contract instance
  let dvideo;
  // Assign the first account as the uploader of videos
  const uploader = accounts[0];
  // Assign the second account as a viewer of videos
  const viewer = accounts[1];
  // Define a test video hash to simulate IPFS hash
  const videoHash = 'QmTestHash';
  // Define a test video title
  const videoTitle = 'Test Title';
  // Define a new test video hash for update testing
  const newVideoHash = 'QmNewTestHash';
  // Define a new test video title for update testing
  const newVideoTitle = 'New Test Title';
  // Define a test comment for commenting on videos
  const comment = 'Test Comment';
  // Define test tags for tagging videos
  const tags = ['tag1', 'tag2'];

  // Hook to run before all tests that sets up the contract instance
  before(async () => {
    // Deploy the DVideo contract and assign the instance to dvideo
    dvideo = await DVideo.deployed();
  });

  // Describe block for video upload tests
  describe('Video Upload', async () => {
    // Test case for uploading a video
    it('should upload a video', async () => {
      // Call the uploadVideo function and store the result
      const result = await dvideo.uploadVideo(videoHash, videoTitle, { from: uploader });
      // Assert that the video ID is correct
      assert.equal(result.logs[0].args.id.toNumber(), 1, 'id is correct');
      // Assert that the video hash is correct
      assert.equal(result.logs[0].args.hash, videoHash, 'Hash is correct');
      // Assert that the video title is correct
      assert.equal(result.logs[0].args.title, videoTitle, 'Title is correct');
      // Assert that the video author is correct
      assert.equal(result.logs[0].args.author, uploader, 'Author is correct');
    });
  });


  // Describe block for video view tests
  describe('Video View', async () => {
    // Test case for incrementing video views
    it('should increment video views', async () => {
        // Define the video ID to view
        const videoId = 1;
        // Call the incrementViewCount function and store the result
        const result = await dvideo.incrementViewCount(videoId, { from: viewer });
        // Assert that the views count is incremented
        assert.equal(result.logs[0].args.views.toNumber(), 1, "Views count is incremented");
    });
  });

  // Describe block for video comment tests
  describe('Video Comment', async () => {
    // Test case for adding a comment to a video
    it('should add a comment to a video', async () => {
      // Define the video ID to comment on
      const videoId = 1;
      // Call the addComment function and store the result
      const result = await dvideo.addComment(videoId, comment, { from: viewer });
      // Assert that the video ID is correct
      assert.equal(result.logs[0].args.id.toNumber(), videoId, 'id is correct');
      // Assert that the comment is correct
      assert.equal(result.logs[0].args.comment, comment, 'Comment is correct');
      // Assert that the commenter address is correct
      assert.equal(result.logs[0].args.commenter, viewer, 'Commenter is correct');
    });
  });


  // Describe block for video like tests
  describe('Video Likes', async () => {
    // Test case for liking a video
    it('should like a video', async () => {
      // Define the video ID to like
      const videoId = 1;
      // Call the likeVideo function and store the result
      const result = await dvideo.likeVideo(videoId, { from: viewer });
      // Assert that the video ID is correct
      assert.equal(result.logs[0].args.id.toNumber(), videoId, 'id is correct');
      // Assert that the like count is incremented
      assert.equal(result.logs[0].args.likes.toNumber(), 1, 'Likes count is incremented');
    });
  });

  // Describe block for video dislike tests
  describe('Video Dislikes', async () => {
    // Test case for disliking a video
    it('should dislike a video', async () => {
      // Define the video ID to dislike
      const videoId = 1;
      // Call the dislikeVideo function and store the result
      const result = await dvideo.dislikeVideo(videoId, { from: viewer });
      // Assert that the video ID is correct
      assert.equal(result.logs[0].args.id.toNumber(), videoId, 'id is correct');
      // Assert that the dislike count is incremented
      assert.equal(result.logs[0].args.dislikes.toNumber(), 1, 'Dislikes count is incremented');
    });
  });



  // Describe block for video tags tests
  describe('Video Tags', async () => {
    // Test case for adding tags to a video
    it('should add tags to a video', async () => {
        // Define the video ID to tag
        const videoId = 1;
        // Call the addTags function
        await dvideo.addTags(videoId, tags, { from: uploader });
        // Retrieve the tags for the video
        const retrievedTags = await dvideo.getVideoTags(videoId);
        // Assert that the first tag is correct
        assert.equal(retrievedTags[0], tags[0], 'First tag is correct');
        // Assert that the second tag is correct
        assert.equal(retrievedTags[1], tags[1], 'Second tag is correct');
      });
  });

  
  // Describe block for getting videos for a tag tests
  describe('Get Videos For Tag', async () => {
    // Test case for retrieving videos for a tag
    it('should retrieve videos for a tag', async () => {
        // Define the tag to retrieve videos for
        const tag = 'tag1';
        // Call the getVideosForTag function and store the result
        const videosForTag = await dvideo.getVideosForTag(tag);
        // Assert that the retrieved array of video IDs is correct
        assert.equal(videosForTag.length, 1, 'Videos for tag array length is correct');
        assert.equal(videosForTag[0].toNumber(), 1, 'Video ID for tag is correct');
      });
    });




    describe('User Interactions', async () => {
      it('should retrieve liked videos for a user', async () => {
        // Define the user address to retrieve liked videos for
        const user = viewer; // Ensure this is the account that liked the video
        // Call the getLikedVideos function and store the result
        const likedVideos = await dvideo.getLikedVideos(user);
        // Assert that the retrieved array of liked video IDs is correct
        assert.isArray(likedVideos, 'Liked videos should be an array');
        assert.equal(likedVideos.length, 1, 'Liked videos array length is correct');
      });
      
  
      it('should retrieve disliked videos for a user', async () => {
        const user = viewer; // Use a different account (viewer) for disliking videos
        const dislikedVideos = await dvideo.getDislikedVideos(user);
        assert.isArray(dislikedVideos, 'Disliked videos should be an array');
        assert.equal(dislikedVideos.length, 1, 'Disliked videos array length is correct');
      });
  
      it('should retrieve commented videos for a user', async () => {
        const user = viewer; // Use the same account (viewer) for commenting on videos
        const commentedVideos = await dvideo.getCommentedVideos(user);
        assert.isArray(commentedVideos, 'Commented videos should be an array');
        assert.equal(commentedVideos.length, 1, 'Commented videos array length is correct');
      });
  
      it('should retrieve viewed videos for a user', async () => {
        const user = viewer; // Use the same account (viewer) for viewing videos
        const viewedVideos = await dvideo.getViewedVideos(user);
        assert.isArray(viewedVideos, 'Viewed videos should be an array');
        assert.equal(viewedVideos.length, 1, 'Viewed videos array length is correct');
      });
    });
  
   
});

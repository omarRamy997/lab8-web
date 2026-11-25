const MOCK_SERVER_URL = "http://localhost:3000";

const checkOk = (response, what) => {
  if (!response.ok) {
    throw new Error(`${what} failed: ${response.status} ${response.statusText}`);
  }
};

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${MOCK_SERVER_URL}/posts`);
    checkOk(response, "Fetching posts");
    return await response.json();
  } catch (err) {
    console.error("getAllPosts error:", err);
    throw err;
  }
};

export const getPostDetails = async (postId) => {
  try {
    const postResponse = await fetch(`${MOCK_SERVER_URL}/posts/${postId}`);
    checkOk(postResponse, `Fetching post ${postId}`);
    const postData = await postResponse.json();

    const commentsResponse = await fetch(`${MOCK_SERVER_URL}/posts/${postId}/comments`);
    checkOk(commentsResponse, `Fetching comments of post ${postId}`);
    const commentsData = await commentsResponse.json();

    return { post: postData, comments: commentsData };
  } catch (err) {
    console.error("getPostDetails error:", err);
    throw err;
  }
};

export const createNewPost = async (newPostData) => {
  try {
    const response = await fetch(`${MOCK_SERVER_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPostData),
    });
    checkOk(response, "Creating post");
  } catch (err) {
    console.error("createNewPost error:", err);
    throw err;
  }
};

export const createNewComment = async (postId, newCommentData) => {
  try {
    const response = await fetch(`${MOCK_SERVER_URL}/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCommentData),
    });
    checkOk(response, `Creating comment on post ${postId}`);
  } catch (err) {
    console.error("createNewComment error:", err);
    throw err;
  }
};
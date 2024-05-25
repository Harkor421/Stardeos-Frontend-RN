import client from './client';

const getRecommendedVideos = (page) => {
  return client.get(`/videos?page=${page}`);
};

const getVideo = (id) => { //retrieves video information with video id
  return client.get('/videos/' + id);
};

const getLatestVideos = (page) => {
  return client.get(`/videos/?filter=LATEST&page=${page}`);
};

const getChannelVideos = (id, page) => {
  return client.get(`/channels/${id}/videos?page=${page}`);
};

const getComments = (id) => { //Video id
  return client.get(`/comments/${id}?page=1`);
};

const getVideosWithStreams = (page) => {
  return client.get(`/videos/streams/?filter=&page=${page}`);
};

const markLikeOrDislike = async (data, action) => {
  try {
    const response = await client.post(`/videos/${action}`, data);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error in markLikeOrDislike:", error);
    throw error;
  }
};

const createComment = async (body) => {
  try {
    const response = await client.post(`/comments`, body);
    console.log("Comment created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error.response ? error.response.data : error.message);
    throw error;
  }
};

const searchVideo = ({ search, page = 1 }) => {
  const params = new URLSearchParams({
    q: search,
    page: String(page)
  }).toString();

  return client.get('/videos/browse?' + params);
};

export default {
  getRecommendedVideos,
  getVideo,
  getLatestVideos,
  searchVideo,
  getComments,
  getChannelVideos,
  markLikeOrDislike,
  createComment,
  getVideosWithStreams
};

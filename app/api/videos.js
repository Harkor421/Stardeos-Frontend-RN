import client from './client'


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

const searchVideo = ({ search, page = 1 }) => {
  const params = new URLSearchParams({
    q: search,
    page: String(page)
  }).toString();

  return client.get('/videos/browse?' + params);
};




export default{
    getRecommendedVideos,
    getVideo,
    getLatestVideos,
    searchVideo,
    getComments,
    getChannelVideos,
}
import client from './client'


const getRecommendedVideos = (page) => {
    return client.get(`/videos?page=${page}`);
  };

const getVideo = (id) => {
    console.log('/videos/' + id)
  return client.get('/videos/' + id);
};



export default{
    getRecommendedVideos,
    getVideo,
}
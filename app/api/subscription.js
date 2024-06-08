import client from './client';

const follow = async (body) => {
  try {
    const response = await client.post(`/subscriptions`, body);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error in follow:", error);
    throw error;
  }
};

const findAllSubscriptions = () => {
  return client.get(`/subscriptions/?v=${new Date().getTime()}`);
};

const unfollow = async (channelid) => {
  try {
    console.log(channelid);
    const response = await client.delete(`/subscriptions/${channelid}` );
    console.log(response.data);
    return response;
  } catch (error) {
    console.error("Error in unfollow:", error);
    throw error;
  }
};

export default {
  follow,
  findAllSubscriptions,
  unfollow
};

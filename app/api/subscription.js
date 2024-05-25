import client from './client';

const follow = async (body) => {
  try {
    const response = await client.post(`/v2/subscriptions`, body);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error in follow:", error);
    throw error;
  }
};

const findAllSubscriptions = async () => {
  try {
    const response = await client.get(`/v2/subscriptions/?v=${new Date().getTime()}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error in findAllSubscriptions:", error);
    throw error;
  }
};

const unfollow = async (channelId) => {
  try {
    const response = await client.delete(`/v2/subscriptions/${channelId}`);
    console.log(response);
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

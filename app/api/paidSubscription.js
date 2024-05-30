import client from './client';


const getSubscriptions = () => {
  return client.get(`/payments-subscription`);
};


export default {
    getSubscriptions,
};

import client from './client';
import authStorage from '../auth/storage';

const getNotifications = () => {
    return client.get(`/notifications`);
  };


export default {
    getNotifications,
};

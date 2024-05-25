import apiClient from "./client";

const login = ({username, password}) => {
  return apiClient.post('/auth/login', { username, password });
};

const getCurrentUser = ({v= 0}) => {
  return apiClient.get(`/me?v=${v}`);
};

export default {
  login,
  getCurrentUser
};

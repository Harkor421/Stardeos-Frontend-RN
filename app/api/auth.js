import apiClient from "./client";

const login = ({username, password}) => {
  return apiClient.post('/auth/login', { username, password });
};

const getCurrentUser = () => {
  return apiClient.get(`/auth/me?v=0`);
};

export default {
  login,
  getCurrentUser,
};

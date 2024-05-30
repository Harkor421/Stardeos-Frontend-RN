import apiClient from "./client";

const login = ({username, password}) => {
  return apiClient.post('/auth/login', { username, password });
};

const getCurrentStardust = () => {
  return apiClient.get(`/auth/me`);
};

export default {
  login,
  getCurrentStardust,
};

import apiClient from "./client";

const login = ({username, password}) => {
  return apiClient.post('/auth/login', { username, password });
};

export default {
  login,
};

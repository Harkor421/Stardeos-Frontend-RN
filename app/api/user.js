import client from './client';

// Define the updateAvatar function using client.put
const updateAvatar = (data) => {
  return client.put(`/users/update-avatar`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Export the functions as part of an object
export default {
  updateAvatar,
};

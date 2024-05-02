import { create } from 'apisauce';
import authStorage from '../auth/storage';

const apiClient = create({
  baseURL: 'https://stardeos.com/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.addAsyncRequestTransform(request => async () => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["Authorization"] = "Bearer " + authToken.data.access_token;
});

export default apiClient;

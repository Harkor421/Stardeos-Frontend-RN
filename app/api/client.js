import { create } from 'apisauce';
import authStorage from '../auth/storage';

const apiClient = create({
  baseURL: 'https://stardeos.com/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to set the Authorization header
apiClient.addRequestTransform(async request => {
  const authTokenData = await authStorage.getToken();
  
  if (authTokenData && authTokenData.token) {
    request.headers['Authorization'] = `Bearer ${authTokenData.data.access_token}`;
  }
});

export default apiClient;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosClient.interceptors.response.use(
    (response) => {
      console.log('Interceptor Yanıt:', response);
      return response;
    },
    (error) => {
      console.error('Interceptor Hatası:', error);
      return Promise.reject(error);
    }
  );
export default api;

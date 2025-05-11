import axios from 'axios';

let navigate; // Yönlendirme işlevini burada saklayacağız

export const setNavigate = (nav) => {
  navigate = nav; // Yönlendirme işlevini ayarla
};

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api', // API'nizin base URL'ini buraya yazın
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (userId) {
      config.headers['User-Id'] = userId; 
    }
    else {
      console.warn('User ID bulunamadı!');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 429 && navigate) {
      navigate('/429'); // Kullanıcıyı 429 sayfasına yönlendir
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
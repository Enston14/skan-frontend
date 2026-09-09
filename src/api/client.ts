import axios from 'axios';

// Используем прямой URL вместо прокси
const BASE_URL = 'https://gateway.scan-interfax.ru/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    console.log('🔵🔵🔵 API ЗАПРОС!');
    console.log('🔵 method:', config.method);
    console.log('🔵 url:', config.url);
    console.log('🔵 data:', config.data);
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    console.log('🟢 API ОТВЕТ!');
    console.log('🟢 status:', response.status);
    console.log('🟢 data:', response.data);
    return response;
  },
  (error) => {
    console.log('🔴 API ОШИБКА!');
    console.log('🔴 status:', error.response?.status);
    console.log('🔴 data:', error.response?.data);
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('expire');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
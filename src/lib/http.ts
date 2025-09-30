import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL as string;

export const http = axios.create({
  baseURL,
  timeout: 15000
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('cozy_token');
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any)['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('cozy_token');
      if (window.location.pathname !== '/') {
        window.location.replace('/');
      }
    }
    return Promise.reject(error);
  }
);

export default http;



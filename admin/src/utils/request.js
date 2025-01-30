import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  // headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000',
  timeout: 30000,
});

const aiApi = axios.create({
  baseURL: process.env.REACT_APP_AI_URL || 'http://127.0.0.1:8000',
  timeout: 60000,
});

api.interceptors.response.use(
  res => res,
  err => Promise.reject(err)
);

export { aiApi };
export default api;

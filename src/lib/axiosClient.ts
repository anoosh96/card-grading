// lib/axiosClient.ts
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '',  // Change this if your API has a different base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Optionally, add interceptors for global error handling, authorization, etc.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling (optional)
    return Promise.reject(error);
  }
);

export default axiosClient;

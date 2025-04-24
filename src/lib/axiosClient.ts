// lib/axiosClient.ts
import axios from 'axios';

// This function will be used to redirect to login
// It's defined separately since we can't use hooks directly in this file
let redirectToLogin: () => void;

export const setAuthRedirectFunction = (redirectFn: () => void) => {
  redirectToLogin = redirectFn;
};

const axiosClient = axios.create({
  baseURL: '',  // Change this if your API has a different base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add interceptors for global error handling, authorization, etc.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check for 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Clear any auth tokens if you're storing them
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      
      // Redirect to login page if the redirect function is defined
      if (redirectToLogin) {
        redirectToLogin();
      } else {
        console.warn('Auth redirect function not set. Call setAuthRedirectFunction() first.');
      }
    }
    
    // Return the error for further handling
    return Promise.reject(error);
  }
);

export default axiosClient;
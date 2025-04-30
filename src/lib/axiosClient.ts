// lib/axiosClient.ts
import axios from 'axios';

// This will store all the store clear functions that need to be called on logout
type StoreClearFunction = () => void;
const storeClearFunctions: StoreClearFunction[] = [];

// This function will be used to redirect to login
// It's defined separately since we can't use hooks directly in this file
let redirectToLogin: () => void;

export const setAuthRedirectFunction = (redirectFn: () => void) => {
  redirectToLogin = redirectFn;
};

// Function to register store clear functions
export const registerStoreClearFunction = (clearFn: StoreClearFunction) => {
  storeClearFunctions.push(clearFn);
};

// Function to clear all registered stores
export const clearAllStores = () => {
  storeClearFunctions.forEach(clearFn => clearFn());
};

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Change this if your API has a different base URL
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
      // Clear all registered Zustand stores
      clearAllStores();
      
      // Clear any auth tokens if you're storing them
      localStorage.clear();
      
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
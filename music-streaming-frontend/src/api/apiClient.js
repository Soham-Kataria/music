// /src/api/apiClient.js
import axios from "axios";

// Create Axios instance with base URL (change to your backend URL)
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust according to your backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or from context if preferred
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: handle unauthorized globally
    if (error.response && error.response.status === 401) {
      // Optionally: redirect to login or clear auth data
      // window.location.href = "/login";
      console.error("Unauthorized! Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default apiClient;

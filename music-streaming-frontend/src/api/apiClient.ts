import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// Create Axios instance with base URL (change to your backend URL)
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust according to your backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token if available
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Example: handle unauthorized globally
    if (error.response && error.response.status === 401) {
      // Optionally: redirect to login or clear auth data
      console.error("Unauthorized! Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default apiClient;

import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7281/api", // your .NET backend base URL
});

// Add JWT token automatically if user is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
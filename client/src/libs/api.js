import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL|| "http://localhost:8080",
});

// Add token dynamically on every request
API.interceptors.request.use((config) => {
  const admin = localStorage.getItem("adminToken");
  const user = localStorage.getItem("token");

  config.headers.Authorization = admin
    ? `Bearer ${admin}`
    : user
    ? `Bearer ${user}`
    : "";

  return config;
});

export default API;
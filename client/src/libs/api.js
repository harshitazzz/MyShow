// src/libs/api.js
// import axios from 'axios';

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8080',
//   withCredentials: false,
// });

// // inject admin token if available
// API.interceptors.request.use(config => {
//   const token = localStorage.getItem('adminToken');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// }, err => Promise.reject(err));

// export default API;

import axios from "axios";

const adminToken = localStorage.getItem("adminToken");
const userToken = localStorage.getItem("token");   // if you also use user auth

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8080",
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
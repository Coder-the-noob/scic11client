import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

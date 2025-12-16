import React from 'react';
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
   const { token } = useContext(AuthContext);

  axiosSecure.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${token}`;
    return config;
  });

  return axiosSecure;
};

export default useAxiosSecure;
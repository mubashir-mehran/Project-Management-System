import axios from "axios";
import store from "./store";
import { BASE_URL } from "./api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.userToken;

    if (token) {
      config.headers["Authorization"] = token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

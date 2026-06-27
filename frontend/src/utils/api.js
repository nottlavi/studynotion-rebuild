import axios from "axios";
import { toaster } from "../components/ui/toaster";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;

// response interceptor to normalize errors and show toast
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    try {
      toaster.add({
        title: "Error",
        description: message,
        type: "error",
        closable: true,
      });
    } catch (e) {
      // ignore toaster failures
    }
    return Promise.reject(error);
  },
);

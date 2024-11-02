import axios from "axios";
import usersService from "../users/users.service";
import { StatusCodes } from "http-status-codes";

const API_URL = process.env.REACT_APP_BASE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL+"/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = usersService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === StatusCodes.UNAUTHORIZED) {
      usersService.logout();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
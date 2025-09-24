import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearTokens,
} from "../utils/authStorage";

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
});

const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token");

  const { data } = await axios.post(
    `${
      process.env.REACT_APP_API_URL || "http://localhost:5000"
    }/api/auth/token/refresh`,
    { refreshToken }
  );

  setAccessToken(data.accessToken);
  if (data.refreshToken) setRefreshToken(data.refreshToken);

  return data.accessToken;
};

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (_err) {
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(_err);
      }
    }

    return Promise.reject(error);
  }
);

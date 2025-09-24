import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If Unauthorized & not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Hit refresh endpoint
        const { data } = await axios.post(
          `${
            process.env.REACT_APP_API_URL || "http://localhost:5000"
          }/api/auth/token/refresh`,
          { refreshToken }
        );

        // Save new tokens
        localStorage.setItem("accessToken", data.accessToken);
        if (data.refreshToken) {
          localStorage.setItem("refreshToken", data.refreshToken);
        }

        // Update failed request with new token & retry
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        // Refresh also failed → logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

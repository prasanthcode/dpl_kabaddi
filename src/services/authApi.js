import { API } from "./apiClient";

export const getAuthToken = (credentials) => {
  return API.post("/api/auth/token", credentials);
};

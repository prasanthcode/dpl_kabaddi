import { API } from "./apiClient";

export const getPlayerStats = (category) => {
  return API.get(`/api/stats/top-players?category=${category}`);
};

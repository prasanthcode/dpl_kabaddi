import { API } from "./apiClient";

export const getPlayerStats = (category) => {
  return API.get(`/api/stats/top5?category=${category}`);
};

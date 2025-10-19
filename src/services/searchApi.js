import { API } from "./apiClient";

export const getSearchResults = (query) => {
  return API.get(`/api/search?query=${query}`);
};

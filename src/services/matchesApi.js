import { API } from "./apiClient";

export const fetchMatches = () => API.get("/api/matches");
export const addMatch = (matchData) => API.post("/api/matches", matchData);
export const updateMatch = (id, matchData) =>
  API.patch(`/api/matches/${id}`, matchData);
export const deleteMatch = (id) => API.delete(`/api/matches/${id}`);

export const getMatches = (url, limit) =>
  API.get(`/api/matches/${url}?limit=${limit}`);

export const getMatchStats = (matchId) =>
  API.get(`/api/matches/${matchId}/fullstats`);
export const getLiveConnectionsCount = () =>
  API.get(`/api/matches/active-connections`);

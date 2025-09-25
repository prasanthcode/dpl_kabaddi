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

export const setMatchHalftime = (matchId) =>
  API.patch(`/api/matches/${matchId}/halftime`);

export const setMatchComplete = (matchId) =>
  API.patch(`/api/matches/${matchId}/complete`);

export const getFinalWinner = () => API.get(`/api/matches/final`);

export const getPointsTable = () => API.get(`/api/matches/pointstable`);

export const getLiveMatches = () => API.get(`/api/matches/live`);

export const getPlayerPointsOfMatch = (matchId, playerId, type) =>
  API.get(`/api/matches/${matchId}/player/${playerId}/sequence?type=${type}`);

import { API } from "./apiClient";


export const fetchMatchScores = (matchId) =>
  API.get(`/api/matches/${matchId}/scores`);

export const fetchMatchPlayers = (matchId) =>
  API.get(`/api/matches/players/${matchId}`);

export const addPlayerScore = (data) => API.patch(`/api/points/player`, data);

export const undoPlayerScore = (data) =>
  API.patch(`/api/points/player/undo`, data);

export const addTeamScore = (data) => API.patch(`/api/points/team`, data);

export const undoTeamScore = (data) => API.patch(`/api/points/team/undo`, data);

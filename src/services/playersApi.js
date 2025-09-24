import { API } from "./apiClient";


export const fetchPlayers = () => API.get("/api/players");
export const fetchPlayersByTeam = (teamId) =>
  API.get(`/api/players/team/${teamId}`);
export const fetchPlayerInfo = (playerId) =>
  API.get(`/api/players/${playerId}/info`);
export const addPlayer = (playerData) => {
  if (playerData instanceof FormData) {
    return API.post("/api/players", playerData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return API.post("/api/players", playerData);
};
export const updatePlayer = (id, playerData) => {
  if (playerData instanceof FormData) {
    return API.patch(`/api/players/${id}`, playerData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return API.patch(`/api/players/${id}`, playerData);
};
export const deletePlayer = (id) => API.delete(`/api/players/${id}`);
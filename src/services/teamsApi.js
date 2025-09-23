import { API } from "./apiClient";

export const fetchTeams = () => API.get("/api/teams");
export const addTeam = (teamData) => {
  if (teamData instanceof FormData) {
    return API.post("/api/teams", teamData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return API.post("/api/teams", teamData);
};
export const updateTeam = (id, teamData) => {
  if (teamData instanceof FormData) {
    return API.patch(`/api/teams/${id}`, teamData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return API.patch(`/api/teams/${id}`, teamData);
};
export const deleteTeam = (id) => API.delete(`/api/teams/${id}`);
export const fetchTeamStats = (teamId) => API.get(`/api/teams/${teamId}/stats`);

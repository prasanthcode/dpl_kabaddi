import { useCallback, useEffect, useState } from "react";
import * as api from "../services/teamsApi";

export function useTeams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

   const loadTeams = useCallback(async () => {
    try {
      const res = await api.fetchTeams();
      setTeams(res.data || []);
    } catch (err) {
      console.error("Load teams failed", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // fetch on mount
  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  const addTeam = async (teamData) => {
    const res = await api.addTeam(teamData);
    await loadTeams();
    return res.data;
  };

  const updateTeam = async (id, teamData) => {
    const res = await api.updateTeam(id, teamData);
    setTeams((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    return res.data;
  };

  const deleteTeam = async (id) => {
    await api.deleteTeam(id);
    setTeams((prev) => prev.filter((t) => t._id !== id));
  };

  return { loading, teams, setTeams, addTeam, updateTeam, deleteTeam };
}

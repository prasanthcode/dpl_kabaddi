import { useCallback, useEffect, useState } from "react";
import * as api from "../services/playersApi";

export function usePlayers(teamId = null) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadPlayers = useCallback(async () => {
    try {
      let res;
      if (teamId) {
        res = await api.fetchPlayersByTeam(teamId);
      } else {
        res = await api.fetchPlayers();
      }
      setPlayers(res.data || []);
    } catch (err) {
      console.error("Load players failed", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPlayers();
  }, [loadPlayers]);
  const addPlayer = async (playerData) => {
    const res = await api.addPlayer(playerData);
    await loadPlayers();
    return res.data;
  };

  const updatePlayer = async (id, playerData) => {
    const res = await api.updatePlayer(id, playerData);
    await loadPlayers();
    return res.data;
  };

  const deletePlayer = async (id) => {
    await api.deletePlayer(id);
    setPlayers((prev) => prev.filter((p) => p._id !== id));
  };

  return {
    loading,
    players,
    setPlayers,
    addPlayer,
    updatePlayer,
    deletePlayer,
  };
}

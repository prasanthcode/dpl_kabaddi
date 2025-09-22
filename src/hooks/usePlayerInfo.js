import { useEffect, useState } from "react";
import * as api from "../services/playersApi";

export function usePlayerInfo(playerId) {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!playerId) return;

    async function loadPlayerInfo() {
      try {
        const res = await api.fetchPlayerInfo(playerId);
        setPlayer(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPlayerInfo();
  }, [playerId]);

  return { player, loading, error };
}

import { useCallback, useEffect, useState } from "react";
import * as api from "../services/matchesApi";

export function useMatches(teams = []) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadMatches = useCallback(async () => {
    try {
      const res = await api.fetchMatches();
      setMatches(res.data || []);
    } catch (err) {
      console.error("Load matches failed", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  const addMatch = async ({
    teamA,
    teamB,
    date,
    matchType,
    status = "Upcoming",
  }) => {
    const res = await api.addMatch({ teamA, teamB, date, matchType, status });

    await loadMatches();
    return res.data;
  };

  const updateMatch = async (id, matchData) => {
    const res = await api.updateMatch(id, matchData);
    setMatches((prev) =>
      prev.map((m) =>
        m._id === id ? { ...m, ...res.data, teamA: m.teamA, teamB: m.teamB } : m
      )
    );
    return res.data;
  };

  const deleteMatch = async (id) => {
    await api.deleteMatch(id);
    setMatches((prev) => prev.filter((m) => m._id !== id));
  };

  return { loading, matches, setMatches, addMatch, updateMatch, deleteMatch };
}

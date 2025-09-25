import { useCallback, useEffect, useState } from "react";
import * as api from "../services/matchesApi";

export function useMatches() {
  const [matches, setMatches] = useState([]);
  const [matchesLoading, setMatchesLoading] = useState(true);
  const [pointsLoading, setPointsLoading] = useState(false);
  const [pointSequences, setPointSequences] = useState({}); // { "playerId-type": { points, type } }

  const loadMatches = useCallback(async () => {
    setMatchesLoading(true);
    try {
      const res = await api.fetchMatches();
      setMatches(res.data || []);
    } catch (err) {
      console.error("Load matches failed", err);
    } finally {
      setMatchesLoading(false);
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

  // Player points per player + type
  const getPlayerPointsOfMatch = async (matchId, playerId, type) => {
    setPointsLoading(true);
    try {
      const res = await api.getPlayerPointsOfMatch(matchId, playerId, type);
      setPointSequences((prev) => ({
        ...prev,
        [`${playerId}-${type}`]: res.data, // store by playerId + type
      }));
    } catch (err) {
      console.error("Load player points failed", err);
    } finally {
      setPointsLoading(false);
    }
  };

  return {
    matches,
    matchesLoading,
    setMatches,
    addMatch,
    updateMatch,
    deleteMatch,
    pointSequences,
    pointsLoading,
    getPlayerPointsOfMatch,
  };
}

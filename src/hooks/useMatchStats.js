import { useEffect, useState, useCallback } from "react";
import { getMatchStats } from "../services/matchesApi";
import { listenToMatch } from "../services/firebaseService";

export function useMatchStats(matchId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [matches, setMatches] = useState(null);
  const [stats, setStats] = useState(null);
  const [totalPoints, setTotalPoints] = useState(null);
  const [lastAction, setLastAction] = useState(null);

  const normalizeData = (data) => {
    if (data.stats) {
      const s = data.stats;

      setMatches({
        teamA: {
          name: s.teamA.name,
          logo: s.teamA.logo,
          score: s.teamA.score,
        },
        teamB: {
          name: s.teamB.name,
          logo: s.teamB.logo,
          score: s.teamB.score,
        },
        halfTime: s.halfTime,
        status: s.status,
        matchType: s.matchType,
        matchNumber: s.matchNumber,
      });

      setTotalPoints({
        teamA: {
          totalRaidPoints: s.teamA.totalRaidPoints,
          totalDefensePoints: s.teamA.totalDefensePoints,
          score: s.teamA.score,
        },
        teamB: {
          totalRaidPoints: s.teamB.totalRaidPoints,
          totalDefensePoints: s.teamB.totalDefensePoints,
          score: s.teamB.score,
        },
      });

      setStats({
        teamA: {
          topRaiders: s.teamA.topRaiders,
          topDefenders: s.teamA.topDefenders,
        },
        teamB: {
          topRaiders: s.teamB.topRaiders,
          topDefenders: s.teamB.topDefenders,
        },
      });
    }

    if (data.lastAction) {
      setLastAction(data.lastAction);
    }
  };

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMatchStats(matchId);

      normalizeData({
        stats: res.data,
        lastAction: null,
      });

      return res.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [matchId]);

  useEffect(() => {
    let unsubscribe;

    const init = async () => {
      const initial = await fetchStats();

      if (initial?.status === "Ongoing") {
        unsubscribe = listenToMatch(matchId, (liveData) => {
          normalizeData(liveData);
        });
      }
    };

    init();

    return () => unsubscribe && unsubscribe();
  }, [matchId, fetchStats]);

  return { matches, stats, totalPoints, lastAction, loading, error };
}

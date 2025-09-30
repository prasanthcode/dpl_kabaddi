import { useEffect, useState } from "react";
import * as api from "../services/scoresApi";

export function useScores(matchId) {
  const [players, setPlayers] = useState({
    teamAPlayers: [],
    teamBPlayers: [],
    teamAId: "",
    teamBId: "",
    teamAName: "",
    teamBName: "",
  });
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load players + scores
  useEffect(() => {
    async function loadScoresAndPlayers() {
      try {
        const [playersRes, scoresRes] = await Promise.all([
          api.fetchMatchPlayers(matchId),
          api.fetchMatchScores(matchId),
        ]);

        const data = playersRes.data;
        setPlayers({
          teamAPlayers: [...data.teamA.players],
          teamBPlayers: [...data.teamB.players],
          teamAId: data.teamA.id,
          teamBId: data.teamB.id,
          teamAName: data.teamA.name,
          teamBName: data.teamB.name,
        });

        setScore(scoresRes.data);
      } catch (err) {
        console.error("Load scores/players failed", err);
        setError(err.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    }

    if (matchId) loadScoresAndPlayers();
  }, [matchId]);

  // refresh scores helper
  const refreshScores = async () => {
    try {
      const res = await api.fetchMatchScores(matchId);
      setScore(res.data);
    } catch (err) {
      console.error("Failed to refresh scores", err);
    }
  };

  const addPlayerScore = async (data) => {
    try {
      localStorage.setItem(
        "lastScoreUpdate",
        JSON.stringify({
          kind: "player",
          requestData: {
            matchId: data.matchId,
            playerId: data.playerId,
            type: data.type,
          },
        })
      );
    } catch (err) {
      console.warn("Could not write lastScoreUpdate to localStorage", err);
    }

    const res = await api.addPlayerScore(data);
    await refreshScores();
    return res.data;
  };

  const undoPlayerScore = async (data) => {
    // undo endpoint expects matchId + playerId (no points)
    const payload = { ...data };
    if ("points" in payload) delete payload.points;
    const res = await api.undoPlayerScore(payload);
    await refreshScores();
    return res.data;
  };

  const addTeamScore = async (data) => {
    try {
      localStorage.setItem(
        "lastScoreUpdate",
        JSON.stringify({
          kind: "team",
          requestData: {
            matchId: data.matchId,
            teamId: data.teamId,
            points: data.points,
          },
        })
      );
    } catch (err) {
      console.warn("Could not write lastScoreUpdate to localStorage", err);
    }

    const res = await api.addTeamScore(data);
    await refreshScores();
    return res.data;
  };

  const undoTeamScore = async (data) => {
    const payload = { ...data };
    const res = await api.undoTeamScore(payload);
    await refreshScores();
    return res.data;
  };

  const undoLastAction = async () => {
    const last = localStorage.getItem("lastScoreUpdate");
    if (!last) throw new Error("No lastScoreUpdate found");

    const { kind, requestData } = JSON.parse(last);

    if (kind === "player") {
      await undoPlayerScore(requestData);
    } else if (kind === "team") {
      await undoTeamScore(requestData);
    } else {
      throw new Error("Unknown lastScoreUpdate kind");
    }

    localStorage.removeItem("lastScoreUpdate");
  };

  return {
    players,
    score,
    loading,
    error,
    addPlayerScore,
    undoPlayerScore,
    addTeamScore,
    undoTeamScore,
    undoLastAction,
    refreshScores,
  };
}

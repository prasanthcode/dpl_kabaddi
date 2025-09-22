import React from "react";
import StatsCard from "../components/StatsCard";
import { useMatches } from "../../hooks/useMatches";
import { useTeams } from "../../hooks/useTeams";
import { usePlayers } from "../../hooks/usePlayers";

import "../admin.css";
import { useLiveConnections } from "../../hooks/useLiveConnections";

export default function Dashboard() {
  const { loading: matchesLoading, matches } = useMatches();
  const { loading: teamsLoading, teams } = useTeams();
  const { loading: playersLoading, players } = usePlayers();
  const {
    count,
    loading: liveConnectionsCountLoading,
    refetch,
  } = useLiveConnections();
  const isLoading = matchesLoading || teamsLoading || playersLoading;

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <h2 style={{ color: "black" }}>Welcome, Admin</h2>
        <p style={{ marginTop: 6, color: "#6b7280" }}>Overview of the league</p>
      </div>

      <div className="stats-row">
        <StatsCard title="Matches" value={isLoading ? "..." : matches.length} />
        <StatsCard title="Teams" value={isLoading ? "..." : teams.length} />
        <StatsCard title="Players" value={isLoading ? "..." : players.length} />
        <StatsCard
          title="Live Users"
          value={liveConnectionsCountLoading ? "..." : count}
        />
      </div>
      <button onClick={refetch}>Refresh Live Users</button>
    </>
  );
}

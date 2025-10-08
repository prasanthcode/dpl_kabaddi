import React, { useEffect, useState } from "react";
import { fetchTeamStats } from "../services/teamsApi";
import TeamStatsSkeleton from "./TeamStatsSkeleton";
export default function TeamStats({ teamId }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetchTeamStats(teamId);
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching team stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [teamId]);

  if (loading) return <TeamStatsSkeleton />;
  if (!stats) return <div className="teamstats-error">No stats available.</div>;

  return (
    <div className="teamstats-card">
      <div className="teamstats-header">
        <img src={stats.teamLogo} alt={stats.teamName} />
        <h2>{stats.teamName}</h2>
      </div>

      <div className="teamstats-grid">
        <div>
          <span>Matches Played</span> {stats.matchesPlayed}
        </div>
        <div>
          <span>Wins</span> {stats.wins}
        </div>
        <div>
          <span>Losses</span> {stats.losses}
        </div>
        <div>
          <span>Highest Score</span> {stats.highestScore}
        </div>
        <div>
          <span>Total Points</span> {stats.totalPoints}
        </div>
        <div>
          <span>Total Raid Points</span> {stats.totalRaidPoints}
        </div>
        <div>
          <span>Total Tackle Points</span> {stats.totalTacklePoints}
        </div>
        <div>
          <span>Total Super 10s</span> {stats.super10s}
        </div>
        <div>
          <span>Total High 5s</span> {stats.high5s}
        </div>
        <div>
          <span>Avg Raid Points</span> {stats.avgRaid}
        </div>
        <div>
          <span>Avg Defense Points</span> {stats.avgDefense}
        </div>
        <div>
          <span>Avg Total Points</span> {stats.avgTotalPoints}
        </div>

        <div>
          <span>Highest Win Margin</span> {stats.highestWinMargin}
        </div>
        {stats.highestMarginWinMatch && (
          <>
            <div>
              <div className="team">
                <span className="vs">vs</span>
                <img
                  src={stats.highestMarginWinMatch?.teamA.logo}
                  alt={stats.highestMarginWinMatch?.teamA.name}
                />
                <p>{stats.highestMarginWinMatch?.teamA.name}</p>
              </div>{" "}
              {stats.highestMarginWinMatch?.teamAScore}
            </div>
            <div>
              <div className="team">
                <img
                  src={stats.highestMarginWinMatch?.teamB.logo}
                  alt={stats.highestMarginWinMatch?.teamB.name}
                />
                <p>{stats.highestMarginWinMatch?.teamB.name}</p>
              </div>{" "}
              {stats.highestMarginWinMatch?.teamBScore}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

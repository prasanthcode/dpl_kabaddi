import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MatchSkeleton from "../components/MatchSkeleton";
import LoadingSpinner from "../components/LoadingSpinner";
import Stats from "../components/Stats";
import LineUp from "../components/LineUp";
import { useMatchStats } from "../hooks/useMatchStats";
import { useLiveMatchConnection } from "../hooks/useLiveMatchConnection";

import "../styles/Match.css";

export default function Match() {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const { matches, stats, totalPoints, loading, error, lastAction } =
    useMatchStats(matchId);
  const hasLiveMatch = matches?.status === "Ongoing";
  useLiveMatchConnection(hasLiveMatch);

  const [alignment, setAlignment] = useState("line_up");
  const [team, setTeam] = useState("A");

  useEffect(() => {
    if (matches?.status === "Completed") {
      navigate(`/recent/${matchId}`);
    }
  }, [matches, navigate, matchId]);
  if (loading) return <MatchSkeleton />;
  if (error) return <p className="match_error">Error: {error}</p>;

  return (
    <div className="match_page">
      <div className="match_wrapper">
        <div className="match_bg">
          <div className="match_card">
            <h5 className="match_type">
              {matches.status === "Ongoing" ? (
                <>
                  Live <span className="matches-live-dot"></span>
                </>
              ) : matches?.matchType ? (
                matches.matchType
              ) : (
                matches?.matchNumber && `Match - #${matches.matchNumber}`
              )}
            </h5>

            <div className="match_vs_container">
              <div className="match_team_img">
                <img
                  src={matches.teamA?.logo}
                  alt={matches.teamA?.name || "Team A"}
                />
                <div className="match_team_info">
                  <h3>{matches.teamA?.name}</h3>
                  <span className="match_teamA_score">
                    {matches.teamA?.score}
                  </span>
                </div>
              </div>

              <div
                className="matches-time"
                style={{
                  borderColor:
                    matches.status === "Completed"
                      ? "green"
                      : matches.halfTime && matches.status === "Ongoing"
                      ? "red"
                      : "white",
                }}
              >
                {matches.status === "Completed"
                  ? "FT"
                  : matches.status === "Upcoming"
                  ? "VS"
                  : matches.halfTime
                  ? "HT"
                  : "VS"}
              </div>

              <div className="match_team_img">
                <img
                  src={matches.teamB?.logo}
                  alt={matches.teamB?.name || "Team B"}
                />
                <div className="match_team_info">
                  <span className="match_teamB_score">
                    {matches.teamB?.score}
                  </span>
                  <h3>{matches.teamB?.name}</h3>
                </div>
              </div>
            </div>
            {matches && (
              <>
                {/* Ongoing match after half-time → show who leads */}
                {matches.status === "Ongoing" && matches.halfTime && (
                  <h3 className="match_result">
                    {matches.teamA?.score === matches.teamB?.score
                      ? "Match Tied at Half-time"
                      : matches.teamA?.score > matches.teamB?.score
                      ? `Half-time Over: ${matches.teamA?.name} leads ${matches.teamB?.name}`
                      : `Half-time Over: ${matches.teamB?.name} leads ${matches.teamA?.name}`}
                  </h3>
                )}

                {/* Finished match → show result */}
                {matches.status !== "Ongoing" && (
                  <h3 className="match_result">
                    {matches.teamA?.score === matches.teamB?.score
                      ? "Match Tied"
                      : matches.teamA?.score > matches.teamB?.score
                      ? `${matches.teamA?.name} beats ${matches.teamB?.name} (${matches.teamA?.score}-${matches.teamB?.score})`
                      : `${matches.teamB?.name} beats ${matches.teamA?.name} (${matches.teamB?.score}-${matches.teamA?.score})`}
                  </h3>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {lastAction && (
        <div className="match_last_action">
          <p>
            {lastAction.type === "raid" || lastAction.type === "defense"
              ? `${lastAction.playerName} scored ${lastAction.points} point${
                  lastAction.points > 1 ? "s" : ""
                } in a ${lastAction.type} for ${lastAction.teamName}`
              : `${lastAction.teamName} scored ${lastAction.points} point${
                  lastAction.points > 1 ? "s" : ""
                }`}
          </p>
        </div>
      )}

      <div className="toggle_cover">
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={(e, newAlignment) =>
            newAlignment && setAlignment(newAlignment)
          }
          className="match_toggle_main"
        >
          <ToggleButton value="line_up" className="custom-toggle">
            Line Up
          </ToggleButton>
          <ToggleButton value="team_stats" className="custom-toggle">
            Team Stats
          </ToggleButton>
        </ToggleButtonGroup>

        {alignment === "line_up" && stats && (
          <ToggleButtonGroup
            value={team}
            exclusive
            onChange={(e, newTeam) => newTeam && setTeam(newTeam)}
            className="match_toggle_team"
          >
            <ToggleButton value="A" className="custom-toggle">
              {matches.teamA?.name}
            </ToggleButton>
            <ToggleButton value="B" className="custom-toggle">
              {matches.teamB?.name}
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      </div>

      {alignment === "team_stats" && totalPoints && (
        <Stats total={totalPoints} />
      )}
      {alignment === "line_up" && stats && (
        <LineUp
          matchId={matchId}
          stats={{
            topRaiders: stats[`team${team}`].topRaiders,
            topDefenders: stats[`team${team}`].topDefenders,
          }}
        />
      )}

      {loading && <LoadingSpinner />}
    </div>
  );
}

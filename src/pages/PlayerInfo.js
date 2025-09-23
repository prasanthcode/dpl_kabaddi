// import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { usePlayerInfo } from "../hooks/usePlayerInfo";

export default function PlayerInfo() {
  const { playerId } = useParams();
  const { player, loading, error } = usePlayerInfo(playerId);

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="main_player">
          <div className="player_info">
            <img
              src={
                player.profilePic ||
                `${process.env.REACT_APP_CLOUDINARY_FILE_BASE_URL}g2xafebqt6zkwwuzdaiy.png`
              }
              alt={player.name}
            />
            <div className="name_team_info">
              <div className="team_info">
                <img
                  src={
                    player.team?.logo ||
                    "https://avatar.iran.liara.run/public/47"
                  }
                  alt={player.team?.name}
                />
              </div>
              <h3>{player.name}</h3>
            </div>
          </div>
          <h2>Player Stats</h2>
          <div className="total_player_stats">
            {player.totalStats.totalRaidPoints > 0 && (
              <div className="stat_type">
                <h1>{player.totalStats.totalRaidPoints}</h1>
                <span>Raid Points</span>
              </div>
            )}
            {player.totalStats.totalDefensePoints > 0 && (
              <div className="stat_type">
                <h1>{player.totalStats.totalDefensePoints}</h1>
                <span>Tackle Points</span>
              </div>
            )}
            {player.totalStats.totalPoints > 0 && (
              <div className="stat_type">
                <h1>{player.totalStats.totalPoints}</h1>
                <span>Points</span>
              </div>
            )}
            {player.totalStats.totalSuper10s > 0 && (
              <div className="stat_type">
                <h1>{player.totalStats.totalSuper10s}</h1>
                <span>Super10s</span>
              </div>
            )}
            {player.totalStats.totalHigh5s > 0 && (
              <div className="stat_type">
                <h1>{player.totalStats.totalHigh5s}</h1>
                <span>High5s</span>
              </div>
            )}
            {player.totalStats.totalSuperRaids > 0 && (
              <div className="stat_type">
                <h1>{player.totalStats.totalSuperRaids}</h1>
                <span>Super Raids</span>
              </div>
            )}
          </div>
          <h2>Player Stats By Match</h2>

          {player.matchStats.some(
            (match) =>
              match.raidPoints > 0 ||
              match.defensePoints > 0 ||
              match.totalPoints > 0 ||
              match.super10 > 0 ||
              match.high5 > 0 ||
              match.superRaids > 0
          ) && (
            <div className="by_match">
              {player.matchStats.map((match) => {
                if (
                  match.raidPoints === 0 &&
                  match.defensePoints === 0 &&
                  match.totalPoints === 0 &&
                  match.super10 === 0 &&
                  match.high5 === 0 &&
                  match.superRaids === 0
                ) {
                  return null;
                }

                return (
                  <div key={match.matchId} className="total_player_stats">
                    <div className="opponent">
                      <img src={player.team.logo} alt={player.team.logo} />
                      <span>VS</span>
                      <img
                        src={match.opponentTeam.logo}
                        alt={match.opponentTeam.name}
                      />
                    </div>
                    {match.raidPoints > 0 && (
                      <div className="stat_type">
                        <h1>{match.raidPoints}</h1>
                        <span>Raid Points</span>
                      </div>
                    )}
                    {match.defensePoints > 0 && (
                      <div className="stat_type">
                        <h1>{match.defensePoints}</h1>
                        <span>Tackle Points</span>
                      </div>
                    )}
                    {match.totalPoints > 0 && (
                      <div className="stat_type">
                        <h1>{match.totalPoints}</h1>
                        <span>Total Points</span>
                      </div>
                    )}
                    {match.super10 > 0 && (
                      <div className="stat_type">
                        <h1>{match.super10}</h1>
                        <span>Super 10</span>
                      </div>
                    )}
                    {match.high5 > 0 && (
                      <div className="stat_type">
                        <h1>{match.high5}</h1>
                        <span>High 5</span>
                      </div>
                    )}
                    {match.superRaids > 0 && (
                      <div className="stat_type">
                        <h1>{match.superRaids}</h1>
                        <span>Super Raids</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}

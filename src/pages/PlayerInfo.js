import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { usePlayerInfo } from "../hooks/usePlayerInfo";
import MatchCard from "../components/MatchCard";
import ShareButton from "../components/ShareButton";

export default function PlayerInfo() {
  const { playerId } = useParams();
  const { player, loading, error } = usePlayerInfo(playerId);

  if (error) return <p>Error: {error}</p>;

  if (loading) return <LoadingSpinner />;

  const hasPlayed =
    player.totalStats.totalRaidPoints > 0 ||
    player.totalStats.totalDefensePoints > 0 ||
    player.totalStats.totalPoints > 0 ||
    player.totalStats.totalSuper10s > 0 ||
    player.totalStats.totalHigh5s > 0 ||
    player.totalStats.totalSuperRaids > 0 ||
    player.matchStats.some(
      (match) =>
        match.raidPoints > 0 ||
        match.defensePoints > 0 ||
        match.totalPoints > 0 ||
        match.super10 > 0 ||
        match.high5 > 0 ||
        match.superRaids > 0
    );

  return (
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
                player.team?.logo || "https://avatar.iran.liara.run/public/47"
              }
              alt={player.team?.name}
            />
          </div>
          <h3>{player.name}</h3>
          <ShareButton />
        </div>
      </div>

      {!hasPlayed ? (
        <div className="not_played">
          <h2 style={{ color: "#abababff" }}>Not yet played</h2>
        </div>
      ) : (
        <>
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
                <span>Total Points</span>
              </div>
            )}
            {player.totalStats.totalSuper10s > 0 && (
              <div className="stat_type">
                <h1>{player.totalStats.totalSuper10s}</h1>
                <span>Super 10s</span>
              </div>
            )}
            {player.totalStats.totalHigh5s > 0 && (
              <div className="stat_type">
                <h1>{player.totalStats.totalHigh5s}</h1>
                <span>High 5s</span>
              </div>
            )}
            {player.totalStats.totalSuperRaids > 0 && (
              <div className="stat_type">
                <h1>{player.totalStats.totalSuperRaids}</h1>
                <span>Super Raids</span>
              </div>
            )}
          </div>

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
                  <MatchCard match={match} />
                  <div className="stat_type_container">
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
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

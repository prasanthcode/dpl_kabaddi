import React from "react";
import { Link } from "react-router-dom";
import "../styles/Matches.css";

const MatchCard = ({ match }) => {
  const getMatchLink = () => {
    if (match.status === "Upcoming") return null;
    if (match.status === "Completed") return `/recent/${match.matchId}`;
    return `/live/${match.matchId}`;
  };
  const matchLink = getMatchLink();

  const cardContent = (
    <div className="matches-single">
      <h4>
        {match.matchType ? match.matchType : `Match ${match.matchNumber}`}
      </h4>

      <div className="matches-vs-container">
        {/* Team A */}
        <div className="matches-img-wrap">
          <img src={match.teamA.logo} alt={match.teamA.name} />
          <div className="matches-team">
            <h3>{match.teamA.name}</h3>
            {match.status !== "Upcoming" && (
              <span
                className={`teama_score ${
                  match.teamA.score > match.teamB.score
                    ? "winner"
                    : match.teamA.score < match.teamB.score
                    ? "loser"
                    : ""
                }`}
              >
                {match.teamA.score}
              </span>
            )}
          </div>
        </div>

        {/* Middle VS / FT / HT */}
        <div
          className="matches-time"
          style={{
            borderColor:
              match.status === "Completed"
                ? "green"
                : match.halfTime && match.status === "Ongoing"
                ? "red"
                : "white",
          }}
        >
          {match.status === "Completed"
            ? "FT"
            : match.status === "Upcoming"
            ? "VS"
            : match.halfTime
            ? "HT"
            : "VS"}
        </div>

        {/* Team B */}
        <div className="matches-img-wrap">
          <img src={match.teamB.logo} alt={match.teamB.name} />
          <div className="matches-team">
            {match.status !== "Upcoming" && (
              <span
                className={`teamb_score ${
                  match.teamB.score > match.teamA.score
                    ? "winner"
                    : match.teamB.score < match.teamA.score
                    ? "loser"
                    : ""
                }`}
              >
                {match.teamB.score}
              </span>
            )}
            <h3>{match.teamB.name}</h3>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="matches-single-wrapper">
      {matchLink ? (
        <Link to={matchLink} style={{ textDecoration: "none", color: "white" }}>
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  );
};

export default MatchCard;

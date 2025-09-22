import React from "react";
import { Link } from "react-router-dom";
import "../styles/Matches.css";

const MatchList = ({ matches = [], status, isHomePage }) => {
  const validMatches = Array.isArray(matches) ? matches : [];
  const matchesByDate = validMatches.reduce((acc, match) => {
    const date = new Date(match.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(match);
    return acc;
  }, {});

  return (
    <div
      className="matches-container"
      style={{ minHeight: !isHomePage ? "100vh" : "" }}
    >
      {Object.entries(matchesByDate).map(([date, matches]) => (
        <div className="matches-date-group" key={date}>
          <h2>
            {matches[0].status !== "Ongoing" ? (
              date && !isNaN(new Date(date)) ? (
                date
              ) : (
                "To be Announced"
              )
            ) : (
              <>
                Live <span className="matches-live-dot"></span>
              </>
            )}
          </h2>

          {matches.map((match, index) => (
            <div className="matches-single-wrapper" key={index}>
              <Link
                to={
                  match.status === "Upcoming"
                    ? "/upcoming"
                    : match.status === "Completed"
                    ? `/recent/${match.matchId}`
                    : `/live/${match.matchId}`
                }
                style={{ textDecoration: "none", color: "white" }}
              >
                <div className="matches-single">
                  <h4>
                    {match.matchType
                      ? match.matchType
                      : `Match ${match.matchNumber}`}
                  </h4>

                  <div className="matches-vs-container">
                    <div className="matches-img-wrap">
                      <img src={match.teamA.logo} alt="" />
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

                    <div className="matches-img-wrap">
                      <img src={match.teamB.logo} alt="" />
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
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatchList;

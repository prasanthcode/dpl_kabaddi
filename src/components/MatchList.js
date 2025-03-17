import React from "react";
import { Link } from "react-router-dom";

const MatchList = ({ matches = [], status, isAdmin }) => {
  // Create an object to store matches grouped by date
  const matchesByDate = {};

  // Loop through each match and group them by date
  matches.forEach((match) => {
    const date = new Date(match.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    // If the date doesn't exist in the object, create it
    if (!matchesByDate[date]) {
      matchesByDate[date] = [];
    }
    // Push the match to the corresponding date group
    matchesByDate[date].push(match);
  });

  return (
    <div className="match_container">
      {Object.entries(matchesByDate).map(([date, matches]) => (
        <div className="d_match" key={date}>
          <h2>
            {status !== "live" ? (
              date
            ) : (
              <>
                Live <span className="live-dot"></span>
              </>
            )}
          </h2>
          {matches.map((match, index) => (
            <div className="single_match_wrapper" key={index}>
              {/* Admin Edit Button at the top of each match */}
              {isAdmin && (
                <Link
                  to={`/addscore/${match.matchId}`}
                  style={{ textDecoration: "none", color: "white" }}
                  className="edit_button"
                >
                  📝 Edit Match
                </Link>
              )}

              {/* Clickable Match */}
              <Link
                to={
                  status === "upcoming"
                    ? "/upcoming"
                    : status === "completed"
                    ? `/recent/${match.matchId}`
                    : `/live/${match.matchId}`
                }
                style={{ textDecoration: "none", color: "white" }}
              >
                <div className="single_match">
                  <h4>{`Match ${match.matchNumber}`}</h4>
                  <div className="vs_container">
                    <div className="img_wrap">
                      <img src={match.teamA.logo} alt="" />
                      <div className="team_1">
                        <h3>{match.teamA.name}</h3>
                        {status !== "upcoming" && (
                          <span className="teama_score">{match.teamA.score}</span>
                        )}
                      </div>
                    </div>
                    <div
                      className="time"
                      style={{
                        backgroundColor:
                          status === "completed" ? "rgb(34, 139, 69)" : "white",
                        color: status === "completed" ? "white" : "black",
                      }}
                    >
                      {status === "completed" ? "FT" : "VS"}
                    </div>
                    <div className="img_wrap">
                      <img src={match.teamB.logo} alt="" />
                      <div className="team_1">
                        {status !== "upcoming" && (
                          <span className="teamb_score">{match.teamB.score}</span>
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

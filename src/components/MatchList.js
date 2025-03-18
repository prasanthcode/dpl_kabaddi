import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MatchList = ({ matches = [], status, isAdmin,isHomePage }) => {
  // Ensure matches is an array before using forEach
  const validMatches = Array.isArray(matches) ? matches : [];

  // Create an object to store matches grouped by date
  const matchesByDate = validMatches.reduce((acc, match) => {
    const date = new Date(match.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (!acc[date]) acc[date] = [];
    acc[date].push(match);
    return acc;
  }, {});

  return (
    <div className="match_container" style={{minHeight: !isHomePage ? "100vh":""}}>
      {Object.entries(matchesByDate).map(([date, matches]) => (
        <div className="d_match" key={date}>
          <h2>
            {status !== "live" ? date : <>Live <span className="live-dot"></span></>}
          </h2>
          {matches.map((match, index) => (
            <div className="single_match_wrapper" key={index}>
              {isAdmin && (
                <Link
                  to={`/addscore/${match.matchId}`}
                  className="edit_button"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  📝 Edit Match
                </Link>
              )}

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
                        backgroundColor: status === "completed" ? "rgb(34, 139, 69)" : "white",
                        color: status === "completed" ? "white" : "black",
                      }}
                    >
                     {
  status === "completed" 
    ? "FT" 
    : status === "upcoming" 
      ? "VS" 
      : match.halfTime 
        ? "HT" 
        : "VS"
}
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
                {status==="live" && (
  <Typography
    variant="subtitle1" 
    sx={{ 
      fontWeight: "bold", 
      color: "white", 
      backgroundColor: "var(--primary-dark)", 
      padding: "5px 10px",
      fontSize:"15px", 
      borderRadius: "5px",
      display: "inline-block"
    }}
  >
    ⚡ Score updates automatically, no need to refresh! 
  </Typography>
)}
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatchList;

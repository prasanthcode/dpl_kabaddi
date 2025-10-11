import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Matches.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MatchCard from "./MatchCard";

const MatchList = ({ matches = [], isHomePage }) => {
  const validMatches = useMemo(
    () => (Array.isArray(matches) ? matches : []),
    [matches]
  );

  const allTeams = useMemo(() => {
    const teamSet = new Set();
    validMatches.forEach((match) => {
      teamSet.add(match.teamA.name);
      teamSet.add(match.teamB.name);
    });
    return Array.from(teamSet);
  }, [validMatches]);

  const [selectedTeam, setSelectedTeam] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredMatches = selectedTeam
    ? validMatches.filter(
        (match) =>
          match.teamA.name === selectedTeam || match.teamB.name === selectedTeam
      )
    : validMatches;

  const matchesByDate = filteredMatches.reduce((acc, match) => {
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
      {/* Custom Dropdown */}
      {!isHomePage && (
        <div
          className="custom-dropdown"
          ref={dropdownRef}
          style={{
            marginBottom: "20px",
            position: "relative",
            width: "250px",
          }}
        >
          <div
            className="dropdown-selected"
            onClick={toggleDropdown}
            style={{
              padding: "10px",
              backgroundColor: "#c9c9c9",
              color: "black",
              cursor: "pointer",
              borderRadius: "4px",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {selectedTeam || "All Teams"} <ArrowDropDownIcon />
          </div>
          {dropdownOpen && (
            <div
              className="dropdown-options"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "#c9c9c9",
                color: "black",
                borderRadius: "4px",
                marginTop: "4px",
                zIndex: 1000,
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              <div
                className="dropdown-option"
                onClick={() => handleTeamSelect("")}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedTeam === "" ? "#edededff" : "transparent",
                }}
              >
                All Teams
              </div>
              {allTeams.map((team) => (
                <div
                  key={team}
                  className="dropdown-option"
                  onClick={() => handleTeamSelect(team)}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    backgroundColor:
                      selectedTeam === team ? "#edededff" : "transparent",
                    "&:hover": { backgroundColor: "#edededff" },
                  }}
                >
                  {team}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Matches grouped by date */}
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
                <MatchCard match={match} />
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatchList;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import useLiveMatchesCheck from "../../hooks/useLiveMatchesCheck";

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  const { showLive } = useLiveMatchesCheck();

  return (
    <div className="buttons">
      <Link
        to="/"
        style={{
          textDecoration: path === "/" ? "underline" : "none",
          textUnderlineOffset: "6px",
          textDecorationThickness: "2px",
        }}
      >
        <FontAwesomeIcon icon={faHome} />
      </Link>

      <Link
        to={showLive ? "/live" : "/completed"}
        style={{
          textDecoration:
            path === "/live" || path === "/upcoming" || path === "/completed"
              ? "underline"
              : "none",
          textUnderlineOffset: "6px",
          textDecorationThickness: "2px",
        }}
      >
        Matches
      </Link>

      <Link
        to="/teams"
        style={{
          textDecoration:
            path === "/teams" || path.startsWith("/team/")
              ? "underline"
              : "none",
          textUnderlineOffset: "6px",
          textDecorationThickness: "2px",
        }}
      >
        Teams
      </Link>

      <Link
        to="/standings"
        style={{
          textDecoration: path === "/standings" ? "underline" : "none",
          textUnderlineOffset: "6px",
          textDecorationThickness: "2px",
        }}
      >
        Standings
      </Link>

      <Link
        to="/playerstats"
        style={{
          textDecoration: path === "/playerstats" ? "underline" : "none",
          textUnderlineOffset: "6px",
          textDecorationThickness: "2px",
        }}
      >
        Stats
      </Link>
    </div>
  );
}

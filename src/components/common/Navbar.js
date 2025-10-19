import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBars,
  faTimes,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import useLiveMatchesCheck from "../../hooks/useLiveMatchesCheck";
import "../../styles/Navbar.css";
import Search from "../../pages/Search";

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  const { showLive } = useLiveMatchesCheck();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="navbar">
        <div className="nav-title">
          <Link to="/" className={path === "/" ? "active" : ""}>
            DPL
          </Link>
        </div>

        {/* Desktop links */}
        <div className="nav-links">
          <Link
            to={showLive ? "/live" : "/completed"}
            className={
              path === "/live" || path === "/upcoming" || path === "/completed"
                ? "active"
                : ""
            }
          >
            Matches
          </Link>

          <Link
            to="/teams"
            className={
              path === "/teams" || path.startsWith("/team/") ? "active" : ""
            }
          >
            Teams
          </Link>

          <Link
            to="/standings"
            className={path === "/standings" ? "active" : ""}
          >
            Standings
          </Link>

          <Link
            to="/playerstats"
            className={path === "/playerstats" ? "active" : ""}
          >
            Stats
          </Link>
        </div>

        {/* Hamburger button for mobile */}
        <div className="nav-icons">
          <button className="icon-button">
            <Search />
          </button>
          <button className="icon-button">
            <Link to="/login">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </button>
          <button
            className="hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* <Link to="/" onClick={() => setSidebarOpen(false)}>
          {" "}
          <FontAwesomeIcon icon={faHome} />
        </Link> */}
        <Link
          to={showLive ? "/live" : "/completed"}
          onClick={() => setSidebarOpen(false)}
        >
          Matches
        </Link>
        <Link to="/teams" onClick={() => setSidebarOpen(false)}>
          Teams
        </Link>
        <Link to="/standings" onClick={() => setSidebarOpen(false)}>
          Standings
        </Link>
        <Link to="/playerstats" onClick={() => setSidebarOpen(false)}>
          Stats
        </Link>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
      )}
    </>
  );
}

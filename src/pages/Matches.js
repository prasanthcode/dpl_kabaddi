import { Link, useLocation } from "react-router-dom";
import MatchList from "../components/MatchList";
import MatchListSkeleton from "../components/MatchListSkeleton";
import { useFilteredMatches } from "../hooks/useFilteredMatches";
import useLiveMatchesCheck from "../hooks/useLiveMatchesCheck";
import "../styles/Matches.css";

export default function Matches() {
  const location = useLocation();
  const path = location.pathname;
  const isHomePage = path === "/";

  const { showLive, isChecking } = useLiveMatchesCheck();

  const url = isHomePage
    ? showLive
      ? "live"
      : "completed"
    : path.replace("/", "");
  const limit = isHomePage ? (showLive ? null : 1) : null;

  const { matches, loading } = useFilteredMatches(url, limit);

  // unified loading phase
  const isLoading = loading || isChecking || matches === null;

  return (
    <div className="matches-page">
      {!isHomePage && (
        <div className="matches-buttons">
          {["live", "upcoming", "completed"].map((type) => (
            <Link
              key={type}
              to={`/${type}`}
              style={{
                backgroundColor: path === `/${type}` ? "orange" : "",
                color: path === `/${type}` ? "black" : "",
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Link>
          ))}
        </div>
      )}

      {isLoading ? (
        <MatchListSkeleton isHomePage={isHomePage} />
      ) : matches.length === 0 ? (
        <p
          className="matches-empty-message"
          style={{
            minHeight: "100vh",
            padding: "20px",
            fontSize: "18px",
            textAlign: "center",
          }}
        >
          No {url} Matches
        </p>
      ) : (
        <MatchList matches={matches} isHomePage={isHomePage} />
      )}
    </div>
  );
}

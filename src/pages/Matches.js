import { Link, useLocation } from "react-router-dom";
import MatchList from "../components/MatchList";
import MatchListSkeleton from "../components/MatchListSkeleton";
import { useFilteredMatches } from "../hooks/useFilteredMatches";
import { useLiveMatchConnection } from "../hooks/useLiveMatchConnection";
import "../styles/Matches.css";

export default function Matches({ url = "live", limit = null }) {
  const location = useLocation();
  const path = location.pathname;
  const isHomePage = path === "/";
  const { matches, loading } = useFilteredMatches(url, limit);

  const hasLiveMatch = matches.some((m) => m.status === "Ongoing");
  useLiveMatchConnection(hasLiveMatch);

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

      {loading ? (
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
        <MatchList matches={matches} status={url} isHomePage={isHomePage} />
      )}
    </div>
  );
}

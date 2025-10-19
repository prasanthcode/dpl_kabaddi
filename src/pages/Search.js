import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSearchResults } from "../services/searchApi";
import "../styles/Search.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [results, setResults] = useState({ players: [], teams: [] });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults({ players: [], teams: [] });
      return;
    }

    const fetchResults = async () => {
      try {
        const res = await getSearchResults(debouncedQuery);
        const players = res.data?.players || [];
        const teams = res.data?.teams || [];
        setResults({ players, teams });
      } catch (err) {
        console.error(err);
        setResults({ players: [], teams: [] });
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const clearSearch = () => {
    setQuery("");
    setResults({ players: [], teams: [] });
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="search-input"
      />

      {(results?.players?.length > 0 || results?.teams?.length > 0) && (
        <div className="search-results">
          {results.players.map((player) => (
            <Link
              key={player._id}
              to={`/player/${player._id}`}
              className="search-result-item"
              onClick={clearSearch}
            >
              {player.name} <span className="type-label">Player</span>
            </Link>
          ))}
          {results.teams.map((team) => (
            <Link
              key={team._id}
              to={`/team/${team._id}`}
              className="search-result-item"
              onClick={clearSearch}
            >
              {team.name} <span className="type-label">Team</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

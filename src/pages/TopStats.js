import React, { useState } from "react";
import PlayersStats from "../components/TopPlayers";
import TeamsStats from "../components/TopTeams";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function TopStats() {
  const [view, setView] = useState("players"); // default is players

  const handleChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* Toggle Buttons */}
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleChange}
        aria-label="stats toggle"
        sx={{
          margin: "20px 0",
          backgroundColor: "var(--primary-dark)",
          borderRadius: "12px",
        }}
      >
        <ToggleButton
          value="players"
          aria-label="players stats"
          sx={{
            color: "var(--text-light)",
            "&.Mui-selected": {
              backgroundColor: "#1976d2",
              color: "#fff",
            },
          }}
        >
          Players
        </ToggleButton>
        <ToggleButton
          value="teams"
          aria-label="teams stats"
          sx={{
            color: "var(--text-light)",
            "&.Mui-selected": {
              backgroundColor: "#1976d2",
              color: "#fff",
            },
          }}
        >
          Teams
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Conditional Render */}
      {view === "players" ? <PlayersStats /> : <TeamsStats />}
    </div>
  );
}

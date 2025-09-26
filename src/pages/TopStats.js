import React, { useState } from "react";
import PlayersStats from "../components/TopPlayers";
import TeamsStats from "../components/TopTeams";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function TopStats() {
  const [view, setView] = useState("players");

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
          padding: "4px",
          margin: "10px",
          backgroundColor: "#f5f5f5",
          display: "inline-flex",
        }}
      >
        <ToggleButton
          value="players"
          aria-label="players stats"
          sx={{
            textTransform: "none",
            fontWeight: 600,

            px: 3,
            py: 1,
            "&.Mui-selected": {
              backgroundColor: "var(--primary-light)",
              color: "#fff",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#2461acff",
            },
            "&:not(.Mui-selected)": {
              backgroundColor: "#fff",
              color: "#000",
            },
          }}
        >
          Player
        </ToggleButton>
        <ToggleButton
          value="teams"
          aria-label="teams stats"
          sx={{
            textTransform: "none",
            fontWeight: 600,

            px: 3,
            py: 1,
            "&.Mui-selected": {
              backgroundColor: "var(--primary-light)",
              color: "#fff",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#2461acff",
            },
            "&:not(.Mui-selected)": {
              backgroundColor: "#fff",
              color: "#000",
            },
          }}
        >
          Team
        </ToggleButton>
      </ToggleButtonGroup>

      {view === "players" ? <PlayersStats /> : <TeamsStats />}
    </div>
  );
}

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
          borderRadius: "12px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          display: "inline-flex",
        }}
      >
        {["players", "teams"].map((val) => (
          <ToggleButton
            key={val}
            value={val}
            aria-label={`${val} stats`}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              py: 1,
              borderRadius: "10px",
              "&.Mui-selected": {
                background: "rgba(36,97,172,0.8)", // semi-transparent selected
                color: "#fff",
                boxShadow: "0 4px 15px rgba(36,97,172,0.4)",
              },
              "&.Mui-selected:hover": {
                background: "rgba(36,97,172,1)",
              },
              "&:not(.Mui-selected)": {
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                "&:hover": {
                  background: "rgba(255,255,255,0.3)",
                },
              },
            }}
          >
            {val === "players" ? "Player" : "Team"}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {view === "players" ? <PlayersStats /> : <TeamsStats />}
    </div>
  );
}

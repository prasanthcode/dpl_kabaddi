import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function PlayerSelector({
  players,
  teamName,
  teamId,
  selectedPlayer,
  handlePlayerChange,
  teamIndex,
}) {
  return (
    <ToggleButtonGroup
      value={selectedPlayer}
      exclusive
      orientation="vertical"
      onChange={(event, newSelected) =>
        handlePlayerChange(event, newSelected, teamIndex, teamId)
      }
      aria-label="Select Player"
    >
      {/* Team Button */}
      <ToggleButton
        value={teamId}
        sx={{
          width: 150,
          height: 45,
          margin: "5px",
          fontWeight: "bold",
          backgroundColor: "#fff3c7ff",
          color: "black",
          "&.Mui-selected": {
            backgroundColor: "#ff9800",
            color: "white",
            "&:hover": {
              backgroundColor: "#ff9800",
            },
          },
        }}
      >
        {teamName}
      </ToggleButton>

      {/* Player Buttons */}
      {players.map((player) => (
        <ToggleButton
          key={player._id}
          value={player._id}
          sx={{
            width: 150,
            height: 45,
            margin: "5px",
            backgroundColor: "white",
            color: "black",
            "&.Mui-selected": {
              backgroundColor: "#1976d2",
              color: "white",
              "&:hover": {
                backgroundColor: "#1976d2",
              },
            },
          }}
        >
          {player.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

import React from "react";
import { Box, ToggleButton, ToggleButtonGroup, Button } from "@mui/material";

export default function ActionScorePanel({
  btnPosition,
  selectedAction,
  setSelectedAction,
  selectedScore,
  setSelectedScore,
  handleSubmit,
  scoreLoading,
  rd,
}) {
  return (
    <Box
      position="absolute"
      top={`${btnPosition.top}px`}
      left={`${btnPosition.left}px`}
      bgcolor="white"
      padding="10px"
      boxShadow={4}
      borderRadius={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      minWidth={100}
      zIndex={1000}
    >
      <ToggleButtonGroup
        value={selectedAction}
        exclusive
        onChange={(e, val) => val && setSelectedAction(val)}
        disabled={!rd}
        sx={{ mb: 1, display: !rd ? "none" : "block" }}
      >
        {["R", "D"].map((letter) => (
          <ToggleButton
            key={letter}
            value={letter}
            sx={{
              width: 40,
              height: 40,
              fontWeight: "bold",
              border: "1px solid #b6c4e0",
              color: "#0f1724",
              "&.Mui-selected": {
                backgroundColor: "#1976d2",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#1976d2",
                },
              },
              "&:hover": {
                backgroundColor: "#e3e8f1",
              },
            }}
          >
            {letter}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Score Selection */}
      <ToggleButtonGroup
        value={selectedScore}
        exclusive
        onChange={(e, val) => val && setSelectedScore(val)}
        sx={{ mb: 2 }}
      >
        {["1", "2", "3", "4"].map((score) => (
          <ToggleButton
            key={score}
            value={score}
            disabled={selectedAction === "D" && score !== "1"}
            sx={{
              width: 40,
              height: 40,
              fontWeight: "bold",
              border: "1px solid #b6c4e0",
              color: "#0f1724",
              "&.Mui-selected": {
                backgroundColor: "#388e3c",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#388e3c",
                },
              },
              "&:hover": {
                backgroundColor: "#e3f2e1",
              },
            }}
          >
            {score}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Submit */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={scoreLoading}
        sx={{ mt: 1 }}
      >
        {scoreLoading ? "Updating..." : "Submit"}
      </Button>
    </Box>
  );
}

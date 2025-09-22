import { Box, Typography } from "@mui/material";

export default function ScoreBoard({ score, handleCloseSubmit, teams }) {
  return (
    <Box
      onClick={handleCloseSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        backgroundColor: "rgba(0, 56, 115)",
        padding: "10px 20px",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
        <span
          style={{
            fontSize: "small",
            width: "60px",
            textAlign: "right",
            display: "inline-block",
            marginRight: "32px",
            verticalAlign: "middle",
          }}
        >
          {teams.teamA}
        </span>
        {score ? score.teamA.score : "0"}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#ffffffff" }}>
        VS
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
        {score ? score.teamB.score : "0"}
        <span
          style={{
            fontSize: "small",
            width: "60px",
            textAlign: "left",
            display: "inline-block",
            marginLeft: "32px",
            verticalAlign: "middle",
          }}
        >
          {teams.teamB}
        </span>
      </Typography>
    </Box>
  );
}

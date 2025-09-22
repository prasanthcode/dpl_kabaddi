import React from "react";
import { Paper, Typography } from "@mui/material";

export default function StatsCard({ title, value, subtitle }) {
  return (
    <Paper elevation={1} style={{ padding: 16, minWidth: 180 }}>
      <Typography variant="subtitle2" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="h5" style={{ marginTop: 6 }}>
        {value}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="textSecondary">
          {subtitle}
        </Typography>
      )}
    </Paper>
  );
}

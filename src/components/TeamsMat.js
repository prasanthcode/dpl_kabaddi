import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Card, CardContent, Typography } from "@mui/material";

// Reusable TeamCheckboxes Component
const TeamCheckboxes = ({ teamName }) => {
  const totalPlayers = 7;
  const [checkedPlayers, setCheckedPlayers] = useState(Array(totalPlayers).fill(false));

  // Function to handle checkbox click
  const handleCheckboxChange = (index) => {
    const newChecked = checkedPlayers.map((_, i) => i <= index); // Check all left boxes including clicked one
    setCheckedPlayers(newChecked);
  };

  return (
    <Card sx={{ width: 350, textAlign: "center"}}>
      <CardContent>
        <Typography variant="h6">{teamName}</Typography>
        <Typography variant="subtitle1">Players Checked: {checkedPlayers.filter(Boolean).length}</Typography>
        <div>
          {checkedPlayers.map((checked, index) => (
            <Checkbox
              key={index}
              checked={checked}
              onChange={() => handleCheckboxChange(index)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Component Rendering Two Teams
export default function TeamsMat() {
  return (
    <div style={{ display: "flex", flexDirection:"column", justifyContent: "center", gap: "10px"}}>
      <TeamCheckboxes teamName="Team A" />
      <TeamCheckboxes teamName="Team B" />
    </div>
  );
}

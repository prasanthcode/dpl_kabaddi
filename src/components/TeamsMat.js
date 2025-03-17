import React, { useState, useEffect, useCallback } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { debounce } from "lodash";

// Reusable TeamCheckboxes Component
const TeamCheckboxes = ({ teamName, teamMat, updateTeamMat }) => {
  const totalPlayers = 7;
  const [checkedPlayers, setCheckedPlayers] = useState(Array(totalPlayers).fill(false));

  useEffect(() => {
    // Set the checkboxes based on `teamMat` value
    setCheckedPlayers((prev) => prev.map((_, i) => i < teamMat));
  }, [teamMat]);

  // Handle Checkbox Change
  const handleCheckboxChange = (index) => {
    const newChecked = checkedPlayers.map((_, i) => i <= index);
    setCheckedPlayers(newChecked);

    // Update mat players count in DB
    updateTeamMat(newChecked.filter(Boolean).length);
  };

  return (
    <Card sx={{ width: 350, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h6">{teamName}</Typography>
        <Typography variant="subtitle1">Players Checked: {checkedPlayers.filter(Boolean).length}</Typography>
        <div>
          {checkedPlayers.map((checked, index) => (
            <Checkbox key={index} checked={checked} onChange={() => handleCheckboxChange(index)} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Component Rendering Two Teams
export default function TeamsMat({ matchId }) {
  const [teamAMat, setTeamAMat] = useState(7);
  const [teamBMat, setTeamBMat] = useState(7);

  // Fetch current match data
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/matches/${matchId}`)
      .then((response) => {
        setTeamAMat(response.data.teamAMat);
        setTeamBMat(response.data.teamBMat);
      })
      .catch((error) => console.error("Error fetching match data:", error));
  }, [matchId]);

  // Debounced function to update DB
  const updateTeamMat = useCallback(
    debounce((team, value) => {
      axios.put(`${process.env.REACT_APP_API_URL}/api/matches/${matchId}/teammat`, {
        [team]: value,
      })
      .then((response) => console.log("Updated:", response.data))
      .catch((error) => console.error("Error updating team mat:", error));
    }, 500), // 500ms debounce time
    [matchId]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px" }}>
      <TeamCheckboxes teamName="Team A" teamMat={teamAMat} updateTeamMat={(value) => updateTeamMat("teamAMat", value)} />
      <TeamCheckboxes teamName="Team B" teamMat={teamBMat} updateTeamMat={(value) => updateTeamMat("teamBMat", value)} />
    </div>
  );
}

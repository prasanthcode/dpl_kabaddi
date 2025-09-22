import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TimeSelectionRadio = ({ label, options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (onChange) onChange(event.target.value);
  };

  return (
    <FormControl component="fieldset" sx={{ width: "100%" }}>
      <FormLabel
        component="legend"
        sx={{
          fontWeight: 600,
          color: "#0f1724",
          mb: 1,
          fontSize: "1.1rem",
        }}
      >
        {label}
      </FormLabel>
      <RadioGroup
        row
        value={selectedValue}
        onChange={handleChange}
        sx={{ gap: 3, justifyContent: "center" }}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                sx={{
                  color: "#1976d2",
                  "&.Mui-checked": { color: "#1976d2" },
                }}
              />
            }
            label={
              <span style={{ fontWeight: 500, fontSize: "1rem" }}>
                {option.label}
              </span>
            }
            sx={{
              background: "#f5f8ff",
              borderRadius: "8px",
              px: 2,
              py: 0.5,
              mx: 1,
              boxShadow: "0 1px 4px 0 rgba(25, 118, 210, 0.06)",
              transition: "background 0.2s",
              "&:hover": {
                background: "#e3eefd",
              },
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default function TimeSelection({ matchId }) {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState("");

  const handleSubmit = async () => {
    if (!matchId) {
      alert("Match ID is missing!");
      return;
    }

    try {
      if (selectedTime === "HT") {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/api/matches/${matchId}/halftime`
        );
        alert("Match status updated to Half Time!");
      } else if (selectedTime === "FT") {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/api/matches/${matchId}/complete`
        );
        alert("Match status updated to Completed!");
        navigate("/admin/matches");
      }
    } catch (error) {
      console.error("Error updating match status:", error);
      alert("Failed to update match status.");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 3,
        p: 3,
        maxWidth: 400,
        mx: "auto",
        background: "#fff",
        borderRadius: 3,
        boxShadow: "0 2px 12px 0 rgba(25, 118, 210, 0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <TimeSelectionRadio
        label="Select Match Time"
        options={[
          { value: "HT", label: "Half Time" },
          { value: "FT", label: "Full Time" },
        ]}
        onChange={setSelectedTime}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!selectedTime}
        sx={{
          borderRadius: 2,
          px: 4,
          py: 1,
          fontWeight: 600,
          fontSize: "1rem",
          boxShadow: "0 2px 8px 0 rgba(25, 118, 210, 0.08)",
          textTransform: "none",
        }}
      >
        Set Time
      </Button>
    </Paper>
  );
}

import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TimeSelectionRadio = ({ label, options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (onChange) onChange(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row value={selectedValue} onChange={handleChange}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
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
      await axios.put(`/api/matches/${matchId}/complete`);
      alert("Match status updated to Completed!");
      navigate("/"); 
    } catch (error) {
      console.error("Error updating match status:", error);
      alert("Failed to update match status.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <TimeSelectionRadio
        label="Select Time"
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
        disabled={selectedTime !== "FT"} // Only allow submission for FT
      >
        Submit
      </Button>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import axios from "axios";

export default function PlayerSelect({ value, onChange, label = "Select Player" }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("/api/players");
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <Autocomplete sx={{backgroundColor:"white"}}
      options={players}
      getOptionLabel={(option) => `${option.name} - ${option.team.name}`} // Display format
      value={players.find((p) => p._id === value) || null}
      onChange={(event, newValue) => onChange(newValue ? newValue._id : null)}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

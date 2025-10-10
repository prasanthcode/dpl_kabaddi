import React from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";

export default function MatchDialog({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  teams,
  saving,
  isEdit = false,
  matches = [],
}) {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const allMatchTypes = ["Qualifier 1", "Eliminator", "Final", "Qualifier 2"];

  const usedTypes = matches.map((m) => m.matchType);
  const availableMatchTypes = allMatchTypes.filter(
    (type) => !usedTypes.includes(type) || type === form.matchType
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Edit Match" : "Add Match"}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          {isEdit && (
            <TextField
              label="Match Number"
              type="number"
              name="matchNumber"
              value={form.matchNumber || ""}
              onChange={handleChange}
              fullWidth
              disabled
            />
          )}

          <TextField
            select
            label="Team A"
            name="teamA"
            value={form.teamA}
            onChange={handleChange}
            fullWidth
            disabled={isEdit}
          >
            {teams.map((t) => (
              <MenuItem key={t._id} value={t._id}>
                {t.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Team B"
            name="teamB"
            value={form.teamB}
            onChange={handleChange}
            fullWidth
            disabled={isEdit}
          >
            {teams.map((t) => (
              <MenuItem key={t._id} value={t._id}>
                {t.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Match Type"
            name="matchType"
            value={form.matchType}
            onChange={handleChange}
            fullWidth
          >
            {availableMatchTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Date & Time"
            type="datetime-local"
            name="date"
            value={form.date || ""}
            onChange={handleChange}
            fullWidth
          />

          {isEdit && (
            <TextField
              select
              label="Status"
              name="status"
              value={form.status || ""}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Upcoming">Upcoming</MenuItem>
              <MenuItem value="Ongoing">Ongoing</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </TextField>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving} color="error">
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          disabled={saving}
          variant="contained"
          color={isEdit ? "primary" : "success"}
        >
          {saving ? "Saving..." : isEdit ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

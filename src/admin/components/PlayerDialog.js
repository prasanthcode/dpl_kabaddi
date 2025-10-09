import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function PlayerDialog({
  open,
  onClose,
  onSubmit,
  saving,
  editId,
  form,
  setForm,
  preview,
  setPreview,
  teams,
}) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, profilePic: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => !saving && onClose()}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{editId ? "Edit Player" : "Add Player"}</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent dividers>
          <Box mb={2}>
            <TextField
              label="Player Name"
              variant="outlined"
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </Box>

          <Box mb={2}>
            <TextField
              select
              label="Team"
              variant="outlined"
              fullWidth
              value={form.team}
              onChange={(e) => setForm({ ...form, team: e.target.value })}
              required
            >
              {teams.map((t) => (
                <MenuItem key={t._id} value={t._id}>
                  {t.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box mb={2}>
            <Typography variant="body2" gutterBottom>
              Profile Picture
            </Typography>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </Box>

          {preview && (
            <Box mb={2} display="flex" justifyContent="center">
              <img
                src={preview}
                alt="Profile Preview"
                style={{ height: 250}}
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="error" disabled={saving}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={saving}
          >
            {saving ? "Saving..." : editId ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

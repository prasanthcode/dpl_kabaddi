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

          <Box
            mb={2}
            sx={{
              border: "2px dashed #90caf9",
              borderRadius: "12px",
              p: 3,
              textAlign: "center",
              backgroundColor: "rgba(144, 202, 249, 0.05)",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "rgba(144, 202, 249, 0.1)",
                borderColor: "#42a5f5",
              },
            }}
          >
            <Typography
              variant="body2"
              gutterBottom
              sx={{ fontWeight: 500, color: "#1976d2", mb: 1 }}
            >
              Profile Picture
            </Typography>

            <label
              htmlFor="image-upload"
              style={{
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: "8px",
                background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 500,
                fontSize: "0.9rem",
                transition: "0.3s",
              }}
            >
              Choose File
            </label>

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </Box>

          {preview && (
            <Box mb={2} display="flex" justifyContent="center">
              <img
                src={preview}
                alt="Profile Preview"
                style={{ height: 250 }}
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

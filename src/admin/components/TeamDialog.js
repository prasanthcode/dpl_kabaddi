import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function TeamDialog({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  preview,
  setPreview,
  editId,
  saving,
}) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, logo: file });
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
      <DialogTitle>{editId ? "Edit Team" : "Add Team"}</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent dividers>
          <Box mb={2}>
            <TextField
              label="Team Name"
              variant="outlined"
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </Box>

          <Box mb={2}>
            <Typography variant="body2" gutterBottom>
              Logo
            </Typography>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </Box>

          {preview && (
            <Box mb={2} display="flex" justifyContent="center">
              <img
                src={preview}
                alt="Logo Preview"
                style={{ width: 80, height: 80, borderRadius: "50%" }}
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

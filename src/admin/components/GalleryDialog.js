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
  MenuItem,
} from "@mui/material";

export default function GalleryDialog({
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
      setForm({ ...form, file, url: "" });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setForm({ ...form, url, file: null });
    setPreview(url);
  };

  return (
    <Dialog
      open={open}
      onClose={() => !saving && onClose()}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{editId ? "Edit Gallery" : "Add Gallery"}</DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent dividers>
          <Box mb={2}>
            <TextField
              label="Caption"
              variant="outlined"
              fullWidth
              value={form.caption}
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
            />
          </Box>

          <Box mb={2}>
            <TextField
              select
              label="Type"
              variant="outlined"
              fullWidth
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              required
            >
              <MenuItem value="teams">Teams</MenuItem>
              <MenuItem value="carousel">Carousel</MenuItem>
              <MenuItem value="post">Post</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Box>

          {/* File input */}
          <Box mb={2}>
            <Typography variant="body2" gutterBottom>
              Upload Image
            </Typography>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </Box>

          {/* OR URL input */}
          <Box mb={2}>
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              value={form.url || ""}
              onChange={handleUrlChange}
            />
          </Box>

          {preview && (
            <Box mb={2} display="flex" justifyContent="center">
              <img
                src={preview}
                alt="Preview"
                style={{ height: 250, borderRadius: 8 }}
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

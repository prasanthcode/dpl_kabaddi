import React, { useState } from "react";
import DataTable from "../components/DataTable";
import GalleryDialog from "../components/GalleryDialog";
import "../admin.css";
import { Button, Box, Typography } from "@mui/material";
import { useGallery } from "../../hooks/useGallery";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Gallery() {
  const { loading, galleries, addGallery, deleteGallery, updateGallery } =
    useGallery();

  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState({ caption: "", type: "", file: null });
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleEdit = (row) => {
    setForm({ caption: row.caption, type: row.type, file: null });
    setPreview(row.url || null);
    setEditId(row._id);
    setOpenForm(true);
  };

  const handleDelete = async (row) => {
    if (window.confirm(`Delete this post?`)) {
      try {
        await deleteGallery(row._id);
        toast.success(`${row.type} gallery image deleted successfully!`);
      } catch {
        toast.error("Failed to delete gallery post");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.caption.trim()) {
      toast.error("Caption cannot be empty!");
      return;
    }

    if (!form.type) {
      toast.error("Please select a type!");
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("caption", form.caption.trim());
      formData.append("type", form.type);

      if (form.file) {
        formData.append("file", form.file);
      }

      if (editId) {
        await updateGallery(editId, formData);
        toast.success("Gallery post updated successfully!");
      } else {
        await addGallery(formData);
        toast.success("Gallery post added successfully!");
      }

      setForm({ caption: "", type: "", file: null });
      setPreview(null);
      setEditId(null);
      setOpenForm(false);
    } catch (err) {
      console.error("Failed to save gallery", err);
      toast.error("Failed to save gallery post!");
    } finally {
      setSaving(false);
    }
  };

  const galleryTypes = ["teams", "carousel", "post", "other"];

  return (
    <>
      {/* <Stack direction="row" spacing={2} flexWrap="wrap" mb={3}>
        {galleryTypes.map((type) => (
          <Button
            key={type}
            variant="contained"
            color="primary"
            onClick={() => {
              setForm({ caption: "", type, file: null });
              setPreview(null);
              setEditId(null);
              setOpenForm(true);
            }}
          >
            + Add {type.charAt(0).toUpperCase() + type.slice(1)} Post
          </Button>
        ))}
      </Stack> */}

      {galleryTypes.map((type) => {
        const filtered = (galleries || []).filter((g) => g.type === type);

        return (
          <Box key={type} mb={5}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                textTransform: "capitalize",
                marginBottom: "8px",
                color: "black",
              }}
            >
              {type} Gallery
            </Typography>
            <Button
              key={type}
              variant="contained"
              color="primary"
              sx={{ mb: 2 }}
              onClick={() => {
                setForm({ caption: "", type, file: null });
                setPreview(null);
                setEditId(null);
                setOpenForm(true);
              }}
            >
              + Add {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
            <DataTable
              columns={[
                {
                  field: "url",
                  headerName: "Image",
                  render: (row) =>
                    row.url ? (
                      <img
                        src={row.url}
                        alt="gallery"
                        style={{ height: 60, borderRadius: 8 }}
                      />
                    ) : (
                      "No Image"
                    ),
                },
                { field: "caption", headerName: "Caption" },
              ]}
              rows={loading ? [] : filtered}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
            />
          </Box>
        );
      })}

      <GalleryDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        preview={preview}
        setPreview={setPreview}
        editId={editId}
        saving={saving}
      />
    </>
  );
}

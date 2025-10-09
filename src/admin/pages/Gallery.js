import React, { useState } from "react";
import DataTable from "../components/DataTable";
import GalleryDialog from "../components/GalleryDialog";
import "../admin.css";
import { Button } from "@mui/material";
import { useGallery } from "../../hooks/useGallery";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Gallery() {
  const { loading, galleries, addGallery, deleteGallery, updateGallery } =
    useGallery();

  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState({ caption: "", type: "other", file: null });
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
        toast.success("Gallery post deleted successfully!");
      } catch {
        toast.error("Failed to delete gallery post");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("caption", form.caption);
      formData.append("type", form.type);

      if (form.file) {
        formData.append("file", form.file);
      } else if (form.url) {
        formData.append("url", form.url);
      }

      if (editId) {
        await updateGallery(editId, formData);
        toast.success("Gallery post updated successfully!");
      } else {
        await addGallery(formData);
        toast.success("Gallery post added successfully!");
      }

      setForm({ caption: "", type: "other", file: null, url: "" });
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

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "12px" }}
        onClick={() => {
          setForm({ caption: "", type: "other", file: null });
          setPreview(null);
          setEditId(null);
          setOpenForm(true);
        }}
      >
        + Add Gallery Post
      </Button>

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
          { field: "type", headerName: "Type" },
        ]}
        rows={loading ? [] : galleries}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />
    </>
  );
}

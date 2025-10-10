import React, { useState } from "react";
import DataTable from "../components/DataTable";
import TeamDialog from "../components/TeamDialog";
import "../admin.css";
import { Button } from "@mui/material";
import { useTeams } from "../../hooks/useTeams";
import { toast } from "react-toastify";

export default function Teams() {
  const { loading, teams, addTeam, deleteTeam, updateTeam } = useTeams();

  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState({ name: "", logo: null });
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleEdit = (row) => {
    setForm({ name: row.name, logo: null });
    setPreview(row.logo || null);
    setEditId(row._id);
    setOpenForm(true);
  };

  const handleDelete = async (row) => {
    if (window.confirm(`Are you sure you want to delete "${row.name}"?`)) {
      try {
        await deleteTeam(row._id);
        toast.success("Team deleted successfully!");
      } catch {
        toast.error("Failed to delete team");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Team name cannot be empty!");
      return;
    }
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      if (form.logo) formData.append("logo", form.logo);

      if (editId) {
        await updateTeam(editId, formData);
        toast.success("Team updated successfully!");
      } else {
        await addTeam(formData);
        toast.success("Team added successfully!");
      }

      setForm({ name: "", logo: null });
      setPreview(null);
      setEditId(null);
      setOpenForm(false);
    } catch (err) {
      toast.error("Failed to save team");
      console.error("Failed to save team", err);
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
          setForm({ name: "", logo: null });
          setPreview(null);
          setEditId(null);
          setOpenForm(true);
        }}
      >
        + Add Team
      </Button>

      <TeamDialog
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
          { field: "name", headerName: "Team Name" },
          {
            field: "logo",
            headerName: "Logo",
            render: (row) =>
              row.logo ? (
                <img
                  src={row.logo}
                  alt={`${row.name} logo`}
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
              ) : (
                "No logo"
              ),
          },
        ]}
        rows={loading ? [] : teams}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />
    </>
  );
}

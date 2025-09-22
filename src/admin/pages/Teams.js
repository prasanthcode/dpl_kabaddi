import React, { useState } from "react";
import DataTable from "../components/DataTable";
import TeamDialog from "../components/TeamDialog";
import "../admin.css";
import { Button } from "@mui/material";
import { useTeams } from "../../hooks/useTeams";

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
      } catch {
        alert("Failed to delete team");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      if (form.logo) formData.append("logo", form.logo);

      if (editId) {
        await updateTeam(editId, formData);
      } else {
        await addTeam(formData);
      }

      setForm({ name: "", logo: null });
      setPreview(null);
      setEditId(null);
      setOpenForm(false);
    } catch (err) {
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
      />
    </>
  );
}

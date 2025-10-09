import React, { useState } from "react";
import DataTable from "../components/DataTable";
import "../admin.css";
import { Button } from "@mui/material";
import PlayerDialog from "../components/PlayerDialog"; // new
import { usePlayers } from "../../hooks/usePlayers";
import { useTeams } from "../../hooks/useTeams";
import { toast } from "react-toastify";

export default function Players() {
  const {
    loading: playersLoading,
    players,
    addPlayer,
    deletePlayer,
    updatePlayer,
  } = usePlayers();
  const { loading: teamsLoading, teams } = useTeams();

  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState({ name: "", team: "", profilePic: null });
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState(null);
  const isLoading = playersLoading || teamsLoading;
  const handleEdit = (row) => {
    setForm({ name: row.name, team: row.team?._id || "", profilePic: null });
    setPreview(row.profilePic || null);
    setEditId(row._id);
    setOpenForm(true);
  };

  const handleDelete = async (row) => {
    if (window.confirm(`Are you sure you want to delete "${row.name}"?`)) {
      try {
        await deletePlayer(row._id);
        toast.success("Player deleted successfully!");
      } catch {
        // alert("Failed to delete player");
        toast.error("Failed to delete player");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("team", form.team);
      if (form.profilePic) formData.append("profilePic", form.profilePic);

      if (editId) {
        await updatePlayer(editId, formData);
        toast.success("Player updated successfully!");
      } else {
        await addPlayer(formData);
        toast.success("Player added successfully!");
      }

      setForm({ name: "", team: "", profilePic: null });
      setPreview(null);
      setEditId(null);
      setOpenForm(false);
    } catch (err) {
      console.error("Failed to save player", err);
      toast.error("Failed to save player");
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
          setForm({ name: "", team: "", profilePic: null });
          setPreview(null);
          setEditId(null);
          setOpenForm(true);
        }}
      >
        + Add Player
      </Button>

      {/* Dialog extracted */}
      <PlayerDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        saving={saving}
        editId={editId}
        form={form}
        setForm={setForm}
        preview={preview}
        setPreview={setPreview}
        teams={teams}
      />

      <DataTable
        columns={[
          {
            field: "profilePic",
            headerName: "Profile",
            render: (row) =>
              row.profilePic ? (
                <img
                  src={row.profilePic}
                  alt={`${row.name} profile`}
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
              ) : (
                "No Pic"
              ),
          },
          { field: "name", headerName: "Player Name" },
          {
            field: "team",
            headerName: "Team",
            render: (r) => r.team?.name || r.team,
          },
        ]}
        rows={isLoading ? [] : players}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={isLoading}
      />
    </>
  );
}

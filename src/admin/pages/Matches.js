import React, { useState } from "react";
import DataTable from "../components/DataTable";
import { useMatches } from "../../hooks/useMatches";
import { useTeams } from "../../hooks/useTeams";
import MatchDialog from "../components/MatchDialog";
import "../admin.css";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

export default function Matches() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    loading: matchesLoading,
    matches,
    addMatch,
    updateMatch,
    deleteMatch,
  } = useMatches();

  const { loading: teamsLoading, teams } = useTeams();

  const [editMatch, setEditMatch] = useState(null);
  const [addDialog, setAddDialog] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    teamA: "",
    teamB: "",
    matchType: "",
    date: "",
  });

  const isLoading = matchesLoading || teamsLoading;

  const columns = [
    { field: "matchNumber", headerName: "Match No." },
    {
      field: "matchType",
      headerName: "Match Type",
      valueGetter: (params) => params.row.matchType || "League",
    },
    {
      field: "teamA",
      headerName: "Team A",
      render: (r) => r.teamA?.name || r.teamA,
    },
    {
      field: "teamB",
      headerName: "Team B",
      render: (r) => r.teamB?.name || r.teamB,
    },
    {
      field: "date",
      headerName: "Date",
      render: (r) => new Date(r.date).toLocaleString(),
    },
    { field: "status", headerName: "Status" },
    {
      field: "score",
      headerName: "Score",
      render: (r) => (
        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<SportsScoreIcon />}
          onClick={() => navigate(`/admin/addscore/${r._id}`)}
        >
          Add Score
        </Button>
      ),
    },
  ];

  const handleEdit = (row) => {
    setForm({
      matchNumber: row.matchNumber,
      teamA: row.teamA?._id || row.teamA,
      teamB: row.teamB?._id || row.teamB,
      matchType: row.matchType,
      date: new Date(row.date).toISOString().slice(0, 16),
      status: row.status,
      _id: row._id,
    });
    setEditMatch(true);
  };

  const handleDelete = async (row) => {
    if (
      window.confirm(`Are you sure you want to delete "${row.matchNumber}"?`)
    ) {
      try {
        await deleteMatch(row._id);
      } catch {
        alert("Failed to delete match");
      }
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateMatch(form._id, {
        matchNumber: form.matchNumber,
        teamA: form.teamA,
        teamB: form.teamB,
        matchType: form.matchType,
        date: form.date,
        status: form.status,
      });
      setEditMatch(false);
    } catch (err) {
      console.error("Failed to update match", err);
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => setAddDialog(true);

  const handleAddSave = async () => {
    if (form.teamA === form.teamB) {
      alert("Team A and Team B cannot be the same.");
      return;
    }
    setSaving(true);
    try {
      await addMatch({
        teamA: form.teamA,
        teamB: form.teamB,
        matchType: form.matchType,
        date: form.date,
      });
      setForm({ teamA: "", teamB: "", matchType: "", date: "" });
      setAddDialog(false);
    } catch (err) {
      console.error("Failed to add match", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add Match
        </Button>
      </Box>

      <Box mt={2} sx={{ maxHeight: "75vh" }}>
        {!isMobile ? (
          <DataTable
            columns={columns}
            rows={isLoading ? [] : matches}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            {(isLoading ? [] : matches).map((match) => (
              <Card key={match._id}>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      Match {match.matchNumber}
                    </Typography>
                    <Box>
                      <IconButton onClick={() => handleEdit(match)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(match)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    Type: {match.matchType || "League"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Team A: {match.teamA?.name || match.teamA}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Team B: {match.teamB?.name || match.teamB}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {new Date(match.date).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {match.status}
                  </Typography>

                  <Box mt={1}>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<SportsScoreIcon />}
                      onClick={() => navigate(`/admin/addscore/${match._id}`)}
                    >
                      Add Score
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      <MatchDialog
        open={editMatch}
        onClose={() => setEditMatch(false)}
        onSubmit={handleSave}
        form={form}
        setForm={setForm}
        teams={teams}
        saving={saving}
        isEdit
      />

      <MatchDialog
        open={addDialog}
        onClose={() => setAddDialog(false)}
        onSubmit={handleAddSave}
        form={form}
        setForm={setForm}
        teams={teams}
        saving={saving}
      />
    </>
  );
}

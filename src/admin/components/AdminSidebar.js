import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AdminSidebar({ open, onClose }) {
  return (
    <aside
      className={`admin-sidebar ${open ? "open" : ""}`}
      aria-label="Admin sidebar"
    >
      {/* Close button for mobile */}
      <IconButton
        onClick={onClose}
        className="close-button"
        sx={{ color: "white", alignSelf: "flex-end", mb: 1 }}
      >
        <CloseIcon />
      </IconButton>

      <div className="brand">DPL Admin</div>

      <nav>
        <Link className="nav-link" to="/admin/dashboard" onClick={onClose}>
          Dashboard
        </Link>
        <Link className="nav-link" to="/admin/matches" onClick={onClose}>
          Matches
        </Link>
        <Link className="nav-link" to="/admin/teams" onClick={onClose}>
          Teams
        </Link>
        <Link className="nav-link" to="/admin/players" onClick={onClose}>
          Players
        </Link>
        <Link className="nav-link" to="/admin/gallery" onClick={onClose}>
          Gallery
        </Link>
      </nav>
    </aside>
  );
}

import React from "react";
import { Box, Avatar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logout from "../../pages/Logout";

export default function AdminNavbar({ title = "Dashboard", onMenuClick }) {
  return (
    <div className="admin-topbar">
      <Box display="flex" alignItems="center" gap={2}>
        {/* Hamburger Menu */}
        <IconButton
          className="menu-button"
          onClick={onMenuClick}
          sx={{ color: "black" }}
          aria-label="open sidebar"
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ color: "black" }}>
          {title}
        </Typography>
      </Box>

      <Box marginLeft="auto" display="flex" alignItems="center" gap={2}>
        <Logout />
        <Avatar sx={{ width: 32, height: 32 }}>P</Avatar>
      </Box>
    </div>
  );
}

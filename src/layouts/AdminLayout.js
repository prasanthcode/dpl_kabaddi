import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../admin/components/AdminSidebar";
import AdminNavbar from "../admin/components/AdminNavbar";

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const routeTitles = {
    "/admin/matches": "Matches",
    "/admin/players": "Players",
    "/admin/teams": "Teams",
    "/admin/dashboard": "Dashboard",
  };

  const title = routeTitles[location.pathname] || "Admin";

  return (
    <div className="admin-root">
      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="admin-main">
        <AdminNavbar title={title} onMenuClick={() => setSidebarOpen(true)} />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

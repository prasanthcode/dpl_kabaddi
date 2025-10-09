import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../admin/components/AdminSidebar";
import AdminNavbar from "../admin/components/AdminNavbar";
import { ToastContainer } from "react-toastify";

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const routeTitles = {
    "/admin/matches": "Matches",
    "/admin/players": "Players",
    "/admin/teams": "Teams",
    "/admin/dashboard": "Dashboard",
  };

  let title = "Admin";

  if (routeTitles[location.pathname]) {
    title = routeTitles[location.pathname];
  } else if (location.pathname.startsWith("/admin/addscore/")) {
    title = "Add Score";
  }

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
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
      </div>
    </div>
  );
}

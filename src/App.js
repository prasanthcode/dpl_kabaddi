import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Teams from "./pages/Teams";
import TeamInfo from "./pages/TeamInfo";
import Standing from "./pages/Standing";
import AddScore from "./admin/pages/AddScore";
import Match from "./pages/Match";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PlayerInfo from "./pages/PlayerInfo";
import PageTracker from "./components/PageTracker";
import { initGA } from "./config/analytics";
import DashBoard from "./admin/pages/DashBoard";
import AdminMatches from "./admin/pages/Matches";
import AdminTeams from "./admin/pages/Teams";
import AdminPlayers from "./admin/pages/Players";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import Gallery from "./admin/pages/Gallery";
import NotFound from "./pages/NotFound";
import TopStats from "./pages/TopStats";
import ScrollReset from "./components/ScrollReset";
function App() {
  useEffect(() => {
    initGA(); 
  }, []);
  return (
    <Router>
      <PageTracker />
       <ScrollReset />
      <Routes>
        {/* ---------------- PUBLIC LAYOUT ---------------- */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/completed" element={<Matches url="completed" />} />
          <Route path="/live" element={<Matches url="live" />} />
          <Route path="/upcoming" element={<Matches url="upcoming" />} />
          <Route path="/live/:matchId" element={<Match enablePolling />} />
          <Route
            path="/recent/:matchId"
            element={<Match enablePolling={false} />}
          />
          <Route path="/teams" element={<Teams />} />
          <Route path="/team/:id" element={<TeamInfo />} />
          <Route path="/player/:playerId" element={<PlayerInfo />} />
          <Route path="/playerstats" element={<TopStats />} />
          <Route path="/standings" element={<Standing />} />
        </Route>

        {/* ---------------- AUTH (NO NAV/FOOTER) ---------------- */}
        <Route path="/login" element={<Login />} />
        {/* ---------------- NOT FOUND (NO NAV/FOOTER) ---------------- */}

        <Route path="*" element={<NotFound />} />
        {/* ---------------- ADMIN ROUTES ---------------- */}
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute>
                <Gallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/matches"
            element={
              <ProtectedRoute>
                <AdminMatches />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/teams"
            element={
              <ProtectedRoute>
                <AdminTeams />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/players"
            element={
              <ProtectedRoute>
                <AdminPlayers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/addscore/:matchId"
            element={
              <ProtectedRoute>
                <AddScore />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Teams from "./pages/Teams";
import TeamInfo from "./pages/TeamInfo";
import Standing from "./pages/Standing";
import AddScore from "./pages/AddScore";
import Match from "./pages/Match";
import PlayersStats from "./pages/PlayersStats";
import UploadPage from "./pages/UploadPage";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./pages/Logout";

function App() {
  return (
    <Router>

      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />

          <Route path="/admin/matches" element={
            <ProtectedRoute>
               <Matches url={"live"} isAdmin={true} />
            </ProtectedRoute>
          } />
        <Route path="/addscore/:matchId" element={
          <ProtectedRoute>

            <AddScore />
          </ProtectedRoute>
          } />
        <Route path="/team/:id" element={<TeamInfo />} />


        <Route path="/completed" element={
        
        <Matches url={"completed"} />} />
        <Route path="/live" element={<Matches url={"live"} />} />
        <Route path="/upload" element={<UploadPage/>} />
        <Route path="/upcoming" element={<Matches url={"upcoming"} />} />
        <Route path="/standings" element={<Standing />} />
        <Route path="/teams" element={<Teams />} />
       
        <Route path="/live/:matchId" element={<Match enablePolling={true} />} />
        <Route path="/recent/:matchId" element={<Match enablePolling={false} />} />
        <Route path="/playerstats" element={<PlayersStats />} />
      </Routes>
    </Router>
  );
}

export default App;

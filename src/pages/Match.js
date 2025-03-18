import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stats from '../components/Stats';
import LineUp from '../components/LineUp';
import Navbar from '../components/common/Navbar';
import MatchSkeleton from '../components/MatchSkeleton';
import Mat from '../components/Mat';
import Footer from '../components/common/Footer';
import { Typography } from '@mui/material';

export default function Match({ enablePolling = false }) {
  const { matchId } = useParams();
  const [alignment, setAlignment] = useState('line_up');
  const [team, setTeam] = useState('A');
  const [matches, setMatches] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statLoading, setStatLoading] = useState(true);
  const [totalLoading, setTotalLoading] = useState(true);
  const [statError, setStatError] = useState(null);
  const [totalError, setTotalError] = useState(null);
  const [totalPoints, setTotalPoints] = useState(null);

  const fetchMatches = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/matches/matchscores/${matchId}`);
      setMatches(response.data);
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalPoints = async () => {
    setTotalLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/matches/matchstattotal/${matchId}`);
      if (JSON.stringify(response.data) !== JSON.stringify(totalPoints)) {
        setTotalPoints(response.data);
      }
    } catch (err) {
      console.error("Error fetching total points:", err.message);
      setTotalError(err.message);
    } finally {
      setTotalLoading(false);
    }
  };
  const fetchTeamStats = async (teamStat) => {
    setStatError(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/matches/matchstatlive/${matchId}`, {
        params: { team: teamStat },
      });
  
      // Only update if data has changed
      if (JSON.stringify(response.data) !== JSON.stringify(stats)) {
        setStats(response.data);
        setStatLoading(false); // Set loading false only after new data is set
      }
    } catch (err) {
      console.error("Error fetching team stats:", err.message);
      setStatError(err.message);
    }
  };
  
  useEffect(() => {
    fetchMatches(); // Fetch immediately
    if (enablePolling) {
      const interval = setInterval(fetchMatches, 5000); // Poll every 5s
      return () => clearInterval(interval); // Cleanup on unmount or dependency change
    }
  }, [matchId, enablePolling]);
  
  // Fetch team stats only when "line_up" is active
  useEffect(() => {
    if (alignment === "line_up") {
      fetchTeamStats(team);
      if (enablePolling) {
        const interval = setInterval(() => fetchTeamStats(team), 5000);
        return () => clearInterval(interval);
      }
    }
  }, [team, alignment, matchId, enablePolling]);

  // Fetch total points only when "team_stats" is active
  useEffect(() => {
    if (alignment === "team_stats") {
      fetchTotalPoints();
      if (enablePolling) {
        const interval = setInterval(fetchTotalPoints, 5000);
        return () => clearInterval(interval);
      }
    }
  }, [alignment, matchId, enablePolling]);

  
  return (
    <>
    <Navbar/>
   
     
     <div className="match_container">
     {enablePolling && (
  <Typography
    variant="subtitle1" 
    sx={{ 
      fontWeight: "bold", 
      color: "white", 
      backgroundColor: "var(--primary-dark)", 
      padding: "5px 10px",
      fontSize:"15px", 
      borderRadius: "5px",
      display: "inline-block"
    }}
  >
    ⚡ Score updates automatically, no need to refresh! 
  </Typography>
)}
     {!matches ? <MatchSkeleton/> :<div className="d_match">
      
        <div className="single_match_wrapper">
          
            <div className="bg-container">
              
          <div className="single_match view_recent">
            
          <h4>Match 1</h4>
            <div className="vs_container">
              <div className="img_wrap">
                <img src={matches.teamA?.logo} alt={matches.teamA?.name || "Team A"} />
                <div className="team_1">
                  <h3>{matches.teamA?.name}</h3>
                  <span className="teama_score">{matches.teamA?.score}</span>
                </div>
              </div>
              <div className="time" style={{ backgroundColor: "rgb(34, 139, 69)", color: "white" }}>
              {enablePolling ? (matches.halfTime ? "HT" : "VS") : matches.halfTime ? "FT" : "FT"}
              </div>
              <div className="img_wrap">
                <img src={matches.teamB?.logo} alt={matches.teamB?.name || "Team B"} />
                <div className="team_1">
                  <span className="teamb_score">{matches.teamB?.score}</span>
                  <h3>{matches.teamB?.name}</h3>
                </div>
              </div>
            </div>
{          !enablePolling &&   <h3 style={{ textAlign: "center", fontWeight: "300", fontSize: "16px", width: "50%", margin: "0 auto" }}>
{matches.teamA?.score === matches.teamB?.score ? 
  `Match Tied` : 
  matches.teamA?.score > matches.teamB?.score ? 
    `${matches.teamA?.name} beats ${matches.teamB?.name} (${matches.teamA?.score}-${matches.teamB?.score})` : 
    `${matches.teamB?.name} beats ${matches.teamA?.name} (${matches.teamB?.score}-${matches.teamA?.score})`}

            </h3>}
           
            {/* <Mat matchId={matchId}/> */}

            
         </div> </div>
        </div>
      </div>}
{loading ?"Loading..." : (      <>

      <ToggleButtonGroup
  color="primary"
  value={alignment}
  exclusive
  onChange={(event, newAlignment) => newAlignment && setAlignment(newAlignment)}
  aria-label="Match View"
  sx={{
    width: "100%",
    backgroundColor: "var(--primary-color)",
    padding:"8px 0",
    "& .MuiToggleButton-root": {
      flex: 1,
      color: "white",
      backgroundColor: "transparent",
      border:"none",
      "&.Mui-selected": {
        backgroundColor: "white !important",
        color: "black !important",
        fontWeight: "bold",
        borderRadius:"10px",
      },
      "&:hover": {
        backgroundColor: "white",
      },
    },
  }}
>
  <ToggleButton value="line_up">Line Up</ToggleButton>
  <ToggleButton value="team_stats">Team Stats</ToggleButton>
</ToggleButtonGroup>


{alignment === "line_up" && (
  <ToggleButtonGroup
    color="primary"
    value={team}
    exclusive
    onChange={(event, newTeam) => newTeam && setTeam(newTeam)}
    aria-label="Team Selection"
    sx={{
      width: "100%",
      backgroundColor: "var(--primary-color)",
      padding:"8px 0",
      "& .MuiToggleButton-root": {
        flex: 1,
        color: "white",
        backgroundColor: "transparent",
        border:"none",
        "&.Mui-selected": {
          backgroundColor: "white !important",
          color: "black !important",
          fontWeight: "bold",
          borderRadius:"10px",
        },
        "&:hover": {
          backgroundColor: "white",
        },
      },
    }}
  >
    <ToggleButton value="A">{matches.teamA?.name}</ToggleButton>
    <ToggleButton value="B">{matches.teamB?.name}</ToggleButton>
  </ToggleButtonGroup>
)}


      {alignment === "team_stats" && totalPoints && <Stats total={totalPoints} />}
      {alignment === "line_up" && stats?.topRaiders && stats?.topDefenders && (
  <>
    <LineUp stats={stats} statLoading={statLoading} />
    {statLoading && <p>Updating stats...</p>}
  </>
)}


      {statLoading && <p>Loading stats...</p>}
      {statError && <p style={{ color: "red" }}>Error: {statError}</p>}


      </>)}
    

    </div>
   
                  <Footer/>

    </>
  );
} 
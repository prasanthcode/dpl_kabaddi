import { useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import TeamsMat from "../components/TeamsMat";
import TimeSelection from "../components/TimeSelection";

export default function AddScore() {
  const { matchId } = useParams();

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedScore, setSelectedScore] = useState(null);
  const [score, setScore] = useState(null);
  const [rd, setRd] = useState(false);
  const [isTeam, setIsTeam] = useState(false);

  const [btnPosition, setBtnPosition] = useState({ top: 0, left: 0, visible: false, align: "right" });

  const handlePlayerChange = (event, newSelected, columnIndex, teamId) => {
    if (newSelected !== null) {
      setSelectedPlayer(newSelected);
      console.log(newSelected);
      // player is selected
      if (newSelected === teamId) {
        setSelectedAction(null);
        setIsTeam(true);
        setRd(false); // Disable R and D for team selection
      } else {
        setRd(true); // Enable R and D for player selection
        setSelectedAction(null);
        setSelectedScore(null);
        setIsTeam(false);
      }

      // Get button position dynamically
      const rect = event.currentTarget.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const buttonHeight = 220; // Approximate height of the button container
      const marginBottom = 20; // Minimum distance from the bottom of the screen
      let newTop = rect.top + window.scrollY;

      // If the button goes too close to the bottom, move it above the player
      if (newTop + buttonHeight + marginBottom > windowHeight + window.scrollY) {
        newTop = rect.top + window.scrollY - buttonHeight - 10; // Move above the button
      }

      setBtnPosition({
        top: newTop,
        left: columnIndex === 0 ? rect.right + 10 : rect.left - 200, // Right for first column, left for second
        visible: true,
        align: columnIndex === 0 ? "right" : "left",
      });
    }
  };


  const handleActionChange = (event, newSelected) => {
    if (newSelected !== null) {
      setSelectedAction(newSelected);
      if (newSelected === "D") {
        setSelectedScore(null); // Reset score if "D" is selected
      }
    }
  };



  const handleScoreChange = (event, newSelected) => {
    // if (selectedAction === "R" && newSelected !== null) {
    //   setSelectedScore(newSelected);
    // }
    if (newSelected !== null) {
      setSelectedScore(newSelected);
    }

  };
const [scoreLoading,setScoreLoading] = useState(false);

  const handleSubmit = async () => {
    setScoreLoading(true);
    console.log(selectedAction + selectedPlayer + selectedScore);
  
    let requestData = null;
    let endpoint = "";
  
    if (selectedAction !== null) {
      requestData = {
        matchId: matchId,        
        playerId: selectedPlayer,
        points: parseInt(selectedScore),
        type: selectedAction === "R" ? "raid" : "defense",
      };
  
      if (selectedAction === "D") {
        requestData.points = 1; // Defense always gets 1 point
      }
  
      endpoint = "https://dpl-kabaddi-backend.vercel.app/api/matches/addPoints";
    } else if (isTeam) {
      requestData = {
        matchId: matchId,
        teamId: selectedPlayer,
        points: parseInt(selectedScore),
      };
  
      endpoint = "https://dpl-kabaddi-backend.vercel.app/api/matches/addPointstoteam";
    }
  
    if (requestData) {
      try {
        // Store the last payload in localStorage
        localStorage.setItem("lastScoreUpdate", JSON.stringify({ endpoint, requestData }));
  
        const response = await axios.post(endpoint, requestData);
        setScoreLoading(false);
        fetchScores();
      } catch (error) {
        console.error("Error sending request:", error);
      }
    }
  
    // Reset state after submission
    setSelectedPlayer(null);
    setSelectedAction(null);
    setSelectedScore(null);
    setBtnPosition({ top: 0, left: 0, visible: false, align: "right" });
  };
// Undo function to restore last payload
const handleUndo = async () => {
  const lastUpdate = localStorage.getItem("lastScoreUpdate");

  if (!lastUpdate) {
    console.warn("No previous action found to undo.");
    return;
  }

  const { endpoint, requestData } = JSON.parse(lastUpdate);
  let undoEndpoint = "";

  if (endpoint === "https://dpl-kabaddi-backend.vercel.app/api/matches/addPoints") {
    undoEndpoint = "https://dpl-kabaddi-backend.vercel.app/api/matches/undoPointstoplayer";
    delete requestData.points; // Undo doesn't need points, it pops the last one
  } else if (endpoint === "https://dpl-kabaddi-backend.vercel.app/api/matches/addPointstoteam") {
    undoEndpoint = "https://dpl-kabaddi-backend.vercel.app/api/matches/undoPointstoteam";
  }

  try {
    const response = await axios.post(undoEndpoint, requestData);
    console.log("Undo successful:", response.data);

    // Clear last update from local storage after successful undo
    localStorage.removeItem("lastScoreUpdate");

    // Refresh scores
    fetchScores();
  } catch (error) {
    console.error("Error undoing last action:", error);
  }
};


  


  const [players, setPlayers] = useState({
    teamAPlayers: [],
    teamBPlayers: [],
    teamAId: "",
    teamBId: "",
    teamAName: "",
    teamBName: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loading2, setLoading2] = useState(true);
  const fetchScores = async () => {
    try {
      const response = await axios.get(`https://dpl-kabaddi-backend.vercel.app/api/matches/matchscores/${matchId}`);
      setScore(response.data);
    } catch (error) {
      console.error("Error fetching Players:", error);
    } finally {
      setLoading2(false);
    }
  };
  useEffect(() => {
    fetchScores();
  }, [])
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(`https://dpl-kabaddi-backend.vercel.app/api/matches/players/${matchId}`);
        // 67c8502b790b94747f117705
        if (!response.ok) throw new Error("Failed to fetch players");

        const data = await response.json();

        setPlayers({
          teamAPlayers: [...data.teamA.players],
          teamBPlayers: [...data.teamB.players],
          teamAId: data.teamA.id,
          teamBId: data.teamB.id,
          teamAName: data.teamA.name,
          teamBName: data.teamB.name,
        });

        setLoading(false); // ✅ Ensure loading state is updated
      } catch (err) {
        console.error(err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [matchId]);

  if (loading) return <p>Loading players...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <Box position="relative" >
      {/* Players */}
      <Box display="flex" justifyContent="center" gap={5}>
        {[
          { players: players.teamAPlayers, teamName: players.teamAName, teamId: players.teamAId },
          { players: players.teamBPlayers, teamName: players.teamBName, teamId: players.teamBId }
        ].map(({ players, teamName, teamId }, teamIndex) => (
          <div key={teamIndex} style={{ marginBottom: "20px" }}>
            <ToggleButtonGroup
              value={selectedPlayer}
              exclusive
              orientation="vertical"
              onChange={(event, newSelected) => handlePlayerChange(event, newSelected, teamIndex, teamId)}

              aria-label="Select Player"
            >
              <ToggleButton
                key={`team-${teamIndex}`}
                // onChange={()=>handleRd}
                value={teamId} // Selects like a player
                sx={{
                  width: 150,
                  height: 45,
                  fontSize: "14px",
                  margin: "5px",
                  fontWeight: "bold",
                  backgroundColor: selectedPlayer === teamId ? "#ff9800" : "white",
                  color: selectedPlayer === teamId ? "white" : "black",
                  "&:hover": { backgroundColor: selectedPlayer === teamId ? "#f57c00" : "white" },
                  "&.Mui-selected": { backgroundColor: "#ff9800 !important", color: "white" },
                }}
              >
                {teamName}
              </ToggleButton>


              {/* Render Players */}
              {players.map((player) => (
                <ToggleButton
                  key={player._id}
                  value={player._id}
                  sx={{
                    width: 150,
                    height: 45,
                    fontSize: "14px",
                    margin: "5px",
                    backgroundColor: selectedPlayer === player._id ? "#1976d2" : "white",
                    color: selectedPlayer === player._id ? "white" : "black",
                    "&:hover": { backgroundColor: selectedPlayer === player._id ? "#1565c0" : "white" },
                    "&.Mui-selected": { backgroundColor: "#1976d2 !important", color: "white" },
                  }}
                >
                  {player.name}
                </ToggleButton>
              ))}

              {/* Single Team Button (Now Selectable) */}

            </ToggleButtonGroup>
          </div>
        ))}



      </Box>

      {/* Action and Score Selection (Dynamically Positioned) */}
      {btnPosition.visible && (
        <Box
          position="absolute"
          top={`${btnPosition.top}px`}
          left={`${btnPosition.left}px`}
          bgcolor="white"
          padding={"20px 5px"}
          boxShadow={3}
          borderRadius={2}
          display="flex"
          flexDirection="column"
          alignItems={"center"}
        >
          {/* Action Selection */}
          <Box>
            <ToggleButtonGroup value={selectedAction} exclusive onChange={handleActionChange}
              aria-label="Select Action"
              disabled={!rd}
            >
              {["R", "D"].map((letter) => (
                <ToggleButton key={letter} value={letter} sx={actionButtonStyle(selectedAction, letter)}
                >
                  {letter}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          {/* Score Selection */}
          <Box>
            <ToggleButtonGroup value={selectedScore} exclusive onChange={handleScoreChange} aria-label="Select Score" disabled={selectedAction === "D"} >
              {["1", "2", "3", "4"].map((score) => (
                <ToggleButton key={score} value={score} sx={scoreButtonStyle(selectedScore, score)} >
                  {score}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          {/* Submit & Undo Buttons */}
          <Box mt={1}>
            <button style={buttonStyle} onClick={handleSubmit}>{scoreLoading?"Updating...":"Submit"}</button>
          </Box>
        </Box>
      )}
      {score ? score.teamA.score : ""}
      {score ? score.teamB.score : ""}
      <Box mt={1}>
        <button onClick={handleUndo} style={buttonStyle} disabled={!localStorage.getItem("lastScoreUpdate")}>
      Undo
    </button>

      </Box>
<TeamsMat/>
<TimeSelection matchId={matchId}/>
    </Box>

  );
}

// Styles
const actionButtonStyle = (selectedAction, letter) => ({
  width: 50,
  height: 50,
  fontSize: "24px",
  margin: "10px",
  backgroundColor: selectedAction === letter ? "#d32f2f" : "white",
  color: selectedAction === letter ? "white" : "black",
  "&:hover": { backgroundColor: selectedAction === letter ? "#b71c1c" : "white" },
  "&.Mui-selected": { backgroundColor: "#d32f2f !important", color: "white" },
});

const scoreButtonStyle = (selectedScore, score) => ({
  width: 40,
  height: 40,
  fontSize: "20px",
  margin: "5px",
  backgroundColor: selectedScore === score ? "#388e3c" : "white",
  color: selectedScore === score ? "white" : "black",
  "&:hover": { backgroundColor: selectedScore === score ? "#2e7d32" : "white" },
  "&.Mui-selected": { backgroundColor: "#388e3c !important", color: "white" },
});

const buttonStyle = {
  padding: "10px 15px",
  fontSize: "16px",
  backgroundColor: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  margin: "10px",
};

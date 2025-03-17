import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Mat({ matchId }) {
  const [teamAMat, setTeamAMat] = useState(7);
  const [teamBMat, setTeamBMat] = useState(7);

  // Fetch current match data
  useEffect(() => {
    axios
      .get(`/api/matchscores/${matchId}`)
      .then((response) => {
        setTeamAMat(response.data.teamA.matCount);
        setTeamBMat(response.data.teamB.matCount);
      })
      .catch((error) => console.error("Error fetching match data:", error));
  }, [matchId]);

  return (
    <div className="mat">
      {/* Team A */}
      <div className="mat_a">
        {[...Array(teamAMat)].map((_, index) => (
          <span key={index} className="live-dot"></span>
        ))}
      </div>

      {/* Team B */}
      <div className="mat_b">
        {[...Array(teamBMat)].map((_, index) => (
          <span key={index} className="live-dot"></span>
        ))}
      </div>
    </div>
  );
}

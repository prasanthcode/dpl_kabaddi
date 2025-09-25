import React, { useState } from "react";
import { useMatches } from "../hooks/useMatches";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
export default function LineUp({ stats, matchId }) {
  const { pointSequences, getPlayerPointsOfMatch, pointsLoading } =
    useMatches(matchId);

  // Track open sections per player + type
  const [openPlayers, setOpenPlayers] = useState(new Set());

  const handlePointsSequence = async (matchId, playerId, type) => {
    const key = `${playerId}-${type}`;
    setOpenPlayers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key); // collapse if already open
      } else {
        newSet.add(key);
        getPlayerPointsOfMatch(matchId, playerId, type); // fetch only when opening
      }
      return newSet;
    });
  };

  return (
    <div className="match_lineup">
      {/* Raiders */}
      <div className="top_players">
        <h3>Top Raiders</h3>
        {stats.topRaiders?.length > 0 ? (
          stats.topRaiders.map((raider) => (
            <div
              key={`${raider.id}-raid`}
              onClick={() => handlePointsSequence(matchId, raider.id, "raid")}
            >
              <div className="match_player">
                <div className="match_p_info">
                  <img
                    src={
                      raider.profilePic
                        ? `${process.env.REACT_APP_CLOUDINARY_FILE_BASE_URL}${raider.profilePic}.jpg`
                        : `${process.env.REACT_APP_CLOUDINARY_FILE_BASE_URL}g2xafebqt6zkwwuzdaiy.png`
                    }
                    alt="No Pic"
                  />
                  <span>{raider.name}</span>
                </div>
                <span style={{ display: "flex", alignItems: "center" }}>
                  {openPlayers.has(`${raider.id}-raid`) ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                  {raider.totalRaidPoints}
                </span>
              </div>

              {/* Expand raid points */}
              {openPlayers.has(`${raider.id}-raid`) && (
                <div className="points-container">
                  Raid Sequence
                  {pointsLoading && !pointSequences[`${raider.id}-raid`] ? (
                    <span>Loading points...</span>
                  ) : pointSequences[`${raider.id}-raid`]?.points?.length >
                    0 ? (
                    pointSequences[`${raider.id}-raid`].points.map(
                      (pt, idx) => (
                        <span key={idx} className="point-badge">
                          {pt}
                        </span>
                      )
                    )
                  ) : (
                    <p>No raid points data</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="match_empty">No top raiders yet</p>
        )}
      </div>

      {/* Defenders */}
      <div className="top_players">
        <h3>Top Defenders</h3>
        {stats.topDefenders?.length > 0 ? (
          stats.topDefenders.map((defender) => (
            <div
              key={`${defender.id}-defense`}
              onClick={() =>
                handlePointsSequence(matchId, defender.id, "defense")
              }
            >
              <div className="match_player">
                <div className="match_p_info">
                  <img
                    src={
                      defender.profilePic
                        ? `${process.env.REACT_APP_CLOUDINARY_FILE_BASE_URL}${defender.profilePic}.jpg`
                        : `${process.env.REACT_APP_CLOUDINARY_FILE_BASE_URL}g2xafebqt6zkwwuzdaiy.png`
                    }
                    alt="No Pic"
                  />
                  <span>{defender.name}</span>
                </div>
                <span style={{ display: "flex", alignItems: "center" }}>
                  {openPlayers.has(`${defender.id}-defense`) ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                  {defender.totalDefensePoints}
                </span>
              </div>

              {/* Expand defense points */}
              {openPlayers.has(`${defender.id}-defense`) && (
                <div className="points-container">
                  Defense Sequence
                  {pointsLoading &&
                  !pointSequences[`${defender.id}-defense`] ? (
                    <span>Loading points...</span>
                  ) : pointSequences[`${defender.id}-defense`]?.points?.length >
                    0 ? (
                    pointSequences[`${defender.id}-defense`].points.map(
                      (pt, idx) => (
                        <span key={idx} className="point-badge">
                          {pt}
                        </span>
                      )
                    )
                  ) : (
                    <p>No defense points data</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="match_empty">No top defenders yet</p>
        )}
      </div>
    </div>
  );
}

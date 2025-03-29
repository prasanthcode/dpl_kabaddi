import React from "react";

export default function LineUp({ stats }) {
  return (
    <div className="line_up">
      <h3>Top Raiders</h3>
      {stats.topRaiders?.length > 0 ? (
        stats.topRaiders.map((raider, index) => (
          <div className="player" key={index}>
            <div className="p_info">
              <span>{raider.name}</span> <span>{raider.team}</span>
            </div>
            <span>{raider.totalRaidPoints}</span>
          </div>
        ))
      ) : (
        <p className="empty-message">No top raiders yet</p>
      )}

      <h3>Top Defenders</h3>
      {stats.topDefenders?.length > 0 ? (
        stats.topDefenders.map((defender, index) => (
          <div className="player" key={index}>
            <div className="p_info">
              <span>{defender.name}</span> <span>{defender.team}</span>
            </div>
            <span>{defender.totalDefensePoints}</span>
          </div>
        ))
      ) : (
        <p className="empty-message">No top defenders yet</p>
      )}
    </div>
  );
}

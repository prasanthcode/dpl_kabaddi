import React from 'react'

export default function LineUp({stats}) {
  return (
    <div className="line_up">
          <h3>Top Raiders</h3>
          {stats.topRaiders?.map((raider, index) => (
            <div className="player" key={index}>
              <div className="p_info"> <span>{raider.name}</span> <span>{raider.team}</span></div>
              <span>{raider.totalRaidPoints}</span>
            </div>
          ))}
          <h3>Top Defenders</h3>
          {stats.topDefenders?.map((defender, index) => (
            <div className="player" key={index}>
              <div className="p_info"> <span>{defender.name}</span> <span>{defender.team}</span></div>
              <span>{defender.totalDefensePoints}</span>
            </div>
          ))}
        </div>
  )
}

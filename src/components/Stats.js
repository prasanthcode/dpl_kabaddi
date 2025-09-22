import React from "react";

export default function Stats({ total }) {
  return (
    <div className="match_stats_wrap">
      <div className="match_stats_row">
        <span>{total.teamA.score}</span> <span>Total Points</span>
        <span>{total.teamB.score}</span>
      </div>
      <div className="match_stats_row">
        <span>{total.teamA.totalRaidPoints}</span>{" "}
        <span>Total Raid Points</span>
        <span>{total.teamB.totalRaidPoints}</span>
      </div>
      <div className="match_stats_row">
        <span>{total.teamA.totalDefensePoints}</span>{" "}
        <span>Total Defense Points</span>
        <span>{total.teamB.totalDefensePoints}</span>
      </div>
      <div className="match_stats_row">
        <span>
          {total.teamA.score -
            total.teamA.totalDefensePoints -
            total.teamA.totalRaidPoints}
        </span>
        <span>Extra Points</span>
        <span>
          {total.teamB.score -
            total.teamB.totalDefensePoints -
            total.teamB.totalRaidPoints}
        </span>
      </div>
    </div>
  );
}

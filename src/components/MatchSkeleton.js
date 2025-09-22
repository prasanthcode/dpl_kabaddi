import React from "react";
import "../styles/Match.css";

export default function MatchSkeleton() {
  return (
    <div className="match_skeleton">
      <div className="skeleton_card">
        <div className="skeleton_team"></div>
        <div className="skeleton_vs"></div>
        <div className="skeleton_team"></div>
      </div>
      <div className="skeleton_toggle"></div>
      <div className="skeleton_content"></div>
    </div>
  );
}

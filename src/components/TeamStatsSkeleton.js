import React from "react";
import "../styles/TeamInfo.css"; // we already have skeleton CSS here

export default function TeamStatsSkeleton() {
  return (
    <div className="teamstats-skeleton-card">
      {/* Logo */}
      <div className="skeleton skeleton-logo"></div>

      {/* Team Name */}
      <div className="skeleton skeleton-title"></div>

      {/* Stats Grid Lines */}
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line"></div>
    </div>
  );
}

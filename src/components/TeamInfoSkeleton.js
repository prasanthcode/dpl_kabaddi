import React from "react";

export default function TeamInfoSkeleton() {
  return (
    <div className="teaminfo-skeleton-container">
      

      {/* Squad Skeleton */}
      <div className="teaminfo-skeleton-list">
        {[...Array(6)].map((_, i) => (
          <div className="teaminfo-skeleton-card" key={i}>
            <div className="skeleton skeleton-img"></div>
            <div className="skeleton skeleton-name"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

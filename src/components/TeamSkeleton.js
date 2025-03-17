import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TeamSkeleton = () => {
  return (
    <div className="single_match skeleton-container" style={{ backgroundColor: "rgb(8, 43, 109)", padding: "20px", borderRadius: "10px" }}>
      <div className="img_wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Skeleton circle width={80} height={80} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
        <div className="team_1" style={{ marginTop: "10px" }}>
          <Skeleton width={300} height={10} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
        </div>
        <div className="team_1" style={{ marginTop: "5px" }}>
          <Skeleton width={20} height={10} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
        </div>
      </div>
    </div>
  );
};

export default TeamSkeleton;

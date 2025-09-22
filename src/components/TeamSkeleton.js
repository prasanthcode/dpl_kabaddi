import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/Teams.css"; // use same css file

const TeamSkeleton = () => {
  return (
    <div className="teams-skeleton-card">
      <div className="teams-skeleton-img-wrap">
        <Skeleton
          circle
          width={80}
          height={80}
          baseColor="rgb(6, 35, 90)"
          highlightColor="rgb(12, 55, 130)"
        />
        <div className="teams-skeleton-name">
          <Skeleton
            width={300}
            height={10}
            baseColor="rgb(6, 35, 90)"
            highlightColor="rgb(12, 55, 130)"
          />
        </div>
        <div className="teams-skeleton-short">
          <Skeleton
            width={20}
            height={10}
            baseColor="rgb(6, 35, 90)"
            highlightColor="rgb(12, 55, 130)"
          />
        </div>
      </div>
    </div>
  );
};

export default TeamSkeleton;

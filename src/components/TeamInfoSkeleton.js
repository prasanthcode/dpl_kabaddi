import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/TeamInfo.css"; // Same CSS file

const TeamInfoSkeleton = () => {
  return (
    <div className="teaminfo-skeleton">
      <Skeleton
        height={40}
        width={250}
        baseColor="rgb(20, 20, 20)"
        highlightColor="rgb(50, 50, 50)"
        style={{ margin: "10px" }}
      />

      <div className="teaminfo-list">
        <div className="teaminfo-items">
          {[...Array(5)].map((_, index) => (
            <div
              className="teaminfo-card skeleton-card"
              key={index}
            >
              <div className="teaminfo-img-wrap">
                <Skeleton
                  circle
                  width={80}
                  height={80}
                  baseColor="rgb(6, 35, 90)"
                  highlightColor="rgb(12, 55, 130)"
                />
                <div className="teaminfo-name" style={{ marginTop: "10px" }}>
                  <Skeleton
                    width={150}
                    height={10}
                    baseColor="rgb(6, 35, 90)"
                    highlightColor="rgb(12, 55, 130)"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamInfoSkeleton;

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TeamInfoSkeleton = () => {
  return (
    <div>
        
        <Skeleton height={40} width={250} baseColor="rgb(20, 20, 20)" highlightColor="rgb(50, 50, 50)" style={{ margin: "10px" }} />
     
      <div className="match_container teams">
        <div className="d_match">
          {[...Array(5)].map((_, index) => (
            <div className="single_match skeleton-container" key={index} style={{ backgroundColor: "rgb(8, 43, 109)", padding: "20px", borderRadius: "10px", marginBottom: "10px" }}>
              <div className="img_wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Skeleton circle width={80} height={80} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
                <div className="team_1" style={{ marginTop: "10px" }}>
                  <Skeleton width={150} height={10} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
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

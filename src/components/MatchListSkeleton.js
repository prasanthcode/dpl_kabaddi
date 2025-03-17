import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MatchListSkeleton = ({isHomePage}) => {
  return (
    <div className="match_container">
      {[...Array(isHomePage?1:3)].map((_, index) => (
        <div className="d_match" key={index} style={{ backgroundColor: "var(--primary-dark)",  marginBottom: "20px" }}>
          <Skeleton height={30} width={200} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" style={{ marginBottom: "20px" }} />
          {[...Array(isHomePage?1:2)].map((_, idx) => (
            <div className="single_match_wrapper" key={idx}>
              <div className="single_match skeleton-container" style={{ backgroundColor: "rgb(8, 43, 109)", margin:"20px 0"}}>
                <h4>
                  <Skeleton width={100} height={20} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
                </h4>
                <div className="vs_container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="img_wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Skeleton circle width={80} height={80} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
                    <Skeleton width={100} height={10} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" style={{ marginTop: "10px" }} />
                  </div>
                  <Skeleton width={50} height={20} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
                  <div className="img_wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Skeleton circle width={80} height={80} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
                    <Skeleton width={100} height={10} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" style={{ marginTop: "10px" }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatchListSkeleton;

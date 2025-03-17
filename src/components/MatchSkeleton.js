import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MatchSkeleton = () => {
  return (
    <div className="match_container">
      <div className="d_match">
        <div className="single_match_wrapper">
          <div className="bg-container">
            <div
              className="single_match view_recent skeleton-container"
              style={{
                backgroundColor: "rgb(8, 43, 109)",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h4>
                <Skeleton width={100} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
              </h4>
              <div className="vs_container" style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="img_wrap" style={{ textAlign: "center" }}>
                  <Skeleton circle width={80} height={80} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
                  <Skeleton width={100} height={10} style={{ marginTop: "10px" }} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
                  <Skeleton width={40} height={10} style={{ marginTop: "5px" }} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
                </div>
                <div className="time" style={{ backgroundColor: "rgb(34, 139, 69)", color: "white", padding: "10px 20px", borderRadius: "5px" }}>
                  <Skeleton width={30} height={10} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
                </div>
                <div className="img_wrap" style={{ textAlign: "center" }}>
                  <Skeleton circle width={80} height={80} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
                  <Skeleton width={100} height={10} style={{ marginTop: "10px" }} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
                  <Skeleton width={40} height={10} style={{ marginTop: "5px" }} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
                </div>
              </div>
              <Skeleton width={250} height={15} style={{ margin: "10px auto" }} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
              <div className="mat" style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <Skeleton width={80} height={10} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
                <Skeleton width={100} height={10} baseColor="rgb(6, 35, 90)" highlightColor="rgb(12, 55, 130)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchSkeleton;

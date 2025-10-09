import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/Matches.css";

const MatchListSkeleton = ({ isHomePage }) => {
  return (
    <div className="matches-container matches-skeleton-container">
      {[...Array(isHomePage ? 1 : 3)].map((_, index) => (
        <div className="matches-skeleton-group" key={index}>
          <Skeleton
            height={30}
            width={200}
            baseColor="#a0a0a0ff"
            highlightColor="white"
            style={{ marginBottom: "20px" }}
          />
          {[...Array(isHomePage ? 1 : 2)].map((_, idx) => (
            <div className="matches-single-wrapper" key={idx}>
              <div className="matches-single matches-skeleton-single">
                <h4>
                  <Skeleton
                    width={100}
                    height={20}
                    baseColor="#a0a0a0ff"
                    highlightColor="white"
                  />
                </h4>

                <div className="matches-vs-container matches-skeleton-vs">
                  <div className="matches-img-wrap matches-skeleton-img">
                    <Skeleton
                      circle
                      width={80}
                      height={80}
                      baseColor="#a0a0a0ff"
                      highlightColor="white"
                    />
                    <Skeleton
                      width={100}
                      height={10}
                      baseColor="#a0a0a0ff"
                      highlightColor="white"
                      style={{ marginTop: "10px" }}
                    />
                  </div>
                  <Skeleton
                    width={50}
                    height={20}
                    baseColor="#a0a0a0ff"
                    highlightColor="white"
                  />
                  <div className="matches-img-wrap matches-skeleton-img">
                    <Skeleton
                      circle
                      width={80}
                      height={80}
                      baseColor="#a0a0a0ff"
                      highlightColor="white"
                    />
                    <Skeleton
                      width={100}
                      height={10}
                      baseColor="#a0a0a0ff"
                      highlightColor="white"
                      style={{ marginTop: "10px" }}
                    />
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

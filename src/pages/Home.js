import React from "react";
import Matches from "./Matches";
import MatchListSkeleton from "../components/MatchListSkeleton";
import AutoCarousel from "../components/AutoCarousel";
import TributeCelebration from "../components/TributeCelebration";
import InstagramCarousel from "../components/InstagramCarousel";
import { useGallery } from "../context/GalleryContext";
import useLiveMatchesCheck from "../hooks/useLiveMatchesCheck";

export default function Home() {
  const { showLive, isChecking } = useLiveMatchesCheck();
  const { postGalleries, loading } = useGallery();

  return (
    <>
      <AutoCarousel />
      <TributeCelebration />

      {isChecking ? (
        <MatchListSkeleton isHomePage={true} />
      ) : (
        <Matches url={showLive ? "live" : "completed"} limit={showLive ? null : 1} />
      )}

      <InstagramCarousel />

      {!loading && (
        <div className="gallery">
          {postGalleries.map((item, idx) => (
            <div key={idx} className="g_container">
              <img
                src={item.url}
                alt={item.caption || "Post image"}
                width="100%"
                style={{ margin: "20px auto", borderRadius: "10px" }}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

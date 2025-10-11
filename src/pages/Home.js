import React from "react";
import Matches from "./Matches";
import AutoCarousel from "../components/AutoCarousel";
import TributeCelebration from "../components/TributeCelebration";
import InstagramCarousel from "../components/InstagramCarousel";
import { useGallery } from "../context/GalleryContext";

export default function Home() {
  const { postGalleries, loading } = useGallery();

  return (
    <>
      <AutoCarousel />
      <TributeCelebration />
      <Matches />
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

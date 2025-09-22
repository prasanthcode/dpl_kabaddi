import React, { useEffect, useState } from "react";
import Matches from "./Matches";
import MatchListSkeleton from "../components/MatchListSkeleton";
import AutoCarousel from "../components/AutoCarousel";
import TributeCelebration from "../components/TributeCelebration";
import InstagramCarousel from "../components/InstagramCarousel";
import useLiveMatchesCheck from "../hooks/useLiveMatchesCheck";
import axios from "axios";

export default function Home() {
  const { showLive, isChecking } = useLiveMatchesCheck();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/gallery?type=post`
        );
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching post gallery:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <AutoCarousel />
      <TributeCelebration />

      {isChecking ? (
        <MatchListSkeleton isHomePage={true} />
      ) : showLive ? (
        <Matches url={"live"} />
      ) : (
        <Matches url={"completed"} limit={1} />
      )}

      <InstagramCarousel />

      <div className="gallery">
        {posts.map((item, idx) => (
          <div key={idx} className="g_container">
            <img
              src={item.url}
              alt={item.caption || "Post image"}
              width={"100%"}
              style={{ margin: "20px auto", borderRadius: "10px" }}
            />
          </div>
        ))}
      </div>
    </>
  );
}

import React from "react";
import { InstagramEmbed,  YouTubeEmbed } from "react-social-media-embed";

const SocialMediaEmbed = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <InstagramEmbed url="https://www.instagram.com/p/Cv1j5zTJKlH/" width={328} />
      <YouTubeEmbed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" width={500} />
    </div>
  );
};

export default SocialMediaEmbed;

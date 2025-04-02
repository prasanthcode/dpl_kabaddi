import React from "react";
import { Box, Typography } from "@mui/material";

const posts = [
  {
    img: "https://images.unsplash.com/photo-1574169208507-84376144848b",
    title: "Exploring the beauty of nature 🌿🌞",
  },
  {
    img: "https://images.unsplash.com/photo-1519608487953-e999c86e7455",
    title: "Chasing the waves 🌊🏄‍♂️",
  },
  {
    img: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    title: "City lights and night drives 🌃🚗",
  },
  {
    img: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc",
    title: "Lost in the forest 🌲✨",
  },
];

export default function InstagramGallery() {
  return (
    <Box sx={{ maxWidth: 400, mx: "auto", pb: 4 }}>
      {posts.map((post, index) => (
        <Box key={index} sx={{ mb: 4 ,backgroundColor:"var(--primary-dark)" }}>
          {/* Post Image */}
          <Box sx={{ width: "100%", height: 400, overflow: "hidden" }}>
            <img
              src={post.img}
              alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
            />
          </Box>

          {/* Post Caption */}
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="body1" fontWeight="bold" >
              {post.title}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

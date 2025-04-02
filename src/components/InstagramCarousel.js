import React from "react";
import Slider from "react-slick";
import { Box, Typography, IconButton } from "@mui/material";
import { Favorite, Share, MoreHoriz } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  {
    img: "https://images.unsplash.com/photo-1574169208507-84376144848b",
    title: "Beautiful Nature",
  },
  {
    img: "https://images.unsplash.com/photo-1519608487953-e999c86e7455",
    title: "Ocean Waves",
  },
  {
    img: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    title: "City Lights",
  },
  {
    img: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc",
    title: "Deep Forest",
  },
];

export default function InstagramCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Box
      sx={{
        maxWidth: 350,
        mx: "auto",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
        border: "1px solid #ddd",
        bgcolor: "white",
      }}
    >
      {/* Header - Like Instagram Post */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1,
          bgcolor: "white",
        }}
      >
        <Typography variant="body1" fontWeight="bold" color="black">
          Photo Gallery
        </Typography>
       
      </Box>

      <Slider {...settings}>
        {images.map((item, index) => (
          <Box key={index} sx={{ width: "100%", height: 400, position: "relative" }}>
            <img
              src={`${item.img}?w=350&h=400&fit=crop`}
              alt={item.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Typography
              variant="body2"
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                bgcolor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                p: 1,
                textAlign: "center",
              }}
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </Slider>

      {/* Footer - Like & Share Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1,
          bgcolor: "white",
        }}
      >
        <Box>
        
          <IconButton color="primary">
            <Share />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Swipe for more →
        </Typography>
      </Box>
    </Box>
  );
}

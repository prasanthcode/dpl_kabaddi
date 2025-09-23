import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchCarouselGalleries } from "../services/galleryApi";

export default function InstagramCarousel() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const res = await fetchCarouselGalleries();
        setImages(res.data);
      } catch (err) {
        console.error("Error fetching carousel gallery:", err);
      }
    };

    fetchCarousel();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <Box
      sx={{
        maxWidth: 350,
        mx: "auto",
        my: "20px",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 5,
        border: "1px solid #ddd",
        bgcolor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
          py: 2,
          bgcolor: "#f5f5f5",
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="black">
          Highlights
        </Typography>
      </Box>

      {images.length > 0 ? (
        <Slider {...settings}>
          {images.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                height: 430,
                position: "relative",
                borderRadius: 3,
              }}
            >
              <img
                src={`${item.url}?w=350&h=400&fit=crop`}
                alt={item.caption || `Slide ${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "3px",
                }}
              />
            </Box>
          ))}
        </Slider>
      ) : (
        <Typography variant="body2" align="center" sx={{ p: 2, color: "gray" }}>
          No highlights available
        </Typography>
      )}
    </Box>
  );
}

import React from "react";
import Slider from "react-slick";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGallery } from "../context/GalleryContext";

export default function InstagramCarousel() {
  const { carouselGalleries } = useGallery();
  const [sliderRef, setSliderRef] = React.useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
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
        my: "20px",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 5,
        border: "1px solid #ddd",
        bgcolor: "white",
        position: "relative",
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

      {carouselGalleries.length > 0 ? (
        <Box sx={{ position: "relative" }}>
          <Slider ref={setSliderRef} {...settings}>
            {carouselGalleries.map((item, index) => (
              <Box key={index} sx={{ width: "100%", height: 430 }}>
                <img
                  src={item.url}
                  alt={item.caption || `Slide ${index}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "0 0 12px 12px",
                  }}
                />
              </Box>
            ))}
          </Slider>
          <IconButton
            onClick={() => sliderRef?.slickPrev()}
            sx={{
              position: "absolute",
              top: "50%",
              left: 8,
              transform: "translateY(-50%)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
            }}
          >
            <ArrowBackIos sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton
            onClick={() => sliderRef?.slickNext()}
            sx={{
              position: "absolute",
              top: "50%",
              right: 8,
              transform: "translateY(-50%)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
            }}
          >
            <ArrowForwardIos sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      ) : (
        <Typography variant="body2" align="center" sx={{ p: 2, color: "gray" }}>
          No highlights available
        </Typography>
      )}
    </Box>
  );
}

import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  {
    img: "https://res.cloudinary.com/dzwksifmb/image/upload/v1743488847/IMG-20250329-WA0003_xfyquc.jpg",
    title: "Champions",
  },{
    img: "https://res.cloudinary.com/dzwksifmb/image/upload/v1743488892/IMG-20250329-WA0010_grubtt.jpg",
    title: "",
  },{
    img: "https://res.cloudinary.com/dzwksifmb/image/upload/v1743488913/IMG-20250329-WA0099_v2qjow.jpg",
    title: "",
  },{
    img: "https://res.cloudinary.com/dzwksifmb/image/upload/v1743488914/IMG-20250329-WA0101_dbvpqc.jpg",
    title: "",
  },{
    img: "https://res.cloudinary.com/dzwksifmb/image/upload/v1743488914/WhatsApp_Image_2025-03-31_at_3.15.21_PM_du1nzj.jpg",
    title: "",
  },{
    img: "https://res.cloudinary.com/dzwksifmb/image/upload/v1743488916/WhatsApp_Image_2025-03-31_at_3.15.22_PM_ygpph0.jpg",
    title: "",
  },{
    img: "https://res.cloudinary.com/dzwksifmb/image/upload/v1743570864/WhatsApp_Image_2025-04-01_at_1.01.21_PM_jbdpj0.jpg",
    title: "",
  },{
    img: "https://res.cloudinary.com/dzwksifmb/image/upload/v1743488913/WhatsApp_Image_2025-03-29_at_10.06.54_PM_qqws2x.jpg",
    title: "",
  },{
    img: "https://res.cloudinary.com/dzwksifmb/image/upload/v1743488915/WhatsApp_Image_2025-03-29_at_11.10.34_PM_a6hqb8.jpg",
    title: "",
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
      {/* Header - Like Instagram Post */}
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

      <Slider {...settings}>
        {images.map((item, index) => (
          <Box key={index} sx={{ width: "100%", height: 430, position: "relative", borderRadius: 3 }}>
            <img
              src={`${item.img}?w=350&h=400&fit=crop`}
              alt={item.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "3px" }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

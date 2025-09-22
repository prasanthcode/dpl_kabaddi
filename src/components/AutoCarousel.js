import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperSkeleton from "./SwiperSkeleton";

export default function AutoCarousel() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/gallery?type=teams`
        );
        setImages(res.data);
      } catch (err) {
        console.error("Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return <SwiperSkeleton />;
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={30}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      loop={true}
      style={{ maxWidth: "600px", margin: "20px auto", position: "relative" }}
    >
      {images.map((item, index) => (
        <SwiperSlide key={index} style={{ position: "relative" }}>
          <img
            src={item.url}
            alt={item.caption || `Slide ${index}`}
            style={{
              width: "100%",
              borderRadius: "10px",
              display: "block",
            }}
          />
          {/* Gradient Overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "30%",
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          ></div>
          {/* Text Overlay */}
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "20px",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              zIndex: 2,
            }}
          >
            {item.caption}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

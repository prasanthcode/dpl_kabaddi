import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const images = [
  {
    src: "https://res.cloudinary.com/dbs1mjd6b/image/upload/c_crop,w_4000,h_1800/v1742194038/Cse_Team_sivhtb.jpg",
    title: "CSE STRIKERS",
  },
  {
    src: "https://res.cloudinary.com/dbs1mjd6b/image/upload/c_crop,w_4000,h_1800/v1742194038/Eee_dhuqbh.jpg",
    title: "EEE THUNDERS",
  },
  {
    src: "https://res.cloudinary.com/dbs1mjd6b/image/upload/c_crop,w_4000,h_1800,g_auto/v1742194035/Mech_crsdoo.jpg",
    title: "MIGHTY MECHANICAL",
  },
  {
    src: "https://res.cloudinary.com/dzwksifmb/image/upload/c_crop,w_4000,h_1800/v1742194985/Ece_ludmbz.jpg",
    title: "ECE CHALLENGERS",
  },
  {
    src: "https://res.cloudinary.com/dzwksifmb/image/upload/c_crop,w_4000,h_1800/v1742194985/Civil_mnloyr.jpg",
    title: "ROYAL CIVIL",
  },
];

export default function AutoCarousel() {
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
            src={item.src}
            alt={`Slide ${index}`}
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
              height: "30%", // Adjust gradient height
              background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",
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
            {item.title}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

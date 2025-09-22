import React from "react";

export default function SwiperSkeleton() {
  const slides = [1, 2, 3];

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        position: "relative",
        display: "flex",
        overflow: "hidden",
        borderRadius: "10px",
      }}
    >
      {slides.map((_, index) => (
        <div
          key={index}
          style={{
            flex: "0 0 100%",
            height: "300px",
            marginRight: "30px",
            borderRadius: "10px",
            background:
              "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        ></div>
      ))}

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

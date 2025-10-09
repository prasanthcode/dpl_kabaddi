import React from "react";

export default function Playoff() {
  return (
    <div className="playoff-image-container" style={{  padding: "0 10px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        DPL Boys Kabaddi Road To The Final
      </h3>
      <img
        className="playoff-image"
        src="https://res.cloudinary.com/dbs1mjd6b/image/upload/v1742799674/WhatsApp_Image_2025-03-24_at_12.21.35_PM_klsnnj.jpg"
        alt="Road to the Final"
        style={{
          // width: "100%",
          height: "auto",
          borderRadius: "8px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
}

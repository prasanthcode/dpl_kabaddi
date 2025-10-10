import React from "react";

export default function Heading({ text }) {
  return (
    <div style={{ backgroundColor: "#f58c0cff", margin: "20px 0" }}>
      <span
        style={{
          backgroundColor: "var(--primary-dark)",
          marginLeft: "10px",
          fontSize: "16px",
          fontWeight: "600",
          padding: "2px 10px",
        }}
      >
        {text}
      </span>
    </div>
  );
}

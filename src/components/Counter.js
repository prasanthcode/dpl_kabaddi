import React from "react";
import CountUp from "react-countup";

export default function Counter() {
  return (
    <div style={{ fontSize: "40px", fontWeight: "bold", textAlign: "center", marginTop: "50px" }}>
      <CountUp start={0} end={100} duration={3} />
    </div>
  );
}

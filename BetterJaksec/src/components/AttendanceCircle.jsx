import React from "react";

export default function AttendanceCircle({ attended, total, size = 250 }) {
  const percentage = total > 0 ? Math.round((attended / total) * 100) : 0;

  return (
    <div
      className="inner-card"
      style={{
        position: "relative",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: `conic-gradient(
          green ${percentage}%,
          red ${percentage}% 100%
        )`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="inner-card"
        style={{
          position: "absolute",
          color: "#000",
          fontSize: `${size * 0.18}px`,
          fontWeight: "bold",
        }}
      >
        {percentage}%
      </div>
    </div>
  );
}
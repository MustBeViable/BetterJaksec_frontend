import React from "react";
import { useTranslation } from "react-i18next";
import { formatPercent } from "../i18n/format";

export default function AttendanceCircle({ attended, total, size = 250 }) {
  const { i18n } = useTranslation("common");
  const percentage = total > 0 ? Math.round((attended / total) * 100) : 0;

  return (
    <div
      style={{
        position: "relative",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: `conic-gradient(
          #4caf50 ${percentage}%,
          #f44336 ${percentage}% 100%
        )`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          fontSize: `${size * 0.18}px`,
          fontWeight: "bold",
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          background: "transparent",
        }}
      >
        {formatPercent(percentage, i18n.language)}
      </div>
    </div>
  );
}
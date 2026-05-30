import React from "react";

export const panelStyle: React.CSSProperties = {
  background: "#111111",
  border: "1px solid rgba(255,107,26,0.2)",
  borderRadius: 2,
  padding: 32,
};

export const dotStyle: React.CSSProperties = {
  width: 10,
  height: 10,
  borderRadius: "50%",
  animation: "blink 2s ease-in-out infinite",
  flexShrink: 0,
};

export const panelTitleStyle: React.CSSProperties = {
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: 26,
  letterSpacing: 2,
};

export const labelStyle: React.CSSProperties = {
  fontFamily: "'DM Mono', monospace",
  fontSize: 10,
  letterSpacing: 2.5,
  textTransform: "uppercase",
  color: "#6B6560",
};

export const inputStyle: React.CSSProperties = {
  background: "#181818",
  border: "1px solid rgba(255,107,26,0.15)",
  color: "#F5F0EB",
  fontFamily: "'DM Mono', monospace",
  fontSize: 14,
  padding: "14px 16px",
  borderRadius: 2,
  outline: "none",
  width: "100%",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

export const btnStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 8,
  background: "#FF6B1A",
  color: "#0a0a0a",
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: 20,
  letterSpacing: 3,
  padding: "16px",
  border: "none",
  borderRadius: 2,
  cursor: "pointer",
  transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
};

export const insightSectionLabel = (color: string): React.CSSProperties => ({
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: 18,
  letterSpacing: 2.5,
  color,
});

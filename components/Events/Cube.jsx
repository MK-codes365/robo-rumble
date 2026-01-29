"use client";
import React from "react";

const Cube = ({ size = 80 }) => {
  const half = size / 2;

  const faceStyle = {
    width: `${size}px`,
    height: `${size}px`,
    position: "absolute",
    border: "1px solid rgba(0,255,255,0.25)",
    background: "linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(0,255,255,0.1))",
    boxShadow: "0 0 12px rgba(0,255,255,0.25)"
  };

  return (
    <div className="relative preserve-3d" style={{ width: size, height: size }}>
      <div style={{ ...faceStyle, transform: `translateZ(${half}px)` }} />
      <div style={{ ...faceStyle, transform: `rotateY(180deg) translateZ(${half}px)` }} />
      <div style={{ ...faceStyle, transform: `rotateY(90deg) translateZ(${half}px)` }} />
      <div style={{ ...faceStyle, transform: `rotateY(-90deg) translateZ(${half}px)` }} />
      <div style={{ ...faceStyle, transform: `rotateX(90deg) translateZ(${half}px)` }} />
      <div style={{ ...faceStyle, transform: `rotateX(-90deg) translateZ(${half}px)` }} />
    </div>
  );
};

export default Cube;

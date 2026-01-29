"use client";
import React from "react";

const TechBackground = ({ children }) => {
  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-black font-sans"
      style={{ perspective: "1000px" }}
    >
      {/* ---------- GLOBAL ANIMATIONS ---------- */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotateX(20deg) rotateY(30deg); }
          50% { transform: translateY(-20px) rotateX(25deg) rotateY(35deg); }
        }
        @keyframes spin-slow {
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spin-rev {
          100% { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>

      {/* ---------- BACKGROUND ---------- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#001233_0%,#000000_90%)] z-0" />

      {/* ---------- GRID ---------- */}
      <div
        className="absolute top-[10%] left-0 w-full h-[60%] z-[1] opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,100,255,0.25) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          maskImage:
            "radial-gradient(circle, black 40%, transparent 80%)",
        }}
      />

      {/* ---------- HEX OVERLAY ---------- */}
      <svg className="absolute inset-0 z-[2] opacity-40 pointer-events-none">
        <defs>
          <pattern
            id="hex"
            width="50"
            height="44"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M25,0 L50,11 L50,33 L25,44 L0,33 L0,11 Z"
              fill="none"
              stroke="rgba(0,255,255,0.25)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex)" />
      </svg>

      {/* ---------- FLOATING CUBES ---------- */}
      <div
        className="absolute top-[20%] left-[5%] preserve-3d z-10"
        style={{ animation: "float 6s ease-in-out infinite" }}
      >
        <Cube size={80} />
      </div>

      <div
        className="absolute bottom-[20%] right-[5%] preserve-3d z-10"
        style={{
          animation: "float 8s ease-in-out infinite",
          transform: "scale(0.7)",
        }}
      >
        <Cube size={60} />
      </div>

      {/* ---------- CENTRAL HUD ---------- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[65%] z-20 border border-cyan-400/30 bg-[#000a28]/50 backdrop-blur-md shadow-[inset_0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(0,255,255,0.2)]">
        
        {/* CORNERS */}
        <Corner pos="tl" />
        <Corner pos="tr" />
        <Corner pos="bl" />
        <Corner pos="br" />

        {/* TITLE + CONTENT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-4 mt-7">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-widest text-[#00ff99] drop-shadow-[0_0_20px_#00ff99]">
            EVENTS
          </h1>

          {/*  YAHAN TUMHARA SWIPER AAYEGA */}
          <div className="w-full h-full flex items-center justify-center">
            {children}
          </div>
        </div>
      </div>

      {/* ---------- FLOOR PORTAL ---------- */}
      <div
        className="absolute -bottom-[25%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full z-[1]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,255,0.25) 0%, transparent 60%)",
          transform: "rotateX(70deg)",
        }}
      >
        <div
          className="absolute inset-1/2 w-[40%] h-[40%] rounded-full border border-dashed border-cyan-400/40"
          style={{ animation: "spin-slow 20s linear infinite" }}
        />
        <div
          className="absolute inset-1/2 w-[80%] h-[80%] rounded-full border-t-4 border-cyan-400/70"
          style={{ animation: "spin-rev 15s linear infinite" }}
        />
      </div>
    </div>
  );
};

/* ---------- SUB COMPONENTS ---------- */

const Cube = ({ size }) => {
  const half = size / 2;

  const face = {
    width: size,
    height: size,
  };

  const cls =
    "absolute border border-cyan-200/50 bg-gradient-to-br from-white/20 to-cyan-400/10 shadow-[0_0_12px_rgba(0,255,255,0.25)]";

  return (
    <div className="relative preserve-3d" style={{ width: size, height: size }}>
      <div className={cls} style={{ ...face, transform: `translateZ(${half}px)` }} />
      <div className={cls} style={{ ...face, transform: `rotateY(180deg) translateZ(${half}px)` }} />
      <div className={cls} style={{ ...face, transform: `rotateY(90deg) translateZ(${half}px)` }} />
      <div className={cls} style={{ ...face, transform: `rotateY(-90deg) translateZ(${half}px)` }} />
      <div className={cls} style={{ ...face, transform: `rotateX(90deg) translateZ(${half}px)` }} />
      <div className={cls} style={{ ...face, transform: `rotateX(-90deg) translateZ(${half}px)` }} />
    </div>
  );
};

const Corner = ({ pos }) => {
  const map = {
    tl: "-top-1 -left-1 border-t-4 border-l-4",
    tr: "-top-1 -right-1 border-t-4 border-r-4",
    bl: "-bottom-1 -left-1 border-b-4 border-l-4",
    br: "-bottom-1 -right-1 border-b-4 border-r-4",
  };

  return (
    <div
      className={`absolute w-5 h-5 border-cyan-400 shadow-[0_0_12px_#00ffff] ${map[pos]}`}
    />
  );
};

export default TechBackground;

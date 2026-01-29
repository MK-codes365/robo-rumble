"use client";
import React, { useEffect, useState } from "react";

// 1. Accept 'children' prop here
const TechBackground = ({ children }) => {
  const [particles, setParticles] = useState([]);

  // Hydration Fix: Generate particles only on client
  useEffect(() => {
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 3}px`,
      height: `${Math.random() * 3}px`,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#020617] font-sans text-white overflow-x-hidden">
      
      {/* --- BACKGROUND LAYERS (Fixed Position) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          {/* 1. Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#000000] opacity-100" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(14,165,233,0.1),transparent_70%)]" />

          {/* 2. Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
          </div>

          {/* 3. Floating Particles */}
          <div className="absolute inset-0">
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full bg-cyan-400"
                style={{
                  top: p.top,
                  left: p.left,
                  width: p.width,
                  height: p.height,
                  opacity: p.opacity,
                  boxShadow: '0 0 4px rgba(34, 211, 238, 0.8)',
                  transition: 'opacity 0.5s ease-in-out'
                }}
              />
            ))}
          </div>

          {/* 4. Top Left Graphic */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 opacity-20">
              <Hexagon size={120} strokeWidth={1} className="text-cyan-600" />
            </div>
            <div className="absolute top-[-20px] left-[100px] opacity-10">
              <Hexagon size={100} strokeWidth={1} className="text-cyan-600" />
            </div>
            <svg className="absolute top-0 left-0 w-[500px] h-[300px] drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
              <defs>
                <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0891b2" stopOpacity="0" />
                  <stop offset="20%" stopColor="#22d3ee" stopOpacity="1" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 100 L50 100 L70 60 L90 140 L110 100 L200 100 L230 100" fill="none" stroke="url(#lineGradient1)" strokeWidth="2" className="opacity-90" />
              <circle cx="70" cy="60" r="3" fill="#bef264" className="animate-pulse" />
            </svg>
          </div>

          {/* 5. Bottom Right Graphic */}
          <div className="absolute bottom-0 right-0 w-full h-full rotate-180">
            <div className="absolute top-10 left-10 opacity-20">
              <Hexagon size={140} strokeWidth={1} className="text-cyan-600" />
            </div>
            <div className="absolute top-24 left-32 opacity-15">
               <Hexagon size={80} strokeWidth={1} className="text-cyan-600" />
            </div>
            <svg className="absolute top-0 left-0 w-[600px] h-[300px] drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
               <path d="M0 80 L100 80 L120 20 L140 130 L160 80 L350 80" fill="none" stroke="#22d3ee" strokeWidth="2" className="opacity-80" />
              <circle cx="120" cy="20" r="3" fill="#fff" className="animate-pulse shadow-[0_0_10px_#fff]" />
            </svg>
          </div>
      </div>
      
      {/* --- CONTENT LAYER (Important part) --- */}
      {/* Is div me z-10 hai taaki ye background ke upar dikhe */}
      <div className="relative z-10 w-full h-full">
         {children}
      </div>

    </div>
  );
};

// Reusable Hexagon Component
const Hexagon = ({ size = 100, strokeWidth = 2, className = "" }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 L50 0Z" stroke="currentColor" strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

export default TechBackground;
"use client"
import React, { useEffect, useState } from 'react';

const CyberHexBackground = () => {
  const [hexagons, setHexagons] = useState([]);

  // Hexagon configuration
  const hexSize = 40; 
  const strokeWidth = 2; 

  useEffect(() => {
    // Ye code ab sirf browser me chalega, server pe error nahi dega
    const hexWidth = Math.sqrt(3) * hexSize;
    const hexHeight = 2 * hexSize;
    const vertDist = hexHeight * 0.75;

    const cols = Math.ceil(window.innerWidth / hexWidth) + 2;
    const rows = Math.ceil(window.innerHeight / vertDist) + 2;
    
    const newHexagons = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const xOffset = (r % 2 === 0) ? 0 : hexWidth / 2;
        const x = (c * hexWidth) + xOffset - hexWidth;
        const y = (r * vertDist) - hexHeight;

        // Randomly decide which hex is bright (active)
        const isActive = Math.random() < 0.15;
        const opacity = isActive ? 0.9 : 0.2; 
        
        newHexagons.push({
          id: `${r}-${c}`,
          x,
          y,
          opacity,
          isActive
        });
      }
    }
    setHexagons(newHexagons);
  }, []); // Empty dependency array ensures this runs once on mount

  // Calculate points for a single hexagon
  const createHexPath = (x, y, r) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle_deg = 30 + 60 * i;
      const angle_rad = (Math.PI / 180) * angle_deg;
      const px = x + r * Math.cos(angle_rad);
      const py = y + r * Math.sin(angle_rad);
      points.push(`${px},${py}`);
    }
    return points.join(" ");
  };

  return (
    <div className="fixed inset-0 bg-black -z-10 overflow-hidden">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Neon Glow Filter Definition */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {hexagons.map((hex) => (
          <polygon
            key={hex.id}
            points={createHexPath(hex.x, hex.y, hexSize)}
            fill="transparent"
            stroke="#06b6d4" 
            strokeWidth={strokeWidth}
            strokeOpacity={hex.opacity}
            // "url(#glow)" tells SVG to use the filter defined above with id="glow"
            filter={hex.isActive ? "url(#glow)" : ""} 
            style={{ transition: 'stroke-opacity 1s ease-in-out' }}
          />
        ))}
      </svg>

      {/* Vignette Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80 pointer-events-none"></div>
    </div>
  );
};

export default CyberHexBackground;
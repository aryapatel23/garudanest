import React from 'react';

export const GarudaLogo = ({ className = "w-12 h-12", animated = false, glow = false }) => (
  <div className={`relative ${className} ${glow ? 'drop-shadow-[0_0_15px_rgba(255,107,0,0.5)]' : ''}`}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Structural Frame */}
      <path d="M50 5 L95 27.5 L95 72.5 L50 95 L5 72.5 L5 27.5 Z" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      {/* The Core 'G' Wing - Pure SVG Logic */}
      <path 
        d="M80 35 L50 15 L20 35 L20 65 L50 85 L80 65 L80 50 L55 50" 
        stroke="#FF6B00" 
        strokeWidth="6" 
        strokeLinecap="square" 
        strokeLinejoin="miter"
        className={animated ? "logo-draw-animation" : ""} 
      />
      {/* Kinetic Center Node */}
      <rect x="48" y="48" width="4" height="4" fill="#00E5FF" className="animate-pulse" />
    </svg>
  </div>
);

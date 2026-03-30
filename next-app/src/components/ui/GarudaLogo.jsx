"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const GarudaLogo = ({ className = "w-12 h-12", animated = false, glow = false }) => {
  const logoRef = useRef(null);
  const glowRef = useRef(null);

  useGSAP(() => {
    if (!animated) return;

    // Initial "Boot" sequence
    gsap.fromTo(logoRef.current,
      { filter: 'brightness(0) blur(10px)', scale: 0.8, opacity: 0 },
      { 
        filter: 'brightness(1) blur(0px)', 
        scale: 1, 
        opacity: 1, 
        duration: 1.2, 
        ease: 'power4.out',
        delay: 0.5 
      }
    );

    // Continuous pulse if glow is true
    if (glow) {
      gsap.to(glowRef.current, {
        opacity: 0.6,
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }, { scope: logoRef, dependencies: [animated, glow] });

  return (
    <div ref={logoRef} className={`relative flex items-center justify-center ${className}`}>
      {/* Outer Glow Halo */}
      {glow && (
        <div 
          ref={glowRef}
          className="absolute inset-0 bg-[#FF6B00]/20 blur-xl rounded-full scale-90 opacity-30 pointer-events-none"
        />
      )}
      
      {/* The Core Logo Asset */}
      <img 
        src="https://res.cloudinary.com/dczue3n9b/image/upload/v1773997242/1773927705698_e_1775692800_v_beta_t_wnK_isUP_7OGaqksgyBNyb3Z-2mX6HKiY49f_cp67X4_kkmle0.png"
        alt="GarudaNest Logo"
        className="w-full h-full object-contain relative z-10"
      />
      
      {/* Optional Scanline Overlay for "Animated" state */}
      {animated && (
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent h-1/2 w-full top-0 animate-[scanline_3s_linear_infinite] pointer-events-none z-20 opacity-20" />
      )}

      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </div>
  );
};

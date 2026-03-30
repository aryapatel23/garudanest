"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { GarudaLogo } from '@/components/ui/GarudaLogo';

export const Preloader = () => {
  const [loading, setLoading] = useState(false);
  const [loadStatus, setLoadStatus] = useState("Initializing...");
  const pathname = usePathname();

  useEffect(() => {
    // ALWAYS reset to top on navigation (even if loader doesn't show)
    window.scrollTo(0, 0);

    const hasLoaded = sessionStorage.getItem('garuda_loaded');
    if (hasLoaded) return;
    
    setLoading(true);
    
    const statuses = [
      "fetching_neural_nodes...",
      "compiling_architectural_grid...",
      "syncing_garuda_core...",
      "bypassing_standard_ui...",
      "READY."
    ];
    let currentIdx = 0;
    const statusInterval = setInterval(() => {
      if (currentIdx < statuses.length) {
        setLoadStatus(statuses[currentIdx]);
        currentIdx++;
      }
    }, 600);

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('garuda_loaded', 'true');
    }, 3500);
    
    return () => {
      clearTimeout(timer);
      clearInterval(statusInterval);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Minimal Thematic Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,0,0.03)_0%,transparent 70%)]"></div>
      </div>

      <div className="relative mb-12 z-10">
        <GarudaLogo animated glow className="w-48 h-48" />
        {/* Discrete Pulse Glow */}
        <div className="absolute -inset-4 bg-[#FF6B00]/10 blur-3xl animate-pulse rounded-full opacity-50"></div>
      </div>
      
      <div className="text-center font-mono z-10">
        <div className="text-[10px] tracking-[1em] uppercase text-white/20 mb-2">System Load</div>
        <div className="text-xs text-[#00E5FF] uppercase font-bold tracking-widest">{loadStatus}</div>
      </div>
    </div>
  );
};

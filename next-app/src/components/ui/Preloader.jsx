"use client";

import React, { useState, useEffect } from 'react';
import { GarudaLogo } from '@/components/ui/GarudaLogo';

export const Preloader = () => {
  const [loading, setLoading] = useState(false);
  const [loadStatus, setLoadStatus] = useState("Initializing...");

  useEffect(() => {
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
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
      <div className="relative mb-12">
        <GarudaLogo animated glow className="w-48 h-48" />
        <div className="absolute -inset-10 bg-[#FF6B00]/5 blur-[100px] animate-pulse"></div>
      </div>
      
      <div className="text-center font-mono">
        <div className="text-[10px] tracking-[1em] uppercase text-white/40 mb-2">System Load</div>
        <div className="text-xs text-[#00E5FF] uppercase font-bold tracking-widest">{loadStatus}</div>
      </div>
    </div>
  );
};

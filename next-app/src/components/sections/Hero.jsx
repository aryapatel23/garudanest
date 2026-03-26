"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';

export const Hero = () => (
  <section id="home" className="relative min-h-[110vh] flex flex-col justify-start px-6 md:px-10 pt-44 lg:pt-52">
    <div className="max-w-7xl mx-auto w-full relative">
      <div className="flex items-center gap-3 mb-10">
        <div className="h-[1px] w-16 bg-[#FF6B00]"></div>
        <span className="text-[10px] uppercase tracking-[0.5em] text-[#FF6B00] font-bold">Node 0x1 // Established 2026</span>
      </div>

      <h1 className="font-sync text-[13vw] md:text-[11vw] font-black leading-[0.8] uppercase tracking-tighter mb-16">
        <span className="block italic opacity-20 hover:opacity-100 transition-opacity">BUILDING</span>
        <span className="block ml-[4vw] glitch-text text-[#FF6B00]" data-text="SYST3MS">SYST3MS</span>
        <span className="block text-right mr-[4vw] text-[#00E5FF]">THAT SOAR</span>
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="max-w-md border-l-2 border-white/10 pl-8">
          <p className="text-xs md:text-sm leading-relaxed text-slate-400 uppercase font-bold">
            Not an agency. Not a factory. <br />
            We are a high-velocity engineering collective <br />
            architecting the next phase of digital infrastructure.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-6 w-full md:w-auto">
          <div className="flex gap-4 text-[9px] font-mono text-[#00E5FF]">
            <span className="border border-[#00E5FF]/30 px-2 py-1">[REACT_CORE]</span>
            <span className="border border-[#00E5FF]/30 px-2 py-1">[AI_NODES]</span>
            <span className="border border-[#00E5FF]/30 px-2 py-1">[RUST_INFRA]</span>
          </div>
          <a href="/hire" className="w-full md:w-auto px-16 py-6 bg-[#FF6B00] text-black font-black uppercase text-xs hover:bg-white transition-all flex items-center justify-center gap-4 group">
            Initiate Build <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

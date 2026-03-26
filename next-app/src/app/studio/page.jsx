"use client";

import React, { useState } from 'react';
import { Camera, Shield, Zap, Send, Globe, Users } from 'lucide-react';
import { BentoCard } from '@/components/ui/BentoCard';

export default function StudioPage() {
  const [formStatus, setFormStatus] = useState({ type: "idle", message: "" });

  const handleGatewaySubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setFormStatus({ type: 'loading', message: 'Establishing Secure Uplink...' });
    
    // Simulate API delay for "Elite" feel
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormStatus({ type: 'success', message: 'CONNECTION_ESTABLISHED. WE WILL RESPOND IF NECESSARY.' });
    form.reset();
  };

  const galleryImages = [
    { url: "file:///C:/Users/aryau/.gemini/antigravity/brain/0cfaddf0-0086-4e1a-b5b2-3800b573986e/studio_vibe_1_1774549809102.png", size: "col-span-2 row-span-2" },
    { url: "file:///C:/Users/aryau/.gemini/antigravity/brain/0cfaddf0-0086-4e1a-b5b2-3800b573986e/studio_vibe_2_1774549830912.png", size: "col-span-1 row-span-1" },
    { url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop", size: "col-span-1 row-span-1" },
    { url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", size: "col-span-2 row-span-1" }
  ];

  return (
    <div className="pt-32 pb-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Architectural Header */}
        <div className="relative group mb-16 md:mb-24 pt-12 md:pt-16">
          <span className="absolute -top-3 left-0 text-[#FF6B00] opacity-[0.06] font-sync font-bold text-4xl md:text-8xl uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
            Internal Node
          </span>

          <h2 className="relative z-10 text-4xl md:text-7xl font-sync font-bold uppercase tracking-tighter text-white leading-none">
            Studio <span className="text-[#FF6B00]">Archives</span>
          </h2>
          
          <p className="max-w-2xl mt-6 text-slate-400 text-xs md:text-sm uppercase tracking-widest leading-relaxed font-medium">
            Visual documentation of the humans behind the systems. Pure engineering, zero overhead.
          </p>

          <div className="h-[2px] w-16 bg-[#FF6B00] mt-8 opacity-40"></div>
        </div>

        {/* Studio Intelligence Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: <Shield size={20} />, t: "The Mission", d: "We exist to build mission-critical infrastructure for entities that cannot afford failure." },
            { icon: <Zap size={20} />, t: "Velocity Node", d: "8 Senior architects. Zero management layers. 10x shipping frequency." },
            { icon: <Globe size={20} />, t: "Global Sync", d: "Distributed mastery with a single objective: architectural perfection." }
          ].map((item, i) => (
            <BentoCard key={i} className="p-8 group hover:border-[#FF6B00]/30 transition-all">
              <div className="text-[#00E5FF] mb-6 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
              <h3 className="text-sm font-sync font-bold uppercase text-white mb-4 tracking-widest">{item.t}</h3>
              <p className="text-[11px] text-slate-400 uppercase leading-loose font-medium">{item.d}</p>
            </BentoCard>
          ))}
        </div>

        {/* Premium Masonry Gallery */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <Camera size={16} className="text-[#FF6B00]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">Visual_Logs // 0xAF4</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[300px]">
            {galleryImages.map((img, i) => (
              <div key={i} className={`${img.size} relative overflow-hidden group rounded-sm border border-white/5`}>
                <img 
                  src={img.url} 
                  alt="Studio vibe" 
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[8px] font-mono px-2 py-1 bg-black/80 backdrop-blur-md text-[#00E5FF] uppercase">frame_0{i+1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Studio Link to About Us (Optional redirect) */}
        <div className="pt-20 border-t border-white/5 flex flex-col items-center">
            <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-6 text-center">Interested in the architectural thinking behind the studio?</p>
            <a href="/about" className="text-[#FF6B00] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors border-b border-[#FF6B00]">
                Read The Genesis Protocol
            </a>
        </div>
      </div>
    </div>
  );
}

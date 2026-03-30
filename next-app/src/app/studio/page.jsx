"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Camera, ArrowRight, Filter, X, Activity } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function StudioPage() {
  const container = useRef(null);
  const [visibleCount, setVisibleCount] = useState(7);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const galleryImages = [
    { 
      url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop", 
      size: "col-span-1 md:col-span-2 row-span-2",
      title: "Architecture Sync",
      tag: "0xA1_MEETING",
      category: "Briefings",
      description: "Mapping out the core infrastructure dependencies before locking in the production tech stack. Transparency requires absolute alignment."
    },
    { 
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop", 
      size: "col-span-1 md:col-span-2 row-span-1",
      title: "Collective Briefing",
      tag: "0xA2_SYNC",
      category: "Briefings",
      description: "Cross-validating system logic across the senior squad. Eliminating ambiguity before an expensive line of code is written."
    },
    { 
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop", 
      size: "col-span-1 md:col-span-1 row-span-1",
      title: "Focus Mode",
      tag: "0xA3_DEEPWORK",
      category: "Deep Work",
      description: "Complete immersion. Building concurrent backend logic handling for high-frequency financial protocols."
    },
    { 
      url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop", 
      size: "col-span-1 md:col-span-1 row-span-1",
      title: "System Assembly",
      tag: "0xA4_BUILD",
      category: "Deep Work",
      description: "Connecting backend endpoints to the React architecture under strict zero-latency requirements."
    },
    { 
      url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop", 
      size: "col-span-1 md:col-span-2 row-span-2",
      title: "Hackathon Sprint",
      tag: "0xA5_VELOCITY",
      category: "Hackathons",
      description: "A 48-hour continuous velocity sprint to establish the first iteration of the automated deployment pipeline."
    },
    { 
      url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop", 
      size: "col-span-1 md:col-span-1 row-span-1",
      title: "Code Review",
      tag: "0xA6_AUDIT",
      category: "Deep Work",
      description: "Cross-examining Pull Requests. Searching for security flaws, memory leaks, and unoptimized queries."
    },
    { 
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop", 
      size: "col-span-1 md:col-span-1 row-span-1",
      title: "Terminal Output",
      tag: "0xA7_DEPLOY",
      category: "Events",
      description: "Monitoring live logs directly from the AWS instances during our first global alpha environment launch."
    },
    { 
      url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop", 
      size: "col-span-1 md:col-span-1 row-span-1",
      title: "Strategy Session",
      tag: "0xA8_STRATEGY",
      category: "Briefings",
      description: "Finalizing the brand identity narrative and user experience flow for a legacy enterprise client."
    },
    { 
      url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop", 
      size: "col-span-1 md:col-span-1 row-span-1",
      title: "Integration Log",
      tag: "0xA9_SYSTEMS",
      category: "Deep Work",
      description: "Testing third-party API webhooks and validating security tokens within an isolated staging branch."
    },
    { 
      url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop", 
      size: "col-span-1 md:col-span-2 row-span-1",
      title: "Global Sync",
      tag: "0xAA_NODE",
      category: "Events",
      description: "Bringing the entire distributed collective together on a single channel to align on the quarterly technical roadmap."
    },
    { 
      url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop", 
      size: "col-span-1 md:col-span-2 row-span-2",
      title: "Midnight Deployment",
      tag: "0xAB_SHIP",
      category: "Hackathons",
      description: "Executing massive production database migrations when web traffic is at its absolute lowest. Engineering while the world sleeps."
    },
    { 
      url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop", 
      size: "col-span-1 md:col-span-2 row-span-1",
      title: "Whiteboard Wireframe",
      tag: "0xAC_ARCH",
      category: "Events",
      description: "Translating abstract business requirements into strict mathematical state machines and structural logic."
    }
  ];

  const categories = ["All", "Hackathons", "Deep Work", "Briefings", "Events"];
  
  const filteredImages = activeFilter === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  // Elite GSAP Initialization
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo('.studio-ghost',
        { x: -80, autoAlpha: 0 },
        { x: 0, autoAlpha: 0.06, duration: 1.4 }
      )
      .fromTo('.studio-title',
        { y: 60, autoAlpha: 0, filter: 'blur(10px)' },
        { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1.4 },
        '-=1.0'
      )
      .fromTo('.studio-sub',
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1.0 },
        '-=0.8'
      )
      .fromTo('.studio-line',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.0 },
        '-=0.6'
      )
      .fromTo('.studio-filters',
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 1.0 },
        '-=0.4'
      );

    // Scroll reveal for grids and final CTA
    gsap.utils.toArray('.reveal-up').forEach((el, i) => {
      gsap.fromTo(el,
        { y: 50, autoAlpha: 0 },
        { 
          y: 0, autoAlpha: 1, duration: 1.0, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true } 
        }
      );
    });

  }, { scope: container });

  // GSAP for Masonry Image staggering on filter change
  useGSAP(() => {
    gsap.fromTo('.studio-card',
      { y: 40, autoAlpha: 0, scale: 0.95 },
      { 
        y: 0, autoAlpha: 1, scale: 1, duration: 0.8, stagger: 0.05, ease: 'power3.out',
        scrollTrigger: { trigger: '.studio-grid', start: 'top 85%', once: true }
      }
    );
    ScrollTrigger.refresh();
  }, { scope: container, dependencies: [activeFilter, visibleCount] });

  return (
    <div ref={container} className="relative pt-32 pb-20 px-6 bg-[#050505] min-h-screen font-space overflow-hidden">
      {/* IMMERSIVE AURORA BACKDROP */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-[#FF6B00]/[0.03] blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-[#00E5FF]/[0.03] blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '12s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-0">
        
        {/* PAGE HEADER */}
        <div className="relative group mb-16 md:mb-24 pt-12 md:pt-16">
          <span className="studio-ghost absolute -top-3 left-0 text-[#FF6B00] opacity-[0.06] font-sync font-bold text-4xl md:text-8xl uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
            Visual Logs
          </span>

          <h2 className="studio-title relative z-10 text-4xl md:text-7xl font-sync font-bold uppercase tracking-tighter text-white leading-none">
            Studio <span className="text-[#00E5FF]">Archives</span>
          </h2>
          
          <p className="studio-sub max-w-2xl mt-6 text-slate-400 text-xs md:text-sm uppercase tracking-widest leading-relaxed font-medium">
            Visual documentation of our collective execution, group participation, and the reality of elite engineering.
          </p>

          <div className="studio-line h-[2px] w-16 bg-[#00E5FF] mt-8 opacity-40"></div>
        </div>

        {/* Premium Masonry Gallery & Filter Section */}
        <div className="mb-32 relative z-10">
          
          <div className="studio-filters flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
                <Camera size={16} className="text-[#00E5FF]" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white">Active_Deployments // 0xAF4</span>
            </div>

            {/* ── HARDWARE FILTER TABS ── */}
            <div className="flex flex-wrap gap-2 md:gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 text-white/40 mr-4 shrink-0 hidden sm:flex">
                  <Filter size={14} />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Sort_Logs</span>
              </div>
              {categories.map((cat) => {
                const isActive = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => { setActiveFilter(cat); setVisibleCount(7); }}
                    className={`group relative px-4 py-2 md:py-2.5 transition-all duration-300 overflow-hidden border ${
                      isActive
                        ? 'text-[#00E5FF] font-bold border-transparent'
                        : 'text-white/40 hover:text-white/80 border-transparent hover:border-white/10'
                    }`}
                  >
                    {/* Active Underline */}
                    <div className={`absolute bottom-0 left-0 h-[2px] bg-[#00E5FF] transition-all duration-500 ease-out ${isActive ? 'w-full' : 'w-0'}`} />
                    {/* Active Background Glow */}
                    <div className={`absolute inset-0 bg-[#00E5FF]/[0.05] transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                    
                    <span className="relative z-10 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-mono flex items-center gap-2">
                      {isActive && <div className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full animate-pulse shadow-[0_0_8px_#00E5FF]" />}
                      {cat}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
          
          <div className="studio-grid grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[250px] mb-12 min-h-[500px]">
            {filteredImages.slice(0, visibleCount).map((img, i) => (
              <div 
                key={`${img.title}-${i}`} 
                onClick={() => setSelectedImage(img)}
                className={`studio-card ${img.size} relative overflow-hidden group rounded-sm border border-white/5 bg-[#050505] flex flex-col justify-end cursor-pointer will-change-transform`}
              >
                {/* Background Image with CSS Glitch Start on Hover */}
                <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-[800ms] ease-out">
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[1s]" 
                  />
                </div>

                {/* Scan-line Laser Sweeper Overlay */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00E5FF]/80 shadow-[0_0_20px_#00E5FF] -translate-y-[10px] opacity-0 group-hover:opacity-100 group-hover:animate-[sweep_2s_ease-in-out_infinite] pointer-events-none z-10 mix-blend-screen overflow-hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-700" />
                
                {/* Target Lock HUD Corners */}
                <div className="absolute top-6 left-6 w-6 h-6 border-t border-l border-[#00E5FF]/0 group-hover:border-[#00E5FF]/60 transition-colors duration-500 z-10 pointer-events-none" />
                <div className="absolute bottom-6 right-6 w-6 h-6 border-b border-r border-[#00E5FF]/0 group-hover:border-[#00E5FF]/60 transition-colors duration-500 z-10 pointer-events-none" />

                {/* Glass Glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00E5FF]/0 via-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 pointer-events-none" />

                {/* Overlay Text & Description */}
                <div className="relative z-20 p-6 md:p-8 pt-20 w-full h-full flex flex-col justify-end transition-all duration-700 translate-y-6 group-hover:translate-y-0">
                  <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full" />
                      <span className="text-[8px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 border border-[#00E5FF]/20 uppercase tracking-widest">{img.tag}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-sync font-bold text-white uppercase tracking-tighter mb-2">{img.title}</h3>
                  <div className="h-[2px] w-0 bg-[#FF6B00] group-hover:w-16 transition-all duration-[1s] ease-out mb-1 group-hover:mb-4 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-full bg-white -translate-x-full group-hover:animate-pulse transition-transform" />
                  </div>
                  
                  {/* Detailed Description revealing via grid-rows trick */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-in-out">
                     <p className="overflow-hidden text-[10px] md:text-xs text-slate-300 uppercase leading-relaxed tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity delay-200 duration-700">
                        {img.description}
                     </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Option */}
          {visibleCount < filteredImages.length && (
            <div className="flex justify-center mt-12 studio-filters">
              <button 
                onClick={() => setVisibleCount(prev => Math.min(prev + 5, filteredImages.length))}
                className="group flex items-center gap-3 px-8 py-4 bg-white/[0.03] border border-white/10 hover:border-[#00E5FF]/40 transition-all duration-500 rounded-sm"
              >
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em] group-hover:text-[#00E5FF]">Request More Logs</span>
                <ArrowRight size={14} className="text-white/40 group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* ── IMMERSIVE TERMINAL DRAWER (COMMAND CENTER STYLE) ── */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500 animate-in fade-in"
                onClick={() => setSelectedImage(null)}
            />
            
            <div className="relative z-10 w-full md:w-[60vw] lg:w-[45vw] h-full bg-[#050505] border-l border-white/10 shadow-[-20px_0_100px_rgba(0,229,255,0.05)] overflow-y-auto animate-in slide-in-from-right duration-500 ease-out flex flex-col">
                {/* Drawer Holographic Ticker */}
                <div className="absolute inset-0 opacity-[0.015] font-mono text-[100px] font-black uppercase tracking-widest flex items-start -ml-20 -mt-20 flex-col select-none pointer-events-none whitespace-nowrap overflow-hidden z-0">
                  <span className="animate-pulse tracking-tight">{selectedImage.tag}</span>
                  <span className="animate-pulse tracking-tight">{selectedImage.tag}</span>
                  <span className="animate-pulse tracking-tight">{selectedImage.tag}</span>
                  <span className="animate-pulse tracking-tight">{selectedImage.tag}</span>
                </div>

                <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-6 right-6 z-30 p-2 bg-black/50 border border-white/20 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black hover:border-transparent transition-colors rounded-full backdrop-blur-md group shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                >
                    <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
                
                <div className="w-full h-[35vh] md:h-[45vh] relative bg-black group overflow-hidden shrink-0 border-b border-white/10">
                    <img 
                        src={selectedImage.url} 
                        alt={selectedImage.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000 scale-100 group-hover:scale-105"
                    />
                    
                    {/* CRT Monitor Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10" />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-100 pointer-events-none z-20"></div>
                </div>
                
                <div className="w-full p-8 md:p-14 flex flex-col bg-transparent relative grow z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-2 h-2 bg-[#00E5FF] rounded-full animate-pulse shadow-[0_0_10px_#00E5FF]"></div>
                        <span className="text-[10px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-3 py-1 border border-[#00E5FF]/20 uppercase tracking-widest">{selectedImage.tag}</span>
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest border border-white/10 px-3 py-1 bg-black/20 rounded-sm">{selectedImage.category}</span>
                    </div>
                    
                    <h3 className="text-4xl md:text-6xl font-sync font-bold text-white uppercase tracking-tighter mb-6">{selectedImage.title}</h3>
                    <div className="h-[2px] w-20 bg-[#FF6B00] mb-8 opacity-80"></div>
                    
                    <p className="text-xs md:text-sm text-slate-400 uppercase leading-[2] tracking-widest font-medium mb-12 max-w-xl">
                        {selectedImage.description}
                    </p>

                    {/* MOCK DIAGNOSTICS DASHBOARD - ELITE VIBE */}
                    <div className="mt-auto pt-8 border-t border-white/10 bg-black/20 p-6 rounded-sm border border-white/5 relative overflow-hidden backdrop-blur-md">
                        <div className="absolute inset-0 bg-[#00E5FF]/5 animate-pulse z-0 pointer-events-none" style={{ animationDuration: '4s' }} />
                        <span className="relative z-10 text-[9px] font-mono text-[#00E5FF] uppercase tracking-[0.4em] block mb-6 flex items-center gap-2">
                           <Activity size={12}/> Analysis_Logs
                        </span>
                        
                        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
                           <div className="flex flex-col">
                              <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest block mb-1">Target_Node</span>
                              <span className="text-[10px] font-mono text-white uppercase tracking-wider">CX_09{Math.floor(Math.random() * 99)}</span>
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest block mb-1">Decryption</span>
                              <span className="text-[10px] font-mono text-[#00FF57] uppercase tracking-wider flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-[#00FF57] rounded-full animate-pulse" /> Verified
                              </span>
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest block mb-1">Feed_Status</span>
                              <span className="text-[10px] font-mono text-[#FF6B00] uppercase tracking-wider">Live_Sync</span>
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest block mb-1">Bandwidth</span>
                              <span className="text-[10px] font-mono text-white uppercase tracking-wider">Optimal</span>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Global CSS Enhancements specific to this page */}
      <style jsx global>{`
        @keyframes sweep {
            0% { transform: translateY(-30px); opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { transform: translateY(400px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

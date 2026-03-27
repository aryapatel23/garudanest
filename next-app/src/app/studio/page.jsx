"use client";

import React, { useEffect, useState } from 'react';
import { Camera, ArrowRight, Filter, X } from 'lucide-react';

export default function StudioPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(7);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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

  return (
    <div className="relative pt-32 pb-20 px-6 bg-black min-h-screen font-space overflow-hidden">
      {/* IMMERSIVE AURORA BACKDROP */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-[#FF6B00]/[0.03] blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-[#00E5FF]/[0.03] blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '12s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-0">
        {/* EXACT TITLE DESIGN MATCHING /PROCESS AND /ABOUT */}
        <div className={`relative group mb-16 md:mb-24 pt-12 md:pt-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="absolute -top-3 left-0 text-[#FF6B00] opacity-[0.06] font-sync font-bold text-4xl md:text-8xl uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
            Visual Logs
          </span>

          <h2 className="relative z-10 text-4xl md:text-7xl font-sync font-bold uppercase tracking-tighter text-white leading-none">
            Studio <span className="text-[#00E5FF]">Archives</span>
          </h2>
          
          <p className="max-w-2xl mt-6 text-slate-400 text-xs md:text-sm uppercase tracking-widest leading-relaxed font-medium">
            Visual documentation of our collective execution, group participation, and the reality of elite engineering.
          </p>

          <div className="h-[2px] w-16 bg-[#00E5FF] mt-8 opacity-40"></div>
        </div>

        {/* Premium Masonry Gallery & Filter Section */}
        <div className="mb-32 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/5 pb-6">
            <div className="flex items-center gap-3">
                <Camera size={16} className="text-[#00E5FF]" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-white tracking-widest">Active_Deployments // 0xAF4</span>
            </div>

            {/* RESPONSIVE FILTER SECTION */}
            <div className="flex items-center overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
               <div className="flex items-center gap-2 text-white/40 mr-4 shrink-0">
                   <Filter size={14} />
                   <span className="text-[10px] uppercase tracking-widest font-bold">Sort_By</span>
               </div>
               <div className="flex items-center gap-2">
                   {categories.map((cat) => (
                      <button
                          key={cat}
                          onClick={() => {
                             setActiveFilter(cat);
                             setVisibleCount(7);
                          }}
                          className={`shrink-0 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm border ${
                              activeFilter === cat 
                                  ? 'bg-[#00E5FF]/10 border-[#00E5FF]/50 text-[#00E5FF]' 
                                  : 'bg-white/[0.02] border-white/5 text-white/50 hover:bg-white/[0.05] hover:text-white'
                          }`}
                      >
                          {cat}
                      </button>
                   ))}
               </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[250px] mb-12 min-h-[500px]">
            {filteredImages.slice(0, visibleCount).map((img, i) => (
              <div 
                key={`${img.title}-${i}`} 
                onClick={() => setSelectedImage(img)}
                className={`${img.size} relative overflow-hidden group rounded-sm border border-white/5 bg-white/[0.02] animate-in fade-in duration-700 flex flex-col justify-end cursor-pointer`}
              >
                {/* Background Image */}
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s] scale-105 group-hover:scale-100" 
                />
                {/* Dynamic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-700" />
                
                {/* Overlay Text & Description */}
                <div className="relative z-20 p-6 md:p-8 pt-20 w-full h-full flex flex-col justify-end transition-all duration-700 translate-y-6 group-hover:translate-y-0">
                  <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full animate-pulse shadow-[0_0_8px_#00E5FF]"></div>
                      <span className="text-[8px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 border border-[#00E5FF]/20 uppercase tracking-widest">{img.tag}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-sync font-bold text-white uppercase tracking-tighter mb-2">{img.title}</h3>
                  <div className="h-[2px] w-0 bg-[#FF6B00] group-hover:w-16 transition-all duration-[1s] ease-out mb-1 group-hover:mb-4"></div>
                  
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
            <div className="flex justify-center mt-12">
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

        {/* Studio Link to About Us (Optional redirect) */}
        <div className="pt-20 border-t border-white/5 flex flex-col items-center relative z-10">
            <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-6 text-center shadow-lg">Interested in the architectural thinking behind the studio?</p>
            <a href="/about" className="text-[#FF6B00] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors border-b border-[#FF6B00]/30 hover:border-white pb-1">
                Read The Genesis Protocol
            </a>
        </div>
      </div>

      {/* MODERN SLIDE-OUT PANEL (COMMAND CENTER STYLE) */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500 animate-in fade-in"
                onClick={() => setSelectedImage(null)}
            />
            
            <div className="relative z-10 w-full md:w-[50vw] lg:w-[40vw] h-full bg-[#050505] border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] overflow-y-auto animate-in slide-in-from-right duration-500 ease-out flex flex-col">
                <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-6 right-6 z-30 p-2 bg-black/50 border border-white/10 text-white hover:text-[#FF6B00] hover:border-[#FF6B00]/50 transition-colors rounded-full backdrop-blur-md group"
                >
                    <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
                
                <div className="w-full h-[40vh] md:h-[50vh] relative bg-black group overflow-hidden shrink-0">
                    <img 
                        src={selectedImage.url} 
                        alt={selectedImage.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90 pointer-events-none"></div>
                </div>
                
                <div className="w-full p-8 md:p-12 flex flex-col bg-[#050505] relative grow">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF]/5 blur-[80px] rounded-full pointer-events-none"></div>
                    
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-2 h-2 bg-[#00E5FF] rounded-full animate-pulse shadow-[0_0_10px_#00E5FF]"></div>
                        <span className="text-[10px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-3 py-1 border border-[#00E5FF]/20 uppercase tracking-widest">{selectedImage.tag}</span>
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-sm">{selectedImage.category}</span>
                    </div>
                    
                    <h3 className="text-4xl md:text-5xl font-sync font-bold text-white uppercase tracking-tighter mb-6">{selectedImage.title}</h3>
                    <div className="h-[2px] w-12 bg-[#FF6B00] mb-8"></div>
                    
                    <p className="text-xs md:text-sm text-slate-400 uppercase leading-loose tracking-widest font-medium mb-12">
                        {selectedImage.description}
                    </p>

                    {/* MOCK DIAGNOSTICS SECTION FOR ELITE VIBE */}
                    <div className="mt-auto space-y-6">
                        <span className="text-[9px] font-mono text-[#00E5FF] uppercase tracking-[0.4em] block border-b border-white/10 pb-4">Log_Diagnostics</span>
                        <div className="grid grid-cols-2 gap-8">
                           <div>
                              <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest block mb-2">Capture_Node</span>
                              <span className="text-[10px] font-mono text-white uppercase tracking-widest">Garuda_Core_01</span>
                           </div>
                           <div>
                              <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest block mb-2">Encryption_Status</span>
                              <span className="text-[10px] font-mono text-[#00FF57] uppercase tracking-widest">Verified_Secure</span>
                           </div>
                           <div>
                              <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest block mb-2">Resolution_Scale</span>
                              <span className="text-[10px] font-mono text-[#FF6B00] uppercase tracking-widest">4K_RAW_Render</span>
                           </div>
                           <div>
                              <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest block mb-2">Timestamp</span>
                              <span className="text-[10px] font-mono text-white uppercase tracking-widest">Session_Archived</span>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

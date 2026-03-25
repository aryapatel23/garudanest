"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ChevronRight, Zap, Hash, Command, Terminal, Sparkles, Loader2, Send, Cpu, Globe, Menu, X, ShieldCheck, Users, Rocket, Briefcase, User
} from 'lucide-react';

const Twitter = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const Instagram = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

const Linkedin = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

// --- Brand Data ---
const BRAND = {
  name: "garudanest",
  email: "teamgarudanest@gmail.com",
  social: {
    instagram: "https://www.instagram.com/teamgarudanest/",
    twitter: "https://x.com/teamgarudanest",
    linkedin: "https://www.linkedin.com/in/teamgarudanest/"
  }
};

const navLinks = [
  { label: "home", href: "#home" },
  { label: "work", href: "#work" },
  { label: "process", href: "#process" },
  { label: "nest", href: "#team" },
  { label: "join", href: "#join" },
  { label: "manifesto", href: "#manifesto" },
];

const teamMembers = [
  { name: "Ari Prasetyo", role: "Frontend", bio: "Crafts high-performance UI systems for product teams.", tags: ["Next.js", "UI", "A11y"] },
  { name: "Rina Mahesa", role: "Backend", bio: "Builds reliable APIs and distributed services at scale.", tags: ["Node", "Prisma", "Postgres"] },
  { name: "Devansh Patel", role: "AI", bio: "Ships applied AI systems from prototype to production.", tags: ["RAG", "Evaluation", "MLOps"] },
  { name: "Naufal Saputra", role: "DevOps", bio: "Designs cloud infra with speed, resilience, and observability.", tags: ["K8s", "CI/CD", "SRE"] },
  { name: "Ishita Singh", role: "Frontend", bio: "Builds conversion-focused interfaces with premium UX polish.", tags: ["React", "Motion", "Design"] },
  { name: "Harsh Vora", role: "Backend", bio: "Owns core architecture for high-throughput backend systems.", tags: ["Microservices", "Caching", "Queues"] },
  { name: "Bagus Wicaksono", role: "DevOps", bio: "Automates secure deployments and developer platforms.", tags: ["Terraform", "Security", "Cloud"] },
  { name: "Megha Jain", role: "AI", bio: "Creates AI pipelines that improve product decisions.", tags: ["NLP", "Python", "Data"] },
];

const projects = [
  { title: "Nexus Commerce", stack: ["Next.js", "Prisma", "Postgres"], p: "Checkout drop-offs under load", s: "Rebuilt flow + optimized data paths", r: "31% faster checkout, +18% conversion" },
  { title: "Atlas Dispatch AI", stack: ["FastAPI", "RAG", "Vector DB"], p: "Manual support triage bottleneck", s: "Auto-routing with confidence scoring", r: "42% ticket deflection" },
  { title: "Pulse Finance Core", stack: ["Node", "Kafka", "Redis"], p: "Inconsistent transactions at peak", s: "Event-driven idempotent processing", r: "99.99% reliability" },
  { title: "Orbit Talent Cloud", stack: ["React", "GraphQL", "S3"], p: "Low application completion", s: "Streamlined hiring UX", r: "+27% completed applications" },
];

const testimonials = [
  { name: "Anika Rao", role: "Product Lead", quote: "GarudaNest shipped in weeks what others estimated for quarters." },
  { name: "Rafi Ananta", role: "Senior Backend Engineer", quote: "Peer quality is unreal. Every sprint makes you sharper." },
  { name: "Milan Shah", role: "Founder", quote: "Fast, sharp, and reliable delivery without management bloat." },
];

const activities = [
  "Deployed analytics pipeline to production today.",
  "Open-sourced internal tooling and crossed 1.2k stars.",
  "Completed security hardening for fintech API gateway.",
  "Released hiring workflow v2 with 28% faster screening.",
];

const apiKey = ""; // Provided by environment

// --- Gemini API Helper ---
const callGemini = async (prompt, systemInstruction = "") => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  let delay = 1000;
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      return result.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (e) {
      if (i === 4) throw e;
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
};

// --- The \"Logic-Generated\" Logo Component ---
const GarudaLogo = ({ className = "w-12 h-12", animated = false, glow = false }) => (
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

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadStatus, setLoadStatus] = useState("Initializing...");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // AI Feature States
  const [aiIdea, setAiIdea] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [manifestoQuery, setManifestoQuery] = useState("");
  const [manifestoResponse, setManifestoResponse] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [teamFilter, setTeamFilter] = useState("All");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [hireStatus, setHireStatus] = useState({ type: "idle", message: "" });
  const [joinStatus, setJoinStatus] = useState({ type: "idle", message: "" });
  const [backendPulse, setBackendPulse] = useState({ status: "checking", checkedAt: "-" });

  useEffect(() => {
    // Custom loading sequence status logs
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

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(window.scrollY / totalScroll);
    };
    const handleMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMove);
    const timer = setTimeout(() => setLoading(false), 3500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMove);
      clearTimeout(timer);
      clearInterval(statusInterval);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let active = true;

    const checkPulse = async () => {
      try {
        const response = await fetch('/api/pulse');
        const data = await response.json();
        if (!active) return;

        if (response.ok && data.ok) {
          setBackendPulse({
            status: 'online',
            checkedAt: new Date(data.timestamp).toLocaleTimeString(),
          });
        } else {
          setBackendPulse({ status: 'offline', checkedAt: new Date().toLocaleTimeString() });
        }
      } catch (error) {
        if (!active) return;
        setBackendPulse({ status: 'offline', checkedAt: new Date().toLocaleTimeString() });
      }
    };

    checkPulse();
    const pulseInterval = setInterval(checkPulse, 12000);
    return () => {
      active = false;
      clearInterval(pulseInterval);
    };
  }, []);

  const visibleTeam = teamFilter === "All"
    ? teamMembers
    : teamMembers.filter((member) => member.role === teamFilter);

  const handleBrainstorm = async () => {
    setIsAiLoading(true);
    try {
      const sysPrompt = "You are the head architect at GarudaNest. A client provides a project idea. Provide a technical blueprint, tech stack, and a 'killer feature'. Tone: Gen-Z tech, sharp, aggressive, no fluff.";
      const res = await callGemini(`Brainstorm this idea: ${aiIdea}`, sysPrompt);
      setAiResult(res);
    } catch (err) {
      setAiResult("System error. Connection lost.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleManifestoAsk = async () => {
    setManifestoResponse("SYNCING...");
    try {
      const res = await callGemini(manifestoQuery, "You are the collective consciousness of GarudaNest. Answer in cryptic, high-status Gen-Z tech terms. Short and sharp.");
      setManifestoResponse(res);
    } catch (err) {
      setManifestoResponse("NODE_OFFLINE");
    }
  };

  const handleHireSubmit = async (event) => {
    event.preventDefault();
    setHireStatus({ type: 'loading', message: 'Sending inquiry...' });

    const formData = new FormData(event.currentTarget);
    const payload = {
      companyName: String(formData.get('companyName') || ''),
      workEmail: String(formData.get('workEmail') || ''),
      projectScope: String(formData.get('projectScope') || ''),
    };

    try {
      const response = await fetch('/api/hire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      setHireStatus({ type: 'success', message: `Inquiry received. Ref ${data.referenceId}` });
      event.currentTarget.reset();
    } catch (error) {
      setHireStatus({ type: 'error', message: error.message || 'Could not submit inquiry.' });
    }
  };

  const handleJoinSubmit = async (event) => {
    event.preventDefault();
    setJoinStatus({ type: 'loading', message: 'Submitting profile...' });

    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: String(formData.get('fullName') || ''),
      email: String(formData.get('email') || ''),
      role: String(formData.get('role') || ''),
      portfolio: String(formData.get('portfolio') || ''),
    };

    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      setJoinStatus({ type: 'success', message: `Profile received. Ref ${data.referenceId}` });
      event.currentTarget.reset();
    } catch (error) {
      setJoinStatus({ type: 'error', message: error.message || 'Could not submit profile.' });
    }
  };

  return (
    <div id="home" className="bg-[#050505] text-[#f0f0f0] font-mono selection:bg-[#FF6B00] selection:text-black cursor-none overflow-x-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Space+Grotesk:wght@300;700&display=swap');
        
        body { font-family: 'Space Grotesk', sans-serif; scroll-behavior: smooth; }
        .font-sync { font-family: 'Syncopate', sans-serif; }
        
        /* The Logo Draw Effect */
        .logo-draw-animation {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: drawStroke 2.5s cubic-bezier(0.9, 0, 0.1, 1) forwards;
        }
        @keyframes drawStroke { to { stroke-dashoffset: 0; } }

        /* Glitch Effect */
        .glitch-text {
          position: relative;
        }
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          left: 2px;
          text-shadow: -2px 0 #00E5FF;
          top: 0;
          overflow: hidden;
          clip: rect(0, 900px, 0, 0);
          animation: glitch-anim 2s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
          0% { clip: rect(10px, 9999px, 50px, 0); }
          50% { clip: rect(80px, 9999px, 90px, 0); }
          100% { clip: rect(40px, 9999px, 60px, 0); }
        }

        .custom-cursor {
          width: 12px; height: 12px;
          background: #FF6B00;
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.15s ease-out;
          box-shadow: 0 0 20px #FF6B00;
        }

        .bento-card {
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,0.05);
          transition: all 0.5s cubic-bezier(0.2, 1, 0.3, 1);
        }
        .bento-card:hover {
          border-color: #FF6B00;
          background: #0f0f0f;
          transform: translateY(-5px);
          box-shadow: 0 10px 40px -20px rgba(255,107,0,0.3);
        }

        /* Scanline effect */
        .scanline {
          width: 100%; height: 100px;
          z-index: 999;
          background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0) 100%);
          opacity: 0.1;
          position: absolute;
          bottom: 100%;
          animation: scanline 8s linear infinite;
        }
        @keyframes scanline { to { bottom: -100px; } }

        .noise-bg {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: url('https://grainy-gradients.vercel.app/noise.svg');
          opacity: 0.05; pointer-events: none; z-index: 50;
        }
      `}} />

      {/* NOISE & SCANLINES */}
      <div className="noise-bg" />
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="scanline" />
      </div>

      {/* CUSTOM CURSOR */}
      <div 
        className="custom-cursor" 
        style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)' }}
      />

      {/* --- 1. LOGO-DRIVEN PRELOADER --- */}
      {loading && (
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
      )}

      {/* HEADER */}
      <nav className="fixed top-0 w-full z-[80] p-6 md:p-10 flex justify-between items-center mix-blend-difference">
        <div className="flex items-center gap-3 group">
          <GarudaLogo className="w-8 h-8 text-[#FF6B00]" />
          <span className="font-sync font-bold text-sm tracking-tighter uppercase group-hover:text-[#00E5FF] transition-colors">garudanest</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-[#00E5FF] transition-all">{link.label}</a>
          ))}
          <a href="#hire" className="border border-white/30 px-5 py-2 hover:border-[#FF6B00] transition-all">hire us</a>
          <a href="#join" className="bg-white text-black px-5 py-2 hover:bg-[#FF6B00] hover:text-white transition-all">join the nest</a>
        </div>
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen((prev) => !prev)}>
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed top-20 left-4 right-4 z-[85] bg-black/95 border border-white/10 p-6 md:hidden">
          <div className="flex flex-col gap-4 text-xs uppercase font-bold tracking-[0.4em]">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className="hover:text-[#00E5FF]">{link.label}</a>
            ))}
            <a href="#hire" onClick={() => setMobileMenuOpen(false)} className="mt-2 border border-white/30 px-4 py-3 text-center">hire us</a>
            <a href="#join" onClick={() => setMobileMenuOpen(false)} className="bg-[#FF6B00] text-black px-4 py-3 text-center">join the nest</a>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-20">
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
              <a href="#contact" className="w-full md:w-auto px-16 py-6 bg-[#FF6B00] text-black font-black uppercase text-xs hover:bg-white transition-all flex items-center justify-center gap-4 group">
                Initiate Build <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="py-14 border-y border-white/5 bg-[#060606] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[10px] uppercase tracking-[0.6em] text-center text-white/40 font-bold mb-8">Trusted By Visionary Teams</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center text-white/30 font-sync text-lg">
            {['STARTUP_X', 'SCALE_IO', 'NEXUS_AI', 'GLOBAL_CORP', 'ORBIT_PAY', 'STACKFORGE'].map((name) => (
              <div key={name} className="py-3 border border-white/5 hover:border-[#00E5FF]/40 hover:text-[#00E5FF] transition-all">{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ✨ AI ARCHITECTURAL LAB ✨ */}
      <section id="work" className="py-40 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent opacity-20"></div>
        <div className="max-w-7xl mx-auto">
            <div className="mb-20">
                <h2 className="text-5xl md:text-8xl font-sync font-bold uppercase tracking-tighter text-outline opacity-20 mb-[-2rem] md:mb-[-4rem]">LABORATORY</h2>
                <h2 className="text-4xl md:text-6xl font-sync font-bold uppercase tracking-tighter relative z-10">
                   SPARK YOUR <br/> NEXT <span className="text-[#FF6B00]">IDE4</span>
                </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-8 bg-black/40 p-10 border border-white/5 backdrop-blur-xl">
                    <div className="flex items-center gap-4 text-[#00E5FF] mb-4">
                        <Cpu size={20} />
                        <span className="text-xs font-bold uppercase tracking-widest">Input Raw Vision</span>
                    </div>
                    <textarea 
                        value={aiIdea}
                        onChange={(e) => setAiIdea(e.target.value)}
                        placeholder="Describe your impossible project..."
                        className="w-full bg-transparent border-b border-white/10 p-2 text-lg font-mono focus:border-[#FF6B00] outline-none min-h-[120px] transition-all resize-none"
                    />
                    <button 
                        onClick={handleBrainstorm}
                        disabled={isAiLoading}
                        className="w-full bg-[#FF6B00] text-black py-5 font-black text-xs uppercase flex items-center justify-center gap-4 hover:bg-[#00E5FF] transition-all disabled:opacity-50"
                    >
                        {isAiLoading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                        {isAiLoading ? "ARCHITECTING..." : "GENERATE BLUEPRINT"}
                    </button>
                </div>

                <div className={`p-10 min-h-[400px] bento-card border-l-4 border-l-[#FF6B00] flex flex-col transition-all duration-700 ${aiResult ? 'opacity-100' : 'opacity-40'}`}>
                    <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                        <span className="text-[10px] uppercase font-bold text-[#FF6B00]">Output Stream // 0xAF4</span>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                        </div>
                    </div>
                    {aiResult ? (
                        <div className="font-mono text-xs leading-relaxed whitespace-pre-wrap text-slate-300">
                            {aiResult}
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-700 uppercase font-bold text-center gap-4">
                            <div className="w-16 h-16 border-2 border-dashed border-white/10 rounded-full animate-spin"></div>
                            Waiting for neural input...
                        </div>
                    )}
                </div>
            </div>
        </div>
      </section>

      {/* HOW WE BUILD */}
      <section id="process" className="py-36 px-6 bg-[#070707] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-sync font-bold uppercase tracking-tighter mb-16">
            How Elite Systems <span className="text-[#00E5FF]">Are Built</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { t: 'Discovery & Architecture', i: <Command size={20} />, b: 'Clear technical direction.' },
              { t: 'Design & Prototyping', i: <Sparkles size={20} />, b: 'Validate ideas early.' },
              { t: 'Agile Dev + Peer Review', i: <Cpu size={20} />, b: 'Speed with quality.' },
              { t: 'Testing & Deployment', i: <ShieldCheck size={20} />, b: 'Production confidence.' },
              { t: 'Scale & Support', i: <Rocket size={20} />, b: 'Built for long-term growth.' },
            ].map((step, index) => (
              <div key={step.t} className="bento-card p-6 border-l-2 border-l-[#00E5FF]/30">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#00E5FF]">{step.i}</span>
                  <span className="text-[10px] text-white/30">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-bold uppercase mb-2">{step.t}</h3>
                <p className="text-xs text-slate-500 uppercase">{step.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-36 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-sync font-bold uppercase tracking-tighter mb-16">
            What You Gain in the <span className="text-[#FF6B00]">Nest</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'High-Impact Projects',
              'Competitive Compensation + Bonuses',
              'Continuous Learning & Mentorship',
              'Flexible Remote Work',
              'Elite Peer Network',
              'Real Ownership & Recognition',
            ].map((item) => (
              <div key={item} className="bento-card p-8">
                <div className="w-10 h-10 rounded-full bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF] mb-4">
                  <Users size={18} />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-36 px-6 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-sync font-bold uppercase tracking-tighter mb-12">
            Meet the <span className="text-[#00E5FF]">Elite Circle</span>
          </h2>

          <div className="flex flex-wrap gap-3 mb-10 text-xs uppercase font-bold tracking-widest">
            {['All', 'Frontend', 'Backend', 'AI', 'DevOps'].map((role) => (
              <button
                key={role}
                onClick={() => setTeamFilter(role)}
                className={`px-4 py-2 border transition-all ${teamFilter === role ? 'border-[#FF6B00] bg-[#FF6B00] text-black' : 'border-white/20 hover:border-[#00E5FF]'}`}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {visibleTeam.map((member) => (
              <div key={member.name} className="bento-card p-6">
                <div className="w-12 h-12 rounded-lg bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center font-bold mb-4">
                  {member.name.split(' ').map((word) => word[0]).join('')}
                </div>
                <h3 className="text-lg font-bold uppercase">{member.name}</h3>
                <p className="text-[11px] text-[#00E5FF] uppercase font-bold mt-1">{member.role}</p>
                <p className="text-xs text-slate-500 uppercase leading-loose mt-4">{member.bio}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {member.tags.map((tag) => (
                    <span key={tag} className="text-[9px] border border-white/20 px-2 py-1">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-36 px-6" id="projects">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-sync font-bold uppercase tracking-tighter mb-16">
            Projects That <span className="text-[#FF6B00]">Soared</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project) => (
              <div key={project.title} className="bento-card p-8">
                <div className="flex gap-2 mb-4">
                  {project.stack.map((tag) => (
                    <span key={tag} className="text-[9px] uppercase border border-[#00E5FF]/40 text-[#00E5FF] px-2 py-1">{tag}</span>
                  ))}
                </div>
                <h3 className="text-3xl font-sync font-bold uppercase mb-4">{project.title}</h3>
                <p className="text-xs uppercase text-slate-400 mb-2"><span className="text-[#FF6B00]">Problem:</span> {project.p}</p>
                <p className="text-xs uppercase text-slate-400 mb-2"><span className="text-[#00E5FF]">Solution:</span> {project.s}</p>
                <p className="text-xs uppercase text-slate-400 mb-6"><span className="text-white">Result:</span> {project.r}</p>
                <div className="flex gap-4 text-[10px] uppercase font-bold">
                  <a href="#" className="hover:text-[#FF6B00] transition-colors">live demo</a>
                  <a href="#" className="hover:text-[#00E5FF] transition-colors">github</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-36 px-6 bg-[#070707] border-y border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-sync font-bold uppercase tracking-tighter mb-14">
            What Our <span className="text-[#00E5FF]">Developers & Clients Say</span>
          </h2>
          <div className="bento-card p-10 min-h-[230px] flex flex-col justify-center">
            <p className="text-xl md:text-3xl font-bold uppercase leading-relaxed">"{testimonials[testimonialIndex].quote}"</p>
            <p className="mt-8 text-sm uppercase text-[#FF6B00] font-bold">{testimonials[testimonialIndex].name} // {testimonials[testimonialIndex].role}</p>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            {testimonials.map((_, index) => (
              <button
                key={`t-${index}`}
                className={`w-2.5 h-2.5 rounded-full ${testimonialIndex === index ? 'bg-[#FF6B00]' : 'bg-white/20'}`}
                onClick={() => setTestimonialIndex(index)}
                aria-label={`testimonial-${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVITY */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-sync font-bold uppercase tracking-tighter mb-10">
            Activity & <span className="text-[#22C55E]">Momentum</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.map((item) => (
              <div key={item} className="bento-card p-6 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#22C55E] mt-2 animate-pulse" />
                <p className="text-xs uppercase text-slate-400 leading-loose">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 bento-card p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase text-white/40 tracking-[0.4em]">Backend Pulse</p>
              <p className="text-sm uppercase text-slate-400 mt-2">Live API health check from `/api/pulse`</p>
            </div>
            <div className="flex items-center gap-3 uppercase text-xs font-bold">
              <span className={`w-2.5 h-2.5 rounded-full ${backendPulse.status === 'online' ? 'bg-[#22C55E]' : backendPulse.status === 'offline' ? 'bg-red-500' : 'bg-yellow-400'} animate-pulse`} />
              <span className={backendPulse.status === 'online' ? 'text-[#22C55E]' : backendPulse.status === 'offline' ? 'text-red-400' : 'text-yellow-300'}>{backendPulse.status}</span>
              <span className="text-white/30">Checked: {backendPulse.checkedAt}</span>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="join" className="py-32 px-6 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-sync font-black uppercase tracking-tighter mb-14">
            Ready to <span className="text-[#FF6B00]">Soar</span> with Us?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <form id="hire" onSubmit={handleHireSubmit} className="bento-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase size={18} className="text-[#00E5FF]" />
                <span className="text-xs font-bold uppercase tracking-widest">I Need a Team // Hire Us</span>
              </div>
              <div className="space-y-3">
                <input name="companyName" required type="text" placeholder="Company Name" className="w-full bg-transparent border border-white/20 p-3 text-xs uppercase outline-none focus:border-[#FF6B00]" />
                <input name="workEmail" required type="email" placeholder="Work Email" className="w-full bg-transparent border border-white/20 p-3 text-xs uppercase outline-none focus:border-[#FF6B00]" />
                <textarea name="projectScope" required placeholder="Project Scope" rows={4} className="w-full bg-transparent border border-white/20 p-3 text-xs uppercase outline-none focus:border-[#FF6B00]" />
              </div>
              <button disabled={hireStatus.type === 'loading'} className="mt-4 w-full bg-[#FF6B00] text-black py-4 font-black text-xs uppercase hover:bg-[#00E5FF] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                {hireStatus.type === 'loading' ? 'Sending...' : 'Send Inquiry'}
              </button>
              {hireStatus.type !== 'idle' && (
                <p className={`mt-3 text-[10px] uppercase ${hireStatus.type === 'success' ? 'text-[#22C55E]' : hireStatus.type === 'error' ? 'text-red-400' : 'text-[#00E5FF]'}`}>
                  {hireStatus.message}
                </p>
              )}
            </form>

            <form onSubmit={handleJoinSubmit} className="bento-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <User size={18} className="text-[#FF6B00]" />
                <span className="text-xs font-bold uppercase tracking-widest">I am a Developer // Join the Nest</span>
              </div>
              <div className="space-y-3">
                <input name="fullName" required type="text" placeholder="Full Name" className="w-full bg-transparent border border-white/20 p-3 text-xs uppercase outline-none focus:border-[#00E5FF]" />
                <input name="email" required type="email" placeholder="Email" className="w-full bg-transparent border border-white/20 p-3 text-xs uppercase outline-none focus:border-[#00E5FF]" />
                <input name="role" required type="text" placeholder="Role (Frontend / Backend / AI / DevOps)" className="w-full bg-transparent border border-white/20 p-3 text-xs uppercase outline-none focus:border-[#00E5FF]" />
                <input name="portfolio" type="url" placeholder="Portfolio/GitHub" className="w-full bg-transparent border border-white/20 p-3 text-xs uppercase outline-none focus:border-[#00E5FF]" />
              </div>
              <button disabled={joinStatus.type === 'loading'} className="mt-4 w-full bg-[#00E5FF] text-black py-4 font-black text-xs uppercase hover:bg-[#FF6B00] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                {joinStatus.type === 'loading' ? 'Submitting...' : 'Submit Profile'}
              </button>
              {joinStatus.type !== 'idle' && (
                <p className={`mt-3 text-[10px] uppercase ${joinStatus.type === 'success' ? 'text-[#22C55E]' : joinStatus.type === 'error' ? 'text-red-400' : 'text-[#00E5FF]'}`}>
                  {joinStatus.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* BENTO GRID OF POWER */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 md:row-span-2 bento-card p-12 flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                <GarudaLogo className="w-64 h-64 -rotate-12 translate-x-1/2 translate-y-1/2" />
            </div>
            <div className="flex justify-between items-start relative z-10">
              <Terminal className="text-[#00E5FF]" />
              <span className="text-[10px] text-white/20 font-bold tracking-widest uppercase">SYSCALL_01</span>
            </div>
            <div className="relative z-10">
              <h3 className="text-5xl font-sync font-bold mb-6 group-hover:text-[#FF6B00] transition-colors uppercase leading-none">Elite <br /> Nodes</h3>
              <p className="text-xs text-slate-500 max-w-xs uppercase leading-loose">8 Senior architects. zero management overhead. direct access to technical mastery.</p>
            </div>
          </div>
          
          <div className="bento-card p-8 flex flex-col justify-between group">
            <Zap className="text-[#FF6B00] group-hover:scale-125 transition-transform" />
            <h4 className="text-2xl font-bold tracking-tighter uppercase font-sync">Speed <br /> Is King</h4>
          </div>
          
          <div className="bento-card p-8 flex flex-col justify-between bg-white text-black group">
            <Globe size={24} className="group-hover:rotate-180 transition-transform duration-1000" />
            <h4 className="text-2xl font-bold tracking-tighter uppercase font-sync">Global <br /> Infra</h4>
          </div>

          <div className="md:col-span-2 bento-card p-10 flex items-center justify-between group">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase font-bold text-[#00E5FF]">LIVE_STATUS</span>
              <h4 className="text-3xl font-bold font-sync uppercase tracking-tighter">NEXUS AI CORE</h4>
            </div>
            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-black transition-all">
              <ArrowRight size={28} />
            </div>
          </div>
        </div>
      </section>

      {/* ✨ MANIFESTO / HIVE MIND ✨ */}
      <section id="manifesto" className="py-40 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
            <div>
              <h2 className="text-6xl md:text-8xl font-sync font-black mb-16 leading-none uppercase">
                THE <br /> <span className="text-[#FF6B00]">CODE</span> <br /> IS LAW
              </h2>
              
              <div className="mt-20 border-l-4 border-[#00E5FF] p-10 bg-white/5 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-6">
                    <Hash size={16} className="text-[#00E5FF]" />
                    <span className="text-xs text-[#00E5FF] font-bold uppercase tracking-widest">Consult Hive_Mind</span>
                </div>
                <div className="flex flex-col gap-4">
                    <input 
                        type="text" 
                        value={manifestoQuery}
                        onChange={(e) => setManifestoQuery(e.target.value)}
                        placeholder="Question our methods..."
                        className="bg-transparent border-b border-white/10 py-3 text-sm outline-none focus:border-[#FF6B00] font-mono"
                    />
                    <button onClick={handleManifestoAsk} className="self-end p-4 bg-white/5 hover:bg-[#FF6B00] hover:text-black transition-all rounded-full">
                        <Send size={20} />
                    </button>
                </div>
                {manifestoResponse && (
                    <div className="mt-10 p-6 bg-black/40 border border-white/5 text-[11px] text-[#00E5FF] font-mono uppercase leading-relaxed animate-in fade-in zoom-in duration-500">
                        {manifestoResponse}
                    </div>
                )}
              </div>
            </div>
            
            <div className="space-y-16">
              {[
                { id: "01", t: "radical transparency", d: "You see the code as we write it. Daily git pushes. No black boxes." },
                { id: "02", t: "architectural grit", d: "We don't do templates. Every line is custom-engineered for specific scale." },
                { id: "03", t: "velocity over comfort", d: "We ship at 10x speed by stripping away unnecessary middle-management." },
              ].map(item => (
                <div key={item.id} className="group relative">
                  <span className="absolute -left-10 top-0 text-[#FF6B00] text-xs font-bold opacity-30 group-hover:opacity-100">{item.id}</span>
                  <h4 className="text-3xl font-bold uppercase tracking-tighter group-hover:text-[#00E5FF] transition-colors mb-4 font-sync">{item.t}</h4>
                  <p className="text-slate-500 text-sm uppercase leading-loose">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="pt-60 pb-10 px-6 bg-[#050505] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 opacity-[0.03] translate-x-1/4 translate-y-1/4">
            <GarudaLogo className="w-[100vw] h-[100vw]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-20 mb-40">
            <h2 className="text-[12vw] font-sync font-black tracking-tighter leading-none italic uppercase group">
              LET'S <br /> <span className="text-[#FF6B00] group-hover:text-[#00E5FF] transition-colors duration-1000">F***ING</span> <br /> BUILD.
            </h2>
            <div className="flex flex-col gap-6 w-full md:w-auto text-center md:text-left">
              <span className="text-[10px] text-[#FF6B00] font-bold tracking-[0.5em] uppercase">Initialize Connection</span>
              <a href={`mailto:${BRAND.email}`} className="text-2xl md:text-4xl font-bold border-b-2 border-[#00E5FF] pb-4 hover:tracking-widest transition-all uppercase font-sync">
                {BRAND.email}
              </a>
              <div className="flex gap-8 mt-6 justify-center md:justify-start">
                <a href={BRAND.social.twitter} className="hover:text-[#FF6B00] transition-colors"><Twitter size={24} /></a>
                <a href={BRAND.social.instagram} className="hover:text-[#FF6B00] transition-colors"><Instagram size={24} /></a>
                <a href={BRAND.social.linkedin} className="hover:text-[#FF6B00] transition-colors"><Linkedin size={24} /></a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 text-[9px] text-white/20 uppercase tracking-[0.5em] font-bold">
            <span>garudanest collective // all nodes active</span>
            <span className="mt-4 md:mt-0 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> 
                EST. 2026 // VERSION 2.1.0
            </span>
          </div>
        </div>
      </footer>

      {/* SCROLL PROGRESS */}
      <div 
        className="fixed bottom-0 left-0 h-1 bg-[#FF6B00] z-[100] transition-all duration-100"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  );
}


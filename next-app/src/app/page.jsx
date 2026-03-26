"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ChevronRight, Zap, Hash, Command, Terminal, Sparkles, Send, Cpu, Globe, Menu, X, ShieldCheck, Users, Rocket, Briefcase, User, Camera
} from 'lucide-react';

const Twitter = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);

const Instagram = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
);

const Linkedin = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
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
  { label: "about", href: "/about" },
  { label: "work", href: "/work" },
  { label: "process", href: "/process" },
  { label: "nest", href: "/nest" },
  { label: "studio", href: "/studio" },
  { label: "manifesto", href: "/manifesto" },
];

const teamMembers = [
  { name: "Ari Prasetyo", role: "Frontend", bio: "Crafts high-performance UI systems for product teams.", tags: ["Next.js", "UI", "A11y"], image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" },
  { name: "Rina Mahesa", role: "Backend", bio: "Builds reliable APIs and distributed services at scale.", tags: ["Node", "Prisma", "Postgres"], image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800" },
  { name: "Devansh Patel", role: "AI", bio: "Ships applied AI systems from prototype to production.", tags: ["RAG", "Evaluation", "MLOps"], image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800" },
  { name: "Naufal Saputra", role: "DevOps", bio: "Designs cloud infra with speed, resilience, and observability.", tags: ["K8s", "CI/CD", "SRE"], image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800" },
  { name: "Ishita Singh", role: "Frontend", bio: "Builds conversion-focused interfaces with premium UX polish.", tags: ["React", "Motion", "Design"], image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" },
  { name: "Harsh Vora", role: "Backend", bio: "Owns core architecture for high-throughput backend systems.", tags: ["Microservices", "Caching", "Queues"], image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" },
  { name: "Bagus Wicaksono", role: "DevOps", bio: "Automates secure deployments and developer platforms.", tags: ["Terraform", "Security", "Cloud"], image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800" },
  { name: "Megha Jain", role: "AI", bio: "Creates AI pipelines that improve product decisions.", tags: ["NLP", "Python", "Data"], image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800" },
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
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.1-flash-preview-09-2025:generateContent?key=${apiKey}`;

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
  const [shuffledMembers, setShuffledMembers] = useState([]);
  const [isReady, setIsReady] = useState(false);

  // Elite Fisher-Yates Shuffle for Uniform Randomness
  const shuffle = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    // Shuffle team members on mount for equal visibility
    setShuffledMembers(shuffle(teamMembers));
    setTimeout(() => setIsReady(true), 150);
  }, []);

  const [loadStatus, setLoadStatus] = useState("Initializing...");

  // AI Feature States
  const [manifestoQuery, setManifestoQuery] = useState("");
  const [manifestoResponse, setManifestoResponse] = useState("");
  const [teamFilter, setTeamFilter] = useState("All");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [hireStatus, setHireStatus] = useState({ type: "idle", message: "" });
  const [joinStatus, setJoinStatus] = useState({ type: "idle", message: "" });

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const membersToDisplay = shuffledMembers.length > 0 ? shuffledMembers : teamMembers;

  const visibleTeam = teamFilter === "All"
    ? membersToDisplay
    : membersToDisplay.filter((member) => member.role === teamFilter);

  const homePagePreview = visibleTeam.slice(0, 8);


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
    const form = event.currentTarget;
    setHireStatus({ type: 'loading', message: 'Establishing Uplink...' });

    const formData = new FormData(form);
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

      if (!response.ok) throw new Error(data.error || 'UPLINK_FAILURE');

      setHireStatus({ type: 'success', message: `Protocol Initiated. RefID: ${data.referenceId}` });
      form.reset();
    } catch (error) {
      setHireStatus({ type: 'error', message: error.message || 'NODE_OFFLINE' });
    }
  };

  const handleJoinSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setJoinStatus({ type: 'loading', message: 'Syncing Credentials...' });

    const formData = new FormData(form);
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

      if (!response.ok) throw new Error(data.error || 'UPLINK_FAILURE');

      setJoinStatus({ type: 'success', message: `Profile Synced. RefID: ${data.referenceId}` });
      form.reset();
    } catch (error) {
      setJoinStatus({ type: 'error', message: error.message || 'NODE_OFFLINE' });
    }
  };

  return (
    <div id="home" className="bg-[#050505] text-[#f0f0f0] font-mono selection:bg-[#FF6B00] selection:text-black cursor-none overflow-x-hidden">


      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center px-6 md:px-10 pt-32 md:pt-20">
        <div className="max-w-7xl mx-auto w-full relative">
          <div className="flex items-center gap-3 mb-8 md:mb-10">
            <div className="h-[1px] w-12 md:w-16 bg-[#FF6B00]"></div>
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#FF6B00] font-bold">Node 0x1 // Established 2026</span>
          </div>

          <h1 className="font-sync text-6xl sm:text-8xl md:text-[11vw] font-black leading-[0.9] md:leading-[0.8] uppercase tracking-tighter mb-12 md:mb-16">
            <span className="block italic opacity-20 hover:opacity-100 transition-opacity">BUILDING</span>
            <span className="block ml-[4vw] glitch-text text-[#FF6B00]" data-text="SYST3MS">SYST3MS</span>
            <span className="block text-right mr-[4vw] text-[#00E5FF]">THAT SOAR</span>
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12">
            <div className="max-w-md border-l-2 border-white/10 pl-6 md:pl-8">
              <p className="text-[11px] sm:text-xs md:text-sm leading-relaxed text-slate-400 uppercase font-bold">
                Not an agency. Not a factory. <br />
                We are a high-velocity engineering collective <br />
                architecting the next phase of digital infrastructure.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-6 w-full md:w-auto">
              <div className="flex flex-wrap gap-3 md:gap-4 text-[8px] md:text-[9px] font-mono text-[#00E5FF]">
                <span className="border border-[#00E5FF]/30 px-2 py-1">[REACT_CORE]</span>
                <span className="border border-[#00E5FF]/30 px-2 py-1">[AI_NODES]</span>
                <span className="border border-[#00E5FF]/30 px-2 py-1">[RUST_INFRA]</span>
              </div>
              <a href="#join" className="w-full md:w-auto px-10 md:px-16 py-5 md:py-6 bg-[#FF6B00] text-black font-black uppercase text-xs hover:bg-white transition-all flex items-center justify-center gap-4 group">
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

      {/* HOW WE BUILD */}
      <section id="process" className="py-20 md:py-36 px-6 bg-[#070707] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-sync font-bold uppercase tracking-tighter mb-12 md:mb-16">
            How Elite Systems <span className="text-[#FF6B00]">Are Built</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
      <section className="py-20 md:py-36 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-sync font-bold uppercase tracking-tighter mb-12 md:mb-16">
            What You Gain in the <span className="text-[#00E5FF]">Nest</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <section id="team" className="py-20 md:py-36 px-6 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-sync font-bold uppercase tracking-tighter mb-12">
            Meet the <span className="text-[#FF6B00]">Elite Circle</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-opacity duration-1000">
            {homePagePreview.map((member, index) => (
              <div key={member.name} className="group relative aspect-[4/5] overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-[#FF6B00]/30 transition-all duration-500">
                  {/* Profile Image */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="text-[7px] font-mono px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-white/40 uppercase tracking-[0.2em]">
                      Node_0x{index + 1} // Active
                    </span>
                  </div>

                  {/* Info Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 z-20 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="h-[2px] w-10 bg-[#FF6B00] mb-3 group-hover:w-full transition-all duration-700" />
                    
                    <h3 className="text-xl font-sync font-bold uppercase text-white mb-0.5 tracking-tighter">
                      {member.name}
                    </h3>
                    
                    <p className="text-[9px] font-bold text-[#FF6B00] uppercase tracking-[0.2em] mb-3">
                      {member.role}
                    </p>

                    <div className="max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-700 opacity-0 group-hover:opacity-100">
                      <p className="text-[9px] text-slate-300 uppercase leading-relaxed mb-3 tracking-wide font-medium">
                        {member.bio}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {member.tags.map((tag) => (
                          <span key={tag} className="text-[7px] font-mono border border-white/10 px-1.5 py-0.5 text-white/50 uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                {/* Reflection Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-20 md:py-36 px-6" id="work">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-sync font-bold uppercase tracking-tighter mb-12 md:mb-16">
            Projects That <span className="text-[#00E5FF]">Soared</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={project.title} className="bg-[#0a0a0a] border border-white/5 flex flex-col h-full overflow-hidden group hover:border-white/20 transition-all">
                {/* Card Header & Content */}
                <div className="p-8 md:p-10 border-b border-white/5 flex-grow">
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tag) => (
                      <span key={tag} className="text-[9px] font-mono border border-[#00E5FF]/40 text-[#00E5FF] px-2.5 py-1 uppercase tracking-wider bg-[#00E5FF]/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl md:text-4xl font-sync font-bold uppercase mb-6 tracking-tighter leading-tight text-white">
                    {project.title}
                  </h3>

                  {/* Info Section */}
                  <div className="space-y-4 mb-6">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-[0.2em]">Problem:</span>
                      <p className="text-[10px] text-slate-400 uppercase font-medium leading-relaxed tracking-wider">{project.p}</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-[0.2em]">Solution:</span>
                      <p className="text-xs text-slate-400 uppercase font-medium leading-relaxed tracking-wider">{project.s}</p>
                    </div>
                  </div>

                  {/* Result Block - High Gloss/Contrast */}
                  <div className="bg-[#FF6B00]/5 border-l-2 border-[#FF6B00] p-4 md:p-5 mb-2">
                    <p className="text-xs md:text-[12px] text-white font-bold uppercase tracking-widest leading-none">
                      {project.r}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="bg-[#0d0d0d] p-5 md:p-6 flex justify-between items-center group-hover:bg-[#111] transition-colors relative">
                  <div className="flex gap-8">
                    <a href="#" className="text-[10px] uppercase font-bold tracking-[0.3em] text-white hover:text-[#00E5FF] transition-colors flex items-center gap-2">
                      Live Demo <ArrowRight size={10} />
                    </a>
                    <a href="#" className="text-[10px] uppercase font-bold tracking-[0.3em] text-white hover:text-[#FF6B00] transition-colors flex items-center gap-2">
                      Github <ArrowRight size={10} />
                    </a>
                  </div>
                  <span className="text-[9px] text-white/10 font-mono tracking-widest uppercase select-none">
                    NODE_REF_{index + 1}x
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-36 px-6 bg-[#070707] border-y border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-sync font-bold uppercase tracking-tighter mb-14">
            What Our <span className="text-[#FF6B00]">Developers & Clients Say</span>
          </h2>
          <div className="bento-card p-10 min-h-[230px] flex flex-col justify-center">
            <p className="text-xl md:text-3xl font-bold uppercase leading-relaxed">"{testimonials[testimonialIndex].quote}"</p>
            <p className="mt-8 text-sm uppercase text-[#00E5FF] font-bold">{testimonials[testimonialIndex].name} // {testimonials[testimonialIndex].role}</p>
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

      {/* FINAL CTA */}
      <section id="join" className="py-20 md:py-32 px-6 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-sync font-black uppercase tracking-tighter mb-14">
            Ready to <span className="text-[#00E5FF]">Soar</span> with Us?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <form id="hire" onSubmit={handleHireSubmit} className="bento-card p-8 group">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Briefcase size={20} className="text-[#00E5FF]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Client Inquiry // Fast-Track</span>
                </div>
                <a href="/hire" className="text-[9px] font-bold uppercase tracking-widest text-white/20 group-hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  Full Audit <ArrowRight size={10} />
                </a>
              </div>
              
              <h3 className="text-xl font-sync font-bold uppercase mb-6 leading-tight">Elite <br/> Consultation</h3>

              <div className="space-y-4">
                <input name="companyName" required type="text" placeholder="ENTITY_NAME" className="w-full bg-transparent border-b border-white/10 p-3 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors" />
                <input name="workEmail" required type="email" placeholder="SECURE_EMAIL" className="w-full bg-transparent border-b border-white/10 p-3 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors" />
                <textarea name="projectScope" required placeholder="Describe the mission-critical bottleneck..." rows={3} className="w-full bg-transparent border-b border-white/10 p-3 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors resize-none" />
              </div>
              <button disabled={hireStatus.type === 'loading'} className="mt-8 w-full bg-[#FF6B00] text-black py-4 font-black text-xs uppercase hover:bg-[#00E5FF] transition-all shadow-[0_0_20px_rgba(255,107,0,0.2)] disabled:opacity-60">
                {hireStatus.type === 'loading' ? 'Establishing Uplink...' : 'Request Consultation'}
              </button>
              {hireStatus.type !== 'idle' && (
                <p className={`mt-4 text-[10px] uppercase font-bold text-center tracking-widest ${hireStatus.type === 'success' ? 'text-[#22C55E]' : hireStatus.type === 'error' ? 'text-red-400' : 'text-[#00E5FF]'}`}>
                  {hireStatus.message}
                </p>
              )}
            </form>

            <div className="bento-card p-8 group flex flex-col justify-between border-[#FF6B00]/20">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <Camera size={20} className="text-[#FF6B00]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Studio Archives // Internal Node</span>
                  </div>
                </div>

                <h3 className="text-3xl font-sync font-bold uppercase mb-6 leading-tight">Inside <br/> The Nest</h3>
                
                <p className="text-[11px] text-slate-400 uppercase leading-loose mb-8 max-w-xs">
                  A visual documentation of our engineering philosophy, studio culture, and the humans behind the systems.
                </p>
              </div>

              <a href="/join" className="w-full bg-white/5 border border-white/10 text-white py-5 font-black text-xs uppercase hover:bg-[#FF6B00] hover:text-black transition-all text-center">
                Explore The Studio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID OF POWER */}
      <section className="py-20 md:py-40 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="sm:col-span-2 lg:row-span-2 bento-card p-8 md:p-12 flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
              <GarudaLogo className="w-48 md:w-64 h-48 md:h-64 -rotate-12 translate-x-1/2 translate-y-1/2" />
            </div>
            <div className="flex justify-between items-start relative z-10 mb-8 sm:mb-0">
              <Terminal className="text-[#00E5FF]" />
              <span className="text-[10px] text-white/20 font-bold tracking-widest uppercase">SYSCALL_01</span>
            </div>
            <div className="relative z-10 mt-12 sm:mt-0">
              <h3 className="text-4xl md:text-5xl font-sync font-bold mb-6 group-hover:text-[#FF6B00] transition-colors uppercase leading-none">Elite <br /> Nodes</h3>
              <p className="text-xs text-slate-500 max-w-xs uppercase leading-loose">8 Senior architects. zero management overhead. direct access to technical mastery.</p>
            </div>
          </div>

          <div className="bento-card p-6 md:p-8 flex flex-col justify-between group min-h-[160px]">
            <Zap className="text-[#FF6B00] group-hover:scale-125 transition-transform" />
            <h4 className="text-xl md:text-2xl font-bold tracking-tighter uppercase font-sync">Speed <br /> Is King</h4>
          </div>

          <div className="bento-card p-6 md:p-8 flex flex-col justify-between bg-white text-black group min-h-[160px]">
            <Globe size={24} className="group-hover:rotate-180 transition-transform duration-1000" />
            <h4 className="text-xl md:text-2xl font-bold tracking-tighter uppercase font-sync">Global <br /> Infra</h4>
          </div>

          <div className="sm:col-span-2 bento-card p-8 md:p-10 flex items-center justify-between group min-h-[140px]">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase font-bold text-[#00E5FF]">LIVE_STATUS</span>
              <h4 className="text-2xl md:text-3xl font-bold font-sync uppercase tracking-tighter">NEXUS AI CORE</h4>
            </div>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-black transition-all">
              <ArrowRight size={24} className="md:w-7 md:h-7" />
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

    </div>
  );
}

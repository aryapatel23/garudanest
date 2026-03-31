"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ChevronRight, Zap, Command, Terminal, Sparkles, Cpu, Globe, Menu, X, ShieldCheck, Users, Rocket, Briefcase, User, Camera
} from 'lucide-react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image';
import { BRAND, teamMembers, projects, testimonials } from '@/lib/constants';
import { GarudaLogo } from '@/components/ui/GarudaLogo';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { sendEmailAction } from '@/lib/actions';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Local data removed; now imported from @/lib/constants

export default function App() {
  const container = useRef();
  const [shuffledMembers, setShuffledMembers] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const shuffle = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    setShuffledMembers(shuffle(teamMembers));
  }, []);

  // --- GSAP Engine ---
  useGSAP(() => {
    // Check if we need to wait for preloader on first load
    const isFirstLoad = !sessionStorage.getItem('garuda_loaded');
    const introDelay = isFirstLoad ? 3.6 : 0.2;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Node 0x1 Bar
    tl.to(".hero-node", { opacity: 1, x: 0, duration: 1, delay: introDelay })
      // "BUILDING"
      .fromTo(".hero-building", 
        { y: "80%", scale: 0.9, rotation: 2, opacity: 0 },
        { y: "0%", scale: 1, rotation: 0, opacity: 0.85, duration: 1.8 },
        "-=0.6"
      )
      // "SYST3MS"
      .fromTo(".hero-systems",
        { x: "-20vw", opacity: 0, filter: "blur(10px)" },
        { x: "0vw", opacity: 1, filter: "blur(0px)", duration: 1.6 },
        "-=1.4"
      )
      // "THAT SOAR"
      .fromTo(".hero-soar",
        { x: "20vw", opacity: 0, filter: "blur(10px)" },
        { x: "0vw", opacity: 1, filter: "blur(0px)", duration: 1.6 },
        "-=1.2"
      )
      // Paragraph Description
      .fromTo(".hero-desc",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5 },
        "-=1.0"
      )
      // Call to action tags
      .fromTo(".hero-tags",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5 },
        "-=1.2"
      );
  }, { scope: container });

  // --- Team Grid Engine (Waits for shuffle) ---
  useGSAP(() => {
    if (shuffledMembers.length === 0) return;
    const allowMouseTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // Staggered team card reveals via clip-path
    gsap.utils.toArray('.nest-card').forEach((card, i) => {
      gsap.fromTo(card,
        { clipPath: 'inset(100% 0% 0% 0%)', y: 30, autoAlpha: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          autoAlpha: 1,
          duration: 1.5,
          ease: 'power4.inOut',
          delay: (i % 4) * 0.2,
          scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        }
      );

      // 3D portrait tilt on mouse move (desktop pointers only)
      if (allowMouseTilt) {
        const onMove = (e) => {
          const rect = card.getBoundingClientRect();
          const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
          const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
          gsap.to(card, {
            rotationY: dx * 12,
            rotationX: -dy * 8,
            transformPerspective: 700,
            duration: 0.4,
            ease: 'power3.out',
          });
        };
        const onLeave = () => gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.7, ease: 'elastic.out(1,0.5)' });
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
      }
    });

    // Refresh ScrollTrigger as the layout has shifted with new cards
    ScrollTrigger.refresh();

  }, { scope: container, dependencies: [shuffledMembers] });

  const [uplinkStatus, setUplinkStatus] = useState("IDLE");
  const [uplinkMessage, setUplinkMessage] = useState("");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [hireStatus, setHireStatus] = useState({ type: "idle", message: "" });
  const [joinStatus, setJoinStatus] = useState({ type: "idle", message: "" });

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const homePagePreview = shuffledMembers.slice(0, 8);

  const handleHireSubmit = async (event) => { event.preventDefault(); setHireStatus({ type: 'success', message: `Protocol Initiated.` }); };

  return (
    <div ref={container} id="home" className="bg-[#050505] text-[#f0f0f0] font-mono selection:bg-[#FF6B00] selection:text-black overflow-x-hidden">

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes cyber-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-cyber-marquee {
          animation: cyber-marquee 15s linear infinite;
        }
        .marquee-track {
          display: flex;
          width: 200%;
        }
      `}} />


      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center px-3 sm:px-6 md:px-10 pt-32 md:pt-20">
        <div className="max-w-7xl mx-auto w-full relative">
          <div className="flex items-center gap-3 mb-8 md:mb-10 hero-node opacity-0 -translate-x-4">
            <div className="h-[1px] w-12 md:w-16 bg-[#FF6B00]"></div>
            <span className="sm:hidden text-[8px] uppercase tracking-[0.22em] text-[#FF6B00] font-bold leading-relaxed">Node 0x1 // Est. 2026</span>
            <span className="hidden sm:inline text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#FF6B00] font-bold leading-relaxed">Node 0x1 // MADE BY ARYA PATEL // Est. 2026</span>
          </div>

          <h1 className="font-sync text-[clamp(2.15rem,13vw,3.9rem)] sm:text-8xl md:text-[11vw] font-black leading-[0.95] md:leading-[0.8] uppercase tracking-tight sm:tracking-tighter mb-10 md:mb-16 relative perspective-1000">
            <span className="block italic text-white/50 hover:text-white transition-colors duration-500 relative z-0 hero-building opacity-0">
              BUILDING
            </span>
            <span className="block ml-0 sm:ml-[4vw] text-[#FF6B00] relative z-10 hero-systems opacity-0">
              SYST3MS
            </span>
            <span className="block text-right mr-0 sm:mr-[4vw] text-[#00E5FF] hero-soar opacity-0 whitespace-nowrap text-[clamp(1.85rem,10vw,3.2rem)] sm:text-[clamp(2.15rem,13vw,3.9rem)] md:text-[11vw] leading-none">
              THAT SOAR
            </span>
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-12">
            <div className="max-w-md border-l-2 border-white/10 pl-6 md:pl-8 relative hero-desc opacity-0">
              <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed text-slate-400 uppercase font-bold">
                Not an agency. Not a factory. <br />
                We are a high-velocity engineering collective <br />
                architecting the next phase of digital infrastructure.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-6 w-full md:w-auto relative hero-tags opacity-0">
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

      {/* TRUSTED BY - INFINITE CYBER MARQUEE */}
      <section className="py-14 border-y border-white/5 bg-[#060606] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <p className="text-[10px] uppercase tracking-[0.6em] text-center text-white/40 font-bold">Trusted By Visionary Teams</p>
        </div>
        <div className="marquee-track animate-cyber-marquee text-white/30 font-sync text-2xl md:text-3xl font-black uppercase tracking-widest gap-20">
            {['STARTUP_X', 'SCALE_IO', 'NEXUS_AI', 'GLOBAL_CORP', 'ORBIT_PAY', 'STACKFORGE', 'STARTUP_X', 'SCALE_IO', 'NEXUS_AI', 'GLOBAL_CORP', 'ORBIT_PAY'].map((name, i) => (
              <div key={`${name}-${i}`} className="hover:text-[#00E5FF] transition-colors cursor-default whitespace-nowrap">{name}</div>
            ))}
        </div>
      </section>

      {/* HOW WE BUILD */}
      <section id="process" className="py-20 md:py-36 px-6 bg-[#070707] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
             <h2 className="text-4xl md:text-7xl font-sync font-bold uppercase tracking-tighter mb-12 md:mb-16">
               How Elite Systems <span className="text-[#FF6B00]">Are Built</span>
             </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { t: 'Discovery & Architecture', i: <Command size={20} />, b: 'Clear technical direction.' },
              { t: 'Design & Prototyping', i: <Sparkles size={20} />, b: 'Validate ideas early.' },
              { t: 'Agile Dev + Peer Review', i: <Cpu size={20} />, b: 'Speed with quality.' },
              { t: 'Testing & Deployment', i: <ShieldCheck size={20} />, b: 'Production confidence.' },
              { t: 'Scale & Support', i: <Rocket size={20} />, b: 'Built for long-term growth.' },
            ].map((step, index) => (
              <ScrollReveal key={step.t} delay={index * 150} type="fade-up" className="bento-card p-6 border-l-2 border-l-[#00E5FF]/30 h-full">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#00E5FF]">{step.i}</span>
                  <span className="text-[10px] text-white/30">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-bold uppercase mb-2">{step.t}</h3>
                <p className="text-xs text-slate-500 uppercase">{step.b}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 md:py-36 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal type="slide-right">
             <h2 className="text-4xl md:text-7xl font-sync font-bold uppercase tracking-tighter mb-12 md:mb-16">
               What You Gain in the <span className="text-[#00E5FF]">Nest</span>
             </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'High-Impact Projects',
              'Competitive Compensation + Bonuses',
              'Continuous Learning & Mentorship',
              'Flexible Remote Work',
              'Elite Peer Network',
              'Real Ownership & Recognition',
            ].map((item, index) => (
              <ScrollReveal key={item} delay={index * 100} type="scale-up" className="bento-card p-8 h-full">
                <div className="w-10 h-10 rounded-full bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF] mb-4">
                  <Users size={18} />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight">{item}</h3>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-20 md:py-36 px-6 bg-[#080808] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
             <h2 className="text-5xl md:text-7xl font-sync font-bold uppercase tracking-tighter mb-12">
               Meet the <span className="text-[#FF6B00]">Elite Circle</span>
             </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homePagePreview.map((member, index) => (
              <div
                key={member.name}
                className="nest-card cursor-pointer group relative aspect-[4/5] overflow-hidden bg-[#050505] border border-white/5 hover:border-[#00E5FF]/40 transition-colors duration-500 will-change-transform"
                style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              >
                {/* Profile Image */}
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority={index < 4}
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                {/* Scan-line texture on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,229,255,0.02) 3px, rgba(0,229,255,0.02) 6px)'
                  }}
                />

                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="text-[8px] font-mono px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[#00E5FF] uppercase tracking-[0.2em]">
                    Node_0x{index + 1}
                  </span>
                </div>

                {/* Info Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="h-[2px] w-12 bg-[#FF6B00] mb-4 group-hover:w-full transition-all duration-700" />
                  <h3 className="text-2xl font-sync font-bold uppercase text-white mb-1 tracking-tighter leading-none">
                    {member.name}
                  </h3>
                  <p className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-[0.2em] mb-4">
                    {member.role}
                  </p>
                  <div className="max-h-0 group-hover:max-h-48 overflow-hidden transition-all duration-700 opacity-0 group-hover:opacity-100">
                    <p className="text-[10px] text-slate-300 uppercase leading-relaxed mb-4 tracking-wide font-medium">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.tags.map((tag) => (
                        <span key={tag} className="text-[8px] font-mono border border-white/10 px-2 py-1 text-white/50 uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-20 md:py-36 px-6" id="work">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal type="blur-in">
             <h2 className="text-4xl md:text-7xl font-sync font-bold uppercase tracking-tighter mb-12 md:mb-16">
               Projects That <span className="text-[#00E5FF]">Soared</span>
             </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * 200} type="blur-in" className="h-full font-sync">
                  <div 
                    onClick={() => setSelectedProject(project)}
                    className="bg-[#0a0a0a] border border-white/5 flex flex-col h-full overflow-hidden group hover:border-white/20 transition-all cursor-pointer relative"
                  >
                    <div className="p-8 md:p-10 border-b border-white/5 flex-grow">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack.map((tag) => (
                          <span key={tag} className="text-[9px] font-mono border border-[#00E5FF]/40 text-[#00E5FF] px-2.5 py-1 uppercase tracking-wider bg-[#00E5FF]/5">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold uppercase mb-6 tracking-tighter leading-tight text-white group-hover:text-[#FF6B00] transition-colors">
                        {project.title}
                      </h3>

                      <div className="space-y-4 mb-6">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-[0.2em]">Problem:</span>
                          <p className="text-[10px] text-slate-400 uppercase font-medium leading-relaxed tracking-wider line-clamp-2">{project.p}</p>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-[0.2em]">Solution:</span>
                          <p className="text-xs text-slate-400 uppercase font-medium leading-relaxed tracking-wider line-clamp-2">{project.s}</p>
                        </div>
                      </div>

                      <div className="bg-[#FF6B00]/5 border-l-2 border-[#FF6B00] p-4 md:p-5 mb-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[#FF6B00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <p className="relative text-xs md:text-[12px] text-white font-bold uppercase tracking-widest leading-none">
                          {project.r}
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#0d0d0d] p-5 md:p-6 flex justify-between items-center group-hover:bg-[#111] transition-colors relative mb-2">
                      <div className="flex gap-4 md:gap-8 flex-wrap relative z-20">
                        {project.playStore ? (
                          <a 
                            href={project.playStore} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#00E5FF] hover:text-white transition-colors flex items-center gap-2"
                          >
                             Live <ArrowRight size={10} />
                          </a>
                        ) : project.live ? (
                          <a 
                            href={project.live} 
                            onClick={(e) => e.stopPropagation()}
                            className="text-[10px] uppercase font-bold tracking-[0.3em] text-white hover:text-[#00E5FF] transition-colors flex items-center gap-2"
                          >
                            Live Demo <ArrowRight size={10} />
                          </a>
                        ) : null}
                        
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40 hover:text-white transition-colors flex items-center gap-2"
                          >
                            Github <ArrowRight size={10} />
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#FF6B00] opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">View Intel</span>
                        <ChevronRight size={12} className="text-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA & BENTO */}
      <section className="py-20 md:py-40 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ScrollReveal delay={0} type="fade-up" className="sm:col-span-2 lg:row-span-2">
              <div className="bento-card p-8 md:p-12 flex flex-col justify-between group overflow-hidden relative h-full">
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
          </ScrollReveal>

          <ScrollReveal delay={200} type="fade-up" className="h-full">
              <div className="bento-card p-6 md:p-8 flex flex-col justify-between group h-full min-h-[160px]">
                <Zap className="text-[#FF6B00] group-hover:scale-125 transition-transform" />
                <h4 className="text-xl md:text-2xl font-bold tracking-tighter uppercase font-sync">Speed <br /> Is King</h4>
              </div>
          </ScrollReveal>

          <ScrollReveal delay={400} type="fade-up" className="h-full">
              <div className="bento-card p-6 md:p-8 flex flex-col justify-between group h-full min-h-[160px] relative overflow-hidden bg-black/40 border border-white/5">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Globe size={24} className="text-[#00E5FF] group-hover:rotate-180 transition-transform duration-1000" />
                <h4 className="text-xl md:text-2xl font-bold tracking-tighter uppercase font-sync text-white">Global <br /> Infra</h4>
              </div>
          </ScrollReveal>

          <ScrollReveal delay={600} type="fade-up" className="sm:col-span-2 h-full">
              <div className="bento-card p-8 md:p-10 flex items-center justify-between group h-full min-h-[140px]">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase font-bold text-[#00E5FF]">LIVE_STATUS</span>
                  <h4 className="text-2xl md:text-3xl font-bold font-sync uppercase tracking-tighter">NEXUS AI CORE</h4>
                </div>
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-black transition-all">
                  <ArrowRight size={24} className="md:w-7 md:h-7" />
                </div>
              </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ✨ MANIFESTO / HIVE MIND ✨ */}
      <section id="manifesto" className="py-40 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
            <div>
              <ScrollReveal type="glitch-in">
                 <h2 className="text-6xl md:text-8xl font-sync font-black mb-16 leading-none uppercase">
                   THE <br /> <span className="text-[#FF6B00]">CODE</span> <br /> IS LAW
                 </h2>
              </ScrollReveal>

              <ScrollReveal delay={300} type="fade-up">
                  <div className="mt-20 border-l-4 border-[#00E5FF] p-8 md:p-10 bg-white/5 backdrop-blur-md">
                    <div className="flex items-center gap-3 mb-6">
                      <ShieldCheck size={16} className="text-[#00E5FF]" />
                      <span className="text-xs text-[#00E5FF] font-bold uppercase tracking-widest">Establish_Uplink</span>
                    </div>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setUplinkStatus('SENDING');
                        const formData = new FormData(e.currentTarget);
                        formData.append('type', 'Home Uplink Inquiry');
                        formData.append('sourcePage', '/');
                        const result = await sendEmailAction(formData);
                        if (result.success) {
                          setUplinkStatus('SUCCESS');
                          setUplinkMessage('TRANSMISSION_SUCCESS: NODE_NOTIFIED');
                          e.currentTarget.reset();
                        } else {
                          setUplinkStatus('ERROR');
                          setUplinkMessage(`ENCRYPTION_FAULT: ${result.error}`);
                        }
                      }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Secure_Ident</label>
                        <input name="companyName" required placeholder="ENTITY_NAME" className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Frequency (Email)</label>
                        <input name="workEmail" required type="email" placeholder="EMAIL@PROTOCOL.COM" className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Transmission</label>
                        <textarea name="projectScope" rows={3} placeholder="ENCRYPTED_MESSAGE..." className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors resize-none" />
                      </div>

                      <button
                        type="submit"
                        disabled={uplinkStatus === 'SENDING'}
                        className="w-full bg-[#FF6B00] text-black py-4 font-black text-xs uppercase hover:bg-white transition-all disabled:opacity-60"
                      >
                        {uplinkStatus === 'SENDING' ? 'establishing uplink...' : 'Execute Transmission'}
                      </button>

                      {uplinkStatus !== 'IDLE' && (
                        <div className={`text-[10px] font-bold uppercase tracking-widest text-center p-3 border ${uplinkStatus === 'SUCCESS' ? 'border-green-500/20 text-green-400 bg-green-500/10' : 'border-red-500/20 text-red-500 bg-red-500/10'}`}>
                          {uplinkMessage}
                        </div>
                      )}
                    </form>
                  </div>
              </ScrollReveal>
            </div>

            <div className="space-y-16">
              {[
                { id: "01", t: "radical transparency", d: "You see the code as we write it. Daily git pushes. No black boxes." },
                { id: "02", t: "architectural grit", d: "We don't do templates. Every line is custom-engineered for specific scale." },
                { id: "03", t: "velocity over comfort", d: "We ship at 10x speed by stripping away unnecessary middle-management." },
              ].map((item, index) => (
                <ScrollReveal key={item.id} delay={index * 200} type="slide-right">
                    <div className="group relative">
                      <span className="absolute -left-10 top-0 text-[#FF6B00] text-xs font-bold opacity-30 group-hover:opacity-100">{item.id}</span>
                      <h4 className="text-3xl font-bold uppercase tracking-tighter group-hover:text-[#00E5FF] transition-colors mb-4 font-sync">{item.t}</h4>
                      <p className="text-slate-500 text-sm uppercase leading-loose">{item.d}</p>
                    </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- PROJECT INTELLIGENCE MODAL --- */}
      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
}
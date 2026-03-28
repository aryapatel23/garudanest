"use client";

import React, { useRef } from 'react';
import { Zap, Cpu, Globe, Shield, ArrowRight, Users, Terminal } from 'lucide-react';
import { teamMembers } from '@/lib/constants';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutPage() {
  const container = useRef(null);

  useGSAP(() => {
    // Header timeline
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo('.about-ghost',
        { x: -80, autoAlpha: 0 },
        { x: 0, autoAlpha: 0.06, duration: 1.4 }
      )
      .fromTo('.about-title',
        { y: 60, autoAlpha: 0, filter: 'blur(10px)' },
        { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1.4 },
        '-=1.0'
      )
      .fromTo('.about-sub',
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1.2 },
        '-=0.8'
      )
      .fromTo('.about-line',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.0 },
        '-=0.6'
      );

    // Scroll-triggered reveals
    gsap.utils.toArray('.reveal-up').forEach((el, i) => {
      gsap.fromTo(el,
        { y: 50, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1.0, ease: 'power4.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
      );
    });

    gsap.utils.toArray('.reveal-left').forEach((el) => {
      gsap.fromTo(el,
        { x: -40, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1.0, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
      );
    });

    // 3D tilt on matrix cards
    gsap.utils.toArray('.matrix-card').forEach((card) => {
      // clip-path scroll reveal
      gsap.fromTo(card,
        { clipPath: 'inset(100% 0% 0% 0%)', y: 30 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        }
      );
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
        gsap.to(card, { rotationY: dx * 10, rotationX: -dy * 8, transformPerspective: 800, duration: 0.4, ease: 'power3.out' });
      };
      const onLeave = () => gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.7, ease: 'elastic.out(1,0.5)' });
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }, { scope: container });

  return (
    <div ref={container} className="relative pt-32 pb-20 px-6 bg-[#050505] min-h-screen font-space">

      <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-0">
        
        {/* PAGE HEADER */}
        <div className="relative group mb-16 md:mb-24 pt-12 md:pt-16 overflow-hidden md:overflow-visible">
          <span className="about-ghost absolute -top-3 left-0 text-[#FF6B00] opacity-[0.06] font-sync font-bold text-4xl md:text-8xl uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
            Legacy Protocol
          </span>

          <h1 className="about-title relative z-10 text-4xl md:text-7xl font-sync font-bold uppercase tracking-tighter text-white leading-[0.9]">
            The <span className="text-[#FF6B00]">GarudaNest</span> <br />
            Collective
          </h1>

          <p className="about-sub max-w-2xl mt-6 text-slate-400 text-xs md:text-sm uppercase tracking-widest leading-relaxed font-medium">
            Radical transparency meets architectural grit. Documenting the origins of the collective and the engineers behind the network.
          </p>

          <div className="about-line h-[2px] w-16 bg-[#FF6B00] mt-8 opacity-40 origin-left"></div>
        </div>

        {/* ── SPECIALIZATION MATRIX ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { 
              icon: <Cpu size={24} />, 
              title: "Hard_Logic", 
              tag: "SYSTEMS",
              color: "#00E5FF",
              desc: "Building mission-critical architectures at the intersection of silicon and software logic." 
            },
            { 
              icon: <Globe size={24} />, 
              title: "Synapse", 
              tag: "SYNERGY",
              color: "#FF6B00",
              desc: "Zero-friction collaboration. Direct-to-engineer communication eliminates all interpretive drift." 
            },
            { 
              icon: <Shield size={24} />, 
              title: "Sovereign", 
              tag: "INDEPENDENCE",
              color: "#00E5FF",
              desc: "Establishing permanent technical independence. Systems you own, controlled by your rules." 
            }
          ].map((item, i) => (
            <div
              key={i}
              className="matrix-card will-change-transform relative group p-10 bg-[#0a0a0a] border border-white/5 hover:bg-[#0d0d0d] overflow-hidden transition-all duration-500 block block"
              style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" style={{ from: 'transparent', to: item.color }} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" style={{ color: item.color }}>{item.icon}</div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[8px] font-mono border px-2 py-0.5 uppercase tracking-widest opacity-80" style={{ color: item.color, borderColor: item.color + '40' }}>{item.tag}</span>
                </div>
                
                <h3 className="text-2xl font-sync font-bold uppercase text-white mb-4 tracking-tighter">{item.title}</h3>
                
                <p className="text-[11px] text-slate-400 uppercase leading-relaxed tracking-widest mt-auto font-medium opacity-80">{item.desc}</p>
              </div>

              {/* Glowing bottom border */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-700" style={{ backgroundColor: item.color, width: '0%', '.group:hover &': { width: '100%' } }} />
              {/* HUD Coordinates */}
              <div className="absolute top-4 right-4 text-[7px] font-mono text-white/5 select-none transition-colors" style={{ '.group:hover &': { color: item.color + '40' } }}>
                MAT_{String(i+1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        {/* ── IMMERSIVE TEAM PHOTO BREAK ── */}
        <div className="reveal-up mb-32 relative h-[400px] md:h-[600px] w-full border border-white/5 bg-[#0a0a0a] overflow-hidden group">
            {/* Parallax Image Scale on Hover */}
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
              alt="Engineering Team Discussion" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-[1500ms] ease-out scale-105 group-hover:scale-100"
            />
            {/* HUD Corner Elements */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-[#00E5FF]/40 pointer-events-none" />
            <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-[#00E5FF]/40 pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-[#00E5FF]/40 pointer-events-none" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-[#00E5FF]/40 pointer-events-none" />

            {/* Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none" />
            
            <div className="absolute bottom-10 left-10 z-20 pointer-events-none">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.4em]">Visual_Log // 0xAF_Discussion</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-sync font-bold text-white tracking-tighter uppercase mb-4">Architectural Alignment</h3>
                <p className="text-[11px] text-slate-300 uppercase tracking-widest max-w-xl leading-relaxed border-l-2 border-[#00E5FF] pl-4 bg-white/[0.02] py-2">
                  Cross-validating system logic before committing to production repositories. Elite engineering requires consensus, not hierarchy.
                </p>
            </div>
        </div>

        {/* ── GENESIS PROTOCOL (DECRYPTED BLOCKS) ── */}
        <div className="mb-40 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start border-l border-white/5 pl-8 md:pl-16 relative z-10">
            <div className="sticky top-40 pt-4 reveal-left">
              <div className="flex items-center gap-3 mb-8">
                <Terminal size={16} className="text-[#00E5FF]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00E5FF]">Terminal_Briefing // Genesis</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-sync font-bold uppercase text-white tracking-tighter leading-none mb-10">
                The <span className="text-[#FF6B00]">Genesis</span> <br /> Protocol.
              </h2>
              <div className="h-[1px] w-20 bg-[#FF6B00] opacity-40"></div>
            </div>

            <div className="space-y-10 text-slate-400 text-xs md:text-sm uppercase leading-loose tracking-widest font-medium">
              {[
                { title: '01_FRUSTRATION', text: 'GarudaNest was born from a frustration with "Good Enough." We watched a landscape filled with bloated agencies, junior developer churn, and technical debt that stifled innovation. We saw the gap between ambitious product visions and the raw architectural grit required to build them.' },
                { title: '02_SOLUTION_VECTOR', text: 'The thought was simple but radical: Assemble a curated, highly lethal collective of elite freelance architects. No junior staff to manage, no account managers mapping requirements incorrectly through broken communication chains, and absolutely zero friction.' },
                { title: '03_OPERATIONAL_DIRECTIVE', text: 'Pure, direct-to-engineer technical mastery from independent experts operating at the absolute highest level. Just rapid, atomic iterations solving the hardest system problems.' },
                { title: '04_TECHNICAL_SOVEREIGNTY', text: 'We built this decentralized tactical network to be the special operations unit of the modern web. We do not just ship digital products; we establish technical sovereignty for our partners. Every system we build across our collective is a testament to our core belief: In the digital age, THE CODE IS LAW.' }
              ].map((item, i) => (
                <div key={i} className={`reveal-up opacity-90 ${i !== 3 ? 'pb-10 border-b border-white/5' : ''}`}>
                  <span className="text-[10px] font-bold font-mono text-[#00E5FF] tracking-[0.3em] block mb-4 opacity-80">{item.title}</span>
                  <p>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── HUMAN CAPITAL MATRIX (THE NODES) ── */}
        <div className="mb-40 relative">
          <div className="flex justify-between items-end mb-16 px-4 md:px-0 relative z-10 reveal-up">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users size={16} className="text-[#FF6B00]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FF6B00]">Diagnostic_Matrix // Active_Nodes</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-sync font-bold uppercase text-white tracking-tighter">
                The <span className="text-[#00E5FF]">Nodes</span>
              </h2>
            </div>
            <Link href="/nest" className="hidden md:flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#00E5FF] hover:text-white transition-all group">
              Deep Diagnostic <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {teamMembers.map((member, i) => (
              <div key={i} className="reveal-up group relative aspect-[3/4] overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-[#00E5FF]/40 transition-all duration-500 flex flex-col justify-end p-6 cursor-crosshair">
                
                {/* Immersive Image */}
                <div className="absolute inset-0">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[800ms] scale-105 group-hover:scale-100"
                  />
                  {/* Custom Scan Line Texture */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.1] z-10" 
                       style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)' }} />
                  {/* Subtle Gradient overlay to ensure text legibility */}
                  <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
                </div>

                {/* HUD Elements */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="text-[7px] font-mono text-[#00E5FF] tracking-widest uppercase bg-black/60 px-2 py-1 backdrop-blur-sm">Node_0x{String(i+1).padStart(2, '0')}</span>
                </div>
                {/* Tech tags floating */}
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-1 items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-4 group-hover:translate-x-0">
                  {member.tags?.slice(0, 2).map((tag, tIdx) => (
                    <span key={tIdx} className="text-[7px] font-mono text-white/50 bg-black/50 border border-white/10 px-1.5 py-0.5 uppercase">{tag}</span>
                  ))}
                </div>

                {/* Info Container */}
                <div className="relative z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="text-xl md:text-2xl font-sync font-bold text-white uppercase tracking-tighter mb-1">{member.name}</h4>
                    <p className="text-[9px] font-bold font-mono text-[#00E5FF] uppercase tracking-widest mb-3 opacity-90">{member.role} // Freelance Expert</p>
                    
                    {/* Progress indicator line */}
                    <div className="h-[2px] w-8 bg-white/20 group-hover:w-full transition-all duration-700 delay-100 relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-full bg-[#00E5FF] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                    </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 md:hidden text-center reveal-up">
            <Link href="/nest" className="flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#00E5FF]">
              Deep Diagnostic <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* ── SECONDARY IMMERSIVE PHOTO ── */}
        <div className="reveal-up mb-32 relative h-[300px] w-full border border-white/5 bg-[#0a0a0a] overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
              alt="Elite Development Focus" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-[2000ms] scale-105 group-hover:scale-100"
            />
            {/* Horizontal scan line animation */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-[#FF6B00]/40 animate-[scanVertical_8s_linear_infinite]" />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
               <div className="relative border border-[#FF6B00]/20 p-8 backdrop-blur-sm bg-black/20">
                 <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#FF6B00]" />
                 <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#FF6B00]" />
                 <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#FF6B00]" />
                 <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#FF6B00]" />
                 <p className="text-white/80 font-sync font-bold text-3xl md:text-6xl tracking-tighter uppercase">Deep_Focus_Mode</p>
                 <p className="text-[#FF6B00] text-center text-[9px] font-mono tracking-[0.4em] uppercase mt-2">Active Synthesis</p>
               </div>
            </div>
            
            <style jsx>{`
              @keyframes scanVertical {
                0% { top: 0%; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { top: 100%; opacity: 0; }
              }
            `}</style>
        </div>

        {/* ── FINAL COMMAND INTERFACE ── */}
        <div className="reveal-up relative bg-white/[0.02] border border-white/5 p-12 md:p-24 text-center rounded-sm overflow-hidden">
            {/* Holographic Background Ticker */}
            <div className="absolute inset-0 opacity-[0.02] font-mono text-[80px] md:text-[120px] font-black uppercase tracking-widest flex items-center justify-center select-none pointer-events-none whitespace-nowrap overflow-hidden">
              <span className="animate-pulse">TRANSMISSION_COMPLETE_0x99</span>
            </div>

            <div className="relative z-10">
                <p className="text-[10px] text-white/40 uppercase tracking-[0.5em] mb-10">Transmission Terminal Ready</p>
                <h2 className="text-3xl md:text-6xl font-sync font-bold uppercase text-white tracking-tighter mb-12 leading-none">
                  Ready to <span className="text-[#FF6B00]">Build</span> Your <span className="text-[#00E5FF]">Empire?</span>
                </h2>
                
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <a href="/manifesto" className="bg-[#FF6B00] text-black px-12 py-5 font-black text-xs uppercase hover:bg-white transition-all shadow-[0_10px_30px_rgba(255,107,0,0.15)] group flex items-center justify-center gap-3 w-full md:w-auto">
                        Initialize Gateway <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="/work" className="border border-white/20 px-12 py-5 font-bold text-xs uppercase text-white hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all w-full md:w-auto">
                        Review Protocol Logs
                    </a>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}

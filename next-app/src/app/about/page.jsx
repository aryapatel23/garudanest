"use client";

import React from 'react';
import { Zap, Cpu, Globe, Shield, ArrowRight, Users } from 'lucide-react';
import { teamMembers } from '@/lib/constants';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-40 px-6 bg-[#050505] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* ARCHITECTURAL HERO */}
        <div className="relative mb-32 pt-20">
          <div className="absolute -top-10 left-0 text-[#FF6B00] opacity-[0.04] font-sync font-black text-6xl md:text-[14vw] uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
            COLLECTIVE
          </div>
          
          <div className="relative z-10 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[1px] bg-[#FF6B00]"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#FF6B00]">Universal_About_Protocol</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-sync font-bold uppercase tracking-tighter text-white leading-[0.9] mb-12">
              The <span className="text-[#FF6B00]">GarudaNest</span> <br /> 
              Collective
            </h1>
            
            <p className="max-w-2xl text-slate-400 text-sm md:text-base uppercase tracking-widest leading-loose font-medium opacity-80">
              An elite engineering node established to design, develop, and deploy high-frequency systems where <span className="text-white font-bold">Performance is the only metric.</span>
            </p>
          </div>
        </div>

        {/* WHAT WE DO (SPECIALIZATION) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
          {[
            { 
              icon: <Cpu className="text-[#00E5FF]" size={20} />, 
              title: "Systems", 
              desc: "Engineering at the silicon and software layer. We build high-velocity architectures that don't just scale—they transcend." 
            },
            { 
              icon: <Globe className="text-[#FF6B00]" size={20} />, 
              title: "Synergy", 
              desc: "Zero-friction collaboration. Direct-to-engineer communication pipes ensure your vision is never lost in translation." 
            },
            { 
              icon: <Shield className="text-[#00FF57]" size={20} />, 
              title: "Sovereignty", 
              desc: "Establishing technical independence for our partners. We build the systems that you own, eternally." 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500 rounded-sm">
              <div className="mb-6 opacity-60 group-hover:opacity-100 transition-opacity">{item.icon}</div>
              <h3 className="text-xl font-sync font-bold uppercase text-white mb-4 tracking-tight">{item.title}</h3>
              <p className="text-[10px] text-slate-500 uppercase leading-relaxed tracking-widest leading-7">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* THE GENESIS PROTOCOL (ORIGIN) */}
        <div className="mb-40 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start border-l border-white/5 pl-12 md:pl-20">
          <div className="sticky top-40">
            <div className="flex items-center gap-3 mb-8">
              <Zap size={16} className="text-[#FF6B00]" />
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#FF6B00]">Genesis_Protocol</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-sync font-bold uppercase text-white tracking-tighter leading-none mb-10">
              How We <br /> <span className="text-[#00E5FF]">Think.</span>
            </h3>
            <div className="h-[2px] w-24 bg-[#FF6B00] opacity-40"></div>
          </div>

          <div className="space-y-12 text-slate-400 text-xs md:text-sm uppercase leading-loose tracking-[0.15em] font-medium">
            <p className="pb-10 border-b border-white/5">
              GarudaNest was born from a frustration with "Good Enough." We watched a landscape filled with bloated agencies, junior developer churn, and technical debt that stifled innovation. We saw the gap between ambitious visions and the architectural grit required to build them.
            </p>
            <p className="pb-10 border-b border-white/5">
              The thought was simple but radical: Assemble a high-frequency node—a "Nest"—of only senior architects. No junior staff to manage, no account managers to translate requirements, and zero friction. Just pure, direct-to-engineer mastery.
            </p>
            <p>
              We built this collective to be the special operations unit of the web. We don't just ship products; we establish technical sovereignty for our partners. Every system we build is a testament to our belief that in the digital age, <span className="text-white font-bold">The Code Is Law.</span>
            </p>
          </div>
        </div>

        {/* THE COLLECTIVE (HUMAN CAPITAL) */}
        <div className="mb-40">
          <div className="flex justify-between items-end mb-16 px-4 md:px-0">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users size={18} className="text-[#00E5FF]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00E5FF]">Human_Capital</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-sync font-bold uppercase text-white tracking-tighter">
                The <span className="text-[#FF6B00]">Nodes</span>
              </h2>
            </div>
            <Link href="/nest" className="hidden md:flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-[#00E5FF] transition-all group">
              View Detailed Bio-Data <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <div key={i} className="group relative aspect-[3/4] overflow-hidden bg-white/[0.02] border border-white/5 p-8 flex flex-col justify-end">
                <div className="absolute top-6 left-6 opacity-20 group-hover:opacity-100 transition-opacity">
                    <span className="text-[8px] font-mono text-white tracking-widest uppercase">Node_0x0{i+1}</span>
                </div>
                
                <div className="relative z-10">
                    <h4 className="text-xl font-sync font-bold text-white uppercase tracking-tighter mb-1">{member.name}</h4>
                    <p className="text-[9px] font-bold font-mono text-[#FF6B00] uppercase tracking-widest mb-4">{member.role}</p>
                    <div className="h-[1px] w-0 group-hover:w-full bg-[#00E5FF] transition-all duration-700"></div>
                </div>

                <div className="absolute inset-0 bg-[#FF6B00] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700"></div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 md:hidden text-center">
            <Link href="/nest" className="text-[10px] font-bold uppercase tracking-widest text-[#00E5FF]">View Detailed Bio-Data Protocol</Link>
          </div>
        </div>

        {/* FINAL REDIRECT */}
        <div className="bg-white/[0.02] border border-white/5 p-12 md:p-24 text-center rounded-sm">
            <p className="text-[10px] text-white/40 uppercase tracking-[0.5em] mb-10">Transmission Terminal Ready</p>
            <h2 className="text-3xl md:text-6xl font-sync font-bold uppercase text-white tracking-tighter mb-12">
              Ready to <span className="text-[#FF6B00]">Build</span> Your <span className="text-[#00E5FF]">Empire?</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
                <a href="/manifesto" className="bg-[#FF6B00] text-black px-12 py-5 font-black text-xs uppercase hover:bg-white transition-all shadow-[0_10px_30px_rgba(255,107,0,0.15)]">
                    Direct Gateway
                </a>
                <a href="/work" className="border border-white/20 px-12 py-5 font-bold text-xs uppercase text-white hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all">
                    Review Archives
                </a>
            </div>
        </div>
      </div>
    </div>
  );
}

// Support for Next.js Link
import Link from 'next/link';

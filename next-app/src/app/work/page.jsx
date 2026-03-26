"use client";

import React from 'react';
import { projects } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export default function WorkPage() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative group mb-20 md:mb-24 px-4 md:px-0 pt-12 md:pt-16">
          {/* Architectural 3D Layers (Shifted Up for 'Half Visible' look) */}
          {/* <span
            className="absolute -top-6 -right-2 md:-top-12 md:-right-4 font-sync font-bold text-5xl md:text-7xl uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap opacity-[0.03] text-white"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', textStroke: '1px rgba(255,255,255,0.2)', color: 'transparent' }}
          >
            Projects That Soared
          </span> */}
          <span className="absolute -top-3 -right-1 md:-top-6 md:-right-2 text-[#FF6B00] opacity-[0.06] font-sync font-bold text-4xl md:text-7xl uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
            Projects That Soared
          </span>

          <h2 className="relative z-10 text-4xl md:text-7xl font-sync font-bold uppercase tracking-tighter text-white leading-none">
            Projects That <span className="text-[#FF6B00]">Soared</span>
          </h2>

          <div className="h-[2px] w-16 bg-[#FF6B00] mt-6 md:mt-8 opacity-40"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 md:px-0">
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
    </div>
  );
}

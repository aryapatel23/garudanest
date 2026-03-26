"use client";

import React from 'react';
import { projects } from '@/lib/constants';
import { BentoCard } from '@/components/ui/BentoCard';

export const WorkSection = () => (
  <section id="work" className="py-40 px-6 border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-5xl md:text-8xl font-sync font-bold uppercase tracking-tighter mb-16">
        Projects That <span className="text-[#FF6B00]">Soared</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project) => (
          <BentoCard key={project.title} className="p-8">
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
          </BentoCard>
        ))}
      </div>
    </div>
  </section>
);

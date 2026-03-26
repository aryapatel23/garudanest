"use client";

import React from 'react';
import { Command, Sparkles, Cpu, ShieldCheck, Rocket } from 'lucide-react';
import { BentoCard } from '@/components/ui/BentoCard';

const steps = [
  { t: 'Discovery & Architecture', i: <Command size={20} />, b: 'Clear technical direction.' },
  { t: 'Design & Prototyping', i: <Sparkles size={20} />, b: 'Validate ideas early.' },
  { t: 'Agile Dev + Peer Review', i: <Cpu size={20} />, b: 'Speed with quality.' },
  { t: 'Testing & Deployment', i: <ShieldCheck size={20} />, b: 'Production confidence.' },
  { t: 'Scale & Support', i: <Rocket size={20} />, b: 'Built for long-term growth.' },
];

export const ProcessSection = () => (
  <section id="process" className="py-40 px-6 bg-[#070707] border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-5xl md:text-7xl font-sync font-bold uppercase tracking-tighter mb-16">
        How Elite Systems <span className="text-[#00E5FF]">Are Built</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((step, index) => (
          <BentoCard key={step.t} className="p-6 border-l-2 border-l-[#00E5FF]/30">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#00E5FF]">{step.i}</span>
              <span className="text-[10px] text-white/30">0{index + 1}</span>
            </div>
            <h3 className="text-lg font-bold uppercase mb-2">{step.t}</h3>
            <p className="text-xs text-slate-500 uppercase">{step.b}</p>
          </BentoCard>
        ))}
      </div>
    </div>
  </section>
);

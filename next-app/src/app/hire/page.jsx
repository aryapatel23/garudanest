"use client";

import React, { useState } from 'react';
import { Briefcase, Zap, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import { BentoCard } from '@/components/ui/BentoCard';
import { sendEmailAction } from '../../lib/actions';
import { SERVICES, BUDGET_RANGES } from '@/lib/constants';

export default function HirePage() {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [selectedService, setSelectedService] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ type: 'loading', message: 'Syncing with Hive_Mind...' });

    const formData = new FormData(form);
    formData.append('service', selectedService);
    formData.append('budget', selectedBudget);
    formData.append('type', 'Empire Build Inquiry');

    try {
      const result = await sendEmailAction(formData);

      if (result.error) throw new Error(result.error);

      setStatus({ type: 'success', message: `Protocol Initiated. Transmission_ID: ${result.id.substring(0, 8)}` });
      form.reset();
      setSelectedService("");
      setSelectedBudget("");
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'NODE_OFFLINE' });
    }
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        {/* Header Section */}
        <div className="relative group mb-16 md:mb-24 pt-12 md:pt-16">
          <span className="absolute -top-3 left-0 text-[#FF6B00] opacity-[0.06] font-sync font-bold text-4xl md:text-8xl uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
            Elite Consultation
          </span>

          <h2 className="relative z-10 text-4xl md:text-7xl font-sync font-bold uppercase tracking-tighter text-white leading-none">
            Begin Your <span className="text-[#FF6B00]">System Audit</span>
          </h2>

          <p className="max-w-2xl mt-6 text-slate-400 text-xs md:text-sm uppercase tracking-widest leading-relaxed font-medium">
            We don't just build features; we architect certainty. Brief us on your technical obstacles below.
          </p>

          <div className="h-[2px] w-16 bg-[#FF6B00] mt-8 opacity-40"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Directives */}
          <div className="space-y-6">
            <BentoCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck size={20} className="text-[#00E5FF]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">The Guarantee</span>
              </div>
              <h3 className="text-xl font-sync font-bold uppercase mb-4 leading-tight">Zero <br /> Bottlenecks</h3>
              <p className="text-[10px] text-slate-500 uppercase leading-loose tracking-wide font-medium">
                Every project begins with a deep-scan audit. We identify the rot in your current system before writing a single line of new code.
              </p>
            </BentoCard>

            <BentoCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Cpu size={20} className="text-[#FF6B00]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">The Workflow</span>
              </div>
              <h3 className="text-xl font-sync font-bold uppercase mb-4 leading-tight">Extreme <br /> Velocity</h3>
              <p className="text-[10px] text-slate-500 uppercase leading-loose tracking-wide font-medium">
                No middle managers. No bloat. You work directly with the 8 senior architects who execute your vision in 1-week sprints.
              </p>
            </BentoCard>
          </div>

          {/* Center & Right: The Form */}
          <div className="lg:col-span-2">
            <BentoCard className="p-8 md:p-12 relative overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                {/* Company & Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Entity Name</label>
                    <input name="companyName" required type="text" placeholder="COMPANY_CORP" className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Secure Uplink (Email)</label>
                    <input name="workEmail" required type="email" placeholder="CTO@DOMAIN.COM" className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors" />
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-4">
                  <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Primary Objective</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedService(s.id)}
                        className={`p-4 border text-left transition-all ${selectedService === s.id ? 'border-[#FF6B00] bg-[#FF6B00]/5' : 'border-white/5 hover:border-white/20'}`}
                      >
                        <span className={`text-[10px] font-bold uppercase block mb-1 ${selectedService === s.id ? 'text-[#FF6B00]' : 'text-white'}`}>{s.label}</span>
                        <p className="text-[8px] text-white/30 uppercase leading-tight">{s.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget & Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Investment Tier</label>
                    <div className="grid grid-cols-2 gap-2">
                      {BUDGET_RANGES.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setSelectedBudget(b.value)}
                          className={`py-3 px-2 border text-center text-[10px] font-bold uppercase transition-all ${selectedBudget === b.value ? 'border-[#00E5FF] bg-[#00E5FF]/5 text-[#00E5FF]' : 'border-white/5 text-white/40 hover:border-white/20'}`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Execution Velocity (Timeline)</label>
                    <input name="timeline" required type="text" placeholder="E.G. 4-8 WEEKS" className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#00E5FF] transition-colors" />
                  </div>
                </div>

                {/* Project Scope */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">The Mission (Scope)</label>
                  <textarea name="projectScope" required placeholder="Describe the system bottlenecks we must eliminate..." rows={4} className="w-full bg-transparent border border-white/10 p-4 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors resize-none" />
                </div>

                {/* Submit */}
                <div className="flex flex-col md:flex-row items-center gap-6 pt-4">
                  <button
                    disabled={status.type === 'loading'}
                    className="w-full md:w-auto px-12 py-5 bg-[#FF6B00] text-black font-black text-xs uppercase hover:bg-[#00E5FF] transition-all flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(255,107,0,0.3)] disabled:opacity-60"
                  >
                    {status.type === 'loading' ? 'Establishing Uplink...' : 'Submit Briefing'}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  {status.type !== 'idle' && (
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${status.type === 'success' ? 'text-[#22C55E]' : status.type === 'error' ? 'text-red-400' : 'text-[#00E5FF]'}`}>
                      {status.message}
                    </p>
                  )}
                </div>
              </form>

              {/* Background Accent */}
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FF6B00] opacity-[0.03] blur-[100px] -mr-32 -mb-32 rounded-full pointer-events-none" />
            </BentoCard>
          </div>
        </div>
      </div>
    </div>
  );
}

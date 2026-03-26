"use client";

import React, { useState } from 'react';
import { Briefcase, User } from 'lucide-react';
import { BentoCard } from '@/components/ui/BentoCard';

export default function JoinPage() {
  const [hireStatus, setHireStatus] = useState({ type: "idle", message: "" });
  const [joinStatus, setJoinStatus] = useState({ type: "idle", message: "" });

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
      if (!response.ok) throw new Error(data.error || 'Request failed');
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
      if (!response.ok) throw new Error(data.error || 'Request failed');
      setJoinStatus({ type: 'success', message: `Profile received. Ref ${data.referenceId}` });
      event.currentTarget.reset();
    } catch (error) {
      setJoinStatus({ type: 'error', message: error.message || 'Could not submit profile.' });
    }
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <div className="relative group mb-16 md:mb-24 pt-16 md:pt-20">
          {/* Architectural 3D Layers (Shifted Up for 'Half Visible' look) */}
          <span
            className="absolute -top-6 -right-2 md:-top-16 md:-right-4 font-sync font-black text-4xl md:text-8xl uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap opacity-[0.02] text-white"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)', textStroke: '1px rgba(255,255,255,0.1)', color: 'transparent' }}
          >
            Ready to Soar?
          </span>
          <span className="absolute -top-3 -right-1 md:-top-8 md:-right-2 text-[#FF6B00] opacity-[0.06] font-sync font-black text-4xl md:text-8xl uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
            Ready to Soar?
          </span>

          <h2 className="relative z-10 text-4xl md:text-8xl font-sync font-black uppercase tracking-tighter text-white leading-none">
            Ready to <span className="text-[#FF6B00]">Soar</span>?
          </h2>

          <div className="h-[2px] w-16 bg-[#FF6B00] mt-6 md:mt-8 opacity-40"></div>
        </div>
        <div id="hire" className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <form onSubmit={handleHireSubmit}>
            <BentoCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase size={18} className="text-[#00E5FF]" />
                <span className="text-xs font-bold uppercase tracking-widest">I Need a Team // Hire Us</span>
              </div>
              <div className="space-y-3">
                <input name="companyName" required type="text" placeholder="Company Name" className="w-full bg-transparent border border-white/20 p-3 text-xs uppercase outline-none focus:border-[#FF6B00]" />
                <input name="workEmail" required type="email" placeholder="Work Email" className="w-full bg-transparent border border-white/20 p-3 text-xs uppercase outline-none focus:border-[#FF6B00]" />
                <textarea name="projectScope" required placeholder="Project Scope" rows={4} className="w-full bg-transparent border border-white/20 p-3 text-xs uppercase outline-none focus:border-[#FF6B00]" />
              </div>
              <button disabled={hireStatus.type === 'loading'} className="mt-4 w-full bg-[#FF6B00] text-black py-3.5 font-black text-xs uppercase hover:bg-[#00E5FF] transition-colors disabled:opacity-60">
                {hireStatus.type === 'loading' ? 'Sending...' : 'Send Inquiry'}
              </button>
              {hireStatus.type !== 'idle' && (
                <p className={`mt-3 text-[10px] uppercase ${hireStatus.type === 'success' ? 'text-[#22C55E]' : 'text-red-400'}`}>
                  {hireStatus.message}
                </p>
              )}
            </BentoCard>
          </form>

          <form onSubmit={handleJoinSubmit}>
            <BentoCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <User size={18} className="text-[#FF6B00]" />
                <span className="text-xs font-bold uppercase tracking-widest">I am a Developer // Join the Nest</span>
              </div>
              <div className="space-y-3">
                <input name="fullName" required type="text" placeholder="Full Name" className="w-full bg-transparent border border-white/20 p-3 text-xs uppercase outline-none focus:border-[#00E5FF]" />
                <input name="email" required type="email" placeholder="Email" className="w-full bg-transparent border border-white/20 p-3 text-xs uppercase outline-none focus:border-[#00E5FF]" />
                <input name="role" required type="text" placeholder="Role" className="w-full bg-transparent border border-white/20 p-3 text-xs uppercase outline-none focus:border-[#00E5FF]" />
                <input name="portfolio" type="url" placeholder="Portfolio/GitHub" className="w-full bg-transparent border border-white/20 p-3 text-xs uppercase outline-none focus:border-[#00E5FF]" />
              </div>
              <button disabled={joinStatus.type === 'loading'} className="mt-4 w-full bg-[#00E5FF] text-black py-3.5 font-black text-xs uppercase hover:bg-[#FF6B00] transition-colors disabled:opacity-60">
                {joinStatus.type === 'loading' ? 'Submitting...' : 'Submit Profile'}
              </button>
              {joinStatus.type !== 'idle' && (
                <p className={`mt-3 text-[10px] uppercase ${joinStatus.type === 'success' ? 'text-[#22C55E]' : 'text-red-400'}`}>
                  {joinStatus.message}
                </p>
              )}
            </BentoCard>
          </form>
        </div>
      </div>
    </div>
  );
}

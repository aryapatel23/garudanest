"use client";

import React, { useState, useRef } from 'react';
import { Shield } from 'lucide-react';
import { BentoCard } from '@/components/ui/BentoCard';
import { sendEmailAction } from '../../lib/actions';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ManifestoPage() {
  const container = useRef(null);

  // Contact Form States (Uplink)
  const [uplinkStatus, setUplinkStatus] = useState("IDLE"); // IDLE, SENDING, SUCCESS, ERROR
  const [uplinkMessage, setUplinkMessage] = useState("");

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo('.manifesto-ghost',
      { x: -80, autoAlpha: 0 },
      { x: 0, autoAlpha: 0.06, duration: 1.4 }
    )
      .fromTo('.manifesto-title',
        { y: 60, autoAlpha: 0, filter: 'blur(10px)' },
        { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1.4 },
        '-=1.0'
      )
      .fromTo('.manifesto-sub',
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1.0 },
        '-=0.8'
      )
      .fromTo('.manifesto-line',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.0 },
        '-=0.6'
      );
  }, { scope: container });

  return (
    <div ref={container} className="pt-32 pb-20 bg-black">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">

          <div className="space-y-16">
            {/* PAGE HEADER — GSAP powered */}
            <div className="relative group pt-16 md:pt-20 overflow-hidden md:overflow-visible">
              <span className="manifesto-ghost absolute -top-3 left-0 text-[#FF6B00] font-sync font-bold text-4xl md:text-8xl uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
                Core Philosophy
              </span>

              <h2 className="manifesto-title relative z-10 text-4xl md:text-7xl font-sync font-bold uppercase tracking-tighter text-white leading-none">
                The <span className="text-[#FF6B00]">Code</span> Is Law
              </h2>

              <p className="manifesto-sub max-w-md mt-6 text-slate-400 text-xs md:text-sm uppercase tracking-widest leading-relaxed font-medium">
                Our engineering philosophy and commitment to velocity.
              </p>

              <div className="manifesto-line h-[2px] w-16 bg-[#FF6B00] mt-8 opacity-40 origin-left"></div>
            </div>

            <div className="space-y-12">
              {[
                { id: "01", t: "radical transparency", d: "You see the code as we write it. Daily git pushes. No black boxes." },
                { id: "02", t: "architectural grit", d: "We don't do templates. Every line is custom-engineered for specific scale." },
                { id: "03", t: "velocity over comfort", d: "We ship at 10x speed by stripping away unnecessary middle-management." },
              ].map((item, index) => (
                <ScrollReveal key={item.id} delay={index * 200} type="flip-up">
                  <div className="group relative">
                    <span className="absolute -left-6 sm:-left-10 top-0 text-[#FF6B00] text-xs font-bold opacity-30 group-hover:opacity-100">{item.id}</span>
                    <h4 className="text-2xl font-bold uppercase tracking-tighter group-hover:text-[#00E5FF] transition-colors mb-3 font-sync">{item.t}</h4>
                    <p className="text-slate-500 text-[10px] uppercase leading-loose max-w-sm">{item.d}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>

          <div className="relative pt-10 lg:pt-20">
            <ScrollReveal delay={600} type="fade-up">
              <BentoCard className="p-8 md:p-12 lg:sticky lg:top-32">
                <div className="flex items-center gap-3 mb-8">
                  <Shield size={20} className="text-[#FF6B00]" />
                  <span className="text-xs font-bold uppercase tracking-[0.3em]">Establish_Uplink</span>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setUplinkStatus("SENDING");
                    const formData = new FormData(e.currentTarget);
                    formData.append('type', 'Manifesto Transmission');
                    const result = await sendEmailAction(formData);
                    if (result.success) {
                      setUplinkStatus("SUCCESS");
                      setUplinkMessage("TRANSMISSION_SUCCESS: NODE_NOTIFIED");
                      e.target.reset();
                    } else {
                      setUplinkStatus("ERROR");
                      setUplinkMessage(`ENCRYPTION_FAULT: ${result.error}`);
                    }
                  }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Secure_Ident</label>
                    <input name="companyName" required placeholder="ENTITY_NAME" className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#00E5FF] transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Frequency (Email)</label>
                    <input name="workEmail" required type="email" placeholder="EMAIL@PROTOCOL.COM" className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#00E5FF] transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Transmission</label>
                    <textarea name="projectScope" rows={4} placeholder="ENCRYPTED_MESSAGE..." className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#00E5FF] transition-colors resize-none" />
                  </div>

                  <div className="space-y-4">
                    <button
                      disabled={uplinkStatus === "SENDING"}
                      className="w-full bg-[#FF6B00] text-black py-5 font-black text-xs uppercase hover:bg-white transition-all shadow-[0_0_20px_rgba(255,107,0,0.2)] disabled:opacity-50"
                    >
                      {uplinkStatus === "SENDING" ? "establishing uplink..." : "Execute Transmission"}
                    </button>

                    {uplinkStatus !== "IDLE" && (
                      <div className={`text-[10px] font-bold uppercase tracking-widest text-center mt-4 p-3 border animate-in fade-in slide-in-from-top-2 duration-500 ${uplinkStatus === 'SUCCESS' ? 'border-green-500/20 text-green-400 bg-green-500/10' : 'border-red-500/20 text-red-500 bg-red-500/10'}`}>
                        {uplinkMessage}
                      </div>
                    )}
                  </div>

                  <p className="text-[9px] text-white/20 uppercase tracking-widest text-center mt-6">
                    Secure end-to-end node encryption active.
                  </p>
                </form>
              </BentoCard>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </div>
  );
}

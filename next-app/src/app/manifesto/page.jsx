"use client";

import React, { useState } from 'react';
import { Hash, Send, Shield } from 'lucide-react';
import { BentoCard } from '@/components/ui/BentoCard';
import { callGemini } from '@/lib/gemini';

export default function ManifestoPage() {
  const [manifestoQuery, setManifestoQuery] = useState("");
  const [manifestoResponse, setManifestoResponse] = useState("");

  const handleManifestoAsk = async () => {
    setManifestoResponse("SYNCING...");
    try {
      const res = await callGemini(manifestoQuery, "You are the collective consciousness of GarudaNest. Answer in cryptic, high-status Gen-Z tech terms. Short and sharp.");
      setManifestoResponse(res);
    } catch (err) {
      setManifestoResponse("NODE_OFFLINE");
    }
  };

  return (
    <div className="pt-32 pb-20 bg-black">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          <div className="space-y-16">
            <div className="relative group pt-16 md:pt-20">
              <span className="absolute -top-3 left-0 text-[#FF6B00] opacity-[0.06] font-sync font-bold text-4xl md:text-8xl uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
                Core Philosophy
              </span>

              <h2 className="relative z-10 text-4xl md:text-7xl font-sync font-bold uppercase tracking-tighter text-white leading-none">
                The <span className="text-[#FF6B00]">Code</span> Is Law
              </h2>
              
              <p className="max-w-md mt-6 text-slate-400 text-xs md:text-sm uppercase tracking-widest leading-relaxed font-medium">
                Our engineering philosophy and commitment to velocity.
              </p>

              <div className="h-[2px] w-16 bg-[#FF6B00] mt-8 opacity-40"></div>
            </div>

            <div className="space-y-12">
              {[
                { id: "01", t: "radical transparency", d: "You see the code as we write it. Daily git pushes. No black boxes." },
                { id: "02", t: "architectural grit", d: "We don't do templates. Every line is custom-engineered for specific scale." },
                { id: "03", t: "velocity over comfort", d: "We ship at 10x speed by stripping away unnecessary middle-management." },
              ].map(item => (
                <div key={item.id} className="group relative">
                  <span className="absolute -left-10 top-0 text-[#FF6B00] text-xs font-bold opacity-30 group-hover:opacity-100">{item.id}</span>
                  <h4 className="text-2xl font-bold uppercase tracking-tighter group-hover:text-[#00E5FF] transition-colors mb-3 font-sync">{item.t}</h4>
                  <p className="text-slate-500 text-[10px] uppercase leading-loose max-w-sm">{item.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 border-l-4 border-[#00E5FF] p-8 bg-white/5 backdrop-blur-md">
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
                  className="bg-transparent border-b border-white/10 py-3 text-xs outline-none focus:border-[#FF6B00] font-mono whitespace-nowrap overflow-hidden text-ellipsis uppercase tracking-widest"
                />
                <button onClick={handleManifestoAsk} className="self-end p-4 bg-white/5 hover:bg-[#FF6B00] hover:text-black transition-all rounded-full">
                  <Send size={18} />
                </button>
              </div>
              {manifestoResponse && (
                <div className="mt-8 p-6 bg-black/40 border border-white/5 text-[10px] text-[#00E5FF] font-mono uppercase leading-relaxed animate-in fade-in zoom-in duration-500">
                  {manifestoResponse}
                </div>
              )}
            </div>
          </div>

          <div className="relative pt-10 lg:pt-20">
            <BentoCard className="p-8 md:p-12 sticky top-32">
              <div className="flex items-center gap-3 mb-8">
                 <Shield size={20} className="text-[#FF6B00]" />
                 <span className="text-xs font-bold uppercase tracking-[0.3em]">Establish_Uplink</span>
              </div>
              
              <div className="space-y-8">
                 <div className="space-y-2">
                   <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Secure_Ident</label>
                   <input required placeholder="ENTITY_NAME" className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#00E5FF] transition-colors" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Frequency</label>
                   <input required type="email" placeholder="EMAIL@PROTOCOL.COM" className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#00E5FF] transition-colors" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Transmission</label>
                   <textarea rows={4} placeholder="ENCRYPTED_MESSAGE..." className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#00E5FF] transition-colors resize-none" />
                 </div>
                 
                 <button className="w-full bg-[#FF6B00] text-black py-5 font-black text-xs uppercase hover:bg-white transition-all shadow-[0_0_20px_rgba(255,107,0,0.2)]">
                   Execute Transmission
                 </button>
                 
                 <p className="text-[9px] text-white/20 uppercase tracking-widest text-center mt-6">
                   Secure end-to-end node encryption active.
                 </p>
              </div>
            </BentoCard>
          </div>
        </div>
      </div>
    </div>
  );
}

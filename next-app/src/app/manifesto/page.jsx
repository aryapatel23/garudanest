"use client";

import React, { useState } from 'react';
import { Hash, Send } from 'lucide-react';
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
          <div>
            <div className="relative group mb-16 md:mb-24 pt-16 md:pt-20">
              {/* Architectural 3D Layers (Shifted Up for 'Half Visible' look) */}
              <span
                className="absolute -top-6 -right-2 md:-top-16 md:-right-4 font-sync font-black text-6xl md:text-8xl uppercase tracking-tighter select-none pointer-events-none leading-none whitespace-nowrap opacity-[0.02] text-white"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)', textStroke: '1px rgba(255,255,255,0.1)', color: 'transparent' }}
              >
                THE CODE IS LAW
              </span>
              <span className="absolute -top-3 -right-1 md:-top-8 md:-right-2 text-[#FF6B00] opacity-[0.06] font-sync font-black text-6xl md:text-8xl uppercase tracking-tighter select-none pointer-events-none leading-none whitespace-nowrap">
                THE CODE IS LAW
              </span>

              <h2 className="relative z-10 text-6xl md:text-8xl font-sync font-black leading-none uppercase text-white">
                THE <br /> <span className="text-[#FF6B00]">CODE</span> <br /> IS LAW
              </h2>

              <div className="h-[2px] w-16 bg-[#FF6B00] mt-6 md:mt-8 opacity-40"></div>
            </div>

            <div className="mt-10 md:mt-20 border-l-4 border-[#00E5FF] p-6 md:p-10 bg-white/5 backdrop-blur-md">
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
                  className="bg-transparent border-b border-white/10 py-3 text-sm outline-none focus:border-[#FF6B00] font-mono whitespace-nowrap overflow-hidden text-ellipsis"
                />
                <button onClick={handleManifestoAsk} className="self-end p-4 bg-white/5 hover:bg-[#FF6B00] hover:text-black transition-all rounded-full">
                  <Send size={20} />
                </button>
              </div>
              {manifestoResponse && (
                <div className="mt-10 p-6 bg-black/40 border border-white/5 text-[11px] text-[#00E5FF] font-mono uppercase leading-relaxed animate-in fade-in zoom-in duration-500">
                  {manifestoResponse}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-12 md:space-y-16">
            {[
              { id: "01", t: "radical transparency", d: "You see the code as we write it. Daily git pushes. No black boxes." },
              { id: "02", t: "architectural grit", d: "We don't do templates. Every line is custom-engineered for specific scale." },
              { id: "03", t: "velocity over comfort", d: "We ship at 10x speed by stripping away unnecessary middle-management." },
            ].map(item => (
              <div key={item.id} className="group relative">
                <span className="absolute -left-10 top-0 text-[#FF6B00] text-xs font-bold opacity-30 group-hover:opacity-100">{item.id}</span>
                <h4 className="text-3xl font-bold uppercase tracking-tighter group-hover:text-[#00E5FF] transition-colors mb-4 font-sync">{item.t}</h4>
                <p className="text-slate-500 text-sm uppercase leading-loose">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

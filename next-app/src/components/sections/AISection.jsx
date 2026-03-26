"use client";

import React, { useState } from 'react';
import { Cpu, Loader2, Sparkles } from 'lucide-react';
import { BentoCard } from '@/components/ui/BentoCard';
import { callGemini } from '@/lib/gemini';

export const AISection = () => {
  const [aiIdea, setAiIdea] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleBrainstorm = async () => {
    setIsAiLoading(true);
    try {
      const sysPrompt = "You are the head architect at GarudaNest. A client provides a project idea. Provide a technical blueprint, tech stack, and a 'killer feature'. Tone: Gen-Z tech, sharp, aggressive, no fluff.";
      const res = await callGemini(`Brainstorm this idea: ${aiIdea}`, sysPrompt);
      setAiResult(res);
    } catch (err) {
      setAiResult("System error. Connection lost.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <section className="py-40 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
          <div className="mb-20">
              <h2 className="text-4xl md:text-6xl font-sync font-bold uppercase tracking-tighter relative z-10">
                 SPARK YOUR <br/> NEXT <span className="text-[#FF6B00]">IDE4</span>
              </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8 bg-black/40 p-10 border border-white/5 backdrop-blur-xl">
                  <div className="flex items-center gap-4 text-[#00E5FF] mb-4">
                      <Cpu size={20} />
                      <span className="text-xs font-bold uppercase tracking-widest">Input Raw Vision</span>
                  </div>
                  <textarea 
                      value={aiIdea}
                      onChange={(e) => setAiIdea(e.target.value)}
                      placeholder="Describe your impossible project..."
                      className="w-full bg-transparent border-b border-white/10 p-2 text-lg font-mono focus:border-[#FF6B00] outline-none min-h-[120px] transition-all resize-none"
                  />
                  <button 
                      onClick={handleBrainstorm}
                      disabled={isAiLoading}
                      className="w-full bg-[#FF6B00] text-black py-5 font-black text-xs uppercase flex items-center justify-center gap-4 hover:bg-[#00E5FF] transition-all disabled:opacity-50"
                  >
                      {isAiLoading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                      {isAiLoading ? "ARCHITECTING..." : "GENERATE BLUEPRINT"}
                  </button>
              </div>

              <BentoCard className={`p-10 min-h-[400px] border-l-4 border-l-[#FF6B00] flex flex-col transition-all duration-700 ${aiResult ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                      <span className="text-[10px] uppercase font-bold text-[#FF6B00]">Output Stream // 0xAF4</span>
                  </div>
                  {aiResult ? (
                      <div className="font-mono text-xs leading-relaxed whitespace-pre-wrap text-slate-300">
                          {aiResult}
                      </div>
                  ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-slate-700 uppercase font-bold text-center gap-4">
                          <div className="w-16 h-16 border-2 border-dashed border-white/10 rounded-full animate-spin"></div>
                          Waiting for neural input...
                      </div>
                  )}
              </BentoCard>
          </div>
      </div>
    </section>
  );
};

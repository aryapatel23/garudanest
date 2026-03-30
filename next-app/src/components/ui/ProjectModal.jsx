"use client";

import React from 'react';
import { X, ArrowRight, ChevronRight, Play } from 'lucide-react';

export const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-500 shadow-[2xl] shadow-black/80">
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:p-10 border-b border-white/5 bg-[#0d0d0d] z-20">
           <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-[1px] w-8 bg-[#FF6B00]" />
                <span className="text-[9px] font-mono text-[#FF6B00] uppercase tracking-[0.4em]">Project_Dossier_Extracted</span>
              </div>
              <h2 className="text-2xl md:text-5xl font-sync font-bold uppercase tracking-tighter text-white">
                {project.title}
              </h2>
           </div>
           <button 
             onClick={onClose}
             className="p-4 hover:bg-white/5 text-white/40 hover:text-white transition-all border border-white/5 rounded-full"
           >
             <X size={24} />
           </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-16 scrollbar-hide">
          <div className="max-w-3xl space-y-12 md:space-y-20">
            
            {/* Hero / Overview */}
            <section tabIndex="0">
               <p className="text-[9px] font-mono text-[#00E5FF] uppercase tracking-[0.6em] mb-6">01_Overview</p>
               
               <h3 className="text-xl md:text-3xl font-sync font-bold uppercase text-white/90 mb-6 italic">
                 "{project.fullDescription?.tagline || project.s}"
               </h3>
               <p className="text-sm md:text-lg text-slate-400 leading-relaxed uppercase tracking-wide">
                 {project.fullDescription?.hero || "Detailed architecture report for " + project.title}
               </p>
            </section>

            {/* Features Grid */}
            {project.fullDescription?.features && (
              <section>
                <p className="text-[9px] font-mono text-[#00E5FF] uppercase tracking-[0.6em] mb-8">02_Tactical_Features</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {project.fullDescription.features.map((f) => (
                     <div key={f.t} className="p-6 border border-white/5 bg-white/[0.02] group hover:bg-white/[0.04] transition-all">
                        <h4 className="text-sm font-bold uppercase mb-2 text-[#FF6B00] group-hover:text-white transition-colors">{f.t}</h4>
                        <p className="text-[10px] text-slate-500 uppercase leading-loose tracking-wider">{f.d}</p>
                     </div>
                   ))}
                </div>
              </section>
            )}

            {/* Technical Stack & Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
               {project.fullDescription?.architecture && (
                 <section>
                    <p className="text-[9px] font-mono text-[#00E5FF] uppercase tracking-[0.6em] mb-8">03_Architecture</p>
                    <ul className="space-y-4">
                       {project.fullDescription.architecture.map((a) => (
                         <li key={a} className="text-[10px] text-white/70 font-mono uppercase tracking-wider flex items-center gap-4">
                            <div className="w-1.5 h-[1px] bg-[#FF6B00]" /> {a}
                         </li>
                       ))}
                    </ul>
                 </section>
               )}

               <section>
                  <p className="text-[9px] font-mono text-[#00E5FF] uppercase tracking-[0.6em] mb-8">04_Tech_Stack</p>
                  <div className="flex flex-wrap gap-3">
                     {project.stack.map((t) => (
                       <span key={t} className="px-4 py-2 border border-white/10 text-white/40 text-[9px] font-mono uppercase hover:border-[#FF6B00]/40 transition-colors">
                          {t}
                       </span>
                     ))}
                     {project.fullDescription?.techStack?.map((t) => (
                       <span key={t} className="px-4 py-2 border border-white/10 text-white/40 text-[9px] font-mono uppercase hover:border-[#00E5FF]/40 transition-colors">
                          {t}
                       </span>
                     ))}
                  </div>
               </section>
            </div>

            {/* Actions */}
            <div className="pt-10 flex flex-wrap gap-6 border-t border-white/5">
                {project.playStore && (
                  <a href={project.playStore} target="_blank" rel="noopener noreferrer" className="px-8 md:px-10 py-4 md:py-5 bg-[#FF6B00] text-black font-black uppercase text-xs tracking-widest hover:bg-white transition-all flex items-center gap-4 group">
                    Live Market Access <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </a>
                )}
                {project.video && (
                  <a href={project.video} target="_blank" rel="noopener noreferrer" className="px-8 md:px-10 py-4 md:py-5 border border-white/10 text-white font-bold uppercase text-xs tracking-widest hover:border-white/30 transition-all flex items-center gap-4 group">
                    Technical Demo <Play size={14} className="text-[#FF6B00] group-hover:scale-125 transition-transform" />
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-8 md:px-10 py-4 md:py-5 border border-white/10 text-white/40 font-bold uppercase text-xs tracking-widest hover:border-white/30 transition-all flex items-center gap-4 hover:text-white group">
                    Dossier Repo <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="p-4 bg-black/40 flex justify-between items-center border-t border-white/5 md:px-10">
           <span className="text-[8px] font-mono text-white/10 tracking-[1em] uppercase">Security_Protocol_Active // End_Of_Briefing</span>
           <div className="flex gap-1">
              {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-[#FF6B00] rounded-full animate-pulse" style={{animationDelay: `${i*200}ms`}} />)}
           </div>
        </div>
      </div>
    </div>
  );
};

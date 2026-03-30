"use client";

import React, { useRef, useState } from 'react';
import { projects } from '@/lib/constants';
import { ArrowRight, ChevronRight, X } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ProjectModal } from '@/components/ui/ProjectModal';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function WorkPage() {
  const container = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useGSAP(() => {
    // ── Header stagger timeline ────────────────────────────────────────────
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo('.work-ghost',
        { x: -80, autoAlpha: 0 },
        { x: 0, autoAlpha: 0.06, duration: 1.4 }
      )
      .fromTo('.work-title',
        { y: 60, autoAlpha: 0, filter: 'blur(10px)' },
        { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1.4 },
        '-=1.0'
      )
      .fromTo('.work-sub',
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1.2 },
        '-=0.8'
      )
      .fromTo('.work-line',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.0 },
        '-=0.6'
      );

    // ── Per-card scroll-scrub parallax + clip-path reveal ─────────────────
    gsap.utils.toArray('.work-card').forEach((card, i) => {
      // Cinematic clip-path curtain sweep
      gsap.fromTo(card,
        { clipPath: 'inset(100% 0% 0% 0%)', y: 40 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          duration: 1.2,
          ease: 'power4.inOut',
          delay: (i % 2) * 0.15,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
        }
      );

      // Result accent bar width animation
      const bar = card.querySelector('.result-bar');
      if (bar) {
        gsap.fromTo(bar,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }

      // 3D tilt on mouse move
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        gsap.to(card, {
          rotationY: dx * 8,
          rotationX: -dy * 6,
          transformPerspective: 900,
          ease: 'power3.out',
          duration: 0.5,
        });
      };

      const onLeave = () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.5)',
        });
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });

  }, { scope: container });

  return (
    <div ref={container} className="pt-32 pb-20 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">

        {/* ── PAGE HEADER ── */}
        <div className="relative group mb-16 md:mb-24 pt-12 md:pt-16 overflow-hidden md:overflow-visible">
          <span className="work-ghost absolute -top-3 left-0 text-[#FF6B00] opacity-[0.06] font-sync font-bold text-4xl md:text-8xl uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
            Elite Portfolio
          </span>

          <h2 className="work-title relative z-10 text-4xl md:text-7xl font-sync font-bold uppercase tracking-tighter text-white leading-none">
            Projects That <span className="text-[#FF6B00]">Soared</span>
          </h2>

          <p className="work-sub max-w-2xl mt-6 text-slate-400 text-xs md:text-sm uppercase tracking-widest leading-relaxed font-medium">
            Elite engineering outcomes delivered for high-growth technical teams.
          </p>

          <div className="work-line h-[2px] w-16 bg-[#FF6B00] mt-8 opacity-40 origin-left"></div>
        </div>

        {/* ── PROJECT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 md:px-0">
          {projects.map((project, index) => (
            <div
              key={project.title}
              onClick={() => setSelectedProject(project)}
              className="work-card bg-[#0a0a0a] border border-white/5 flex flex-col overflow-hidden group hover:border-[#FF6B00]/30 transition-colors duration-500 will-change-transform cursor-pointer"
              style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            >
              {/* Card Header & Content */}
              <div className="p-8 md:p-10 border-b border-white/5 flex-grow relative">

                {/* Scan-line shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,107,0,0.015) 2px, rgba(255,107,0,0.015) 4px)'
                  }}
                />

                {/* Index badge */}
                <div className="absolute top-6 right-6 text-[9px] font-mono text-white/10 uppercase tracking-widest select-none">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono border border-[#00E5FF]/40 text-[#00E5FF] px-2.5 py-1 uppercase tracking-wider bg-[#00E5FF]/5 group-hover:border-[#00E5FF]/70 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Title */}
                <h3 className="text-2xl md:text-4xl font-sync font-bold uppercase mb-6 tracking-tighter leading-tight text-white group-hover:text-[#FF6B00] transition-colors duration-500">
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

                {/* Result Block */}
                <div className="relative bg-[#FF6B00]/5 border-l-2 border-[#FF6B00] p-4 md:p-5 mb-2 overflow-hidden">
                  {/* Animated accent bar sweep */}
                  <div className="result-bar absolute inset-0 bg-[#FF6B00]/5 origin-left" />
                  <p className="relative text-xs md:text-[12px] text-white font-bold uppercase tracking-widest leading-none">
                    {project.r}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="bg-[#0d0d0d] p-5 md:p-6 flex justify-between items-center group-hover:bg-[#111] transition-colors relative overflow-hidden">
                {/* Footer glow line on hover */}
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-[#FF6B00] to-[#00E5FF] group-hover:w-full transition-all duration-700" />

                <div className="flex gap-8 relative z-20">
                  {project.playStore ? (
                    <a 
                      href={project.playStore} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => { e.stopPropagation(); }}
                      className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#00E5FF] hover:text-white transition-colors flex items-center gap-2 group/link"
                    >
                      Live <ArrowRight size={10} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  ) : project.live ? (
                    <a 
                      href={project.live} 
                      onClick={(e) => { e.stopPropagation(); }}
                      className="text-[10px] uppercase font-bold tracking-[0.3em] text-white hover:text-[#00E5FF] transition-colors flex items-center gap-2 group/link"
                    >
                      Live Demo <ArrowRight size={10} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  ) : null}

                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => { e.stopPropagation(); }}
                      className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40 hover:text-white transition-colors flex items-center gap-2 group/link"
                    >
                      Github <ArrowRight size={10} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] text-[#FF6B00] uppercase font-bold tracking-widest">View Intel</span>
                  <ChevronRight size={12} className="text-[#FF6B00]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

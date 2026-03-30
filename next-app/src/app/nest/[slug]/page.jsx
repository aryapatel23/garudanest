"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { teamMembers } from '@/lib/constants';
import { X as CloseIcon, Terminal, ShieldAlert, Cpu, Network, ExternalLink } from 'lucide-react'; 

// Custom SVG Icons for maximum reliability and aesthetic control
const GithubIcon = ({ size = 18, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

const LinkedinIcon = ({ size = 18, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

const XIcon = ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
);

const MailIcon = ({ size = 14, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

export default function PersonnelPage() {
    const params = useParams();
    const router = useRouter();
    const [member, setMember] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    
    // JS Scroll tracking to artificially stop the 'fixed' column before the footer
    const rightColRef = useRef(null);
    const [scrollOffset, setScrollOffset] = useState(0);

    useEffect(() => {
        const found = teamMembers.find(m => m.slug === params.slug);
        if (found) {
            setMember(found);
            setTimeout(() => setIsLoaded(true), 100);
        } else {
            router.push('/nest');
        }
    }, [params.slug, router]);

    // Handle scroll to pin image up when footer enters viewport natively
    useEffect(() => {
        const handleScroll = () => {
            if (!rightColRef.current) return;
            const rightCol = rightColRef.current;
            const rect = rightCol.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // If the bottom of the right column is visible in the viewport
            if (rect.bottom < viewportHeight) {
                // Shift the fixed left column up by exactly the amount the right column has scrolled away
                setScrollOffset(viewportHeight - rect.bottom);
            } else {
                setScrollOffset(0);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!member) return <div className="min-h-screen bg-black" />;

    const generateActivityMap = () => {
        return Array.from({ length: 60 }).map((_, i) => (
            <div 
                key={i} 
                className="w-full pt-[100%] rounded-sm transition-all duration-1000"
                style={{ 
                    backgroundColor: Math.random() > 0.4 ? 'rgba(0, 229, 255, 0.02)' : `rgba(0, 229, 255, ${Math.random() * 0.5 + 0.1})`,
                    transitionDelay: `${i * 15}ms`
                }}
            />
        ));
    };

    return (
        <div className="min-h-screen bg-[#050505] font-space text-white relative selection:bg-[#00E5FF] selection:text-black pt-24">
            
            {/* IMMERSIVE DIAGNOSTIC BACKDROP */}
            <div className={`fixed inset-0 opacity-[0.03] transition-opacity duration-[3s] pointer-events-none z-0 ${isLoaded ? 'opacity-[0.03]' : 'opacity-0'}`} style={{ backgroundImage: 'radial-gradient(#00E5FF 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            
            {/* LEFT COLLUMN: JS-SYNCED FIXED PORTRAIT (Never overlaps footer) */}
            <div 
                className="relative md:fixed md:top-0 md:left-0 w-full md:w-1/2 h-[60vh] md:h-screen z-10 overflow-hidden"
                style={{ transform: `translateY(-${scrollOffset}px)` }}
            >
                <div className={`relative w-full h-full bg-black border-r border-white/5 transition-transform duration-[1.5s] ease-out ${isLoaded ? 'translate-x-0' : '-translate-x-[100%]'}`}>
                    <img 
                        src={member.image} 
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover object-center grayscale opacity-80"
                    />
                    
                    {/* Simulated scanning laser line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00E5FF] shadow-[0_0_20px_#00E5FF] opacity-50 animate-[scan_6s_ease-in-out_infinite] pointer-events-none" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/80 pointer-events-none"></div>

                    {/* Left overlay data */}
                    <div className="absolute bottom-12 left-6 md:left-12 z-20 pointer-events-none">
                        <span className="text-[80px] md:text-[140px] xl:text-[180px] font-sync font-bold text-transparent font-outline-2 opacity-20 uppercase tracking-tighter leading-none block -mb-6 md:-mb-8">
                            {member.slug.split('-')[0]}
                        </span>
                        <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 w-max mt-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF57] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF57]"></span>
                            </span>
                            <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">Biometrics_Sync: Stable</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT COLLUMN: SCROLLING TERMINAL DATA */}
            <div 
                ref={rightColRef}
                className={`relative w-full md:w-1/2 md:ml-[50%] p-8 md:p-12 lg:p-24 bg-[#0a0a0a] min-h-[calc(100vh-96px)] transition-all duration-[1.5s] ease-out z-10 border-t md:border-t-0 md:border-l border-white/5 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            >
                
                {/* Cross Button Moved to the Right Side */}
                <button 
                    onClick={() => router.back()}
                    className="absolute top-6 right-6 md:top-12 md:right-12 z-[100] flex items-center justify-center w-12 h-12 text-white/70 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 bg-black/80 backdrop-blur-xl border border-white/10 rounded-sm transition-all duration-500 group shadow-[0_4px_30px_rgba(0,0,0,0.5)] cursor-pointer hover:rotate-90 hover:bg-black"
                >
                    <CloseIcon size={20} className="transition-transform group-hover:scale-110" />
                </button>

                {/* Header Data */}
                <div className="flex flex-wrap items-center gap-3 mb-8 pr-16 md:pr-24">
                    <Terminal size={14} className="text-[#00E5FF]" />
                    <span className="text-[10px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-3 py-1 border border-[#00E5FF]/20 uppercase tracking-widest break-all">
                        Auth: Tier_1
                    </span>
                    <span className="text-[10px] font-mono text-[#FF6B00] border border-[#FF6B00]/30 px-3 py-1 bg-[#FF6B00]/5 uppercase tracking-widest break-all">
                        {member.role}_Specialist
                    </span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-sync font-bold uppercase tracking-tighter mb-4 leading-[0.9]">{member.name}</h1>
                <div className="h-[2px] w-16 bg-[#FF6B00] mb-8"></div>

                {/* Communications Hub */}
                <div className="flex items-center gap-6 mb-12">
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#00E5FF] transition-colors group">
                        <GithubIcon className="group-hover:scale-110 transition-transform" />
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#00E5FF] transition-colors group">
                        <LinkedinIcon className="group-hover:scale-110 transition-transform" />
                    </a>
                    <a href={member.x} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#00E5FF] transition-colors group p-0.5">
                        <XIcon className="group-hover:scale-110 transition-transform" />
                    </a>
                    <div className="w-[1px] h-4 bg-white/10" />
                    <a href={`mailto:${member.email}`} className="text-[10px] font-mono text-white/40 hover:text-[#00FF57] uppercase tracking-widest transition-colors flex items-center gap-2">
                        <MailIcon /> Send_Signal
                    </a>
                </div>

                <p className="text-sm md:text-base text-slate-400 uppercase leading-[2] tracking-widest font-medium max-w-xl mb-16">
                    {member.longBio || member.bio}
                </p>

                {/* Operational Matrix Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16">
                    
                    {/* Core Competencies */}
                    <div className="bg-[#050505] border border-white/5 p-8 relative overflow-hidden group hover:border-[#00E5FF]/30 transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-[#00E5FF]/10 transition-colors"></div>
                        <Cpu size={16} className="text-[#00E5FF] mb-6" />
                        <h4 className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em] mb-4">System_Integration</h4>
                        <div className="flex flex-col gap-3">
                            {member.tags.map(tag => (
                                <div key={tag} className="flex items-center justify-between border-b border-white/5 pb-2">
                                    <span className="text-[11px] font-mono text-white tracking-widest uppercase">{tag}</span>
                                    <span className="text-[8px] font-mono text-[#00FF57] uppercase tracking-widest">100%_SYNCHED</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Deployments Heatmap */}
                    <div className="bg-[#050505] border border-white/5 p-8 relative overflow-hidden group hover:border-[#FF6B00]/30 transition-colors">
                        <Network size={16} className="text-[#FF6B00] mb-6" />
                        <h4 className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em] mb-4">Deployment_Velocity (30D)</h4>
                        <div className="grid grid-cols-10 gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                            {generateActivityMap()}
                        </div>
                        <span className="block mt-4 text-right text-[8px] font-mono text-white/30 uppercase tracking-[0.3em]">Log.Activity // Live</span>
                    </div>

                </div>

                {/* Primary Action Nodes */}
                <div className="flex flex-col sm:flex-row gap-4 mb-20">
                    <a 
                        href={member.portfolio} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 group flex items-center justify-between px-6 py-4 bg-white/[0.03] border border-white/10 hover:border-[#00E5FF]/40 transition-all duration-500 hover:bg-[#00E5FF]/5"
                    >
                        <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em] group-hover:text-[#00E5FF]">Deploy_Portfolio_Link</span>
                        <ExternalLink size={14} className="text-white/40 group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all" />
                    </a>
                </div>

                {/* Clearance Diagnostics */}
                <div className="pt-12 border-t border-white/5">
                    <div className="flex items-center gap-2 mb-6">
                        <ShieldAlert size={14} className="text-[#FF6B00]" />
                        <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-[0.4em]">Clearance_Overrides</span>
                    </div>
                    <div className="bg-black border border-white/10 p-6 flex flex-col xl:flex-row justify-between gap-6 xl:items-center">
                        <div>
                            <span className="text-[8px] font-mono text-white/30 block mb-1">Architecture Read/Write</span>
                            <span className="text-[10px] font-mono text-white tracking-[0.3em]">GRANTED</span>
                        </div>
                        <div className="w-[1px] h-8 bg-white/5 hidden xl:block"></div>
                        <div>
                            <span className="text-[8px] font-mono text-white/30 block mb-1">Production Databases</span>
                            <span className="text-[10px] font-mono text-white tracking-[0.3em]">GRANTED</span>
                        </div>
                        <div className="w-[1px] h-8 bg-white/5 hidden xl:block"></div>
                        <div>
                            <span className="text-[8px] font-mono text-white/30 block mb-1">Client Comm_Link</span>
                            <span className="text-[10px] font-mono text-[#00E5FF] tracking-[0.3em]">DIRECT_ACCESS</span>
                        </div>
                    </div>
                </div>

                <div className="h-32"></div> {/* Spacer */}
            </div>

            {/* Custom Scanline CSS */}
            <style jsx global>{`
                @keyframes scan {
                    0% { top: -5%; opacity: 0; }
                    10% { opacity: 0.5; }
                    50% { opacity: 0.8; }
                    90% { opacity: 0.5; }
                    100% { top: 105%; opacity: 0; }
                }
                .font-outline-2 {
                    -webkit-text-stroke: 2px rgba(255,255,255,0.2);
                }
            `}</style>
        </div>
    );
}

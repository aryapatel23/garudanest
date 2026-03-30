"use client";

import React from 'react';
import { Twitter, Instagram, Linkedin } from 'lucide-react';
import { GarudaLogo } from '@/components/ui/GarudaLogo';

const BRAND = {
  name: "garudanest",
  email: "teamgarudanest@gmail.com",
  social: {
    instagram: "https://www.instagram.com/teamgarudanest/",
    twitter: "https://x.com/teamgarudanest",
    linkedin: "https://www.linkedin.com/in/teamgarudanest/"
  }
};

const TwitterIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

export const Footer = () => (
  <footer id="contact" className="pt-32 md:pt-60 pb-10 px-6 bg-[#050505] relative overflow-hidden">
    <div className="absolute bottom-0 right-0 opacity-[0.03] translate-x-1/4 translate-y-1/4">
        <GarudaLogo className="w-[150vw] md:w-[100vw] h-[150vw] md:h-[100vw]" />
    </div>
    
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-16 md:gap-20 mb-20 md:mb-40">
        <h2 className="text-[15vw] sm:text-[12vw] font-sync font-black tracking-tighter leading-none italic uppercase group text-center md:text-left">
          LET'S <br className="md:hidden" /> <span className="text-[#FF6B00] group-hover:text-[#00E5FF] transition-colors duration-1000">F***ING</span> <br /> BUILD.
        </h2>
        <div className="flex flex-col gap-6 w-full md:w-auto text-center md:text-left items-center md:items-start">
          <span className="text-[10px] text-[#FF6B00] font-bold tracking-[0.5em] uppercase">Initialize Connection</span>
          <a href={`mailto:${BRAND.email}`} className="text-xl sm:text-2xl md:text-4xl font-bold border-b-2 border-[#00E5FF] pb-4 hover:tracking-widest transition-all uppercase font-sync break-all px-4 sm:px-0">
            {BRAND.email}
          </a>
          <div className="flex gap-8 mt-6 justify-center md:justify-start">
            <a href={BRAND.social.twitter} className="hover:text-[#FF6B00] transition-colors"><TwitterIcon size={24} /></a>
            <a href={BRAND.social.instagram} className="hover:text-[#FF6B00] transition-colors"><InstagramIcon size={24} /></a>
            <a href={BRAND.social.linkedin} className="hover:text-[#FF6B00] transition-colors"><LinkedinIcon size={24} /></a>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 text-[9px] text-white/20 uppercase tracking-[0.3em] md:tracking-[0.5em] font-bold gap-4 text-center">
        <span>MADE BY <span className="text-white">ARYA PATEL</span> // GARUDANEST COLLECTIVE</span>
        <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> 
            EST. 2026 // VERSION 2.1.0
        </span>
      </div>
    </div>
  </footer>
);
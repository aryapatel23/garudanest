"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { GarudaLogo } from '@/components/ui/GarudaLogo';

const navLinks = [
  { label: "about", href: "/about" },
  { label: "work", href: "/work" },
  { label: "process", href: "/process" },
  { label: "nest", href: "/nest" },
  { label: "studio", href: "/studio" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [ctaLabel, setCtaLabel] = useState("manifesto");
  const [isHovered, setIsHovered] = useState(false);
  
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  // Mobile Ticker for Manifesto button
  useEffect(() => {
    if (isHovered) return; // Don't tick if mouse is hovering on desktop
    
    const interval = setInterval(() => {
      setCtaLabel(prev => prev === "manifesto" ? "reach us" : "manifesto");
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isHovered]);

  // Handle desktop hover specifically
  const handleCtaHover = (hovering) => {
    setIsHovered(hovering);
    if (hovering) {
      setCtaLabel("reach us");
    } else {
      // Small delay on exit feels smoother
      setTimeout(() => setCtaLabel("manifesto"), 100);
    }
  };

  // Reset nav state on every page navigation
  useEffect(() => {
    const scrollY = window.scrollY;
    lastScrollY.current = scrollY;
    setIsScrolled(scrollY > 80);
    setIsVisible(true);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY.current || currentScrollY < 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsVisible(false);
        setMobileMenuOpen(false);
      }

      setIsScrolled(currentScrollY > 80);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={[
          "fixed top-0 left-0 right-0 z-[80]",
          "px-6 md:px-10 py-5 md:py-6",
          "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isScrolled
            ? "bg-[#050505]/70 backdrop-blur-2xl shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
            : "bg-gradient-to-b from-black/60 via-black/20 to-transparent",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <GarudaLogo 
              animated={true} 
              glow={true}
              className="w-8 h-8 md:w-10 md:h-10 text-[#FF6B00] drop-shadow-[0_0_6px_rgba(255,107,0,0.3)] transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(255,107,0,0.5)]" 
            />
            <span className="font-sync font-bold text-xs md:text-base tracking-[0.12em] uppercase text-white group-hover:text-[#00E5FF] transition-all duration-300">
              garudanest
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-white/80 hover:text-[#00E5FF] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-0 after:bg-[#00E5FF] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 ml-4">
              <Link href="/hire" className="border border-white/20 px-6 py-2.5 hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all duration-300 bg-white/5 backdrop-blur-sm">
                hire us
              </Link>
              <Link 
                href="/manifesto" 
                onMouseEnter={() => handleCtaHover(true)}
                onMouseLeave={() => handleCtaHover(false)}
                className="bg-white text-black px-8 py-2.5 hover:bg-[#FF6B00] transition-all duration-500 font-black shadow-[0_0_20px_rgba(255,107,0,0.1)] min-w-[160px] text-center relative overflow-hidden group"
              >
                <span className={`block transition-all duration-300 ${isHovered ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}>
                   {ctaLabel === "manifesto" ? "manifesto" : "manifesto"}
                </span>
                <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
                   reach us
                </span>
              </Link>
            </div>
          </div>

          <button
            className="md:hidden text-white p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={[
          "fixed top-[72px] left-4 right-4 z-[85] md:hidden",
          "bg-[#080808]/95 backdrop-blur-2xl",
          "border border-white/10 rounded-2xl shadow-2xl",
          "overflow-hidden",
          "transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]",
          mobileMenuOpen ? "max-h-[600px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <div className="flex flex-col gap-0 p-6 text-[11px] uppercase font-bold tracking-[0.3em]">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-4 border-b border-white/5 hover:text-[#00E5FF] hover:pl-2 transition-all duration-200"
              style={{ transitionDelay: mobileMenuOpen ? `${i * 40}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-5">
            <Link
              href="/hire"
              onClick={() => setMobileMenuOpen(false)}
              className="border border-[#00E5FF]/30 text-[#00E5FF] px-4 py-4 text-center rounded-lg hover:bg-[#00E5FF]/10 transition-all font-bold"
            >
              hire us
            </Link>
            <Link
              href="/manifesto"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[#FF6B00] text-black px-4 py-4 text-center rounded-lg font-black hover:bg-white transition-all flex flex-col items-center justify-center h-16 relative overflow-hidden"
            >
              <div className="relative h-full w-full flex flex-col items-center justify-center">
                 <span className={`absolute transition-all duration-700 ${ctaLabel === "manifesto" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>manifesto</span>
                 <span className={`absolute transition-all duration-700 ${ctaLabel === "reach us" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>reach us</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

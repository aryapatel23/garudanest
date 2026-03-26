"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { GarudaLogo } from '@/components/ui/GarudaLogo';

const navLinks = [
  { label: "home", href: "/" },
  { label: "work", href: "/work" },
  { label: "process", href: "/process" },
  { label: "nest", href: "/nest" },
  { label: "join", href: "/join" },
  { label: "manifesto", href: "/manifesto" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

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

      // Show/hide based on scroll direction
      if (currentScrollY < lastScrollY.current || currentScrollY < 80) {
        // Scrolling UP or near top → show
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Scrolling DOWN past threshold → hide
        setIsVisible(false);
        setMobileMenuOpen(false); // Close mobile menu on hide
      }

      // Backdrop blur once scrolled past 20px
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
          "px-6 md:px-10 py-5 md:py-6", // Consistent slim padding
          "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isScrolled
            ? "bg-[#050505]/70 backdrop-blur-2xl shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
            : "bg-gradient-to-b from-black/60 via-black/20 to-transparent",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <GarudaLogo 
              animated={true} 
              glow={true}
              className="w-10 h-10 text-[#FF6B00] drop-shadow-[0_0_6px_rgba(255,107,0,0.3)] transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(255,107,0,0.5)]" 
            />
            <span className="font-sync font-bold text-sm md:text-base tracking-[0.12em] uppercase text-white group-hover:text-[#00E5FF] transition-all duration-300">
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
              <Link href="/hire" className="border border-white/20 px-6 py-2.5 hover:border-[#FF6B00] hover:text-[#FF6B00] transition-all duration-300 bg-white/5 backdrop-blur-sm">
                hire us
              </Link>
              <Link href="/join" className="bg-[#FF6B00] text-black px-6 py-2.5 hover:bg-white transition-all duration-300 font-black shadow-[0_0_15px_rgba(255,107,0,0.3)]">
                join the nest
              </Link>
            </div>
          </div>
        </div>

        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
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
              className="border border-[#FF6B00]/50 text-[#FF6B00] px-4 py-4 text-center rounded-lg hover:bg-[#FF6B00]/10 transition-all"
            >
              hire us
            </Link>
            <Link
              href="/join"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[#FF6B00] text-black px-4 py-4 text-center rounded-lg font-black hover:bg-white transition-all"
            >
              join the nest
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

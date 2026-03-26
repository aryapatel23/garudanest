"use client";

import React, { useState } from 'react';
import Link from 'next/link';
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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[80] p-6 md:p-10 flex justify-between items-center mix-blend-difference">
        <Link href="/" className="flex items-center gap-3 group">
          <GarudaLogo className="w-8 h-8 text-[#FF6B00]" />
          <span className="font-sync font-bold text-sm tracking-tighter uppercase group-hover:text-[#00E5FF] transition-colors">garudanest</span>
        </Link>
        <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-[#00E5FF] transition-all">{link.label}</Link>
          ))}
          <Link href="/hire" className="border border-white/30 px-5 py-2 hover:border-[#FF6B00] transition-all">hire us</Link>
          <Link href="/join" className="bg-white text-black px-5 py-2 hover:bg-[#FF6B00] hover:text-white transition-all">join the nest</Link>
        </div>
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed top-24 left-6 right-6 z-[85] bg-black/95 backdrop-blur-2xl border border-white/10 p-8 md:hidden rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300">
          <div className="flex flex-col gap-6 text-[11px] uppercase font-bold tracking-[0.3em]">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className="hover:text-[#00E5FF] border-b border-white/5 pb-2">{link.label}</Link>
            ))}
            <Link href="/hire" onClick={() => setMobileMenuOpen(false)} className="mt-4 border border-[#FF6B00]/40 text-[#FF6B00] px-4 py-4 text-center rounded-lg">hire us</Link>
            <Link href="/join" onClick={() => setMobileMenuOpen(false)} className="bg-[#FF6B00] text-black px-4 py-4 text-center rounded-lg">join the nest</Link>
          </div>
        </div>
      )}
    </>
  );
};

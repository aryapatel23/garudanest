"use client";

import React, { useState, useEffect } from 'react';

export const AmbientUI = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const desktopPointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const touchLikeQuery = window.matchMedia('(hover: none), (pointer: coarse), (any-pointer: coarse), (max-width: 1279px)');

    const evaluateCursorMode = () => {
      const ua = navigator.userAgent || '';
      const isMobileOrTabletUA = /Android|iPhone|iPad|iPod|Tablet|Mobile|Silk|Kindle/i.test(ua);
      const isiPadDesktopMode = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
      const hasTouch = navigator.maxTouchPoints > 0;
      const enabled =
        desktopPointerQuery.matches &&
        !touchLikeQuery.matches &&
        window.innerWidth >= 1280 &&
        !isMobileOrTabletUA &&
        !isiPadDesktopMode &&
        !hasTouch;

      setShowCursor(enabled);
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(window.scrollY / (totalScroll || 1));
    };
    const handleMove = (e) => {
      if (!showCursor) return;
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    evaluateCursorMode();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('resize', evaluateCursorMode);
    desktopPointerQuery.addEventListener('change', evaluateCursorMode);
    touchLikeQuery.addEventListener('change', evaluateCursorMode);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('resize', evaluateCursorMode);
      desktopPointerQuery.removeEventListener('change', evaluateCursorMode);
      touchLikeQuery.removeEventListener('change', evaluateCursorMode);
    };
  }, [showCursor]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-cursor {
          width: 12px; height: 12px;
          background: #FF6B00;
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.15s ease-out;
          box-shadow: 0 0 20px #FF6B00;
        }
        .scanline {
          width: 100%; height: 100px;
          z-index: 999;
          background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0) 100%);
          opacity: 0.1;
          position: absolute;
          bottom: 100%;
          animation: scanline 8s linear infinite;
        }
        @keyframes scanline { to { bottom: -100px; } }
        .noise-bg {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: url('https://grainy-gradients.vercel.app/noise.svg');
          opacity: 0.05; pointer-events: none; z-index: 50;
        }
      `}} />

      <div className="noise-bg" />
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="scanline" />
      </div>

      {showCursor && (
        <div
          className="custom-cursor"
          style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)' }}
        />
      )}

      <div
        className="fixed bottom-0 left-0 h-1 bg-[#FF6B00] z-[100] transition-all duration-100"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </>
  );
};

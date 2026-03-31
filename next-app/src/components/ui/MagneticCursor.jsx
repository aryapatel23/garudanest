"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export const MagneticCursor = () => {
  const dot = useRef(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const desktopPointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const touchLikeQuery = window.matchMedia('(hover: none), (pointer: coarse), (any-pointer: coarse), (max-width: 1279px)');

    const evaluate = () => {
      const ua = navigator.userAgent || '';
      const isMobileOrTabletUA = /Android|iPhone|iPad|iPod|Tablet|Mobile|Silk|Kindle/i.test(ua);
      const isiPadDesktopMode = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
      const hasTouch = navigator.maxTouchPoints > 0;
      const isDesktopEligible =
        desktopPointerQuery.matches &&
        !touchLikeQuery.matches &&
        window.innerWidth >= 1280 &&
        !isMobileOrTabletUA &&
        !isiPadDesktopMode &&
        !hasTouch;

      setIsEnabled(isDesktopEligible);
      document.documentElement.classList.toggle('cursor-desktop-enabled', isDesktopEligible);
    };

    evaluate();
    window.addEventListener('resize', evaluate);
    desktopPointerQuery.addEventListener('change', evaluate);
    touchLikeQuery.addEventListener('change', evaluate);

    return () => {
      window.removeEventListener('resize', evaluate);
      desktopPointerQuery.removeEventListener('change', evaluate);
      touchLikeQuery.removeEventListener('change', evaluate);
      document.documentElement.classList.remove('cursor-desktop-enabled');
    };
  }, []);

  useGSAP(() => {
    if (!isEnabled || !dot.current) return;

    gsap.set(dot.current, { autoAlpha: 0, scale: 1 });

    const onMove = (e) => {
      gsap.to(dot.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
        autoAlpha: 1,
        overwrite: true,
      });
    };

    const onEnterLink = () => {
      gsap.to(dot.current, { scale: 3, duration: 0.25, ease: 'power3.out' });
    };

    const onLeaveLink = () => {
      gsap.to(dot.current, { scale: 1, duration: 0.25, ease: 'power3.out' });
    };

    const onMouseDown = () => {
      gsap.to(dot.current, { scale: 0.5, duration: 0.1 });
    };
    const onMouseUp = () => {
      gsap.to(dot.current, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' });
    };

    const hookLinks = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    hookLinks();

    const observer = new MutationObserver(hookLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
    };
  }, { dependencies: [isEnabled] });

  if (!isEnabled) return null;

  return (
    <div
      ref={dot}
      className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full bg-[#FF6B00]"
      style={{
        width: 8,
        height: 8,
        marginLeft: -4,
        marginTop: -4,
        willChange: 'transform',
        boxShadow: '0 0 12px #FF6B00, 0 0 24px rgba(255,107,0,0.4)',
      }}
    />
  );
};

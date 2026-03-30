"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export const MagneticCursor = () => {
  const dot = useRef(null);

  useGSAP(() => {
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
  }, {});

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

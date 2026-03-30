"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * ScrollReveal — GSAP ScrollTrigger Edition
 * A drop-in replacement for the IntersectionObserver version.
 * All animation types are now GPU-composited via GSAP for hardware-accelerated, 
 * buttery-smooth motion. Works seamlessly with the existing prop API.
 *
 * Props:
 *  - type: "fade-up" | "blur-in" | "scale-up" | "slide-right" | "slide-left" | "glitch-in"
 *  - delay: number (ms) — stagger delay before animation starts
 *  - threshold: number — ScrollTrigger start offset (0–1), default 0.15
 *  - className: extra CSS classes
 */
export const ScrollReveal = ({ children, className = "", delay = 0, type = "fade-up", threshold = 0.15, stagger = 0.08 }) => {
  const el = useRef(null);

  useGSAP(() => {
    if (!el.current) return;

    // Build the "from" state based on animation type
    const fromVars = {
      autoAlpha: 0, // handles both opacity=0 and visibility=hidden
    };

    const toVars = {
      autoAlpha: 1,
      duration: 1.4,
      delay: delay / 1000,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el.current,
        start: `top ${100 - threshold * 100 + 10}%`,
        once: true,
      },
    };

    switch (type) {
      case "fade-up":
        fromVars.y = 70;
        fromVars.scale = 0.97;
        toVars.y = 0;
        toVars.scale = 1;
        toVars.duration = 1.6;
        break;
      case "blur-in":
        fromVars.y = 30;
        fromVars.scale = 0.97;
        fromVars.filter = "blur(20px)";
        toVars.y = 0;
        toVars.scale = 1;
        toVars.filter = "blur(0px)";
        toVars.duration = 1.8;
        toVars.ease = "power3.out";
        break;
      case "scale-up":
        fromVars.scale = 0.85;
        fromVars.y = 20;
        toVars.scale = 1;
        toVars.y = 0;
        toVars.ease = "back.out(1.4)";
        toVars.duration = 1.3;
        break;
      case "slide-right":
        fromVars.x = -80;
        fromVars.filter = "blur(4px)";
        toVars.x = 0;
        toVars.filter = "blur(0px)";
        toVars.duration = 1.5;
        toVars.ease = "power3.out";
        break;
      case "slide-left":
        fromVars.x = 80;
        fromVars.filter = "blur(4px)";
        toVars.x = 0;
        toVars.filter = "blur(0px)";
        toVars.duration = 1.5;
        toVars.ease = "power3.out";
        break;
      case "glitch-in":
        fromVars.scale = 1.1;
        fromVars.x = gsap.utils.random(-10, 10);
        fromVars.filter = "blur(15px) brightness(2)";
        fromVars.skewX = 5;
        toVars.scale = 1;
        toVars.x = 0;
        toVars.filter = "blur(0px) brightness(1)";
        toVars.skewX = 0;
        toVars.duration = 2.0;
        toVars.ease = "elastic.out(1, 0.5)";
        break;

      case "clip-reveal": {
        // Cinematic curtain wipe — clip-path from bottom
        gsap.set(el.current, { visibility: 'visible' });
        gsap.fromTo(el.current,
          { clipPath: 'inset(100% 0% 0% 0%)', y: 40 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            duration: 1.4,
            delay: delay / 1000,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: el.current,
              start: `top ${100 - threshold * 100 + 10}%`,
              once: true,
            },
          }
        );
        return;
      }

      case "flip-up": {
        // 3D card flip from below
        gsap.set(el.current, { visibility: 'visible', transformPerspective: 800 });
        gsap.fromTo(el.current,
          { rotationX: 60, y: 80, autoAlpha: 0, transformOrigin: 'top center' },
          {
            rotationX: 0,
            y: 0,
            autoAlpha: 1,
            duration: 1.6,
            delay: delay / 1000,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el.current,
              start: `top ${100 - threshold * 100 + 10}%`,
              once: true,
            },
          }
        );
        return;
      }

      case "zoom-out": {
        // Starts close/zoomed then pulls back to normal
        gsap.set(el.current, { visibility: 'visible' });
        gsap.fromTo(el.current,
          { scale: 1.15, autoAlpha: 0, filter: 'blur(8px)' },
          {
            scale: 1,
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 1.8,
            delay: delay / 1000,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el.current,
              start: `top ${100 - threshold * 100 + 10}%`,
              once: true,
            },
          }
        );
        return;
      }

      case "stagger-words": {
        // Split text into word spans and stagger them in
        const node = el.current;
        const text = node.innerText || '';
        const words = text.split(' ');
        node.innerHTML = words.map(w => `<span class="gsap-word" style="display:inline-block;overflow:hidden;"><span class="gsap-word-inner" style="display:inline-block;">${w}</span></span>`).join(' ');
        gsap.set(node, { visibility: 'visible' });
        gsap.fromTo(node.querySelectorAll('.gsap-word-inner'),
          { y: '110%', autoAlpha: 0 },
          {
            y: '0%',
            autoAlpha: 1,
            duration: 1.0,
            ease: 'power4.out',
            stagger: stagger,
            delay: delay / 1000,
            scrollTrigger: {
              trigger: node,
              start: `top ${100 - threshold * 100 + 10}%`,
              once: true,
            },
          }
        );
        return;
      }
    }

    gsap.fromTo(el.current, fromVars, toVars);
  }, { scope: el, dependencies: [type, delay, threshold] });

  return (
    <div ref={el} className={className} style={{ visibility: 'hidden' }}>
      {children}
    </div>
  );
};

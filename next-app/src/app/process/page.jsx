"use client";

import React, { useRef } from 'react';
import { Command, Cpu, ShieldCheck, Rocket, ArrowRight, Zap, Lock, Clock, Users, TrendingUp, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ProcessPage() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo('.proc-ghost',
      { x: -80, autoAlpha: 0 },
      { x: 0, autoAlpha: 0.06, duration: 1.4 }
    )
      .fromTo('.proc-title',
        { y: 60, autoAlpha: 0, filter: 'blur(10px)' },
        { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1.4 },
        '-=1.0'
      )
      .fromTo('.proc-sub',
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1.0 },
        '-=0.8'
      )
      .fromTo('.proc-line',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.0 },
        '-=0.6'
      );

    // Scroll-triggered reveals
    gsap.utils.toArray('.reveal-up').forEach((el, i) => {
      gsap.fromTo(el,
        { y: 50, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 1.0, ease: 'power4.out', delay: i * 0.08,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
    });

    gsap.utils.toArray('.reveal-left').forEach((el) => {
      gsap.fromTo(el,
        { x: -40, autoAlpha: 0 },
        {
          x: 0, autoAlpha: 1, duration: 1.0, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
    });
  }, { scope: container });

  return (
    <div ref={container} className="pt-32 pb-20 px-6 font-space bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 md:px-0">

        {/* ── HEADER ── */}
        <div className="relative mb-16 md:mb-24 pt-12 md:pt-16 overflow-hidden">
          <span className="proc-ghost absolute -top-3 left-0 text-[#FF6B00] font-sync font-bold text-4xl md:text-8xl uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
            System Architecture
          </span>
          <h1 className="proc-title relative z-10 text-4xl md:text-7xl font-sync font-bold uppercase tracking-tighter text-white leading-none">
            Engineering <span className="text-[#FF6B00]">Protocol</span>
          </h1>
          <p className="proc-sub max-w-2xl mt-6 text-slate-400 text-xs md:text-sm uppercase tracking-widest leading-relaxed font-medium">
            Radical transparency meets architectural grit. How we build systems with certainty, at velocity.
          </p>
          <div className="proc-line h-[2px] w-16 bg-[#FF6B00] mt-8 opacity-40 origin-left"></div>
        </div>

        {/* ── 7-PHASE INTERACTIVE SHOWCASE ── */}
        <ProcessShowcase />

        {/* ── GUARANTEE STRIP ── */}
        <div className="mt-28 mb-24 reveal-up">
          <div className="mb-12">
            <p className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-bold mb-3">Quality_Assurance Protocol</p>
            <h2 className="text-3xl md:text-5xl font-sync font-bold uppercase tracking-tighter text-white">
              What We <span className="text-[#00E5FF]">Guarantee</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5">
            {[
              { icon: <Zap size={20} />, value: '10×', label: 'Faster Iteration', color: '#FF6B00' },
              { icon: <CheckCircle size={20} />, value: '99.9%', label: 'Uptime Architecture', color: '#00E5FF' },
              { icon: <Lock size={20} />, value: '100%', label: 'IP Ownership', color: '#FF6B00' },
              { icon: <TrendingUp size={20} />, value: '85%+', label: 'Test Coverage', color: '#00E5FF' },
              { icon: <Clock size={20} />, value: '0', label: 'Launch Downtime', color: '#FF6B00' },
              { icon: <Users size={20} />, value: '8', label: 'Senior Architects', color: '#00E5FF' },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#0a0a0a] p-8 flex flex-col items-center gap-3 text-center group hover:bg-[#0f0f0f] transition-colors">
                <span style={{ color: stat.color }} className="opacity-60 group-hover:opacity-100 transition-all group-hover:scale-125 duration-300">{stat.icon}</span>
                <span style={{ color: stat.color }} className="text-3xl md:text-4xl font-sync font-bold">{stat.value}</span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors leading-relaxed">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── TECH ARSENAL ── */}
        <div className="mb-24">
          <div className="reveal-left mb-12">
            <p className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-bold mb-3">Weapons_of_Choice</p>
            <h2 className="text-3xl md:text-5xl font-sync font-bold uppercase tracking-tighter text-white">
              The Tech <span className="text-[#FF6B00]">Arsenal</span>
            </h2>
            <p className="mt-4 text-xs text-slate-500 uppercase tracking-widest max-w-xl leading-relaxed">
              Best-in-class tools, not comfortable defaults. Every selection is justified by performance benchmarks.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                category: 'Frontend', color: '#FF6B00',
                icon: <Command size={16} />,
                stack: ['Next.js 14+', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
                desc: 'Pixel-perfect, performant, LCP-optimized interfaces.'
              },
              {
                category: 'Backend', color: '#00E5FF',
                icon: <Cpu size={16} />,
                stack: ['Node.js', 'Rust', 'FastAPI', 'Prisma ORM', 'GraphQL', 'Redis'],
                desc: 'Scalable APIs built for high-throughput production.'
              },
              {
                category: 'AI Systems', color: '#FF6B00',
                icon: <Rocket size={16} />,
                stack: ['LangChain', 'OpenAI', 'Pinecone', 'RAG Pipelines', 'MLflow', 'HuggingFace'],
                desc: 'From LLM orchestration to self-improving evaluation loops.'
              },
              {
                category: 'Infrastructure', color: '#00E5FF',
                icon: <ShieldCheck size={16} />,
                stack: ['AWS / GCP', 'Kubernetes', 'Terraform', 'Docker', 'Datadog', 'CI/CD'],
                desc: 'Zero-downtime deployments with full observability.'
              },
            ].map((cat) => (
              <div key={cat.category} className="reveal-up bg-[#0a0a0a] border border-white/5 hover:border-white/15 transition-all duration-500 p-8 group flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <span style={{ color: cat.color }}>{cat.icon}</span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30">{cat.category}</span>
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider leading-relaxed font-medium">{cat.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {cat.stack.map((tech) => (
                    <span key={tech} style={{ borderColor: cat.color + '30', color: cat.color + 'aa' }} className="text-[8px] font-mono border px-2.5 py-1 uppercase tracking-wider bg-white/[0.02] group-hover:opacity-100 opacity-70 transition-opacity">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── COMPARISON TABLE ── */}
        <div className="mb-24 reveal-up">
          <div className="mb-12">
            <p className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-bold mb-3">Competitive_Analysis</p>
            <h2 className="text-3xl md:text-5xl font-sync font-bold uppercase tracking-tighter text-white">
              Us vs. <span className="text-[#00E5FF]">Everyone Else</span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="py-4 pr-8 text-[9px] font-mono uppercase tracking-[0.4em] text-white/20">Criteria</th>
                  <th className="py-4 px-8 text-[9px] font-mono uppercase tracking-[0.4em] text-[#00E5FF]">GarudaNest</th>
                  <th className="py-4 px-8 text-[9px] font-mono uppercase tracking-[0.4em] text-white/20">Typical Agency</th>
                  <th className="py-4 px-8 text-[9px] font-mono uppercase tracking-[0.4em] text-white/20">Freelancers</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Architecture Quality', '10x Scale-Ready', 'MVP Only', 'Variable'],
                  ['Code Ownership', '100% Yours', 'SaaS Lock-in', '100% Yours'],
                  ['Sprint Velocity', '1-Week Sprints', '4-Week Waterfall', 'Unstructured'],
                  ['Peer Review', 'Every PR, Every Day', 'None / Rare', 'None'],
                  ['Security Audit', 'Built into Process', 'Optional Add-on', 'Never'],
                  ['Post-Launch Support', 'Full Handoff + Docs', 'Extra Cost', 'Ad Hoc'],
                ].map(([criteria, us, agency, freelance], i) => (
                  <tr key={criteria} className={`border-b border-white/[0.03] ${i % 2 === 0 ? 'bg-white/[0.01]' : ''} hover:bg-white/[0.03] transition-colors`}>
                    <td className="py-5 pr-8 text-[10px] font-mono uppercase tracking-wider text-white/40">{criteria}</td>
                    <td className="py-5 px-8 text-[10px] font-bold uppercase tracking-wider text-[#FF6B00]">✓ {us}</td>
                    <td className="py-5 px-8 text-[10px] font-mono uppercase tracking-wider text-white/25">{agency}</td>
                    <td className="py-5 px-8 text-[10px] font-mono uppercase tracking-wider text-white/25">{freelance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── PREMIUM CTA ── */}
        <div className="reveal-up relative overflow-hidden border border-white/5 bg-[#0a0a0a] p-12 md:p-20">
          {/* BG glow - Single Cyan Glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6B00]/5 blur-[120px] rounded-full -mr-60 -mt-60 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00E5FF]/5 blur-[120px] rounded-full -ml-40 -mb-40 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div className="max-w-xl">
              <p className="text-[9px] font-mono uppercase tracking-[0.6em] text-[#FF6B00] opacity-70 mb-4">System_Initialize</p>
              <h2 className="text-4xl md:text-6xl font-sync font-bold uppercase tracking-tighter text-white leading-none mb-6">
                Ready to <span className="text-[#FF6B00]">Build</span><br />the Future?
              </h2>
              <p className="text-[11px] text-slate-400 uppercase tracking-widest leading-relaxed max-w-md">
                Every elite system starts with a single audit session. No commitments. Pure signal extraction.
              </p>
            </div>
            <div className="flex flex-col gap-4 shrink-0">
              <a href="/hire" className="group flex items-center gap-4 px-10 py-5 bg-[#FF6B00] text-black font-black uppercase text-xs tracking-widest hover:bg-white transition-all duration-300">
                Initiate Intake Audit
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </a>
              <a href="/manifesto" className="group flex items-center gap-4 px-10 py-5 border border-white/10 text-white font-bold uppercase text-xs tracking-widest hover:border-white/30 transition-all duration-300">
                Read Our Manifesto
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform opacity-40" />
              </a>
              <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest text-center">
                First session: No charge. Full value.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function ProcessShowcase() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const showcaseContainer = useRef(null);

  const stepsData = [
    {
      step: '01',
      title: 'Intake & Audit',
      goal: 'Mining requirements & eliminating ambiguity.',
      philosophy: 'Radical Transparency: We audit the unsaid.',
      how: "We perform a deep-scan of your existing infrastructure and business logic to map out every technical dependency. We don't just take orders; we audit your vision for scalability bottlenecks.",
      advantage: 'Prevents 90% of mid-project scope creep.',
      tools: ['Trio-Audit', 'Confluence', 'Whimsical'],
      duration: '3–5 Business Days',
      details: ['Legacy Debt Audit', 'Stakeholder Interviews', 'Risk Mapping'],
      metrics: ['0% Unmapped Dependencies', '100% Logic Extraction'],
      status: 'Deep Consultation',
      result: 'Technical Scope Doc',
      color: '#FF6B00'
    },
    {
      step: '02',
      title: 'Architectural Blueprint',
      goal: 'Defining the tech stack & data architecture.',
      philosophy: 'Scalability as a Human Right.',
      how: 'Drawing the neural network of your system. We select best-in-class frameworks for speed and future-proof scaling. This is the skeleton of your empire.',
      advantage: 'Ensures 99.9% uptime architecture from day one.',
      tools: ['LucidChart', 'ArchiMate', 'Prisma'],
      duration: '4–7 Business Days',
      details: ['Schema Design', 'API Contract Specs', 'Infrastructure Mapping'],
      metrics: ['10x Scale Readiness', 'Modular Core Design'],
      status: 'Review & Approve',
      result: 'System Design Spec',
      color: '#00E5FF'
    },
    {
      step: '03',
      title: 'Interactive Prototype',
      goal: 'Visualizing the core flow and UX logic.',
      philosophy: 'Prototypes are Cheaper than Regret.',
      how: 'Moving from blueprint to functional visualization. We build low-fidelity interactive flows so you can feel the logic under your fingers before we commit to production code.',
      advantage: 'Validates UX logic before expensive dev time starts.',
      tools: ['Figma', 'Framer', 'After Effects'],
      duration: '5–8 Business Days',
      details: ['UX Wireframing', 'Clickable Lo-Fi Prototypes', 'User Journey Validation'],
      metrics: ['95% Flow Accuracy', 'Visual Logic Sign-off'],
      status: 'Real-time Feedback',
      result: 'Figma / Functional V0',
      color: '#FF6B00'
    },
    {
      step: '04',
      title: 'High-Velocity Build',
      goal: 'Sprint-based engineering of the core system.',
      philosophy: 'Velocity through Atomic Discipline.',
      how: 'Our elite engineers execute in 1-week sprints using atomic PRs and continuous peer-review. This is where your vision takes physical form in a binary world.',
      advantage: '10x faster iteration through parallel dev workflows.',
      tools: ['Next.js', 'Rust', 'Turborepo'],
      duration: 'Calculated in Sprints',
      details: ['CI/CD Integration', 'Atomic PR Cycles', 'Unit Testing Coverage'],
      metrics: ['Weekly Features Live', '85%+ Test Coverage'],
      status: 'Weekly Syncs',
      result: 'Functional MVP',
      color: '#00E5FF'
    },
    {
      step: '05',
      title: 'Peer Review & Rigor',
      goal: 'Atomic code audits and quality assurance.',
      philosophy: 'Four Eyes See the Future.',
      how: "Every line is cross-examined. We use automated linting and manual elite peer review to maintain premium code quality. We don't leave 'Technical Debt' behind.",
      advantage: 'Zero-defect code culture reduces maintenance by 70%.',
      tools: ['SonarQube', 'Snyk', 'GitHub Hooks'],
      duration: 'Concurrent with Build',
      details: ['Security Linting', 'Manual Code Audit', 'Performance Bottlenecking'],
      metrics: ['Zero Known Vulnerabilities', 'Linear Code Growth'],
      status: 'Process Visibility',
      result: 'Hardened Codebase',
      color: '#FF6B00'
    },
    {
      step: '06',
      title: 'Production Hardening',
      goal: 'Security audits, scale tests, & CI/CD setup.',
      philosophy: 'Hope is Not a Strategy.',
      how: 'Preparing for battle. We stress-test the system under extreme load and harden the perimeter against potential vulnerabilities. We break the system so it never breaks for you.',
      advantage: 'Guarantees performance under high-traffic spikes.',
      tools: ['Locust', 'AWS Shield', 'Datadog'],
      duration: '3–5 Business Days',
      details: ['Load Testing', 'Penetration Scans', 'Infrastructure Optimization'],
      metrics: ['100k+ RPM Readiness', 'Hardened Firewalls'],
      status: 'Final Sign-off',
      result: 'Staging Release',
      color: '#00E5FF'
    },
    {
      step: '07',
      title: 'Deployment & Handoff',
      goal: 'Global launch and full intellectual property transfer.',
      philosophy: 'Code is Property, Not a Gift.',
      how: 'Transition to production. We manage the DNS flip and provide a full IP transfer, including internal training and admin repo access. You own everything.',
      advantage: 'Total project autonomy and 100% IP ownership.',
      tools: ['Vercel', 'VPC Tunnels', 'GitHub Org'],
      duration: 'Final 48 Hours',
      details: ['DNS Deployment', 'IP & Repo Transfer', 'Admin Onboarding'],
      metrics: ['Zero Launch Downtime', '100% IP Transfer'],
      status: 'Full Autonomy',
      result: 'Live System + Repo Admin',
      color: '#FF6B00'
    },
  ];

  useGSAP(() => {
    // Initial Stagger Reveal
    gsap.fromTo('.showcase-item',
      { x: -50, autoAlpha: 0, filter: 'blur(20px)' },
      {
        x: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 2.2, stagger: 0.25, ease: 'power3.out',
        scrollTrigger: { trigger: showcaseContainer.current, start: 'top 85%', once: true }
      }
    );

    gsap.fromTo('.showcase-panel',
      { x: 50, autoAlpha: 0, filter: 'blur(40px)' },
      {
        x: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 2.8, ease: 'power3.out',
        scrollTrigger: { trigger: showcaseContainer.current, start: 'top 85%', once: true }
      }
    );
  }, { scope: showcaseContainer });

  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % stepsData.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, stepsData.length]);

  return (
    <div ref={showcaseContainer} className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch relative min-h-[850px] mb-20">
      {/* Left side: Steps Selection */}
      <div
        className="w-full lg:w-[45%] flex flex-col justify-between py-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {stepsData.map((item, idx) => (
          <div
            key={item.step}
            onMouseEnter={() => setActiveStep(idx)}
            className={`showcase-item group relative flex items-center gap-6 p-5 md:p-8 bg-[#0a0a0a] border border-white/5 cursor-crosshair transition-all duration-500 w-full flex-grow ${idx !== 6 ? 'mb-4' : ''} ${activeStep === idx ? 'border-[#FF6B00]/40 bg-[#0d0d0d]' : 'hover:border-white/10 opacity-40 hover:opacity-100'}`}
          >
            <div className={`absolute top-0 left-0 h-[2px] bg-[#FF6B00] transition-all duration-[7000ms] ease-linear ${activeStep === idx && !isPaused ? 'w-full' : 'w-0'}`} />
            
            <span className={`text-xs font-mono font-bold w-6 transition-colors ${activeStep === idx ? 'text-[#FF6B00]' : 'text-white/20'}`}>
              {item.step}
            </span>

            <div className="flex flex-col flex-1 min-w-0">
              <h3 className={`text-base md:text-2xl font-sync font-bold uppercase tracking-tighter transition-all truncate ${activeStep === idx ? 'text-white' : 'text-white/40'}`}>
                {item.title}
              </h3>
              
              {/* Space-reserved container for sub-labels to prevent layout jitter */}
              <div className={`flex items-center gap-3 transition-all duration-300 ${activeStep === idx ? 'h-5 mt-2 opacity-100' : 'h-0 mt-0 opacity-0 overflow-hidden'}`}>
                <span className="text-[8px] font-mono text-[#FF6B00] uppercase tracking-widest opacity-70 whitespace-nowrap">{item.philosophy}</span>
                <div className="h-[1px] w-4 bg-white/10" />
                <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest whitespace-nowrap">{item.duration}</span>
              </div>
            </div>

            {/* Logical endpoint node - Always present to maintain width parity */}
            <div className="flex items-center justify-center w-6 h-6">
              <div className={`w-2 h-2 rounded-full bg-[#FF6B00] shadow-[0_0_10px_#FF6B00] transition-all duration-500 ${activeStep === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Right side: Information Panel */}
      <div className="showcase-panel w-full lg:w-[55%] flex">
        <div className="bg-[#0a0a0a] border border-white/5 p-6 md:p-16 relative overflow-hidden group w-full flex flex-col justify-between">
          <div
            className="absolute top-0 right-0 w-64 h-64 opacity-15 transition-colors duration-700 blur-[120px] rounded-full -mr-24 -mt-24"
            style={{ backgroundColor: stepsData[activeStep].color }}
          />
          <div className="relative z-10 space-y-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-[9px] font-mono text-white/30 tracking-[0.4em] uppercase">Protocol: PHASE_{activeStep + 1}</span>
                <div className="h-[1px] w-12 bg-white/5" />
              </div>
              <span className="text-[9px] font-mono text-[#FF6B00] uppercase tracking-widest">Est_Time: {stepsData[activeStep].duration}</span>
            </div>
            <div>
              <h2 className="text-3xl md:text-6xl font-sync font-bold uppercase mb-6 tracking-tighter leading-none text-white transition-all duration-300">
                {stepsData[activeStep].title}
              </h2>
              <div className="flex flex-wrap gap-4">
                {stepsData[activeStep].tools.map((tool) => (
                  <span key={tool} className="text-[8px] font-mono border border-white/10 px-2 py-1 text-white/40 uppercase bg-white/2">{tool}</span>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-6 border-l-2 border-[#FF6B00]/40 bg-white/[0.02]">
                <p className="text-[14px] text-white uppercase tracking-widest leading-loose font-bold italic mb-4">
                  &ldquo;{stepsData[activeStep].goal}&rdquo;
                </p>
                <p className="text-[12px] text-slate-300 uppercase tracking-wide leading-relaxed">
                  {stepsData[activeStep].how}
                </p>
              </div>
              <div className="p-6 border border-white/5 bg-[#0d0d0d]">
                <span className="text-[8px] font-mono text-[#00E5FF] uppercase tracking-[0.4em] block mb-3 opacity-60">Elite_Competitive_Edge</span>
                <p className="text-[11px] text-[#00E5FF] font-bold uppercase tracking-wider">{stepsData[activeStep].advantage}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
              <div className="space-y-6">
                <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.4em] block">Developer_Stack</span>
                <ul className="space-y-3">
                  {stepsData[activeStep].details.map((d) => (
                    <li key={d} className="text-[10px] text-white/70 font-mono uppercase tracking-wider flex items-center gap-3">
                      <div className="w-1.5 h-[1px] bg-[#FF6B00]" /> {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.4em] block">SLA_Metrics</span>
                <ul className="space-y-3">
                  {stepsData[activeStep].metrics.map((m) => (
                    <li key={m} className="text-[10px] text-[#00E5FF] font-mono uppercase tracking-wider flex items-center gap-3">
                      <div className="w-1.5 h-[1px] bg-[#00E5FF]" /> {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="relative z-10 pt-10 mt-8 border-t border-white/5">
            <div className="grid grid-cols-2 gap-12 mb-10">
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] block">Client_Involvement</span>
                <p className="text-[11px] text-white font-bold uppercase tracking-wider">{stepsData[activeStep].status}</p>
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] block" style={{ color: stepsData[activeStep].color, opacity: 0.5 }}>Final_Deliverable</span>
                <p className="text-[11px] text-white font-bold uppercase tracking-wider">{stepsData[activeStep].result}</p>
              </div>
            </div>
            <div className="flex items-center justify-between opacity-20">
              <span className="text-[9px] font-mono text-white/10 uppercase tracking-widest leading-none">
                SYSTEM_AUTH_KEY: GS_0x{activeStep + 1}AF_NEST
              </span>
              <div className="flex gap-2">
                {stepsData.map((_, i) => (
                  <div key={i} className={`h-1 transition-all duration-500 rounded-full ${activeStep === i ? 'bg-[#FF6B00] w-6' : 'bg-white/10 w-2'}`} />
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms]" />
        </div>
      </div>
    </div>
  );
}

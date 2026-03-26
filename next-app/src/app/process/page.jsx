"use client";

import React from 'react';
import { Command, Cpu, ShieldCheck, Rocket } from 'lucide-react';

export default function ProcessPage() {
  return (
    <div className="pt-32 pb-20 px-6 font-space">
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        {/* Header Section */}
        <div className="relative group mb-20 md:mb-24 pt-12 md:pt-16">
          <span
            className="absolute -top-6 -right-2 md:-top-12 md:-right-4 font-sync font-bold text-5xl md:text-7xl uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap opacity-[0.03] text-white"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', textStroke: '1px rgba(255,255,255,0.2)', color: 'transparent' }}
          >
            How Elite Systems Are Built
          </span>
          <span className="absolute -top-3 -right-1 md:-top-6 md:-right-2 text-[#FF6B00] opacity-[0.06] font-sync font-bold text-5xl md:text-7xl uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
            How Elite Systems Are Built
          </span>

          <h2 className="relative z-10 text-5xl md:text-7xl font-sync font-bold uppercase tracking-tighter text-white leading-none">
            How Elite Systems <span className="text-[#FF6B00]">Are Built</span>
          </h2>

          <div className="h-[2px] w-16 bg-[#FF6B00] mt-6 md:mt-8 opacity-40"></div>
        </div>

        {/* Interactive Showcase */}
        <ProcessShowcase />
      </div>
    </div>
  );
}

function ProcessShowcase() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const stepsData = [
    {
      step: '01',
      title: 'Intake & Audit',
      goal: 'Mining requirements & eliminating ambiguity.',
      philosophy: 'Radical Transparency: We audit the unsaid.',
      how: 'We perform a deep-scan of your existing infrastructure and business logic to map out every technical dependency. We don\'t just take orders; we audit your vision for scalability bottlenecks.',
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
      how: 'Every line is cross-examined. We use automated linting and manual elite peer review to maintain premium code quality. We don\'t leave "Technical Debt" behind.',
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

  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % stepsData.length);
    }, 7000); // Slower cycle to accommodate more text
    return () => clearInterval(interval);
  }, [isPaused, stepsData.length]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch relative min-h-[850px] mb-20">
      {/* Left side: Steps Selection - Balanced height */}
      <div
        className="w-full lg:w-[45%] flex flex-col justify-between py-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {stepsData.map((item, idx) => (
          <div
            key={item.step}
            onMouseEnter={() => setActiveStep(idx)}
            className={`group relative flex items-center gap-6 p-6 md:p-8 bg-[#0a0a0a] border border-white/5 cursor-crosshair transition-all duration-500 flex-grow ${idx !== 6 ? 'mb-4' : ''} ${activeStep === idx ? 'border-[#FF6B00]/40 bg-[#0d0d0d]' : 'hover:border-white/10 opacity-40 hover:opacity-100'}`}
          >
            {/* Progress Bar (Timer) for Active Item */}
            <div className={`absolute top-0 left-0 h-[2px] bg-[#FF6B00] transition-all duration-[7000ms] ease-linear ${activeStep === idx && !isPaused ? 'w-full' : 'w-0'}`} />

            <span className={`text-xs font-mono font-bold transition-colors ${activeStep === idx ? 'text-[#FF6B00]' : 'text-white/20'}`}>
              {item.step}
            </span>
            <div className="flex flex-col">
              <h3 className={`text-lg md:text-2xl font-sync font-bold uppercase tracking-tighter transition-all ${activeStep === idx ? 'text-white' : 'text-white/40'}`}>
                {item.title}
              </h3>
              {activeStep === idx && (
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[8px] font-mono text-[#FF6B00] uppercase tracking-widest opacity-70">
                    {item.philosophy}
                  </span>
                  <div className="h-[1px] w-4 bg-white/10" />
                  <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">
                    {item.duration}
                  </span>
                </div>
              )}
            </div>
            {activeStep === idx && (
              <div className="ml-auto w-2 h-2 rounded-full bg-[#FF6B00] shadow-[0_0_10px_#FF6B00]" />
            )}
          </div>
        ))}
      </div>

      {/* Right side: Information Panel - Matching Height */}
      <div className="w-full lg:w-[55%] flex">
        <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-16 relative overflow-hidden group w-full flex flex-col justify-between">
          {/* Animated Background Accent */}
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
              <h2 className="text-4xl md:text-6xl font-sync font-bold uppercase mb-6 tracking-tighter leading-none text-white transition-all duration-300">
                {stepsData[activeStep].title}
              </h2>
              <div className="flex flex-wrap gap-4">
                {stepsData[activeStep].tools.map((tool) => (
                  <span key={tool} className="text-[8px] font-mono border border-white/10 px-2 py-1 text-white/40 uppercase bg-white/2">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 border-l-2 border-[#FF6B00]/40 bg-white/[0.02]">
                <p className="text-[14px] text-white uppercase tracking-widest leading-loose font-bold italic mb-4">
                  "{stepsData[activeStep].goal}"
                </p>
                <p className="text-[12px] text-slate-300 uppercase tracking-wide leading-relaxed">
                  {stepsData[activeStep].how}
                </p>
              </div>

              <div className="p-6 border border-white/5 bg-[#0d0d0d]">
                <span className="text-[8px] font-mono text-[#00E5FF] uppercase tracking-[0.4em] block mb-3 opacity-60">Elite_Competitive_Edge</span>
                <p className="text-[11px] text-[#00E5FF] font-bold uppercase tracking-wider">
                  {stepsData[activeStep].advantage}
                </p>
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

          {/* Holographic Border Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms]" />
        </div>
      </div>
    </div>
  );
}

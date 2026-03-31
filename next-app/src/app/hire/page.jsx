"use client";

import React, { useState } from 'react';
import { ShieldCheck, Cpu, ArrowRight, CalendarDays, Mail } from 'lucide-react';
import { BentoCard } from '@/components/ui/BentoCard';
import { sendEmailAction } from '../../lib/actions';
import { buildSchedulerLink } from '../../lib/scheduler';

export default function HirePage() {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [schedulerUrl, setSchedulerUrl] = useState('');
  const supportEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'teamgarudanest@gmail.com';

  const mapError = (rawError) => {
    if (!rawError) return 'Submission failed. Please try again.';
    if (rawError.includes('EMAIL_PROVIDER_NOT_CONFIGURED')) return 'Email provider is not configured on the server. Add RESEND_API_KEY.';
    if (rawError.includes('RESEND_REFUSED')) return 'Email provider rejected delivery. Verify sender domain/recipient and check Resend logs.';
    if (rawError.includes('EMAIL_REQUIRED')) return 'Please enter your work email.';
    if (rawError.includes('INVALID_EMAIL_FORMAT')) return 'Please enter a valid business email address.';
    if (rawError.includes('CONSENT_REQUIRED')) return 'Please accept consent to continue.';
    if (rawError.includes('SCOPE_TOO_SHORT')) return 'Please provide more project details.';
    if (rawError.includes('BOT_DETECTED')) return 'Submission blocked. Please refresh and try again.';
    if (rawError.includes('SERVER_FAULT')) return 'Server error while sending email. Please retry in a minute.';
    return rawError;
  };

  const clearStatus = () => {
    if (status.type !== 'idle') {
      setStatus({ type: 'idle', message: '' });
    }
    if (schedulerUrl) {
      setSchedulerUrl('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const botTrap = form.querySelector('input[name="website"]')?.value?.trim();
    const projectScope = form.querySelector('textarea[name="projectScope"]')?.value?.trim() || '';

    if (botTrap) {
      setStatus({ type: 'error', message: 'BOT_DETECTED' });
      return;
    }

    if (projectScope.length < 20) {
      setStatus({ type: 'error', message: 'Please share a bit more detail (at least 20 characters).' });
      return;
    }

    setStatus({ type: 'loading', message: 'Sending your brief...' });

    const formData = new FormData(form);
    formData.append('type', 'Client Discovery Inquiry');
    formData.append('sourcePage', '/hire');

    const link = buildSchedulerLink({
      name: String(formData.get('contactName') || formData.get('companyName') || ''),
      email: String(formData.get('workEmail') || ''),
      objective: String(formData.get('objective') || '')
    });

    try {
      const result = await sendEmailAction(formData);

      if (result.error) throw new Error(result.error);

      setStatus({
        type: 'success',
        message: result.confirmationSent === false
          ? `Brief received. Please book your call below and expect manual follow-up. Ref: ${result.id.substring(0, 8)}`
          : link
            ? `Thanks! Your brief is in. Book your 30-min discovery slot now. Ref: ${result.id.substring(0, 8)}`
            : `Thanks! Your brief is in. We will email 3 available 30-min IST slots shortly. Ref: ${result.id.substring(0, 8)}`
      });
      setSchedulerUrl(link);
      form.reset();
    } catch (error) {
      setStatus({ type: 'error', message: mapError(error.message || 'NODE_OFFLINE') });
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        {/* Header Section */}
        <div className="relative group mb-16 md:mb-24 pt-12 md:pt-16">
          <span className="absolute -top-3 left-0 text-[#FF6B00] opacity-[0.06] font-sync font-bold text-4xl md:text-8xl uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
            Elite Consultation
          </span>

          <h2 className="relative z-10 text-4xl md:text-7xl font-sync font-bold uppercase tracking-tighter text-white leading-none">
            Begin Your <span className="text-[#FF6B00]">System Audit</span>
          </h2>

          <p className="max-w-2xl mt-6 text-xs md:text-sm text-slate-400 uppercase tracking-[0.14em] md:tracking-widest leading-relaxed font-medium">
            Tell us what you are building, where you are stuck, and your preferred 30-minute call window.
          </p>

          <div className="h-[2px] w-16 bg-[#FF6B00] mt-8 opacity-40"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Directives */}
          <div className="space-y-6">
            <BentoCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck size={20} className="text-[#00E5FF]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">The Guarantee</span>
              </div>
              <h3 className="text-xl font-sync font-bold uppercase mb-4 leading-tight">Zero <br /> Bottlenecks</h3>
              <p className="text-[10px] text-slate-500 uppercase leading-loose tracking-wide font-medium">
                Every project begins with a deep-scan audit. We identify the rot in your current system before writing a single line of new code.
              </p>
            </BentoCard>

            <BentoCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Cpu size={20} className="text-[#FF6B00]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">The Workflow</span>
              </div>
              <h3 className="text-xl font-sync font-bold uppercase mb-4 leading-tight">Extreme <br /> Velocity</h3>
              <p className="text-[10px] text-slate-500 uppercase leading-loose tracking-wide font-medium">
                No middle managers. No bloat. You work directly with the 8 senior architects who execute your vision in 1-week sprints.
              </p>
            </BentoCard>
          </div>

          {/* Center & Right: The Form */}
          <div className="lg:col-span-2">
            <BentoCard className="p-8 md:p-12 relative overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                <input
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="border border-[#FF6B00]/30 bg-[#FF6B00]/5 p-4 sm:p-5">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[#FFD3B5]">Discovery Workflow</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-white/75">Submit brief | Technical review (same day) | 3 slot options | 30-min call | action plan</p>
                </div>

                {/* Company & Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Contact Name</label>
                    <input
                      name="contactName"
                      required
                      type="text"
                      placeholder="E.G. ALEX SHARMA"
                      autoComplete="name"
                      onChange={clearStatus}
                      className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#00E5FF] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Entity Name</label>
                    <input name="companyName" required type="text" placeholder="COMPANY_CORP" autoComplete="organization" onChange={clearStatus} className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Secure Uplink (Email)</label>
                    <input name="workEmail" required type="email" autoComplete="email" placeholder="CTO@DOMAIN.COM" onChange={clearStatus} className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Phone / WhatsApp (Optional)</label>
                    <input name="contactPhone" type="text" placeholder="+91 98XXXXXXXX" autoComplete="tel" onChange={clearStatus} className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors" />
                  </div>
                </div>

                {/* Project Goal */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">What Do You Need Help With?</label>
                  <input
                    name="objective"
                    required
                    type="text"
                    placeholder="E.G. BUILD AN MVP, IMPROVE CONVERSION, MODERNIZE INFRA"
                    onChange={clearStatus}
                    className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors"
                  />
                </div>

                {/* Budget & Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Approximate Budget</label>
                    <input
                      name="budgetApprox"
                      required
                      type="text"
                      placeholder="E.G. APPROX $8K - $15K"
                      onChange={clearStatus}
                      className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#00E5FF] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Target Timeline</label>
                    <input name="timeline" required type="text" placeholder="E.G. 4-8 WEEKS" onChange={clearStatus} className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#00E5FF] transition-colors" />
                  </div>
                </div>

                {/* 30-min Meeting Preference */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Preferred 30-Min Call Mode</label>
                    <select
                      name="meetingMode"
                      required
                      defaultValue=""
                      onChange={clearStatus}
                      className="w-full bg-[#070707] border border-white/10 p-4 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors"
                    >
                      <option value="" disabled>Select one</option>
                      <option value="Google Meet">Google Meet</option>
                      <option value="Zoom">Zoom</option>
                      <option value="Phone Call">Phone Call</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Best Time Window (30 Mins)</label>
                    <input
                      name="meetingWindow"
                      required
                      type="text"
                      placeholder="E.G. TUE-THU, 2PM-5PM IST"
                      onChange={clearStatus}
                      className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors"
                    />
                  </div>
                </div>

                <div className="border border-white/10 bg-white/[0.02] p-4 text-[10px] uppercase tracking-[0.14em] text-slate-300">
                  We will schedule a focused 30-minute discovery session and share the calendar invite on your work email.
                </div>

                <p className="text-[10px] text-white/40 uppercase tracking-[0.14em]">
                  Scheduling baseline: IST (Asia/Kolkata). If needed, we will share converted options for your timezone.
                </p>

                {/* Project Scope */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">The Mission (Scope)</label>
                  <textarea name="projectScope" required placeholder="Describe the system bottlenecks we must eliminate..." rows={4} minLength={20} onChange={clearStatus} className="w-full bg-transparent border border-white/10 p-4 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors resize-none" />
                </div>

                <label className="flex items-start gap-3 border border-white/10 p-3 sm:p-4">
                  <input name="consent" type="checkbox" required className="mt-1 accent-[#FF6B00]" />
                  <span className="text-[10px] uppercase tracking-[0.12em] text-white/65">
                    I confirm this is a business inquiry and agree to be contacted on email for discovery scheduling.
                  </span>
                </label>

                {/* Submit */}
                <div className="flex flex-col md:flex-row items-center gap-6 pt-4">
                  <button
                    disabled={status.type === 'loading'}
                    className="w-full md:w-auto px-12 py-5 bg-[#FF6B00] text-black font-black text-xs uppercase hover:bg-[#00E5FF] transition-all flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(255,107,0,0.3)] disabled:opacity-60"
                  >
                    {status.type === 'loading' ? 'Establishing Uplink...' : 'Submit Briefing'}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  {status.type !== 'idle' && (
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${status.type === 'success' ? 'text-[#22C55E]' : status.type === 'error' ? 'text-red-400' : 'text-[#00E5FF]'}`}>
                      {status.message}
                    </p>
                  )}
                </div>

                {status.type === 'success' && (
                  <div className="relative overflow-hidden rounded-2xl border border-[#39FF14]/25 bg-[#040607] p-5 sm:p-7 space-y-5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(57,255,20,0.18),transparent_45%)] pointer-events-none" />
                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl border border-[#39FF14]/35 bg-[#39FF14]/15 flex items-center justify-center">
                          <CalendarDays size={22} className="text-[#7BFF67]" />
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#9AFB8C]">Schedule Strategy Sync</p>
                      </div>
                      <span className="inline-flex items-center rounded-full border border-[#39FF14]/35 bg-[#39FF14]/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-[#9AFB8C]">
                        Ready to Sync
                      </span>
                    </div>

                    <div className="relative space-y-3">
                      <h3 className="text-xl sm:text-3xl font-sync font-bold text-white leading-tight">Book Your Discovery Call</h3>
                      <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                        {schedulerUrl
                          ? 'Pick your preferred time instantly on Calendly and lock the strategy session in one click.'
                          : 'Your brief is received. If scheduler is not available, send us an email and we will share priority slots fast.'}
                      </p>
                    </div>

                    <div className="relative flex flex-col lg:flex-row gap-3">
                      <a
                        href={schedulerUrl || '#'}
                        target="_blank"
                        rel="noreferrer"
                        aria-disabled={!schedulerUrl}
                        className={`inline-flex w-full lg:w-auto items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] transition-all ${schedulerUrl ? 'bg-[#2CC61A] text-white hover:bg-[#38d925] shadow-[0_8px_30px_rgba(57,255,20,0.25)]' : 'bg-[#1f2937] text-slate-400 pointer-events-none'}`}
                      >
                        <CalendarDays size={18} />
                        Book 15min Call
                        <ArrowRight size={16} />
                      </a>

                      <a
                        href={`mailto:${supportEmail}?subject=Hire Inquiry Follow-up`}
                        className="inline-flex w-full lg:w-auto items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-slate-100 hover:bg-white/10 transition-colors"
                      >
                        <Mail size={18} />
                        Inquiry via Email
                      </a>
                    </div>

                    <p className="relative text-xs text-slate-400 italic">
                      Average response time: under 24 hours for all inquiries.
                    </p>
                  </div>
                )}
              </form>

              {/* Background Accent */}
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FF6B00] opacity-[0.03] blur-[100px] -mr-32 -mb-32 rounded-full pointer-events-none" />
            </BentoCard>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useRef, useState } from 'react';
import { ShieldCheck, Cpu, ArrowRight, Mail, CheckCircle2 } from 'lucide-react';
import { BentoCard } from '@/components/ui/BentoCard';
import { sendEmailAction } from '../../lib/actions';

export default function HirePage() {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [submittedLead, setSubmittedLead] = useState(null);
  const successCardRef = useRef(null);
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

    const leadSnapshot = {
      contactName: String(formData.get('contactName') || '').trim(),
      companyName: String(formData.get('companyName') || '').trim(),
      workEmail: String(formData.get('workEmail') || '').trim(),
      objective: String(formData.get('objective') || '').trim(),
      budgetApprox: String(formData.get('budgetApprox') || '').trim(),
      timeline: String(formData.get('timeline') || '').trim(),
      meetingMode: String(formData.get('meetingMode') || '').trim(),
      meetingWindow: String(formData.get('meetingWindow') || '').trim(),
      preferredDate: String(formData.get('preferredDate') || '').trim(),
      preferredTime: String(formData.get('preferredTime') || '').trim()
    };

    try {
      const result = await sendEmailAction(formData);

      if (result.error) throw new Error(result.error);

      setStatus({
        type: 'success',
        message: `Request submitted successfully. We've received your details and will contact you shortly. Ref: ${result.id.substring(0, 8)}`
      });
      setSubmittedLead(leadSnapshot);
      form.reset();

      window.setTimeout(() => {
        successCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    } catch (error) {
      setStatus({ type: 'error', message: mapError(error.message || 'NODE_OFFLINE') });
    }
  };

  return (
    <div className="pt-24 md:pt-16 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        {/* Header Section */}
        <div className="relative group mb-12 md:mb-20 pt-8 md:pt-12">
          <span className="absolute -top-3 left-0 text-[#FF6B00] opacity-[0.06] font-sync font-bold text-4xl md:text-8xl uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
            Client Discovery
          </span>

          <h2 className="relative z-10 text-4xl md:text-7xl font-sync font-bold uppercase tracking-tighter text-white leading-none">
            Let us Plan Your <span className="text-[#FF6B00]">Next Build</span>
          </h2>

          <p className="max-w-2xl mt-6 text-xs md:text-sm text-slate-400 uppercase tracking-[0.14em] md:tracking-widest leading-relaxed font-medium">
            Share your goals, timeline, and preferred call slot. We will recommend the best technical path for your project.
          </p>

          <div className="h-[2px] w-16 bg-[#FF6B00] mt-8 opacity-40"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Directives */}
          <div className="space-y-6">
            <BentoCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck size={20} className="text-[#00E5FF]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Client Promise</span>
              </div>
              <h3 className="text-xl font-sync font-bold uppercase mb-4 leading-tight">Clear <br /> Direction</h3>
              <p className="text-[10px] text-slate-500 uppercase leading-loose tracking-wide font-medium">
                We begin with a focused discovery review so you get practical recommendations before development starts.
              </p>
            </BentoCard>

            <BentoCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Cpu size={20} className="text-[#FF6B00]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Delivery Model</span>
              </div>
              <h3 className="text-xl font-sync font-bold uppercase mb-4 leading-tight">Senior Team <br /> Execution</h3>
              <p className="text-[10px] text-slate-500 uppercase leading-loose tracking-wide font-medium">
                You work directly with experienced engineers, with transparent updates and fast iteration.
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
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[#FFD3B5]">How It Works</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-white/75">Submit request | Same-day review | 30-min strategy call | Action plan</p>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.1em] text-white/60">Best for: MVP launch, product redesign, scale and performance fixes.</p>
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
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Company Name</label>
                    <input name="companyName" required type="text" placeholder="COMPANY_CORP" autoComplete="organization" onChange={clearStatus} className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Work Email</label>
                    <input name="workEmail" required type="email" autoComplete="email" placeholder="you@company.com" onChange={clearStatus} className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Phone / WhatsApp (Optional)</label>
                    <input name="contactPhone" type="text" placeholder="+91 98XXXXXXXX" autoComplete="tel" onChange={clearStatus} className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors" />
                  </div>
                </div>

                {/* Project Goal */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Project Goal</label>
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
                      placeholder="E.G. $8K - $15K"
                      onChange={clearStatus}
                      className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#00E5FF] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Target Timeline</label>
                    <input name="timeline" required type="text" placeholder="E.G. 2-4 WEEKS" onChange={clearStatus} className="w-full bg-transparent border-b border-white/10 p-4 text-xs uppercase outline-none focus:border-[#00E5FF] transition-colors" />
                  </div>
                </div>

                {/* 30-min Meeting Preference */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Preferred Call Mode</label>
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
                    <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Preferred Time Window</label>
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

                {/* Preferred Date & Time */}
                <div className="border border-[#00E5FF]/40 bg-[#0A1418] p-4 sm:p-5 rounded-md">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[#7DEFFF] font-bold mb-4">Your Preferred Meeting Slot</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Select Date</label>
                      <input
                        name="preferredDate"
                        type="date"
                        required
                        onChange={clearStatus}
                        style={{ colorScheme: 'dark' }}
                        className="w-full bg-[#0C1D24] border-2 border-[#35E9FF] p-4 text-sm font-semibold text-[#F2FDFF] outline-none focus:border-[#9FF6FF] focus:ring-2 focus:ring-[#00E5FF]/25 transition-all rounded-md cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:brightness-200 [&::-webkit-calendar-picker-indicator]:invert"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Select Time (IST)</label>
                      <input
                        name="preferredTime"
                        type="time"
                        required
                        onChange={clearStatus}
                        style={{ colorScheme: 'dark' }}
                        className="w-full bg-[#0C1D24] border-2 border-[#35E9FF] p-4 text-sm font-semibold text-[#F2FDFF] outline-none focus:border-[#9FF6FF] focus:ring-2 focus:ring-[#00E5FF]/25 transition-all rounded-md cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:brightness-200 [&::-webkit-calendar-picker-indicator]:invert"
                      />
                    </div>
                  </div>
                  <p className="text-[9px] text-white/50 mt-3 italic">Our team will confirm this slot within 24 hours</p>
                </div>

                <div className="border border-white/10 bg-white/[0.02] p-4 text-[10px] uppercase tracking-[0.14em] text-slate-300">
                  We will schedule a 30-minute discovery call and share your calendar invite on email.
                </div>

                <p className="text-[10px] text-white/40 uppercase tracking-[0.14em]">
                  Scheduling baseline: IST (Asia/Kolkata). If needed, we will share converted options for your timezone.
                </p>

                {/* Project Scope */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-white/40 uppercase tracking-widest ml-1">Project Details</label>
                  <textarea name="projectScope" required placeholder="Tell us about your product, current challenge, and expected outcome..." rows={4} minLength={20} onChange={clearStatus} className="w-full bg-transparent border border-white/10 p-4 text-xs uppercase outline-none focus:border-[#FF6B00] transition-colors resize-none" />
                </div>

                <label className="flex items-start gap-3 border border-white/10 p-3 sm:p-4">
                  <input name="consent" type="checkbox" required className="mt-1 accent-[#FF6B00]" />
                  <span className="text-[10px] uppercase tracking-[0.12em] text-white/65">
                    I confirm this is a business inquiry and agree to be contacted for project discovery.
                  </span>
                </label>

                {/* Submit */}
                <div className="flex flex-col md:flex-row items-center gap-6 pt-4">
                  <button
                    disabled={status.type === 'loading'}
                    className="w-full md:w-auto px-12 py-5 bg-[#FF6B00] text-black font-black text-xs uppercase hover:bg-[#00E5FF] transition-all flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(255,107,0,0.3)] disabled:opacity-60"
                  >
                    {status.type === 'loading' ? 'Sending Request...' : 'Submit Request'}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  {status.type !== 'idle' && (
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${status.type === 'success' ? 'text-[#22C55E]' : status.type === 'error' ? 'text-red-400' : 'text-[#00E5FF]'}`}>
                      {status.message}
                    </p>
                  )}
                </div>

                {status.type === 'success' && (
                  <div ref={successCardRef} className="relative overflow-hidden rounded-2xl border border-[#00E5FF]/40 bg-gradient-to-br from-[#0a0a0a] to-[#050505] p-6 sm:p-8 space-y-6">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%,rgba(0,229,255,0.1),transparent_60%)] pointer-events-none" />
                    
                    {/* Success Header */}
                    <div className="relative flex items-center gap-4">
                      <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl border border-[#00E5FF]/40 bg-gradient-to-br from-[#00E5FF]/20 to-[#00E5FF]/5 flex items-center justify-center animate-pulse">
                        <CheckCircle2 size={32} className="text-[#00E5FF]" />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#00E5FF] font-bold">Submission Successful</p>
                        <h2 className="text-2xl sm:text-3xl font-sync font-bold text-white mt-1">We'll Review & Contact You</h2>
                      </div>
                    </div>

                    {/* Submission Review */}
                    {submittedLead && (
                      <div className="relative space-y-4">
                        <div className="border border-white/10 bg-black/50 p-5 sm:p-6 rounded-lg">
                          <p className="text-[9px] uppercase tracking-[0.14em] text-[#00E5FF] mb-5 font-bold">Your Submission Details</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-[11px]">
                            <div>
                              <p className="text-white/50 uppercase tracking-[0.1em] text-[9px] mb-1">Name</p>
                              <p className="text-white font-medium">{submittedLead.contactName}</p>
                            </div>
                            <div>
                              <p className="text-white/50 uppercase tracking-[0.1em] text-[9px] mb-1">Company</p>
                              <p className="text-white font-medium">{submittedLead.companyName}</p>
                            </div>
                            <div>
                              <p className="text-white/50 uppercase tracking-[0.1em] text-[9px] mb-1">Project Goal</p>
                              <p className="text-white font-medium">{submittedLead.objective}</p>
                            </div>
                            <div>
                              <p className="text-white/50 uppercase tracking-[0.1em] text-[9px] mb-1">Budget</p>
                              <p className="text-white font-medium">{submittedLead.budgetApprox}</p>
                            </div>
                            <div>
                              <p className="text-white/50 uppercase tracking-[0.1em] text-[9px] mb-1">Timeline</p>
                              <p className="text-white font-medium">{submittedLead.timeline}</p>
                            </div>
                            <div>
                              <p className="text-white/50 uppercase tracking-[0.1em] text-[9px] mb-1">Call Mode</p>
                              <p className="text-white font-medium">{submittedLead.meetingMode}</p>
                            </div>
                            <div className="sm:col-span-2">
                              <p className="text-white/50 uppercase tracking-[0.1em] text-[9px] mb-1">Preferred Slot</p>
                              <p className="text-white font-medium">
                                {submittedLead.preferredDate && new Intl.DateTimeFormat('en-IN', {
                                  weekday: 'short',
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                }).format(new Date(submittedLead.preferredDate))} at {submittedLead.preferredTime} IST
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Next Steps */}
                    <div className="border border-[#FF6B00]/30 bg-[#FF6B00]/5 p-5 sm:p-6 rounded-lg space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-[#FF6B00]/20 flex items-center justify-center">
                          <Mail size={20} className="text-[#FF6B00]" />
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.16em] text-[#FF6B00] font-bold">What Happens Next</p>
                      </div>
                      <ul className="space-y-3 text-[10px] text-white/70 ml-4">
                        <li><span className="text-white">Team reviews your submission</span></li>
                        <li><span className="text-white">Confirmation email with approved time slot</span></li>
                        <li><span className="text-white">Calendar invite + meeting link sent 24 hours before</span></li>
                        <li><span className="text-white">30-minute discovery call at your preferred time</span></li>
                      </ul>
                    </div>

                    {/* Support */}
                    <div className="flex flex-col gap-3">
                      <p className="text-[9px] uppercase tracking-[0.14em] text-[#00E5FF] font-bold">Need Help?</p>
                      <a
                        href={`mailto:${supportEmail}?subject=Discovery Call Inquiry`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-white/10 transition-colors"
                      >
                        <Mail size={18} />
                        Contact Support
                      </a>
                    </div>

                    {/* Footer */}
                    <div className="relative border-t border-white/10 pt-4">
                      <p className="text-[9px] text-white/50 italic leading-relaxed">
                        All times are in IST (Asia/Kolkata). If you're in another timezone, our team will coordinate timing when they confirm your slot.
                      </p>
                    </div>
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

'use server';

import { Resend } from 'resend';
import { buildSchedulerLink } from './scheduler';

const resend = new Resend(process.env.RESEND_API_KEY);
const DEFAULT_TO_EMAIL = 'teamgarudanest@gmail.com';
const DEFAULT_FROM_EMAIL = 'onboarding@resend.dev';
const DEFAULT_FROM_NAME = 'GarudaNest';

const toCleanString = (value) => String(value ?? '').trim();

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const safe = (value) => escapeHtml(toCleanString(value));

export async function sendEmailAction(formData) {
  const contactName = toCleanString(formData.get('contactName'));
  const companyName = toCleanString(formData.get('companyName'));
  const contactPhone = toCleanString(formData.get('contactPhone'));
  const workEmail = toCleanString(formData.get('workEmail'));
  const projectScope = toCleanString(formData.get('projectScope'));
  const objective = toCleanString(formData.get('objective'));
  const budgetApprox = toCleanString(formData.get('budgetApprox'));
  const meetingMode = toCleanString(formData.get('meetingMode'));
  const meetingWindow = toCleanString(formData.get('meetingWindow'));
  const service = toCleanString(formData.get('service'));
  const budget = toCleanString(formData.get('budget'));
  const timeline = toCleanString(formData.get('timeline'));
  const sourcePage = toCleanString(formData.get('sourcePage')) || 'unknown';
  const type = toCleanString(formData.get('type')) || 'Manifesto Inquiry';
  const consent = formData.get('consent');
  const toEmail = toCleanString(process.env.RESEND_TO_EMAIL) || DEFAULT_TO_EMAIL;
  const fromEmail = toCleanString(process.env.RESEND_FROM_EMAIL) || DEFAULT_FROM_EMAIL;
  const fromName = toCleanString(process.env.RESEND_FROM_NAME) || DEFAULT_FROM_NAME;
  const sender = `${fromName} <${fromEmail}>`;
  const schedulerUrl = buildSchedulerLink({ name: contactName || companyName, email: workEmail, objective });
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!process.env.RESEND_API_KEY) {
    return { error: 'EMAIL_PROVIDER_NOT_CONFIGURED' };
  }

  if (formData.get('website')) {
    return { error: 'BOT_DETECTED' };
  }

  if (!workEmail) {
    return { error: 'EMAIL_REQUIRED' };
  }

  if (!emailPattern.test(workEmail)) {
    return { error: 'INVALID_EMAIL_FORMAT' };
  }

  if (type === 'Client Discovery Inquiry' && !consent) {
    return { error: 'CONSENT_REQUIRED' };
  }

  if (type === 'Client Discovery Inquiry' && projectScope.length < 20) {
    return { error: 'SCOPE_TOO_SHORT' };
  }

  const safeCompanyName = safe(companyName || 'Unknown Entity');
  const safeContactName = safe(contactName || 'Not provided');
  const safeContactPhone = safe(contactPhone || 'Not provided');
  const safeType = safe(type);
  const safeEmail = safe(workEmail);
  const safeObjective = safe(objective || service);
  const safeBudget = safe(budgetApprox || budget);
  const safeTimeline = safe(timeline);
  const safeMeetingMode = safe(meetingMode || 'Not specified');
  const safeMeetingWindow = safe(meetingWindow || 'Not specified');
  const safeProjectScope = safe(projectScope);
  const safeSourcePage = safe(sourcePage);
  const safeTimestamp = safe(new Date().toISOString());
  const safeToEmail = safe(toEmail);
  const safeSchedulerUrl = safe(schedulerUrl);

  try {
    const { data, error } = await resend.emails.send({
      from: sender,
      to: [toEmail],
      replyTo: workEmail,
      subject: `New Hire Inquiry - ${safeCompanyName}`,
      text: [
        `Type: ${type}`,
        `Contact: ${contactName || 'Not provided'}`,
        `Company: ${companyName || 'Unknown Entity'}`,
        `Email: ${workEmail}`,
        contactPhone ? `Phone: ${contactPhone}` : '',
        objective ? `Objective: ${objective}` : '',
        budgetApprox || budget ? `Budget: ${budgetApprox || budget}` : '',
        timeline ? `Timeline: ${timeline}` : '',
        meetingMode || meetingWindow ? `Meeting: ${meetingMode || 'Not specified'} | ${meetingWindow || 'Not specified'}` : '',
        `Scope: ${projectScope}`,
        `Source: ${sourcePage}`,
        `Received UTC: ${new Date().toISOString()}`
      ].filter(Boolean).join('\n'),
      html: `
        <div style="background-color: #f8fafc; color: #0f172a; font-family: Arial, sans-serif; padding: 28px; border: 1px solid #e2e8f0;">
          <h2 style="color: #0f172a; margin: 0 0 18px; font-size: 20px;">New Hire Inquiry</h2>
          <div style="margin-bottom: 14px;">
            <p style="color: #475569; font-size: 12px; margin: 0;">Inquiry Type</p>
            <p style="font-size: 15px; margin: 4px 0 0;">${safeType}</p>
          </div>
          <div style="margin-bottom: 14px;">
            <p style="color: #475569; font-size: 12px; margin: 0;">Contact Name</p>
            <p style="font-size: 15px; margin: 4px 0 0;">${safeContactName}</p>
          </div>
          <div style="margin-bottom: 14px;">
            <p style="color: #475569; font-size: 12px; margin: 0;">Company</p>
            <p style="font-size: 15px; margin: 4px 0 0;">${safeCompanyName}</p>
          </div>
          <div style="margin-bottom: 14px;">
            <p style="color: #475569; font-size: 12px; margin: 0;">Email</p>
            <p style="font-size: 15px; margin: 4px 0 0;">${safeEmail}</p>
          </div>
          ${contactPhone ? `<div style="margin-bottom: 14px;">
            <p style="color: #475569; font-size: 12px; margin: 0;">Phone / WhatsApp</p>
            <p style="font-size: 15px; margin: 4px 0 0;">${safeContactPhone}</p>
          </div>` : ''}
          ${(objective || service) ? `<div style="margin-bottom: 20px;">
            <p style="color: #475569; font-size: 12px; margin: 0;">Objective</p>
            <p style="font-size: 15px; margin: 4px 0 0;">${safeObjective}</p>
          </div>` : ''}
          ${(budgetApprox || budget) ? `<div style="margin-bottom: 20px;">
            <p style="color: #475569; font-size: 12px; margin: 0;">Approximate Budget</p>
            <p style="font-size: 15px; margin: 4px 0 0;">${safeBudget}</p>
          </div>` : ''}
          ${timeline ? `<div style="margin-bottom: 20px;">
            <p style="color: #475569; font-size: 12px; margin: 0;">Timeline</p>
            <p style="font-size: 15px; margin: 4px 0 0;">${safeTimeline}</p>
          </div>` : ''}
          ${(meetingMode || meetingWindow) ? `<div style="margin-bottom: 20px;">
            <p style="color: #475569; font-size: 12px; margin: 0;">Meeting Preference (30 min)</p>
            <p style="font-size: 15px; margin: 4px 0 6px;">Mode: ${safeMeetingMode}</p>
            <p style="font-size: 15px; margin: 0;">Window: ${safeMeetingWindow}</p>
          </div>` : ''}
          <div style="margin-bottom: 20px;">
            <p style="color: #475569; font-size: 12px; margin: 0;">Project Scope</p>
            <p style="font-size: 15px; line-height: 1.6; color: #0f172a; margin-top: 4px;">${safeProjectScope}</p>
          </div>
          <div style="margin-bottom: 20px;">
            <p style="color: #475569; font-size: 12px; margin: 0;">Meta</p>
            <p style="font-size: 13px; line-height: 1.6; color: #334155; margin: 4px 0 2px;">Inbox: ${safeToEmail}</p>
            <p style="font-size: 13px; line-height: 1.6; color: #334155; margin: 0 0 2px;">Source: ${safeSourcePage}</p>
            <p style="font-size: 13px; line-height: 1.6; color: #334155; margin: 0;">Received (UTC): ${safeTimestamp}</p>
          </div>
          <p style="color: #64748b; font-size: 11px; margin-top: 18px;">Reply directly to this email to respond to the lead.</p>
        </div>
      `
    });

    if (error) {
      console.error('RESEND_ERROR:', error);
      return { error: `RESEND_REFUSED: ${error.message || 'Delivery rejected by provider'}` };
    }

    let confirmationSent = true;
    try {
      await resend.emails.send({
        from: sender,
        to: [workEmail],
        replyTo: toEmail,
        subject: 'GarudaNest received your inquiry',
        text: schedulerUrl
          ? `Your discovery brief has been received. You can book a slot now: ${schedulerUrl}`
          : 'Your discovery brief has been received. Our team will email 3 suggested 30-minute IST slots shortly.',
        html: `
          <div style="background-color: #f8fafc; color: #0f172a; font-family: Arial, sans-serif; padding: 28px; border: 1px solid #e2e8f0;">
            <h2 style="color: #0f172a; margin: 0 0 14px;">Inquiry Received</h2>
            <p style="font-size: 14px; line-height: 1.7; color: #334155; margin-top: 0;">
              Your discovery brief has been received successfully.
            </p>
            ${schedulerUrl ? `<p style="font-size: 14px; line-height: 1.7; color: #334155; margin-top: 10px;">
              Book your 30-minute discovery call directly: <a href="${safeSchedulerUrl}" style="color: #0ea5e9;">Open Calendly</a>
            </p>` : `<p style="font-size: 14px; line-height: 1.7; color: #334155; margin-top: 10px;">
              Our team will email 3 suggested 30-minute IST slots shortly.
            </p>`}
            <p style="font-size: 12px; color: #64748b; margin-top: 16px;">Reference: ${safe(data?.id || '')}</p>
          </div>
        `
      });
    } catch (confirmationError) {
      confirmationSent = false;
      console.warn('LEAD_CONFIRMATION_EMAIL_FAILED:', confirmationError);
    }

    return { success: true, id: data.id, confirmationSent };
  } catch (err) {
    console.error('SERVER_ACTION_ERROR:', err);
    const message = err instanceof Error ? err.message : 'Unknown server fault';
    return { error: `SERVER_FAULT: ${message}` };
  }
}

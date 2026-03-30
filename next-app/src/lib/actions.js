'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailAction(formData) {
  const companyName = formData.get('companyName');
  const workEmail = formData.get('workEmail');
  const projectScope = formData.get('projectScope');
  const service = formData.get('service');
  const budget = formData.get('budget');
  const timeline = formData.get('timeline');
  const type = formData.get('type') || 'Manifesto Inquiry';

  if (!workEmail) {
    return { error: 'EMAIL_REQUIRED' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'GarudaNest Uplink <onboarding@resend.dev>',
      to: ['teamgarudanest@gmail.com'], // Placeholder - update this in production
      subject: `[UPLINK] NEW_INQUIRY: ${companyName || 'Anonymous Node'}`,
      html: `
        <div style="background-color: #050505; color: #ffffff; font-family: 'Space Grotesk', sans-serif; padding: 40px; border: 1px solid #1a1a1a;">
          <h2 style="color: #FF6B00; text-transform: uppercase; letter-spacing: 2px;">Incoming Transmission: ${type}</h2>
          <hr style="border-color: #333; margin: 25px 0;" />
          <div style="margin-bottom: 20px;">
            <p style="color: #FF6B00; font-size: 10px; text-transform: uppercase;">Sender_Identity</p>
            <p style="font-size: 16px;">${companyName || 'Unknown Entity'}</p>
          </div>
          <div style="margin-bottom: 20px;">
            <p style="color: #FF6B00; font-size: 10px; text-transform: uppercase;">Secure_Uplink (Email)</p>
            <p style="font-size: 16px;">${workEmail}</p>
          </div>
          ${service ? `<div style="margin-bottom: 20px;">
            <p style="color: #00E5FF; font-size: 10px; text-transform: uppercase;">Primary_Objective</p>
            <p style="font-size: 16px;">${service}</p>
          </div>` : ''}
          ${budget ? `<div style="margin-bottom: 20px;">
            <p style="color: #00E5FF; font-size: 10px; text-transform: uppercase;">Investment_Tier</p>
            <p style="font-size: 16px;">${budget}</p>
          </div>` : ''}
          ${timeline ? `<div style="margin-bottom: 20px;">
            <p style="color: #00E5FF; font-size: 10px; text-transform: uppercase;">Execution_Velocity</p>
            <p style="font-size: 16px;">${timeline}</p>
          </div>` : ''}
          <div style="margin-bottom: 20px;">
            <p style="color: #FF6B00; font-size: 10px; text-transform: uppercase;">The_Mission (Scope)</p>
            <p style="font-size: 14px; line-height: 1.6; color: #cccccc;">${projectScope}</p>
          </div>
          <hr style="border-color: #333; margin: 25px 0;" />
          <p style="color: #333; font-size: 9px; text-align: center; text-transform: uppercase;">Secure Node Transmission - GarudaNest Architecture Collective</p>
        </div>
      `
    });

    if (error) {
      console.error('RESEND_ERROR:', error);
      return { error: 'RESEND_REFUSED' };
    }

    return { success: true, id: data.id };
  } catch (err) {
    console.error('SERVER_ACTION_ERROR:', err);
    return { error: 'SERVER_FAULT' };
  }
}

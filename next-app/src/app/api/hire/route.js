import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const companyName = String(body.companyName || "").trim();
    const workEmail = String(body.workEmail || "").trim();
    const projectScope = String(body.projectScope || "").trim();

    if (!companyName || !workEmail || !projectScope) {
      return NextResponse.json(
        { ok: false, error: "companyName, workEmail, and projectScope are required" },
        { status: 400 }
      );
    }

    const referenceId = `HIRE-${Date.now()}`;
    const payload = {
      referenceId,
      type: "hire",
      companyName,
      workEmail,
      projectScope,
      createdAt: new Date().toISOString(),
    };

    // Optional: forward to external backend if configured.
    const webhook = process.env.BACKEND_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    console.log("[garudanest] hire inquiry", payload);
    return NextResponse.json({ ok: true, referenceId });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload" },
      { status: 400 }
    );
  }
}

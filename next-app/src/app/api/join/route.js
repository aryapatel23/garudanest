import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim();
    const role = String(body.role || "").trim();
    const portfolio = String(body.portfolio || "").trim();

    if (!fullName || !email || !role) {
      return NextResponse.json(
        { ok: false, error: "fullName, email, and role are required" },
        { status: 400 }
      );
    }

    const referenceId = `JOIN-${Date.now()}`;
    const payload = {
      referenceId,
      type: "join",
      fullName,
      email,
      role,
      portfolio,
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

    console.log("[garudanest] join submission", payload);
    return NextResponse.json({ ok: true, referenceId });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload" },
      { status: 400 }
    );
  }
}

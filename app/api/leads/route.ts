/**
 * POST /api/leads
 * Receives a booking / inquiry / contact submission from the website, persists
 * the lead, then fires WhatsApp messages via AiSensy:
 *   • instant thank-you to the GUEST
 *   • lead notification to the HOTEL
 * Always returns 200 with a JSON result so the form UX never breaks, even if
 * WhatsApp delivery is delayed/misconfigured (failures are logged + retried).
 */
import { NextResponse } from "next/server";
import type { Lead, LeadKind } from "@/lib/leads/types";
import { newLeadId, saveLead } from "@/lib/leads/store";
import { sendBookingConfirmation, sendInquiryNotification, sendContactFormLead } from "@/lib/aisensy/messages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const clean = (v: unknown, max = 600) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const digits = (v: unknown) => clean(v).replace(/[^\d]/g, "");

export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try { raw = await req.json(); } catch { return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 }); }

  // Honeypot: bots fill hidden fields → silently accept, do nothing.
  if (clean(raw.company)) return NextResponse.json({ ok: true });

  const kind = (["booking", "inquiry", "contact"].includes(String(raw.kind)) ? raw.kind : "inquiry") as LeadKind;
  const name = clean(raw.name, 120);
  let phone = digits(raw.phone);
  if (phone && phone.length === 10) phone = "91" + phone; // default to India country code

  if (!name || phone.length < 10) {
    return NextResponse.json({ ok: false, error: "name and a valid phone are required" }, { status: 422 });
  }

  const lead: Lead = {
    id: newLeadId(),
    kind,
    name,
    phone,
    email: clean(raw.email, 160) || undefined,
    roomType: clean(raw.roomType || raw.room, 80) || undefined,
    checkin: clean(raw.checkin, 20) || undefined,
    checkout: clean(raw.checkout, 20) || undefined,
    guests: clean(raw.guests, 10) || undefined,
    message: clean(raw.message, 600) || undefined,
    source: clean(raw.source, 80) || "website",
    createdAt: new Date().toISOString(),
  };

  await saveLead(lead);

  // Fire WhatsApp messages in parallel; never let a failure break the response.
  const [guest, admin] = await Promise.allSettled([
    kind === "contact" ? Promise.resolve({ ok: true } as const) : sendBookingConfirmation(lead),
    kind === "contact" ? sendContactFormLead(lead) : sendInquiryNotification(lead),
  ]);

  const result = (r: PromiseSettledResult<{ ok: boolean }>) =>
    r.status === "fulfilled" ? r.value.ok : false;

  return NextResponse.json({
    ok: true,
    leadId: lead.id,
    whatsapp: { guestNotified: result(guest), hotelNotified: result(admin) },
  });
}

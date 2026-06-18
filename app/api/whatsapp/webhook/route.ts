/**
 * WhatsApp inbound webhook.
 *
 * GET  — verification handshake. Supports two styles:
 *        • Meta/WhatsApp Cloud: ?hub.mode=subscribe&hub.verify_token=...&hub.challenge=...
 *        • Generic/AiSensy:      ?verify_token=...  → echoes "ok"
 *        The token must equal WHATSAPP_WEBHOOK_VERIFY_TOKEN.
 * POST — receives incoming message events; validates the shared secret, logs the
 *        payload (structured) so replies/automation can be built on top.
 */
import { NextResponse } from "next/server";
import { aisensyConfig } from "@/lib/aisensy/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const token = () => aisensyConfig.webhookVerifyToken;

function log(event: string, data: Record<string, unknown>) {
  console.log(JSON.stringify({ ts: new Date().toISOString(), scope: "wa-webhook", event, ...data }));
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const hubMode = url.searchParams.get("hub.mode");
  const hubToken = url.searchParams.get("hub.verify_token");
  const hubChallenge = url.searchParams.get("hub.challenge");
  const genericToken = url.searchParams.get("verify_token");

  if (!token()) return new NextResponse("verify token not configured", { status: 500 });

  // Meta Cloud API style
  if (hubMode === "subscribe" && hubToken === token() && hubChallenge) {
    log("verified", { style: "meta" });
    return new NextResponse(hubChallenge, { status: 200 });
  }
  // Generic / AiSensy style
  if (genericToken && genericToken === token()) {
    log("verified", { style: "generic" });
    return new NextResponse("ok", { status: 200 });
  }
  log("verify_failed", {});
  return new NextResponse("forbidden", { status: 403 });
}

export async function POST(req: Request) {
  // Shared-secret check: header `x-webhook-token` or `?token=` must match.
  const url = new URL(req.url);
  const provided = req.headers.get("x-webhook-token") || url.searchParams.get("token") || "";
  if (token() && provided !== token()) {
    log("unauthorized", {});
    return new NextResponse("unauthorized", { status: 401 });
  }

  let body: unknown = null;
  try { body = await req.json(); } catch { body = await req.text().catch(() => null); }
  log("inbound", { body });

  // Always 200 quickly so the provider doesn't retry/disable the webhook.
  return NextResponse.json({ ok: true });
}

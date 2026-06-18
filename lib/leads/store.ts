/**
 * Lead persistence (server-only).
 *
 * Serverless file systems are ephemeral, so leads are:
 *   1) ALWAYS written as a structured log line (captured by Vercel logs), and
 *   2) persisted to Vercel KV if KV_REST_API_URL + KV_REST_API_TOKEN are set
 *      (no extra dependency — uses the KV REST API over fetch).
 *
 * To use Postgres instead: implement `persist()` with your driver and keep the
 * same interface. The rest of the app is unaffected.
 */
import "server-only";
import type { Lead } from "./types";

export function newLeadId(): string {
  return `lead_${Date.now().toString(36)}_${Math.round(Math.random() * 1e6).toString(36)}`;
}

async function persistToKV(lead: Lead): Promise<boolean> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return false;
  try {
    // LPUSH leads <json> — newest first. Pipeline keeps it to one round-trip.
    const res = await fetch(`${url}/lpush/leads`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(JSON.stringify(lead)),
      cache: "no-store",
    });
    return res.ok;
  } catch (e) {
    console.error(JSON.stringify({ scope: "leads", event: "kv_error", error: String(e) }));
    return false;
  }
}

export async function saveLead(lead: Lead): Promise<{ stored: boolean }> {
  // 1) Always log (audit trail, survives even with no DB configured).
  console.log(JSON.stringify({ ts: lead.createdAt, scope: "leads", event: "new_lead", lead }));
  // 2) Best-effort durable store.
  const stored = await persistToKV(lead);
  return { stored };
}

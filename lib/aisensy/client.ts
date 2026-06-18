/**
 * AiSensy Campaign API client — server-only.
 * Sends business-initiated WhatsApp template messages with structured logging,
 * typed error handling and an exponential-backoff retry mechanism.
 */
import "server-only";
import { aisensyConfig, isAisensyConfigured } from "./config";

export type CampaignPayload = {
  campaignName: string;
  destination: string; // phone with country code, digits only (e.g. 919829000000)
  userName: string; // recipient display name
  templateParams?: string[]; // ordered body {{1}},{{2}}... values
  tags?: string[];
  attributes?: Record<string, string>;
  source?: string;
};

export type SendResult =
  | { ok: true; attempts: number; response: unknown }
  | { ok: false; attempts: number; error: string; status?: number; response?: unknown };

const MAX_ATTEMPTS = 3;
const BASE_DELAY_MS = 600;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const normalize = (phone: string) => phone.replace(/[^\d]/g, "");

function log(level: "info" | "warn" | "error", event: string, data: Record<string, unknown>) {
  // Structured single-line JSON → captured by Vercel logs. Never logs the API key.
  const line = JSON.stringify({ ts: new Date().toISOString(), scope: "aisensy", level, event, ...data });
  (level === "error" ? console.error : level === "warn" ? console.warn : console.log)(line);
}

/** Core sender. Resolves to a typed result — NEVER throws (route stays alive). */
export async function sendCampaign(payload: CampaignPayload): Promise<SendResult> {
  if (!isAisensyConfigured()) {
    log("error", "not_configured", { campaign: payload.campaignName });
    return { ok: false, attempts: 0, error: "AISENSY_API_KEY is not set on the server" };
  }

  const body = {
    apiKey: aisensyConfig.apiKey, // kept server-side; injected here only
    campaignName: payload.campaignName,
    destination: normalize(payload.destination),
    userName: payload.userName || "Guest",
    templateParams: payload.templateParams ?? [],
    source: payload.source ?? "website",
    tags: payload.tags ?? ["website-lead"],
    attributes: payload.attributes ?? {},
  };

  let lastErr = "unknown error";
  let lastStatus: number | undefined;
  let lastResponse: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12_000);
      const res = await fetch(aisensyConfig.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timeout);

      const text = await res.text();
      let json: unknown = text;
      try { json = JSON.parse(text); } catch { /* keep raw text */ }
      lastResponse = json;
      lastStatus = res.status;

      if (res.ok) {
        log("info", "sent", { campaign: body.campaignName, to: body.destination, attempt, status: res.status });
        return { ok: true, attempts: attempt, response: json };
      }

      lastErr = `HTTP ${res.status}`;
      // 4xx (except 429) are not retryable — bad template/params/number.
      const retryable = res.status === 429 || res.status >= 500;
      log(retryable ? "warn" : "error", "send_failed", {
        campaign: body.campaignName, to: body.destination, attempt, status: res.status, retryable, response: json,
      });
      if (!retryable) break;
    } catch (e) {
      lastErr = e instanceof Error ? e.message : String(e);
      log("warn", "send_exception", { campaign: body.campaignName, attempt, error: lastErr });
    }

    if (attempt < MAX_ATTEMPTS) await sleep(BASE_DELAY_MS * 2 ** (attempt - 1)); // 600ms, 1200ms
  }

  return { ok: false, attempts: MAX_ATTEMPTS, error: lastErr, status: lastStatus, response: lastResponse };
}

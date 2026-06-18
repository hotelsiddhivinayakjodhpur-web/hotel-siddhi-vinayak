/**
 * AiSensy WhatsApp — central admin configuration.
 *
 * SECRETS LIVE IN ENVIRONMENT VARIABLES ONLY (never hard-coded, never shipped to
 * the browser). This file runs server-side only. Set the values in:
 *   • local dev  → .env.local   (gitignored)
 *   • production → Vercel → Project → Settings → Environment Variables
 *
 * 👉 Your AiSensy "API Campaign" key goes in  AISENSY_API_KEY
 *    (AiSensy Dashboard → Manage → API Key / Developer Hub → copy the long token).
 */
import { site } from "@/lib/config";

function required(name: string, value: string | undefined): string {
  if (!value || value.trim() === "") {
    // Don't crash the build/route — log loudly and let callers handle the result.
    console.error(`[aisensy] Missing required env var: ${name}`);
    return "";
  }
  return value.trim();
}

export const aisensyConfig = {
  /** AiSensy Campaign API endpoint (v2). Override via env only if AiSensy changes it. */
  apiUrl: process.env.AISENSY_API_URL?.trim() || "https://backend.aisensy.com/campaign/t1/api/v2",

  /** 🔑 The AiSensy API Campaign Key. Read ONLY from the server environment. */
  apiKey: required("AISENSY_API_KEY", process.env.AISENSY_API_KEY),

  /** Hotel's WhatsApp number that receives lead notifications (country code, no +). */
  adminNumber: (process.env.ADMIN_WHATSAPP_NUMBER?.trim() || site.whatsapp).replace(/[^\d]/g, ""),

  /** Shared secret used to verify inbound webhook calls. */
  webhookVerifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN?.trim() || "",

  /**
   * AiSensy Campaign / Template names. Each must be an APPROVED template created
   * in AiSensy (WhatsApp requires pre-approved templates for business-initiated
   * messages). Defaults can be overridden by env so non-devs can rename templates.
   */
  templates: {
    guestThankYou: process.env.AISENSY_TPL_GUEST_THANKYOU?.trim() || "guest_thank_you",
    bookingConfirmation: process.env.AISENSY_TPL_BOOKING?.trim() || "booking_confirmation",
    adminLeadNotification: process.env.AISENSY_TPL_ADMIN_LEAD?.trim() || "admin_lead_notification",
  },

  brand: {
    name: site.name,
    location: `${site.address.locality}, ${site.address.region}`,
  },
} as const;

export const isAisensyConfigured = () => aisensyConfig.apiKey.length > 0;

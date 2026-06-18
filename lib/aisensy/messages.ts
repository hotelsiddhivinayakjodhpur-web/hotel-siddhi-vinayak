/**
 * Reusable WhatsApp message helpers (server-only). Each maps to an APPROVED
 * AiSensy template. Template body params are positional ({{1}}, {{2}}, ...).
 */
import "server-only";
import { sendCampaign, type SendResult } from "./client";
import { aisensyConfig } from "./config";
import type { Lead } from "@/lib/leads/types";

const T = aisensyConfig.templates;
const dash = (v?: string) => (v && v.trim() ? v.trim() : "-");

/** Generic sender — send any approved template with ordered params. */
export function sendTextMessage(
  to: string,
  campaignName: string,
  params: string[] = [],
  userName = "Guest",
): Promise<SendResult> {
  return sendCampaign({ campaignName, destination: to, userName, templateParams: params, tags: ["website"] });
}

/** Instant thank-you to the GUEST who submitted a booking/inquiry.
 *  Template e.g.: "Hi {{1}}, thanks for your enquiry at Hotel Siddhi Vinayak for
 *  the {{2}}. Our team will confirm availability on WhatsApp shortly." */
export function sendBookingConfirmation(lead: Lead): Promise<SendResult> {
  return sendCampaign({
    campaignName: T.guestThankYou,
    destination: lead.phone,
    userName: lead.name || "Guest",
    templateParams: [lead.name || "Guest", dash(lead.roomType)],
    tags: ["guest", lead.kind],
    attributes: { source: lead.source, leadId: lead.id },
  });
}

/** Notify the HOTEL of a new booking/inquiry lead.
 *  Template params: name, phone, room, check-in, check-out, guests, message. */
export function sendInquiryNotification(lead: Lead): Promise<SendResult> {
  return sendCampaign({
    campaignName: T.adminLeadNotification,
    destination: aisensyConfig.adminNumber,
    userName: aisensyConfig.brand.name,
    templateParams: [
      dash(lead.name), dash(lead.phone), dash(lead.roomType),
      dash(lead.checkin), dash(lead.checkout), dash(lead.guests), dash(lead.message),
    ],
    tags: ["admin", "inquiry"],
    attributes: { leadId: lead.id },
  });
}

/** Notify the HOTEL of a new contact-form lead. */
export function sendContactFormLead(lead: Lead): Promise<SendResult> {
  return sendCampaign({
    campaignName: T.adminLeadNotification,
    destination: aisensyConfig.adminNumber,
    userName: aisensyConfig.brand.name,
    templateParams: [
      dash(lead.name), dash(lead.phone), "Contact form",
      "-", "-", "-", dash(lead.message),
    ],
    tags: ["admin", "contact"],
    attributes: { leadId: lead.id },
  });
}

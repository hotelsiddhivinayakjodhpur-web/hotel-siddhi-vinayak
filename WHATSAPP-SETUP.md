# WhatsApp (AiSensy) Integration — Setup Guide

Production-ready WhatsApp Business API integration for Hotel Siddhi Vinayak, built
on AiSensy's Campaign API. Secrets live in environment variables only and are
never exposed to the browser (all WhatsApp code runs server-side).

## 1. Folder structure
```
lib/aisensy/
  config.ts        # admin config — reads env (API key, number, template names)
  client.ts        # core sender: fetch + retry (backoff) + structured logging
  messages.ts      # sendTextMessage / sendBookingConfirmation /
                   #   sendInquiryNotification / sendContactFormLead
lib/leads/
  types.ts         # Lead type
  store.ts         # saveLead() — logs + optional Vercel KV
app/api/
  leads/route.ts            # POST: save lead + fire WhatsApp (guest + hotel)
  whatsapp/webhook/route.ts # GET verify + POST inbound messages
components/InquiryForm.tsx   # posts to /api/leads on submit
.env.example                 # all env vars (copy to .env.local)
```

## 2. Environment variables  → where the API key goes
Copy `.env.example` to **`.env.local`** (local) and add the same keys in
**Vercel → Settings → Environment Variables** (Production + Preview).

| Variable | Value |
|----------|-------|
| **`AISENSY_API_KEY`** | **🔑 Your AiSensy API Campaign Key** — AiSensy Dashboard → **Manage → API Key** (the long token). Paste it here. Used only on the server. |
| `ADMIN_WHATSAPP_NUMBER` | Hotel's WhatsApp number, country code, no `+` (e.g. `918952802559`) |
| `AISENSY_TPL_GUEST_THANKYOU` | approved template name for the guest thank-you |
| `AISENSY_TPL_ADMIN_LEAD` | approved template name for the hotel lead alert |
| `WHATSAPP_WEBHOOK_VERIFY_TOKEN` | any long random string (used to verify the webhook) |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | optional — Vercel KV for durable lead storage |

> The key is read **only** in `lib/aisensy/config.ts` as `process.env.AISENSY_API_KEY`
> and injected into the request body inside `lib/aisensy/client.ts`. It is never
> imported into any client component or sent to the browser.

## 3. Create the AiSensy templates
WhatsApp requires **pre-approved templates** for business-initiated messages.
In AiSensy → **Templates**, create (names must match your env values):

- **guest_thank_you** — e.g. `Hi {{1}}, thank you for your enquiry at Hotel Siddhi Vinayak for the {{2}}. Our team will confirm availability on WhatsApp shortly.`
- **admin_lead_notification** — e.g. `New website lead 🔔%0AName: {{1}}%0APhone: {{2}}%0ARoom: {{3}}%0ACheck-in: {{4}}%0ACheck-out: {{5}}%0AGuests: {{6}}%0AMessage: {{7}}`

Then create a **Campaign** (API type) for each and confirm the campaign name
equals the template name (or set the env var to the campaign name).

## 4. Webhook setup (incoming messages)
- **URL:** `https://hotelsiddhi-vinayak.com/api/whatsapp/webhook`
- **Verify:** open `…/api/whatsapp/webhook?verify_token=YOUR_TOKEN` → returns `ok`.
  (Meta Cloud style `?hub.mode=subscribe&hub.verify_token=…&hub.challenge=…` is also supported.)
- **Inbound POSTs** must include the secret: header `x-webhook-token: YOUR_TOKEN`
  (or `?token=YOUR_TOKEN`). Payloads are logged (Vercel → Logs) ready for automation.

## 5. Deployment
1. Add all env vars in Vercel (Production + Preview).
2. Push to `main` → Vercel auto-deploys. No code change needed to enable it.
3. (Optional) Storage → KV → create a store; the env keys auto-populate.

## 6. Testing
**Lead endpoint (sends WhatsApp):**
```bash
curl -X POST https://hotelsiddhi-vinayak.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{"kind":"booking","name":"Test Guest","phone":"9829000000","roomType":"Deluxe Room","checkin":"2026-07-01","checkout":"2026-07-03","guests":"2","message":"Test"}'
# → {"ok":true,"leadId":"lead_…","whatsapp":{"guestNotified":true,"hotelNotified":true}}
```
**Webhook verify:**
```bash
curl "https://hotelsiddhi-vinayak.com/api/whatsapp/webhook?verify_token=YOUR_TOKEN"   # → ok
```
- Submit the on-site **Booking/Inquiry form** → check the guest phone receives the
  thank-you and the hotel number receives the alert.
- Check **Vercel → Logs** for `scope":"aisensy"` (sent/failed) and `scope":"leads"`.

## Notes
- `sendCampaign()` retries `429`/`5xx` with exponential backoff (3 attempts) and
  never throws — a delivery failure never breaks form submission.
- Free-text (session) messages only work inside WhatsApp's 24-hour window; outside
  it, only approved templates send — that's why the helpers use templates.
- Until `AISENSY_API_KEY` is set, the form still works (saves lead + opens the
  guest's WhatsApp); the server-sent template messages simply no-op and log a
  clear "not configured" warning.

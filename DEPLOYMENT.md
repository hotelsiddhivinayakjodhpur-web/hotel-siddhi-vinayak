# Hotel Siddhi Vinayak — Deployment & Launch Guide

Canonical domain (the only one): **https://hotelsiddhi-vinayak.com**
Stack: Next.js 15 (App Router) · Tailwind · deployed on Vercel.

---

## 1. Vercel deployment configuration

1. **Import the repo** → vercel.com → *Add New… → Project* → import
   `hotelsiddhivinayakjodhpur-web/hotel-siddhi-vinayak` from GitHub.
2. **Framework preset:** Next.js (auto-detected). Leave defaults:
   - Build command: `next build`
   - Output: `.next` (managed by Vercel)
   - Install command: `npm install`
   - Node.js version: 20.x (Project → Settings → General).
3. **Environment variables:** none required for the current build.
   (Add `NEXT_PUBLIC_GA_ID` later — see §6.)
4. `vercel.json` (in repo) already sets security headers, the www→apex redirect,
   and the correct `text/plain` type for `/llms.txt`.
5. Deploy. Every push to `main` auto-deploys production; PRs get preview URLs.

> Build note: `next/font` fetches Cormorant Garamond + Inter from
> `fonts.googleapis.com` at build time. Vercel's build network allows this — no action needed.

---

## 2. Domain configuration for hotelsiddhi-vinayak.com

**Project → Settings → Domains:**

1. Add **`hotelsiddhi-vinayak.com`** → set as **Primary**.
2. Add **`www.hotelsiddhi-vinayak.com`** → choose **Redirect to `hotelsiddhi-vinayak.com`** (308).
3. DNS (at your registrar):
   - Apex `@` → Vercel: `A 76.76.21.21` **or** `ALIAS/ANAME` → `cname.vercel-dns.com`.
   - `www` → `CNAME cname.vercel-dns.com`.
4. Wait for "Valid Configuration" + automatic SSL (Let's Encrypt) to issue.

### Legacy domains (redirect only — never canonical)
If `hotelsiddhivinayak.com` and/or `hotelsiddhivinayakjodhpur.com` are still
registered, point them at this project too and set each to **Redirect → `https://hotelsiddhi-vinayak.com`**
in Vercel Domains. This is done at the platform level on purpose — the codebase
references no domain other than the canonical one.

---

## 3. WWW → non-WWW redirects

Handled in **two** layers (defence in depth):
- **Edge (preferred):** Vercel Domains redirect (§2.2) + `vercel.json` `redirects` rule.
- **App fallback:** `middleware.ts` folds `www.` → apex with a 301.

Verify after deploy:
```bash
curl -sI https://www.hotelsiddhi-vinayak.com | grep -i location
# → location: https://hotelsiddhi-vinayak.com/
```

---

## 4. Google Search Console setup

1. console.google.com/search → *Add property* → **Domain** property
   (`hotelsiddhi-vinayak.com`) — covers http/https + www + all paths.
2. Verify via **DNS TXT** record at your registrar (Search Console gives the value).
3. **Submit sitemap:** Sitemaps → add `https://hotelsiddhi-vinayak.com/sitemap.xml`.
4. **Request indexing** for the homepage and `/rooms` via URL Inspection.
5. **Rich results:** after a few days check *Enhancements* for Hotel / FAQ /
   Breadcrumb / Review eligibility. Validate now with the
   [Rich Results Test](https://search.google.com/test/rich-results?url=https://hotelsiddhi-vinayak.com).
6. **Google Business Profile:** create/claim it, match NAP exactly to the site,
   then add the GBP + any OTA URLs to `site.social` (becomes schema `sameAs`).

---

## 5. Google Hotel / local SEO

- Keep `Hotel` + `LodgingBusiness` schema NAP **identical** to Google Business Profile.
- In GBP: set category *Hotel*, add real photos, amenities, check-in/out, and link
  `https://hotelsiddhi-vinayak.com`.
- Verify the map pin: update `site.geo` and `site.mapsEmbed` to the **exact** hotel
  location (currently a generic Jodhpur centroid — see §8).

---

## 6. Analytics setup

**Option A — Vercel Analytics (privacy-friendly, fastest):**
```bash
npm i @vercel/analytics @vercel/speed-insights
```
In `app/layout.tsx` `<body>`:
```tsx
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
// …<Analytics /> <SpeedInsights /> before </body>
```
Enable both in the Vercel dashboard (Speed Insights gives field Core Web Vitals).

**Option B — Google Analytics 4 (with Tag/conversions):**
- Add `NEXT_PUBLIC_GA_ID=G-XXXXXXX` env var.
- Use `@next/third-parties`:
```bash
npm i @next/third-parties
```
```tsx
import { GoogleAnalytics } from "@next/third-parties/google";
// <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} /> in layout
```
- **Track conversions:** fire events on the WhatsApp/Call buttons and InquiryForm
  submit (e.g. `gtag('event','generate_lead',{method:'whatsapp'})`). Mark
  `generate_lead` as a Key Event in GA4.

---

## 7. Pre-launch checklist

**Blocking (do before DNS cutover):**
- [ ] Create **`public/og-image.jpg`** (1200×630) — currently referenced but missing → social/share cards 404. (§8)
- [ ] Replace **stock Unsplash images** with real hotel photos (`lib/data.ts`, page heroes).
- [ ] Replace placeholder **phone** `+91 98290 00000` with the real number (`lib/config.ts`).
- [ ] Confirm **email** `hotelsiddhivinayakjodhpur@gmail.com` mailbox exists/forwards.
- [ ] Replace seeded **reviews** with real verified guest reviews (`lib/data.ts`).
- [ ] Set exact **geo + map embed** (`site.geo`, `site.mapsEmbed`).

**Verify after deploy:**
- [ ] `https://hotelsiddhi-vinayak.com` loads with valid SSL.
- [ ] `www` and any legacy domain 301/308 → apex.
- [ ] `/sitemap.xml` and `/robots.txt` show the hyphenated domain only.
- [ ] `/llms.txt` serves as text/plain.
- [ ] Rich Results Test passes for Hotel, FAQ, Breadcrumb, Review, Offer.
- [ ] Mobile: sticky booking bar visible, WhatsApp/Call work, lightbox works.
- [ ] Lighthouse (mobile) Performance/SEO/Best-Practices/Accessibility ≥ 90.
- [ ] Submit sitemap in Search Console; request indexing.

---

## 8. Known production issues to fix before launch

| # | Issue | File | Severity |
|---|-------|------|----------|
| 1 | `og-image.jpg` missing (referenced in metadata + schema) | `public/` | **P0** |
| 2 | All images are Unsplash stock, not the real hotel | `lib/data.ts`, page heroes | **P0** |
| 3 | Placeholder phone `+91 98290 00000` | `lib/config.ts` | **P0** |
| 4 | Seeded (not real) guest reviews behind 4.6/248 rating | `lib/data.ts` | **P1** |
| 5 | Map embed + geo are generic Jodhpur, not exact hotel | `lib/config.ts` | **P1** |
| 6 | `sameAs` lacks Google Business Profile + OTA links | `lib/config.ts` | **P1** |
| 7 | Verify email mailbox is live | `lib/config.ts` | **P1** |

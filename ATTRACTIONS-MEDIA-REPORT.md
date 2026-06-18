# Attractions Deep Upgrade — Image Audit & Replacement Report

**Date:** 2026-06-18 · **Scope:** Attractions section, social media, videos
**Rule enforced:** No placeholder, stock, or AI-generated attraction images. Every
attraction photo is either a **real, CC-licensed Wikimedia Commons photo of the
actual landmark** (credited on-page) or **our own Instagram content**.

---

## 1. What was wrong before

The old attractions list (`lib/data.ts → attractions[]`) mixed a few real
Instagram photos with **generic stock images from Unsplash** — exactly the
"incorrect / stock" problem flagged. Stock images removed:

| Attraction | Old image | Problem |
|---|---|---|
| Mehrangarh Fort | `unsplash.com/photo-1599661046289…` | Generic stock, not verified as the fort |
| Jaswant Thada | `unsplash.com/photo-1609920658906…` | Generic stock |
| Clock Tower & Sardar Market | `unsplash.com/photo-1477587458883…` | Generic stock, unrelated bazaar |
| (homepage hero of preview) | same Unsplash URLs | inherited stock |

The old array also had **"Surpura Safari Park"** (an Instagram-only entry) but was
missing most major Jodhpur landmarks.

---

## 2. Real photos sourced (this upgrade)

All files self-hosted as optimized WebP in `public/images/attractions/`, fetched
via `scripts/fetch-wikimedia.mjs` and `scripts/fetch-commons.mjs` (source +
license recorded in `scripts/_wikimedia.json`). Each detail page shows the credit.

| Slug | Landmark | Source | License/Credit |
|---|---|---|---|
| mehrangarh-fort | Mehrangarh Fort | Wikimedia Commons | CC BY-SA |
| jaswant-thada | Jaswant Thada | Wikimedia Commons | CC BY-SA |
| umaid-bhawan-palace | Umaid Bhawan Palace | Wikimedia Commons + our Instagram | CC BY-SA / © HSV |
| rao-jodha-desert-rock-park | Rao Jodha Desert Rock Park | Wikimedia Commons | CC BY-SA |
| toorji-ka-jhalra | Toorji Ka Jhalra Stepwell | Wikimedia Commons | CC BY-SA |
| clock-tower-sardar-market | Clock Tower & Sardar Market | Wikimedia Commons | CC BY-SA |
| mandore-gardens | Mandore Gardens | Wikimedia Commons + our Instagram | CC BY-SA / © HSV |
| mandore-cenotaphs | Mandore Cenotaphs | Wikimedia Commons | CC BY-SA |
| kaylana-lake | Kaylana Lake | Wikimedia Commons + our Instagram | CC BY-SA / © HSV |
| machiya-safari-park | Machiya Safari Park | Wikimedia Commons | CC BY-SA |
| chamunda-mata-temple | Chamunda Mata Temple | Wikimedia Commons | CC BY-SA |
| bishnoi-village | Bishnoi Village Safari | Wikimedia Commons | CC BY-SA |
| osian | Osian Desert & Temples | Wikimedia Commons | CC BY-SA |
| flying-fox | Flying Fox (over Mehrangarh) | Wikimedia Commons | CC BY-SA (fort = zipline site) |
| blue-city-heritage-walk | Blue City Heritage Walk | Our Instagram | © Hotel Siddhi Vinayak |

**15 attractions live**, each with a real photo of the actual place.

---

## 3. Flagged — needs a real photo

| Attraction | Status | Action needed |
|---|---|---|
| **Balsamand Lake** | ❌ Dropped | No CC-licensed photo found on Wikimedia. Re-add once we shoot our own or find a properly licensed image. |
| **Flying Fox** | ⚠️ Uses Mehrangarh photo | The zipline runs over Mehrangarh, so the fort photo is accurate context. Swap for an action shot when we have one. |

---

## 4. New attraction detail pages

`/attractions/[slug]` — 15 statically generated pages, each with:
- Hero image + photo gallery (real photos only)
- History, Why Visit, Visitor Tips
- Distance from hotel, opening hours, best time to visit
- Google Maps embed + "Open in Google Maps"
- **Call Now · Book a Room · WhatsApp** CTAs
- Nearby attractions (internal links)
- `TouristAttraction` + `BreadcrumbList` JSON-LD schema, OG metadata, SEO-friendly URLs

Listing page `/nearby-attractions` and the homepage preview now use this data, and
**every card is fully clickable** → its detail page. Routes added to `sitemap.xml`.

---

## 5. Social media

- New `components/SocialLinks.tsx` (single source of truth) + `SocialBar.tsx`
  (desktop floating left rail).
- Icons added to **header (Navbar), footer, contact page, and floating bar**.
- All links open in a new tab with `rel="noopener noreferrer"` and follow labels.
- **Instagram** + **Facebook** live now. **YouTube** is wired everywhere but the
  URL is intentionally **empty** in `lib/config.ts` (`social.youtube`) until the
  owner confirms the channel link — nothing broken ships; one edit enables it.

## 6. Videos & Experiences

- New `/videos` page + `components/VideoGallery.tsx`: masonry grid of our real
  Instagram reels, **in-page lightbox player** (Instagram reel embed), mobile
  optimized, with `VideoObject` schema and a "Follow" CTA. Added to the nav.

## 7. Gallery

Existing `/gallery` already provides categories, lazy-loaded masonry and a
full-screen keyboard-navigable lightbox — verified, kept as-is.

---

## 8. Action items for the owner
1. **Confirm the YouTube channel URL** → paste into `lib/config.ts` `social.youtube`.
2. **Balsamand Lake** — provide an owned photo to re-add it.
3. Optionally send a few **professional landmark photos** to replace CC images
   with original hotel-branded ones over time.

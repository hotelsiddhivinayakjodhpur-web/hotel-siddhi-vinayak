# Blog Deep Upgrade — Image Audit & Content Report

**Date:** 2026-06-18 · **Scope:** Entire blog (audit, image replacement, 15 new posts, design + SEO)
**Rule enforced:** Real Jodhpur photos only. No stock, no Jaipur, no resort/generic
travel stock, no AI. Images are self-hosted WebP, sourced from Wikimedia Commons
(CC BY-SA, credited) or our own Instagram.

---

## 1. Audit of the old blog (what was wrong)

The previous blog had **3 posts, each using a stock Unsplash image** — including the
exact wrong-city / unrelated photos that were flagged:

| Post | Old image | Problem | Replaced with |
|---|---|---|---|
| Best Time to Visit Jodhpur | `unsplash…1477587458883` (Hawa Mahal) | **Wrong city — that's Jaipur** | Real Jodhpur Blue City skyline (`/images/blog/jodhpur-blue-city.webp`) |
| How to Reach Hotel Siddhi Vinayak | `unsplash…1566073771259` (resort/pool) | **Unrelated resort stock** | Jodhpur Junction railway station + Jodhpur Airport (real) |
| Top 10 Things To Do in Jodhpur | `unsplash…1599661046289` | Generic stock | Real Mehrangarh Fort, Jaswant Thada, Toorji, Clock Tower, Umaid Bhawan |
| Blog hero / listing | `unsplash…1477587458883` (Hawa Mahal) | **Wrong city — Jaipur** | Real Jodhpur Blue City skyline |

**Every Unsplash URL has been removed from the blog and from `lib/data.ts`.** Verified
live: no `unsplash` reference on any blog page.

---

## 2. New real images sourced

Fetched via `scripts/fetch-blog-media.mjs` (source + license recorded in
`scripts/_blog-media.json`), optimized to WebP in `public/images/blog/`:

| File | Subject | Source | License |
|---|---|---|---|
| jodhpur-blue-city.webp | Jodhpur Blue City skyline / Mehrangarh aerial | Wikimedia Commons (Wikipedia "Jodhpur") | CC BY-SA |
| jodhpur-railway-station.webp | Jodhpur Junction railway station | Wikimedia Commons | CC BY-SA |
| jodhpur-airport.webp | Jodhpur Airport | Wikimedia Commons | CC BY-SA |

All other blog imagery **reuses the real attraction photos** already self-hosted in
`public/images/attractions/` (Mehrangarh, Jaswant Thada, Toorji, Clock Tower, Umaid
Bhawan, Mandore, Kaylana, Osian, Chamunda, Rao Jodha, Machiya) plus our own Instagram
shots (Blue City, Umaid Bhawan). Every image carries an on-page credit.

---

## 3. Topic image mapping (as requested)

- **Top 10 Things To Do** → Mehrangarh Fort, Jaswant Thada, Toorji Ka Jhalra, Clock Tower Market, Umaid Bhawan ✓
- **Best Time To Visit** → Real Jodhpur skyline (hero), Mehrangarh Fort view, Blue City aerial ✓
- **How To Reach** → Jodhpur Airport, Jodhpur Railway Station, Hotel Siddhi Vinayak exterior ✓

---

## 4. 15 new premium SEO blog posts (+ 3 upgraded = 18 total)

All written by the local team, **1,500–2,000+ words each**, with real photos,
internal links, distances from the hotel, Google-mappable attractions, FAQ sections
and Book/Call/WhatsApp CTAs:

1. Complete Jodhpur Travel Guide (pillar)
2. 2-Day Jodhpur Itinerary
3. 3-Day Jodhpur Itinerary
4. Best Places to Visit in Jodhpur
5. Hidden Gems of Jodhpur
6. Family Trip Guide to Jodhpur
7. Jodhpur Food Guide
8. Shopping in Jodhpur
9. Best Sunset Points in Jodhpur
10. Jodhpur Heritage Walk Guide
11. Weekend Trip to Jodhpur
12. Jodhpur in Winter
13. Jodhpur in Monsoon
14. Famous Temples of Jodhpur
15. Why Stay at Hotel Siddhi Vinayak

**Upgraded originals (real images, expanded):** Top 10 Things To Do, Best Time to
Visit, How to Reach Hotel Siddhi Vinayak.

---

## 5. SEO implemented per post

- Unique `<title>` (metaTitle) and meta description
- Open Graph image (the post's real hero) + article published/modified times
- `BlogPosting` + `FAQPage` + `BreadcrumbList` JSON-LD
- A `Blog` schema on the listing page
- SEO-friendly slugs; all routes added to `sitemap.xml`
- Internal links to attraction detail pages and related articles
- Distances from the hotel and related-attraction cards (Google-mappable)

---

## 6. Design improvements

- **Reading-time indicator** (auto-computed from word count) on cards and posts
- **Author section** (local-host byline + bio box)
- **Sticky table of contents** with scroll-spy (desktop sidebar; collapsible on mobile)
- **Social share buttons** (WhatsApp, Facebook, X, copy-link) at top and bottom
- **Previous / Next** article navigation
- **Related Articles** section (scored by category + tags)
- **Related attractions** cards linking into the attraction detail pages
- Featured-post hero on the blog index; category badges throughout
- Inline + sticky **Book Room / Call Hotel / WhatsApp** conversion CTAs

---

## 7. Verification

- `npm run build`: green — 18 blog posts statically generated (52 pages total)
- Live preview: blog post returns 200 with H1, TOC, FAQ, reading time, related
  articles; new blog images return 200; **no Unsplash anywhere**; no console errors
- Best Time hero = real Blue City (not Jaipur); How to Reach uses railway station +
  airport (not a resort pool)

---

## 8. Files changed
- `lib/blog.ts` (new — rich model, helpers, 18 posts), `lib/data.ts` (old stock posts removed)
- `app/blog/page.tsx`, `app/blog/[slug]/page.tsx` (rebuilt)
- `components/TableOfContents.tsx`, `components/ShareButtons.tsx` (new)
- `app/sitemap.ts` (blog routes from lib/blog)
- `scripts/fetch-blog-media.mjs`, `scripts/_blog-media.json`, `public/images/blog/*` (new real photos)

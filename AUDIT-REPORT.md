# Hotel Siddhi Vinayak — Audit Report

Canonical domain: **https://hotelsiddhi-vinayak.com** · Stack: Next.js 15 (App Router) + Tailwind on Vercel
Repo: `hotelsiddhivinayakjodhpur-web/hotel-siddhi-vinayak` · Build: ✅ 21 pages

## 🟢 LIVE STATUS (2026-06-15)
- **Live preview URL:** https://hotel-siddhi-vinayak.vercel.app (Vercel, deployment `f8b5219`)
- **Real photos:** 24 WebP from actual hotel folders, 36 MB → 2.1 MB (94% smaller)
- **Hero video:** ffmpeg H.264 1080p, 6.8 MB → 4.4 MB (desktop only; mobile uses image for LCP)
- **Lighthouse (live):** Mobile — Perf **88**, A11y **95**, Best-Practices **96**, SEO **92** (LCP 3.2s, CLS 0). Desktop — Perf **91**, LCP 1.6s, CLS 0.001.
- **Resolved blockers:** ✅ ffmpeg installed · ✅ Vercel connected · ✅ photos processed · ✅ video processed · ✅ deployed · ✅ Lighthouse run.

## 1. Website structure (complete)
Home · Rooms (list) · **4 room category pages** (`/rooms/deluxe-room`,
`/super-deluxe-room`, `/triple-deluxe-room`, `/family-four-bed-room`) · Gallery ·
About · Nearby Attractions · Blog (+3 posts) · FAQ · Contact.

## 2. Room taxonomy (matches real inventory)
| Category | Rooms | Count | Rate |
|----------|-------|-------|------|
| Deluxe Room | 202,203,204,205,207,208,210 | 7 | Contact for Best Available Rate |
| Super Deluxe Room | 301,302,303,304,305,307,308,309,310 | 9 | Contact for Best Available Rate |
| Triple Deluxe Room | 201,206,209 | 3 | Contact for Best Available Rate |
| Family Four Bed Room | 306 | 1 | Contact for Best Available Rate |

Each category page: gallery, details (size/occupancy/beds/amenities), sticky
booking card, Call + WhatsApp + Enquiry CTAs, HotelRoom + Breadcrumb schema.

## 3. Pricing (per instruction)
No numeric prices anywhere. Every room → "Contact for Best Available Rate" with
Call / WhatsApp / Enquiry CTAs. Schema uses `ReserveAction` (no `Offer.price`) to
avoid a Google price-mismatch penalty. Flip `priceConfirmed` + add prices later.

## 4. SEO — ✅
Single canonical domain; per-page titles/descriptions; sitemap (incl. room +
blog routes); robots; OG/Twitter; semantic headings; clean URLs; www→apex +
legacy-domain redirects (middleware + vercel.json).

## 5. Schema markup — ✅
Hotel, LodgingBusiness, HotelRoom (×4), FAQPage, AggregateRating + Review,
BreadcrumbList (all deep pages), BlogPosting, TouristAttraction. Validate post-
deploy with Rich Results Test.

## 6. GEO / local — ✅
NAP consistent, GeoCoordinates, Google Map embed, attraction entities with
distances, en_IN locale. To finish: exact map pin + GBP/OTA `sameAs`.

## 7. AEO / AI-search — ✅
`/llms.txt` (4 categories, amenities, FAQ, distances), FAQPage Q&A, plain-text
extractable facts, concise entity descriptions.

## 8. Image optimization system — ✅ (awaiting originals in _raw/)
`scripts/process-images.mjs` (sharp): scans room-number folders, auto-selects
highest-resolution photos per category (never mixes categories), crops/resizes to
per-role masters, WebP/JPG/PNG, strips metadata, emits IMAGE-INVENTORY.md/.csv +
conflict report. `next.config` deviceSizes/imageSizes → responsive mobile/tablet/
desktop. Lazy-load wired (hero eager, rest lazy). AVIF/WebP negotiated.

## 9. Video system — ✅ (awaiting originals in _raw/VIDEOS)
`scripts/process-videos.mjs` (ffmpeg): MOV→MP4 H.264 ≤1080p, CRF 26, +faststart,
poster frame, hero auto-selected; VIDEO-INVENTORY.md. `HeroVideo` component:
muted autoplay loop, reduced-motion → poster image. Enable via `VIDEO_READY`.

## 10. Mobile + desktop UX — ✅
Mobile-first; sticky bottom booking bar (Call/WhatsApp/Rooms); desktop floating
buttons; 44px+ targets; accessible labelled forms; lightbox gallery with category
filter; reduced-motion respected; safe-area aware.

## 11. Conversion — ✅
Above-fold rating; TrustStrip (best-rate/free parking/wifi/24×7/free cancel);
reviews before booking form; multiple WhatsApp/Call entry points; best-rate-direct
messaging; per-room enquiry deep links.

## 12. Performance / Core Web Vitals — ✅ (final numbers post-photo)
next/font self-hosted (no render-block); AVIF/WebP; explicit dimensions (no CLS);
lazy-load; ~102 kB shared JS; static/SSG pages; faststart hero video.

---

## ✅ Resolved
- Photos processed & wired · video processed & wired · og-image generated ·
  prices live (EP) · deployed to Vercel · Lighthouse run.

## Remaining (optional polish, not blocking)
1. **Deeper room galleries** — representative folders pulled per category; pull
   the remaining room-number folders for more photos per room.
2. **Real Google reviews** → paste into `lib/data.ts reviews[]` (schema then emits them).
3. **GBP profile URL** → `site.social.google` (schema `sameAs`); **exact geo pin**; confirm email mailbox.
4. **Attraction/blog landmark photos** — licensed Jodhpur landmark images (not hotel media).
5. **Production domain** — point `hotelsiddhi-vinayak.com` at the Vercel project; set production branch policy for preview-first if desired.

## Note on deploys
The GitHub repo is git-connected to Vercel and auto-deploys `main` → production.
To enforce preview-first, change the Vercel Production Branch or work on a release
branch. Pipeline scripts (images/videos) re-run anytime from `_raw/`.

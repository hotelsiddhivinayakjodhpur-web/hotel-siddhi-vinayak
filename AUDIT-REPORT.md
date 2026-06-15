# Hotel Siddhi Vinayak — Pre-Deployment Audit Report

Domain: **https://hotelsiddhi-vinayak.com** · Stack: Next.js 15 (App Router) + Tailwind on Vercel
Repo: `hotelsiddhivinayakjodhpur-web/hotel-siddhi-vinayak` · Build: ✅ 20 pages

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

## ⛔ Blocking before deploy (need you / the originals)
1. **Photos** → download Drive folders into `_raw/` (per IMAGE-PIPELINE.md), then
   `node scripts/process-images.mjs`; I view + finalize curation, set
   `PHOTOS_READY=true`, remove all stock.
2. **Videos** → download `VIDEOS` into `_raw/VIDEOS/`, `node scripts/process-videos.mjs`,
   set `VIDEO_READY=true`.
3. **og-image.jpg** → produced by the photo pipeline (from exterior) or supply one.
4. **Prices** → when finalized, add to `lib/data.ts` and set `priceConfirmed=true`.
5. **GBP + OTA links**, exact geo pin, confirm email mailbox.

## Environment note
The Drive connector returns files as inline base64 (verified), so multi-MB
originals and videos can't be processed through it — hence the local `_raw/`
pipeline. Everything else is complete, builds clean, and is pushed to `main`.

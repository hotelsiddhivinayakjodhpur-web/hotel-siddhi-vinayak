# Hotel Siddhi Vinayak — Image Upload Guide

Drop your real photos here using the **exact filenames** below. Once they're in,
I wire `lib/images.ts` into the app, remove every stock image, and ship.

## Format & optimisation (all files)
- **Format:** WebP (except the OG card, which stays JPG for social-scraper support).
- **Quality:** 80 (visually lossless; Next.js re-optimises again at request time).
- **Color:** sRGB. Strip EXIF/GPS metadata.
- **Convert with:** `cwebp -q 80 input.jpg -o output.webp`
  (or Squoosh.app → WebP 80, or `sharp`). Keep the longest edge ≈ the width below.

| Use | Path + filename | Size (px) |
|-----|-----------------|-----------|
| **OG / social card** | `public/og-image.jpg` *(repo root /public, JPG)* | 1200 × 630 |
| Home hero (exterior) | `hero/hotel-siddhi-vinayak-exterior-jodhpur.webp` | 1920 × 1080 |
| Rooms hero (best room) | `hero/hotel-siddhi-vinayak-deluxe-room.webp` | 1920 × 1080 |
| Property — facade | `property/hotel-siddhi-vinayak-facade.webp` | 1920 × 1080 |
| Property — lobby | `property/hotel-siddhi-vinayak-lobby.webp` | 1920 × 1080 |
| Property — entrance (contact) | `property/hotel-siddhi-vinayak-entrance.webp` | 1920 × 1080 |

### Rooms (3 photos per room — first is the cover)
- `rooms/deluxe-room/deluxe-room-jodhpur-01.webp` … `-02` … `-03` (1200 × 800)
- `rooms/super-deluxe-room/super-deluxe-room-jodhpur-01.webp` … `-02` … `-03` (1200 × 800)
- `rooms/family-suite/family-suite-jodhpur-01.webp` … `-02` … `-03` (1200 × 800)

### Gallery (categorised)
- `gallery/rooms/` → deluxe-room-interior, super-deluxe-room-king-bed, family-suite-city-view, room-bathroom `.webp` (~1000px)
- `gallery/property/` → hotel-facade-jodhpur, lobby-reception, hotel-rooftop-view `.webp` (~1000px)
- `gallery/dining/` → restaurant-interior, breakfast-spread `.webp` (~1000px)

### Blog covers (1200 × 675)
- `blog/top-things-to-do-in-jodhpur.webp`
- `blog/best-time-to-visit-jodhpur.webp`
- `blog/how-to-reach-hotel-siddhi-vinayak.webp`

## Notes
- **Alt text** is already written for every slot in `lib/images.ts` — no action needed.
- **Lazy loading** is already wired: only the homepage hero loads eagerly; all
  gallery/room/below-the-fold images are `loading="lazy"`.
- **Attraction photos** (Mehrangarh Fort, Jaswant Thada, etc.) are landmark images,
  not hotel photography — supply your own/licensed shots if you want to replace the
  current ones; tell me and I'll add an `attractions/` manifest section.
- You don't need to provide every file at once — send what you have and I'll swap
  those in; remaining slots keep their placeholder until you're ready.

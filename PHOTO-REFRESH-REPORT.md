# Website Photo Refresh — Final Report (SIDDHI PHOTOS INSIGE)

**Date:** 2026-06-20 · **Source:** Google Drive › SIDDHI PHOTOS INSIGE (web-optimized set)
Pipeline: download → decode → contact-sheet audit → curate (dedupe/cull) → warm-luxury
grade + framing → manifest → build → verify → deploy.

## Room categories (final, audited)

| Category | Count | Source | Bed config — audit |
|---|---|---|---|
| Deluxe Room | 8 | retained (already correct) | Double-bed only — no single/triple ✓ |
| Super Deluxe Room | 12 | retained, **Room 310 leads** | Premium; DSLR Room 310 first ✓ |
| Triple Deluxe Room | **11 (new)** | 201 / 203 / 206 | 1 double + 1 single (3-guest) ✓ |
| Family Four Bed Room | **9 (new)** | 306 | Genuine four-bed family room ✓ |

- **Triple audit:** every 201/203/206 photo is a 3-guest layout (two beds visible in
  201-8, 203-1/2, 206-5). No deluxe doubles misfiled.
- **Family audit:** all 306 shots are the four-bed family room (incl. 2 DSLR wides);
  one clean bathroom frame included last.
- **Deluxe** kept from the prior audited set — the new folder's Deluxe (207×4, 210×1,
  208/209 empty) was sparser, so the stronger existing double-bed set was retained.

## New gallery categories (from the new folder)

| Category | Count | Notes |
|---|---|---|
| Hotel Exterior | 3 | Real building + signage + entrance (all available exteriors) |
| Reception & Lobby | 5 | Reception desk + lobby/seating |
| Restaurant | 5 | Rooftop terrace dining with Mehrangarh Fort views (incl. night) |
| Common Areas | 5 | Corridors / circulation (best of many, de-duplicated) |
| Rooms | woven in | First photos from each room category |

The Gallery page now has filter pills: **All · Rooms · Exterior · Reception & Lobby ·
Restaurant · Common Areas**, masonry layout, hover zoom and a full-screen lightbox
(keyboard navigable). The Gallery hero and Restaurant page now use the real exterior /
rooftop photos.

## Curation / quality
- **Deduplicated:** dropped exact duplicates (e.g. HOTEL OUTSIDE vs OUTSIDE PIC, 27/28).
- **Removed:** logo, Instagram graphic, a printed menu board, repetitive corridor
  frames, and bathroom-only toilet shots.
- **Framing:** room photos centre-cropped to a consistent 3:2 that fills the frame;
  gallery photos kept at natural aspect for the masonry grid.
- **Grade:** white-balance, exposure/contrast normalise, warm-luxury tone, mild
  saturation/brightness and sharpening on every image.

## Verification
- `npm run build`: green.
- Image checks: all new room + gallery images return HTTP 200.
- Gallery: 6 category filters render; masonry multi-column on desktop, single-column on
  mobile; lightbox opens the full image; no console errors.
- Room detail galleries (Triple 11, Family 9) fill frames with the new photos.

Counts honour "minimum 5 per category, more where available, no artificial cap." The
only category under 5 is **Hotel Exterior (3)** — that's every suitable exterior shot in
the folder; more can be added when new exterior photos are taken.

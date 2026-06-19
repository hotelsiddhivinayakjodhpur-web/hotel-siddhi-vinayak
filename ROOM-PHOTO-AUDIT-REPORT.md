# Room Category Photo Audit & Correction Report

**Date:** 2026-06-19 · **Scope:** All room galleries (categorisation, framing, quality, ordering)
Source of truth: original photos in `_raw/` (by Drive folder number), curated via
`scripts/curate.json` and reprocessed by `scripts/enhance-curated.mjs`.

---

## 1. The categorisation bug — found & fixed

**Folder 203** (the teal-wallpaper room) was filed under **Deluxe** but is actually a
**Triple room — 1 double bed + 1 single bed** (3-guest layout). Confirmed by visual
audit (image clearly shows a double bed beside a single bed).

| Photos moved | From | To | Reason |
|---|---|---|---|
| 203-1, 203-2, 203-3, 203-4 (4 photos) | Deluxe Room | **Triple Deluxe Room** | Double + single bed = triple layout, not Deluxe |

No other cross-category contamination was found. Verified:
- **Deluxe Room** → folders 210 / 208 / 207 only — **every photo is a standard
  double bed, no single bed, no triple setup** (8 photos).
- **Triple Deluxe Room** → folders 201 / 209 / 206 / **203** — all 1-double+1-single /
  3-guest rooms (15 photos).
- **Super Deluxe Room** → premium rooms, **Room 310 prioritised as the hero**
  (310-4, 310-2, 310-3 lead the gallery), 18 photos.
- **Family Four Bed Room** → folder 306 only — genuine four-bed family room (7 photos).

---

## 2. Framing fixed (full-frame coverage)

The room detail galleries previously used `object-contain` on white mats, which left
**blank white space inside the image containers**. Corrected:

- Masters now processed at a consistent **3:2 centre-cover crop** — trims dead
  ceiling/floor, keeps the bed centred, uniform aspect ratio.
- Room detail gallery switched from `object-contain` → **`object-cover`** so every
  image **fills its card completely — no blank space**, with a subtle hover zoom and
  gold-frame accent.

---

## 3. Quality enhancement

Every image reprocessed from the original through the warm-luxury pipeline:
- **White-balance** correction (gray-world)
- **Exposure + contrast** normalisation
- Warm luxury tone grade + **brightness/saturation** lift
- Gamma + **unsharp masking** (crisper detail)
- Optimised WebP (≈ **402 MB → 10.6 MB** across 53 images)

---

## 4. Reordering (best-first)

Each gallery is ordered: **hero photo → second-best room view → alternate angles /
amenities**, set in `scripts/curate.json`:
- Deluxe hero: full-room double (207-2)
- Super Deluxe hero: **Room 310** premium shot (310-4)
- Triple Deluxe hero: clear double+single+seating (201-1), with the double+single
  shot (203-4) second
- Family hero: premium four-bed shot (IMG_1536)

Category cover images on listings/cards (`-01.webp`) automatically pick up the new
heroes.

---

## 5. Final counts (after correction)

| Category | Photos | Folders | Bed config |
|---|---|---|---|
| Deluxe Room | 8 | 210, 208, 207 | Double bed only |
| Super Deluxe Room | 18 | 310★, 308, 309, 301, 302, 303, 304, 307 | Premium |
| Triple Deluxe Room | 15 | 201, 209, 206, **203** | 1 double + 1 single |
| Family Four Bed Room | 7 | 306 | Four-bed family |

**Verified:** contact-sheet review of every gallery; Deluxe contains zero triple
layouts; build green; room detail pages fill frames with no blank space.

# Image Pipeline — Hotel Siddhi Vinayak

Turns the real Drive photos into optimized, responsive, SEO-named WebP assets and
produces an optimization inventory report.

## One-time: get the originals onto disk
The Google Drive connector streams files as inline base64, which can't carry the
large DSLR originals. So the originals are processed **locally**:

1. In Google Drive, open the parent **photos** folder.
2. Select the room folders (`201`, `203`, `209`, `301`, `309`), the exterior/
   property dump, the `gallery` set, and the `brand` (logo) folder → **Download**
   (Drive gives a zip).
3. Unzip into a `_raw/` folder at the repo root, keeping these subfolders:
   ```
   _raw/exterior/   _raw/gallery/   _raw/brand/
   _raw/201/  _raw/203/  _raw/209/  _raw/301/  _raw/309/  _raw/210/
   ```
   (`_raw/` is gitignored — originals never get committed.)

## Run
```bash
node scripts/process-images.mjs            # all mapped images
node scripts/process-images.mjs --only=hero-home   # a single slot
```
Outputs:
- Optimized WebP/JPG into `public/images/**` and `public/og-image.jpg`
- `IMAGE-INVENTORY.md` + `IMAGE-INVENTORY.csv` (original → optimized, dimensions,
  size before/after, % saved)

## Curation map
`scripts/image-map.json` maps each source file → output slot + role. Room folders
are mapped from the inventory; **hero / property / dining / blog picks are
provisional** and will be confirmed by viewing the photos once they're in `_raw/`,
then this file is updated for the final selection.

Roles → master sizes (next/image then serves responsive variants per device via
`deviceSizes` in `next.config.ts`):
| role | master | crop |
|------|--------|------|
| hero | 1920×1080 | cover |
| og | 1200×630 | cover |
| room | 1400×933 | cover |
| card | 1000×750 | cover |
| gallery | ≤1280 wide | fit inside |
| logo | ≤512 wide | fit inside |

## After processing
1. Wire `lib/images.ts` into `lib/data.ts` + page heroes (paths already match).
2. Remove the Unsplash `remotePatterns` entry from `next.config.ts` and delete the
   last stock URLs.
3. `npm run build` and review `IMAGE-INVENTORY.md` before deploy.

## Videos
Drive also has walkthrough videos (`.MOV`/`.MP4`, up to 86 MB). For web use, host
the best 1–2 on a streaming provider (Mux / Cloudflare Stream / YouTube unlisted)
and embed, OR transcode to a ~1080p H.264 MP4 + poster for a muted autoplay hero
background. Raw 40–86 MB MOVs must not be served directly.

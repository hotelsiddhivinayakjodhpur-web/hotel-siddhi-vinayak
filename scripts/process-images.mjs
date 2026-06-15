/**
 * Hotel Siddhi Vinayak — image processing pipeline.
 *
 * Reads originals from _raw/ and a curated map (scripts/image-map.json), then for
 * each entry: auto-rotates (honours EXIF), optionally crops to a target aspect,
 * resizes to a sensible master width, strips metadata, and writes an optimized
 * WebP into public/images/<out>. The OG card is additionally emitted as JPG.
 *
 * Responsive desktop/tablet/mobile variants are produced at request time by
 * next/image from these masters (deviceSizes in next.config), which is the modern
 * best practice — one high-quality master per slot, many sizes served on demand.
 *
 * Usage:
 *   node scripts/process-images.mjs            # process everything in the map
 *   node scripts/process-images.mjs --only=hero-home
 *
 * Outputs an inventory report: IMAGE-INVENTORY.md + IMAGE-INVENTORY.csv
 */
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const RAW = join(ROOT, "_raw");
const OUT = join(ROOT, "public");
const MAP = join(ROOT, "scripts", "image-map.json");

// Master width caps per role (next/image downscales from these per device).
const ROLE = {
  hero:     { width: 1920, height: 1080, fit: "cover", quality: 80 },
  og:       { width: 1200, height: 630,  fit: "cover", quality: 82, format: "jpeg" },
  room:     { width: 1400, height: 933,  fit: "cover", quality: 80 },
  gallery:  { width: 1280, height: null, fit: "inside", quality: 80 },
  card:     { width: 1000, height: 750,  fit: "cover", quality: 80 },
  logo:     { width: 512,  height: null, fit: "inside", quality: 90, format: "png" },
};

const only = (process.argv.find((a) => a.startsWith("--only=")) || "").split("=")[1];
const fmtKB = (b) => (b / 1024).toFixed(1) + " KB";

if (!existsSync(MAP)) { console.error("Missing scripts/image-map.json"); process.exit(1); }
const map = JSON.parse(readFileSync(MAP, "utf8")).filter((m) => !only || m.id === only);

const rows = [];
let missing = 0;

for (const m of map) {
  const src = join(RAW, m.src);
  if (!existsSync(src)) { console.warn(`SKIP (not in _raw/): ${m.src}`); missing++; continue; }

  const role = ROLE[m.role] || ROLE.gallery;
  const fmt = role.format || "webp";
  const outRel = m.out.replace(/^\//, "");
  const outAbs = join(OUT, outRel);
  mkdirSync(dirname(outAbs), { recursive: true });

  const beforeBytes = statSync(src).size;
  const input = sharp(src).rotate();
  const meta = await input.metadata();

  let pipe = input.resize({
    width: role.width,
    height: role.height ?? undefined,
    fit: role.fit,
    withoutEnlargement: true,
  });
  if (fmt === "webp") pipe = pipe.webp({ quality: role.quality });
  else if (fmt === "jpeg") pipe = pipe.jpeg({ quality: role.quality, mozjpeg: true });
  else if (fmt === "png") pipe = pipe.png({ compressionLevel: 9 });

  const buf = await pipe.toBuffer({ resolveWithObject: true });
  writeFileSync(outAbs, buf.data);

  rows.push({
    src: m.src,
    out: m.out,
    role: m.role,
    beforeWH: `${meta.width}×${meta.height}`,
    afterWH: `${buf.info.width}×${buf.info.height}`,
    before: beforeBytes,
    after: buf.info.size,
    saved: (100 * (1 - buf.info.size / beforeBytes)).toFixed(1) + "%",
  });
  console.log(`✓ ${m.src} → ${m.out}  (${fmtKB(beforeBytes)} → ${fmtKB(buf.info.size)})`);
}

// --- Inventory report ---------------------------------------------------------
const totBefore = rows.reduce((s, r) => s + r.before, 0);
const totAfter = rows.reduce((s, r) => s + r.after, 0);

const md = [
  "# Image Optimization Inventory — Hotel Siddhi Vinayak",
  "",
  `Generated: ${new Date().toISOString().slice(0, 10)} · ${rows.length} images processed` +
    (missing ? ` · ${missing} awaiting originals in _raw/` : ""),
  "",
  "| # | Original file | Optimized file | Final dimensions | Before | After | Saved |",
  "|---|---------------|----------------|------------------|--------|-------|-------|",
  ...rows.map((r, i) =>
    `| ${i + 1} | \`${r.src}\` | \`${r.out}\` | ${r.afterWH} | ${fmtKB(r.before)} | ${fmtKB(r.after)} | ${r.saved} |`),
  "",
  `**Total:** ${fmtKB(totBefore)} → ${fmtKB(totAfter)} ` +
    `(**${(100 * (1 - totAfter / (totBefore || 1))).toFixed(1)}% smaller**)`,
  "",
  "_Responsive desktop/tablet/mobile variants are generated on demand by next/image from these masters._",
].join("\n");
writeFileSync(join(ROOT, "IMAGE-INVENTORY.md"), md);

const csv = [
  "original,optimized,role,before_dimensions,after_dimensions,before_bytes,after_bytes,saved",
  ...rows.map((r) => `"${r.src}","${r.out}",${r.role},${r.beforeWH},${r.afterWH},${r.before},${r.after},${r.saved}`),
].join("\n");
writeFileSync(join(ROOT, "IMAGE-INVENTORY.csv"), csv);

console.log(`\nReport: IMAGE-INVENTORY.md (${rows.length} images, ${fmtKB(totBefore)} → ${fmtKB(totAfter)})`);
if (missing) console.log(`${missing} entries are waiting for originals in _raw/ — see image-map.json.`);

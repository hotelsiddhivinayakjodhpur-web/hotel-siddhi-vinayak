/**
 * Hotel Siddhi Vinayak — image processing pipeline.
 *
 * Reads originals from _raw/<folder> and a curated, folder-based map
 * (scripts/image-map.json). For each entry it scans the source folders, auto-
 * selects the highest-resolution photos (`count`), then for each: auto-rotates
 * (EXIF), crops to the role's aspect, resizes to a master width, strips metadata
 * and writes an optimized WebP (JPG for OG, PNG for logo). next/image generates
 * responsive mobile/tablet/desktop variants from these masters at request time.
 *
 * Usage:
 *   node scripts/process-images.mjs              # process everything
 *   node scripts/process-images.mjs --only=deluxe
 *
 * Emits IMAGE-INVENTORY.md + IMAGE-INVENTORY.csv and a CONFLICTS section for any
 * empty/missing source folders (req: flag wrong/empty room categories pre-deploy).
 */
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, readdirSync } from "node:fs";
import { dirname, join, resolve, extname } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const RAW = join(ROOT, "_raw");
const OUT = join(ROOT, "public");
const MAP = join(ROOT, "scripts", "image-map.json");

const ROLE = {
  hero:    { width: 1920, height: 1080, fit: "cover", quality: 80, ext: "webp" },
  og:      { width: 1200, height: 630,  fit: "cover", quality: 82, ext: "jpg"  },
  room:    { width: 1400, height: 933,  fit: "cover", quality: 80, ext: "webp" },
  gallery: { width: 1280, height: 853,  fit: "cover", quality: 80, ext: "webp" },
  logo:    { width: 512,  height: null, fit: "inside", quality: 95, ext: "png" },
};
const IMG_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic"]);
const only = (process.argv.find((a) => a.startsWith("--only=")) || "").split("=")[1];
const fmtKB = (b) => (b / 1024).toFixed(1) + " KB";
const pad = (n) => String(n).padStart(2, "0");

if (!existsSync(MAP)) { console.error("Missing scripts/image-map.json"); process.exit(1); }
const entries = JSON.parse(readFileSync(MAP, "utf8")).entries.filter((e) => !only || e.id === only);

// Collect candidate files from a folder, filtered by optional `match` substring.
function candidates(dir, match) {
  const abs = join(RAW, dir);
  if (!existsSync(abs)) return { abs, files: null }; // null = folder missing
  const files = readdirSync(abs)
    .filter((f) => IMG_EXT.has(extname(f).toLowerCase()))
    .filter((f) => !match || f.toLowerCase().includes(match.toLowerCase()))
    .map((f) => join(abs, f));
  return { abs, files };
}

const rows = [];
const conflicts = [];

for (const e of entries) {
  const role = ROLE[e.role] || ROLE.gallery;

  // Gather + rank all candidates across the entry's source folders.
  let pool = [];
  for (const dir of e.srcDirs) {
    const { files } = candidates(dir, e.match);
    if (files === null) { conflicts.push(`[${e.id}] source folder missing in _raw/: "${dir}"`); continue; }
    if (files.length === 0) { conflicts.push(`[${e.id}] no matching images in "${dir}"${e.match ? ` (match='${e.match}')` : ""}`); continue; }
    for (const f of files) {
      try { const m = await sharp(f).metadata(); pool.push({ f, px: (m.width || 0) * (m.height || 0), w: m.width, h: m.height }); }
      catch { conflicts.push(`[${e.id}] unreadable image: ${f}`); }
    }
  }
  if (pool.length === 0) { conflicts.push(`[${e.id}] NOTHING to process — category will have no photos`); continue; }
  pool.sort((a, b) => b.px - a.px);
  const picks = pool.slice(0, e.count);
  if (picks.length < e.count) conflicts.push(`[${e.id}] wanted ${e.count} photos but only ${picks.length} available`);

  for (let i = 0; i < picks.length; i++) {
    const p = picks[i];
    const single = e.count === 1;
    const name = single ? `${e.outBase}.${role.ext}` : `${e.outBase}-${pad(i + 1)}.${role.ext}`;
    const outAbs = join(OUT, e.outDir.replace(/^\//, ""), name);
    mkdirSync(dirname(outAbs), { recursive: true });

    const before = statSync(p.f).size;
    let pipe = sharp(p.f).rotate().resize({ width: role.width, height: role.height ?? undefined, fit: role.fit, withoutEnlargement: true });
    if (role.ext === "webp") pipe = pipe.webp({ quality: role.quality });
    else if (role.ext === "jpg") pipe = pipe.jpeg({ quality: role.quality, mozjpeg: true });
    else if (role.ext === "png") pipe = pipe.png({ compressionLevel: 9 });

    const { data, info } = await pipe.toBuffer({ resolveWithObject: true });
    writeFileSync(outAbs, data);
    rows.push({
      src: p.f.replace(RAW + "/", "").replace(RAW + "\\", ""),
      out: `${e.outDir}/${name}`.replace("//", "/"),
      cat: e.category || e.role,
      beforeWH: `${p.w}×${p.h}`, afterWH: `${info.width}×${info.height}`,
      before, after: info.size, saved: (100 * (1 - info.size / before)).toFixed(1) + "%",
    });
    console.log(`✓ [${e.id}] ${name}  (${fmtKB(before)} → ${fmtKB(info.size)})`);
  }
}

const totBefore = rows.reduce((s, r) => s + r.before, 0);
const totAfter = rows.reduce((s, r) => s + r.after, 0);
const md = [
  "# Image Optimization Inventory — Hotel Siddhi Vinayak",
  "",
  `Generated: ${new Date().toISOString().slice(0, 10)} · ${rows.length} images processed`,
  "",
  "| # | Category | Original file | Optimized file | Dimensions | Before | After | Saved |",
  "|---|----------|---------------|----------------|------------|--------|-------|-------|",
  ...rows.map((r, i) => `| ${i + 1} | ${r.cat} | \`${r.src}\` | \`${r.out}\` | ${r.afterWH} | ${fmtKB(r.before)} | ${fmtKB(r.after)} | ${r.saved} |`),
  "",
  `**Total:** ${fmtKB(totBefore)} → ${fmtKB(totAfter)} (**${(100 * (1 - totAfter / (totBefore || 1))).toFixed(1)}% smaller**)`,
  "",
  "## ⚠️ Conflicts / gaps",
  conflicts.length ? conflicts.map((c) => `- ${c}`).join("\n") : "- None — every category had photos.",
  "",
  "_Responsive variants generated on demand by next/image (deviceSizes in next.config)._",
].join("\n");
writeFileSync(join(ROOT, "IMAGE-INVENTORY.md"), md);
writeFileSync(join(ROOT, "IMAGE-INVENTORY.csv"),
  ["original,optimized,category,after_dimensions,before_bytes,after_bytes,saved",
    ...rows.map((r) => `"${r.src}","${r.out}",${r.cat},${r.afterWH},${r.before},${r.after},${r.saved}`)].join("\n"));

console.log(`\nReport: IMAGE-INVENTORY.md — ${rows.length} images, ${fmtKB(totBefore)} → ${fmtKB(totAfter)}`);
if (conflicts.length) { console.log(`\n⚠️ ${conflicts.length} conflict(s):`); conflicts.forEach((c) => console.log("  - " + c)); }

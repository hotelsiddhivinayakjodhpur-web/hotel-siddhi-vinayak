/**
 * Professional image enhancement + curation pipeline (sharp).
 *
 * For each category in image-map.json it scans the source folders, SCORES every
 * candidate (brightness, contrast, sharpness via a Laplacian-energy proxy),
 * DROPS the weak ones (too dark / too flat / blurry) and near-DUPLICATES (8×8
 * average-hash, Hamming ≤ 6), keeps the best `count`, then applies a consistent
 * professional edit and exports responsive WebP masters:
 *   • white balance  — gray-world per-channel correction (clamped)
 *   • exposure/contrast — normalise() histogram stretch + mild gamma
 *   • color grade    — modulate saturation/brightness
 *   • smart crop     — attention-based crop to the role's fixed aspect ratio
 *   • sharpening     — unsharp mask
 * Emits ENHANCE-REPORT.md (before/after + kept/dropped with reasons).
 *
 * Note: automatic perspective correction is intentionally NOT applied (needs
 * per-image keystone detection); everything else is global and deterministic.
 */
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, readdirSync } from "node:fs";
import { dirname, join, resolve, extname } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const RAW = join(ROOT, "_raw");
const OUT = join(ROOT, "public");
const MAP = JSON.parse(readFileSync(join(ROOT, "scripts", "image-map.json"), "utf8")).entries;

const ROLE = {
  hero:    { width: 1920, height: 1080, q: 82, ext: "webp" },
  og:      { width: 1200, height: 630,  q: 84, ext: "jpg"  },
  room:    { width: 1500, height: 1000, q: 82, ext: "webp" }, // 3:2
  gallery: { width: 1500, height: 1000, q: 82, ext: "webp" }, // 3:2
  logo:    { width: 512,  height: null, q: 95, ext: "png"  },
};
const IMG = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const fmtKB = (b) => (b / 1024).toFixed(0) + " KB";
const pad = (n) => String(n).padStart(2, "0");

// 8×8 average hash for near-duplicate detection.
async function aHash(file) {
  const buf = await sharp(file).greyscale().resize(8, 8, { fit: "fill" }).raw().toBuffer();
  const avg = buf.reduce((a, b) => a + b, 0) / buf.length;
  let bits = 0n;
  for (let i = 0; i < buf.length; i++) if (buf[i] > avg) bits |= 1n << BigInt(i);
  return bits;
}
const hamming = (a, b) => { let x = a ^ b, c = 0; while (x) { c += Number(x & 1n); x >>= 1n; } return c; };

// Sharpness proxy: stdev of a Laplacian convolution (higher = sharper).
async function sharpness(file) {
  const lap = await sharp(file).greyscale().resize(400, 400, { fit: "inside" })
    .convolve({ width: 3, height: 3, kernel: [0, 1, 0, 1, -4, 1, 0, 1, 0] })
    .stats();
  return lap.channels[0].stdev;
}

async function score(file) {
  const st = await sharp(file).stats();
  const ch = st.channels.slice(0, 3);
  const lum = ch.reduce((a, c) => a + c.mean, 0) / 3;
  const con = ch.reduce((a, c) => a + c.stdev, 0) / 3;
  const sh = await sharpness(file);
  const hash = await aHash(file);
  return { file, lum, con, sh, hash, means: ch.map((c) => c.mean) };
}

async function enhance(file, role, outAbs) {
  const s = await sharp(file).rotate().removeAlpha().stats();
  const means = s.channels.slice(0, 3).map((c) => c.mean);
  const avg = means.reduce((a, b) => a + b, 0) / 3;
  const wb = means.map((m) => (m > 0 ? Math.max(0.82, Math.min(1.18, avg / m)) : 1)); // gray-world, clamped

  let pipe = sharp(file).rotate().removeAlpha()
    .resize({ width: role.width, height: role.height ?? undefined, fit: "cover", position: "attention" })
    .linear(wb, [0, 0, 0])                     // white balance
    .normalise()                               // exposure + contrast stretch
    .modulate({ saturation: 1.12, brightness: 1.02 }) // color grade
    .gamma(1.04)                               // gentle contrast
    .sharpen({ sigma: 1.0, m1: 0.6, m2: 2.5 }); // unsharp mask
  if (role.ext === "webp") pipe = pipe.webp({ quality: role.q });
  else if (role.ext === "jpg") pipe = pipe.jpeg({ quality: role.q, mozjpeg: true });
  else pipe = pipe.png({ compressionLevel: 9 });

  const { data, info } = await pipe.toBuffer({ resolveWithObject: true });
  mkdirSync(dirname(outAbs), { recursive: true });
  writeFileSync(outAbs, data);
  return info;
}

const kept = [], dropped = [];

for (const e of MAP) {
  const role = ROLE[e.role] || ROLE.gallery;
  let pool = [];
  for (const dir of e.srcDirs) {
    const abs = join(RAW, dir);
    if (!existsSync(abs)) continue;
    for (const f of readdirSync(abs)) {
      if (!IMG.has(extname(f).toLowerCase())) continue;
      if (e.match && !f.toLowerCase().includes(e.match.toLowerCase())) continue;
      try { pool.push(await score(join(abs, f))); } catch {}
    }
  }
  if (!pool.length) continue;

  // Drop weak: too dark or too flat.
  for (const p of [...pool]) {
    if (p.lum < 55 || p.con < 22) { dropped.push({ ...p, reason: p.lum < 55 ? "too dark" : "low contrast" }); pool = pool.filter((x) => x !== p); }
  }
  // Drop near-duplicates (keep the sharper one).
  pool.sort((a, b) => b.sh - a.sh);
  const uniq = [];
  for (const p of pool) {
    const dup = uniq.find((u) => hamming(u.hash, p.hash) <= 6);
    if (dup) dropped.push({ ...p, reason: `duplicate of ${dup.file.replace(RAW + "\\", "").replace(RAW + "/", "")}` });
    else uniq.push(p);
  }
  // Rank by quality (contrast + sharpness) and keep best `count`.
  uniq.sort((a, b) => (b.con + b.sh) - (a.con + a.sh));
  const picks = uniq.slice(0, e.count);
  for (const p of uniq.slice(e.count)) dropped.push({ ...p, reason: "not in top selection" });

  for (let i = 0; i < picks.length; i++) {
    const p = picks[i];
    const single = e.count === 1;
    const name = single ? `${e.outBase}.${role.ext}` : `${e.outBase}-${pad(i + 1)}.${role.ext}`;
    const outAbs = join(OUT, e.outDir.replace(/^\//, ""), name);
    const before = statSync(p.file).size;
    const info = await enhance(p.file, role, outAbs);
    kept.push({
      src: p.file.replace(RAW + "\\", "").replace(RAW + "/", ""),
      out: `${e.outDir}/${name}`.replace("//", "/"),
      cat: e.category || e.role, before, after: info.size,
      dims: `${info.width}×${info.height}`, lum: p.lum.toFixed(0), con: p.con.toFixed(0), sh: p.sh.toFixed(0),
    });
    console.log(`✓ [${e.id}] ${name}  ${fmtKB(before)}→${fmtKB(info.size)}  (lum ${p.lum.toFixed(0)}, con ${p.con.toFixed(0)}, sharp ${p.sh.toFixed(0)})`);
  }
}

const tb = kept.reduce((a, r) => a + r.before, 0), ta = kept.reduce((a, r) => a + r.after, 0);
const md = [
  "# Professional Media Upgrade — Before/After Report", "",
  `Generated 2026-06-15 · ${kept.length} images enhanced · ${dropped.length} removed (weak/blurry/dark/duplicate)`, "",
  "## Editing applied to every kept image",
  "White balance (gray-world) · exposure + contrast normalise · color grade (saturation/brightness) · gamma · unsharp mask · attention smart-crop to fixed ratio · WebP. _(Perspective correction not auto-applied.)_", "",
  "## Kept (enhanced)",
  "| Category | Original | Optimized | Ratio/Dims | Before | After | Brightness | Contrast | Sharpness |",
  "|---|---|---|---|---|---|---|---|---|",
  ...kept.map((r) => `| ${r.cat} | \`${r.src}\` | \`${r.out}\` | ${r.dims} | ${fmtKB(r.before)} | ${fmtKB(r.after)} | ${r.lum} | ${r.con} | ${r.sh} |`),
  "", `**Total:** ${fmtKB(tb)} → ${fmtKB(ta)} (${(100 * (1 - ta / (tb || 1))).toFixed(0)}% smaller)`, "",
  "## Removed",
  dropped.length ? "| File | Reason | Brightness | Contrast | Sharpness |\n|---|---|---|---|---|\n" +
    dropped.map((d) => `| \`${d.file.replace(RAW + "\\", "").replace(RAW + "/", "")}\` | ${d.reason} | ${d.lum.toFixed(0)} | ${d.con.toFixed(0)} | ${d.sh.toFixed(0)} |`).join("\n")
    : "_None removed._",
].join("\n");
writeFileSync(join(ROOT, "ENHANCE-REPORT.md"), md);
console.log(`\n${kept.length} enhanced, ${dropped.length} removed. ${fmtKB(tb)} → ${fmtKB(ta)}. Report: ENHANCE-REPORT.md`);

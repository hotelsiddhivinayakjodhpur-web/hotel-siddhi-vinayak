/**
 * Curated professional enhancement with LUXURY WARM grading.
 * Processes exactly the hand-picked files in scripts/curate.json (cover first),
 * applying: gray-world white balance → exposure/contrast normalise → warm luxury
 * tone → saturation/brightness → gamma → unsharp mask → smart-crop to fixed
 * ratio → WebP. Hero is a 16:9 master; OG a 1200×630 JPG.
 */
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const RAW = join(ROOT, "_raw");
const OUT = join(ROOT, "public");
const C = JSON.parse(readFileSync(join(ROOT, "scripts", "curate.json"), "utf8"));

const ROLE = {
  room:    { w: 1500, h: 1000, q: 82, ext: "webp" },
  gallery: { w: 1500, h: 1000, q: 82, ext: "webp" },
  hero:    { w: 1920, h: 1080, q: 82, ext: "webp" },
  og:      { w: 1200, h: 630,  q: 84, ext: "jpg"  },
};
const fmtKB = (b) => (b / 1024).toFixed(0) + " KB";
const pad = (n) => String(n).padStart(2, "0");

async function edit(file, role, outAbs) {
  const s = await sharp(file).rotate().removeAlpha().stats();
  const m = s.channels.slice(0, 3).map((c) => c.mean);
  const avg = m.reduce((a, b) => a + b, 0) / 3;
  const wb = m.map((x) => (x > 0 ? Math.max(0.82, Math.min(1.18, avg / x)) : 1));
  let pipe = sharp(file).rotate().removeAlpha()
    .resize({ width: role.w, height: role.h, fit: "cover", position: "attention" })
    .linear(wb, [0, 0, 0])                       // white balance
    .normalise()                                 // exposure + contrast
    .linear([1.05, 1.0, 0.95], [4, 2, -2])       // warm luxury tone (lift R, ease B)
    .modulate({ saturation: 1.1, brightness: 1.02 })
    .gamma(1.04)
    .sharpen({ sigma: 1.0, m1: 0.6, m2: 2.5 });
  pipe = role.ext === "webp" ? pipe.webp({ quality: role.q }) : pipe.jpeg({ quality: role.q, mozjpeg: true });
  const { data, info } = await pipe.toBuffer({ resolveWithObject: true });
  mkdirSync(dirname(outAbs), { recursive: true });
  writeFileSync(outAbs, data);
  return info;
}

const rows = [];
async function one(rel, role, outAbs, cat) {
  const src = join(RAW, rel);
  if (!existsSync(src)) { console.warn("MISSING " + rel); return; }
  const before = statSync(src).size;
  const info = await edit(src, role, outAbs);
  rows.push({ src: rel, out: outAbs.replace(OUT, ""), cat, before, after: info.size });
  console.log(`✓ ${cat}  ${rel}  ${fmtKB(before)}→${fmtKB(info.size)}`);
}

// wipe room + curated gallery dirs so removed shots don't linger
for (const d of ["images/rooms/deluxe-room", "images/rooms/super-deluxe-room", "images/rooms/triple-deluxe-room", "images/rooms/family-four-bed-room", "images/gallery/property", "images/gallery/dining"]) {
  rmSync(join(OUT, d), { recursive: true, force: true });
}

for (const e of C.entries) {
  for (let i = 0; i < e.files.length; i++) {
    await one(e.files[i], ROLE[e.role], join(OUT, e.outDir.replace(/^\//, ""), `${e.outBase}-${pad(i + 1)}.${ROLE[e.role].ext}`), e.id);
  }
}
await one(C.hero, ROLE.hero, join(OUT, "images/hero/hotel-siddhi-vinayak-exterior-jodhpur.webp"), "hero");
await one(C.og, ROLE.og, join(OUT, "og-image.jpg"), "og");

const tb = rows.reduce((a, r) => a + r.before, 0), ta = rows.reduce((a, r) => a + r.after, 0);
console.log(`\n${rows.length} curated images, warm-graded. ${fmtKB(tb)} → ${fmtKB(ta)}.`);

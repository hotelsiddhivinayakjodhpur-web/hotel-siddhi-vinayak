// Processes curated photos from _raw2 (new SIDDHI PHOTOS INSIGE web-optimized
// set) into room galleries + new gallery categories. Rooms = 3:2 centre-cover
// (fills frame); gallery (exterior/reception/common/dining) = no-crop natural
// aspect for the masonry grid. Warm-luxury grade applied throughout.
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const RAW = join(ROOT, "_raw2");
const OUT = join(ROOT, "public", "images");

const ROLE = {
  room:    { w: 1600, h: 1067, cover: true },   // 3:2 fill
  gallery: { w: 1600, h: 1200, cover: false },  // natural aspect (masonry)
};

async function edit(file, role) {
  const s = await sharp(file).rotate().removeAlpha().stats();
  const m = s.channels.slice(0, 3).map((c) => c.mean);
  const avg = m.reduce((a, b) => a + b, 0) / 3;
  const wb = m.map((x) => (x > 0 ? Math.max(0.85, Math.min(1.15, avg / x)) : 1));
  const resize = role.cover
    ? { width: role.w, height: role.h, fit: "cover", position: "centre" }
    : { width: role.w, height: role.h, fit: "inside", withoutEnlargement: true };
  return sharp(file).rotate().removeAlpha().resize(resize)
    .linear(wb, [0, 0, 0]).normalise()
    .linear([1.04, 1.0, 0.97], [3, 2, -1])
    .modulate({ saturation: 1.06, brightness: 1.03 })
    .gamma(1.03).sharpen({ sigma: 0.9, m1: 0.5, m2: 2.2 })
    .webp({ quality: 84 }).toBuffer();
}

// category -> { dir, base, role, files[] (in _raw2, best first) }
const PLAN = {
  family: { dir: "rooms/family-four-bed-room", base: "family-four-bed-room-jodhpur", role: "room",
    files: ["fam-dsc37.jpg","fam-1.jpg","fam-dsc38.jpg","fam-5.jpg","fam-2.jpg","fam-6.jpg","fam-27.jpg","fam-4.jpg","fam-9.jpg"] },
  triple: { dir: "rooms/triple-deluxe-room", base: "triple-deluxe-room-jodhpur", role: "room",
    files: ["trp-201-8.jpg","trp-203-1.jpg","trp-206-5.jpg","trp-201-7.jpg","trp-201-1.jpg","trp-203-2.jpg","trp-206-1.jpg","trp-201-2.jpg","trp-206-4.jpg","trp-201-4.jpg","trp-201-5.jpg"] },
  exterior: { dir: "gallery/exterior", base: "exterior", role: "gallery",
    files: ["oth-outside1.jpg","oth-106.jpg","oth-112.jpg"] },
  reception: { dir: "gallery/reception", base: "reception", role: "gallery",
    files: ["oth-119.jpg","oth-61.jpg","oth-81.jpg","oth-69.jpg","oth-67.jpg"] },
  common: { dir: "gallery/common", base: "common", role: "gallery",
    files: ["oth-10.jpg","oth-3.jpg","oth-38.jpg","oth-dsc277.jpg","oth-11.jpg"] },
  dining: { dir: "gallery/dining", base: "restaurant", role: "gallery",
    files: ["rest-1.jpg","rest-2.jpg","rest-3.jpg","rest-5.jpg","rest-4.jpg"] },
};

const pad = (n) => String(n).padStart(2, "0");
for (const [cat, p] of Object.entries(PLAN)) {
  const outDir = join(OUT, p.dir);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  let i = 0;
  for (const f of p.files) {
    const src = join(RAW, f);
    if (!existsSync(src)) { console.warn("MISSING", f); continue; }
    i++;
    const data = await edit(src, ROLE[p.role]);
    writeFileSync(join(outDir, `${p.base}-${pad(i)}.webp`), data);
  }
  console.log(`✓ ${cat}: ${i} images -> ${p.dir}`);
}
console.log("done");

// Rebuilds Deluxe + Super Deluxe galleries from the new SIDDHI PHOTOS INSIGE set,
// curated for room-number VARIETY (interleaved), bathrooms/dupes removed, light
// edit (WB/brightness/contrast/warm/straighten via rotate) + 3:2 fill framing.
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const RAW = join(ROOT, "_raw2");
const OUT = join(ROOT, "public", "images");

async function edit(file) {
  const s = await sharp(file).rotate().removeAlpha().stats();
  const m = s.channels.slice(0, 3).map((c) => c.mean);
  const avg = m.reduce((a, b) => a + b, 0) / 3;
  const wb = m.map((x) => (x > 0 ? Math.max(0.85, Math.min(1.15, avg / x)) : 1));
  return sharp(file).rotate().removeAlpha()
    .resize({ width: 1600, height: 1067, fit: "cover", position: "centre" })
    .linear(wb, [0, 0, 0]).normalise()
    .linear([1.04, 1.0, 0.97], [3, 2, -1])
    .modulate({ saturation: 1.06, brightness: 1.04 })
    .gamma(1.03).sharpen({ sigma: 0.9, m1: 0.5, m2: 2.2 })
    .webp({ quality: 84 }).toBuffer();
}

const PLAN = {
  deluxe: { dir: "rooms/deluxe-room", base: "deluxe-room-jodhpur", files: [
    "dlx-202-1.jpg","dlx-207-2.jpg","dlx-210-1.jpg","dlx-202-8.jpg","dlx-207-1.jpg","dlx-208-3.jpg",
    "dlx-202-9.jpg","dlx-210-7.jpg","dlx-207-3.jpg","dlx-202-6.jpg","dlx-208-4.jpg","dlx-202-7.jpg","dlx-210-3.jpg",
  ] },
  super: { dir: "rooms/super-deluxe-room", base: "super-deluxe-room-jodhpur", files: [
    "sd-310-dsc54.jpg","sd-310-dsc59.jpg","sd-309-dsc48.jpg","sd-309-dsc50.jpg","sd-301-A.jpg","sd-308-dsc.jpg",
    "sd-302-96.jpg","sd-304-50.jpg","sd-310-dsc55.jpg","sd-309-dsc47.jpg","sd-301-AA.jpg","sd-308-74.jpg",
    "sd-302-127.jpg","sd-304-56.jpg","sd-303-105.jpg","sd-307-c.jpg","sd-301-AAA.jpg","sd-308-40.jpg",
    "sd-302-122.jpg","sd-304-44.jpg","sd-303-115.jpg","sd-307-a.jpg","sd-301-w1.jpg","sd-308-46.jpg",
    "sd-310-84.jpg","sd-309-95.jpg","sd-304-17.jpg","sd-305-4.jpg",
  ] },
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
    writeFileSync(join(outDir, `${p.base}-${pad(i)}.webp`), await edit(src));
  }
  console.log(`✓ ${cat}: ${i} images`);
}
console.log("done");

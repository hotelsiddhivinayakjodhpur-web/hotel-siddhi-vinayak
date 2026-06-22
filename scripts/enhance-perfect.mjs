/**
 * PERFECT PHOTOS rebuild — hand-curated selection from _raw3.
 * Wipes room + gallery folders, applies warm-luxury grade, exports WebP.
 * Rooms: 3:2 attention-cover. Gallery: natural aspect (masonry). Best-first order.
 */
import sharp from "sharp";
import { readdirSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const RAW = join(ROOT, "_raw3");
const IMG = join(ROOT, "public", "images");
const pad = (n) => String(n).padStart(2, "0");
const f = (b) => join(RAW, b.endsWith(".jpg") ? b : b + ".png");

// ---- curated selection, ordered best-first ----
const ROOMS = {
  // DELUXE: 202, 204, 207, 208, 210 (205/no photos skipped)
  "deluxe-room": ["rm-207-1","rm-210-1","rm-208-1","rm-202-1","rm-207-2","rm-210-2","rm-202-3","rm-208-2","rm-202-4","rm-204-1"],
  // SUPER DELUXE: 301, 302, 304, 305, 307, 308, 309, 310 (303/no photos skipped)
  "super-deluxe-room": ["rm-309-4","rm-310-1","rm-301-1","rm-310-9","rm-301-3","rm-309-2","rm-310-6","rm-301-2","rm-309-1","rm-310-10","rm-301-5","rm-309-6","rm-308-3","rm-308-4","rm-308-7","rm-304-3","rm-304-2","rm-302-2","rm-302-8","rm-302-7","rm-302-3","rm-307-4","rm-307-3","rm-305-1"],
  // TRIPLE: 201, 203, 206, 209 (double + single layout)
  "triple-deluxe-room": ["rm-201-1","rm-209-1","rm-206-2","rm-203-1","rm-201-3","rm-209-3","rm-206-1","rm-203-2","rm-201-2","rm-209-2","rm-206-4"],
  // FAMILY: 306
  "family-four-bed-room": ["rm-306-1","rm-306-5","rm-306-2","rm-306-4","rm-306-6"],
};
const GAL = {
  exterior: ["ext-hotel-outside-pic.jpg","ext-entrance"],
  reception: ["rec-reception","rec-reception-2","rec-reception-view-1"],
  dining: ["rest-view-2","rest-view-3","rest-view-1","rest-teasing-are-2","rest-resstourent-sitteng-are"],
  common: ["gal-galary-3","gal-galary-1"],
};

async function grade(src, { w, h, cover }) {
  const st = await sharp(src).rotate().removeAlpha().stats();
  const means = st.channels.slice(0, 3).map((c) => c.mean);
  const avg = means.reduce((a, b) => a + b, 0) / 3;
  const wb = means.map((m) => (m > 0 ? Math.max(0.82, Math.min(1.18, avg / m)) : 1));
  let p = sharp(src).rotate().removeAlpha();
  if (cover) p = p.resize({ width: w, height: h, fit: "cover", position: "attention" });
  else p = p.resize({ width: w, height: h, fit: "inside", withoutEnlargement: true });
  return p
    .linear(wb, [0, 0, 0])
    .normalise()
    .linear([1.04, 1.0, 0.97], [0, 0, 0])      // warm
    .modulate({ saturation: 1.10, brightness: 1.045 })
    .gamma(1.05)
    .sharpen({ sigma: 1.0, m1: 0.6, m2: 2.4 })
    .webp({ quality: 82 });
}

let n = 0;
// rooms
for (const [slug, list] of Object.entries(ROOMS)) {
  const dir = join(IMG, "rooms", slug);
  if (existsSync(dir)) rmSync(dir, { recursive: true });
  mkdirSync(dir, { recursive: true });
  for (let i = 0; i < list.length; i++) {
    const out = join(dir, `${slug}-jodhpur-${pad(i + 1)}.webp`);
    await (await grade(f(list[i]), { w: 1600, h: 1067, cover: true })).toFile(out); n++;
  }
}
// gallery (natural aspect)
for (const [sub, list] of Object.entries(GAL)) {
  const dir = join(IMG, "gallery", sub);
  if (existsSync(dir)) rmSync(dir, { recursive: true });
  mkdirSync(dir, { recursive: true });
  for (let i = 0; i < list.length; i++) {
    const out = join(dir, `${sub}-${pad(i + 1)}.webp`);
    await (await grade(f(list[i]), { w: 1600, h: null, cover: false })).toFile(out); n++;
  }
}
// heroes
await (await grade(f("ext-hotel-outside-pic.jpg"), { w: 1920, h: 1080, cover: true }))
  .toFile(join(IMG, "hero", "hotel-siddhi-vinayak-exterior-jodhpur.webp"));
mkdirSync(join(IMG, "rooms", "covers"), { recursive: true });
await (await grade(f("rm-309-4"), { w: 1920, h: 1080, cover: true }))
  .toFile(join(IMG, "rooms", "covers", "rooms-hero.webp"));
console.log(`processed ${n} gallery/room images + 2 heroes`);

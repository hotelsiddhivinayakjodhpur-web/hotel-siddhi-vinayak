/**
 * FULL refresh from PERFECT PHOTOS (all 106 images). Includes bathrooms.
 * Premium wide shots ordered first (covers); bathrooms/fixtures ordered last.
 * Also overwrites every remaining OLD hero/about/property image in place so no
 * pre-refresh photo survives anywhere on the site.
 */
import sharp from "sharp";
import { readdirSync, mkdirSync, rmSync, existsSync, copyFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const RAW = join(ROOT, "_raw3");
const IMG = join(ROOT, "public", "images");
const VID = join(ROOT, "public", "videos");
const pad = (n) => String(n).padStart(2, "0");
const f = (b) => join(RAW, b);                 // exact filename in _raw3
const png = (b) => join(RAW, b + ".png");

const NUM2SLUG = {};
const M = {
  "triple-deluxe-room": [201, 203, 206, 209],
  "deluxe-room": [202, 204, 205, 207, 208, 210],
  "super-deluxe-room": [301, 302, 303, 304, 305, 307, 308, 309, 310],
  "family-four-bed-room": [306],
};
for (const [slug, nums] of Object.entries(M)) nums.forEach((n) => (NUM2SLUG[n] = slug));

// premium-first ordering per slug (wide/bright shots that should lead/cover)
const PRIORITY = {
  "deluxe-room": ["rm-207-1","rm-210-1","rm-208-1","rm-202-1","rm-207-2","rm-210-2","rm-202-3","rm-208-2","rm-202-4","rm-204-1"],
  "super-deluxe-room": ["rm-309-4","rm-310-1","rm-301-1","rm-310-9","rm-301-3","rm-309-2","rm-310-6","rm-301-2","rm-309-1","rm-310-10","rm-301-5","rm-309-6","rm-308-3","rm-308-4","rm-308-7","rm-304-3","rm-304-2","rm-302-2","rm-302-8","rm-302-7","rm-302-3","rm-307-4","rm-307-3","rm-305-1"],
  "triple-deluxe-room": ["rm-201-1","rm-209-1","rm-206-2","rm-203-1","rm-201-3","rm-209-3","rm-206-1","rm-203-2","rm-201-2","rm-209-2","rm-206-4"],
  "family-four-bed-room": ["rm-306-1","rm-306-5","rm-306-2","rm-306-4","rm-306-6"],
};
// bathroom / fixture-only frames → forced to the END of their room gallery
const LAST = new Set(["rm-201-4","rm-203-3","rm-206-3","rm-207-3","rm-207-4","rm-208-3","rm-210-3","rm-302-1","rm-302-4","rm-302-5","rm-304-1","rm-305-2","rm-305-3","rm-307-1","rm-307-2","rm-308-1","rm-308-2","rm-309-8","rm-309-9","rm-310-2","rm-310-5"]);

async function grade(src, { w, h, cover }) {
  const st = await sharp(src).rotate().removeAlpha().stats();
  const means = st.channels.slice(0, 3).map((c) => c.mean);
  const avg = means.reduce((a, b) => a + b, 0) / 3;
  const wb = means.map((m) => (m > 0 ? Math.max(0.82, Math.min(1.18, avg / m)) : 1));
  let p = sharp(src).rotate().removeAlpha();
  p = cover
    ? p.resize({ width: w, height: h, fit: "cover", position: "attention" })
    : p.resize({ width: w, height: h, fit: "inside", withoutEnlargement: true });
  return p.linear(wb, [0, 0, 0]).normalise().linear([1.04, 1.0, 0.97], [0, 0, 0])
    .modulate({ saturation: 1.10, brightness: 1.045 }).gamma(1.05)
    .sharpen({ sigma: 1.0, m1: 0.6, m2: 2.4 });
}
const webp = (p) => p.webp({ quality: 82 });

// ---- collect every room image in _raw3 ----
const allRaw = readdirSync(RAW).filter((x) => /\.(png|jpg)$/i.test(x));
const roomFiles = {}; // slug -> [basenames without ext]
for (const file of allRaw) {
  const m = file.match(/^rm-(\d+)-/);
  if (!m) continue;
  const slug = NUM2SLUG[+m[1]];
  if (!slug) continue;
  (roomFiles[slug] ||= []).push(file.replace(/\.(png|jpg)$/i, ""));
}
const orderSlug = (slug, files) => {
  const pri = PRIORITY[slug].filter((x) => files.includes(x));
  const rest = files.filter((x) => !pri.includes(x))
    .sort((a, b) => (LAST.has(a) - LAST.has(b)) || a.localeCompare(b, undefined, { numeric: true }));
  return [...pri, ...rest];
};

let counts = {};
for (const slug of Object.keys(M)) {
  const dir = join(IMG, "rooms", slug);
  if (existsSync(dir)) rmSync(dir, { recursive: true });
  mkdirSync(dir, { recursive: true });
  const ordered = orderSlug(slug, roomFiles[slug] || []);
  for (let i = 0; i < ordered.length; i++) {
    await webp(await grade(png(ordered[i]), { w: 1600, h: 1067, cover: true }))
      .toFile(join(dir, `${slug}-jodhpur-${pad(i + 1)}.webp`));
  }
  counts[slug] = ordered.length;
}

// ---- gallery sections (natural aspect for masonry) ----
const GAL = {
  reception: ["rec-reception","rec-reception-2","rec-reception-view-1"],
  exterior: ["ext-hotel-outside-pic.jpg","ext-entrance"],
  dining: ["rest-view-2","rest-view-3","rest-view-1","rest-teasing-are-2","rest-resstourent-sitteng-are","menu-card"],
  common: ["gal-galary-3","gal-galary-1","gal-galary-2","gal-galary-4","xx-room4"],
};
for (const [sub, list] of Object.entries(GAL)) {
  const dir = join(IMG, "gallery", sub);
  if (existsSync(dir)) rmSync(dir, { recursive: true });
  mkdirSync(dir, { recursive: true });
  for (let i = 0; i < list.length; i++) {
    const src = list[i].endsWith(".jpg") ? f(list[i]) : png(list[i]);
    await webp(await grade(src, { w: 1600, h: null, cover: false }))
      .toFile(join(dir, `${sub}-${pad(i + 1)}.webp`));
  }
  counts["gallery/" + sub] = list.length;
}

// ---- overwrite every remaining OLD hero/about/property image in place ----
const over = [
  ["rm-310-1.png", join(IMG, "hero", "super-deluxe-310-hero.webp"), 1920, 1080],
  ["ext-hotel-outside-pic.jpg", join(IMG, "hero", "hotel-siddhi-vinayak-exterior-jodhpur.webp"), 1920, 1080],
  ["ext-entrance.png", join(IMG, "gallery", "property", "hotel-01.webp"), 1600, 1067],
  ["rm-301-1.png", join(IMG, "about", "about-hero-premium-room.webp"), 1920, 1080],
  ["rm-310-9.png", join(IMG, "about", "our-story-super-deluxe-310.webp"), 1600, 1067],
  ["rm-309-4.png", join(IMG, "rooms", "covers", "rooms-hero.webp"), 1920, 1080],
];
for (const [src, out, w, h] of over) {
  mkdirSync(resolve(out, ".."), { recursive: true });
  await webp(await grade(f(src), { w, h, cover: true })).toFile(out);
}
// video poster (jpg + webp) from the new home-hero shot
await (await grade(f("rm-310-1.png"), { w: 1920, h: 1080, cover: true })).jpeg({ quality: 82 }).toFile(join(VID, "hero-poster.jpg"));
await webp(await grade(f("rm-310-1.png"), { w: 1920, h: 1080, cover: true })).toFile(join(VID, "hero-poster.webp"));

// ---- promo video → homepage hero + standalone copy ----
copyFileSync(join(RAW, "Hotel_Siddhi_Vinayak_Promo.mp4"), join(VID, "hero.mp4"));
copyFileSync(join(RAW, "Hotel_Siddhi_Vinayak_Promo.mp4"), join(VID, "promo.mp4"));
if (existsSync(join(VID, "hero.webm"))) rmSync(join(VID, "hero.webm"));

console.log("ROOM/GALLERY COUNTS:", JSON.stringify(counts, null, 0));
const total = Object.values(counts).reduce((a, b) => a + b, 0);
console.log("total room+gallery images:", total, "| heroes overwritten:", over.length, "| video: promo→hero.mp4");

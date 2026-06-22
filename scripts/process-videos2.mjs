/**
 * Hotel Siddhi Vinayak — video pipeline v2 (FFmpeg required on PATH).
 *
 * Source of truth: _raw/VIDEOS/best.mp4 (richest walkthrough clip).
 * Produces Core-Web-Vitals-friendly hero variants WITHOUT touching the source:
 *   - hero.mp4         desktop H.264, <=1080px tall, CRF 26, muted, +faststart
 *   - hero.webm        desktop VP9, same frame, muted (smaller than mp4)
 *   - hero-mobile.mp4  H.264, <=720px tall, CRF 28, muted (low-data fallback)
 *   - hero-poster.jpg  painted LCP poster (also .webp)
 *   - hero-poster.webp
 *   - tour.mp4         full clip WITH audio, optimized, for the /videos page
 *
 * The hero loop is trimmed to a clean ~18s segment (skips the first 2s) so it
 * loops smoothly and stays small. Nothing is deleted; outputs are regenerated.
 *
 * Usage: node scripts/process-videos2.mjs
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const SRC = join(ROOT, "_raw", "VIDEOS", "best.mp4");
const OUT = join(ROOT, "public", "videos");
const fmtMB = (b) => (b / 1048576).toFixed(2) + " MB";
const ff = (args) => execFileSync("ffmpeg", ["-y", ...args], { stdio: "inherit" });

if (!existsSync(SRC)) { console.error(`Missing source ${SRC}`); process.exit(1); }
try { execFileSync("ffmpeg", ["-version"], { stdio: "ignore" }); }
catch { console.error("ffmpeg not on PATH"); process.exit(1); }
mkdirSync(OUT, { recursive: true });

const START = "00:00:02";          // skip shaky intro
const DUR = "18";                  // hero loop length (s)
const before = statSync(SRC).size;
const rows = [];

// 1) Desktop hero — H.264 high, <=1080px tall, muted, faststart
ff(["-ss", START, "-i", SRC, "-t", DUR,
  "-vf", "scale=-2:'min(1080,ih)'",
  "-c:v", "libx264", "-profile:v", "high", "-preset", "slow", "-crf", "26",
  "-pix_fmt", "yuv420p", "-an", "-movflags", "+faststart", join(OUT, "hero.mp4")]);
rows.push(["hero.mp4", statSync(join(OUT, "hero.mp4")).size]);

// 2) Desktop hero — VP9 WebM (smaller), muted
ff(["-ss", START, "-i", SRC, "-t", DUR,
  "-vf", "scale=-2:'min(1080,ih)'",
  "-c:v", "libvpx-vp9", "-crf", "34", "-b:v", "0", "-cpu-used", "4",
  "-row-mt", "1", "-pix_fmt", "yuv420p", "-an", join(OUT, "hero.webm")]);
rows.push(["hero.webm", statSync(join(OUT, "hero.webm")).size]);

// 3) Mobile hero — smaller H.264, <=720px tall
ff(["-ss", START, "-i", SRC, "-t", DUR,
  "-vf", "scale=-2:'min(720,ih)'",
  "-c:v", "libx264", "-profile:v", "main", "-preset", "slow", "-crf", "28",
  "-pix_fmt", "yuv420p", "-an", "-movflags", "+faststart", join(OUT, "hero-mobile.mp4")]);
rows.push(["hero-mobile.mp4", statSync(join(OUT, "hero-mobile.mp4")).size]);

// 4) Poster frame (jpg + webp)
ff(["-ss", "00:00:04", "-i", SRC, "-frames:v", "1",
  "-vf", "scale=-2:1080", "-q:v", "3", join(OUT, "hero-poster.jpg")]);
ff(["-ss", "00:00:04", "-i", SRC, "-frames:v", "1",
  "-vf", "scale=-2:1080", "-c:v", "libwebp", "-quality", "82", join(OUT, "hero-poster.webp")]);
rows.push(["hero-poster.jpg", statSync(join(OUT, "hero-poster.jpg")).size]);
rows.push(["hero-poster.webp", statSync(join(OUT, "hero-poster.webp")).size]);

// 5) Full tour clip WITH audio (for /videos page), optimized
ff(["-i", SRC, "-vf", "scale=-2:'min(1080,ih)'",
  "-c:v", "libx264", "-profile:v", "high", "-preset", "slow", "-crf", "25",
  "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k",
  "-movflags", "+faststart", join(OUT, "tour.mp4")]);
rows.push(["tour.mp4", statSync(join(OUT, "tour.mp4")).size]);

const md = ["# Video Optimization Inventory v2 — Hotel Siddhi Vinayak", "",
  `Source: \`_raw/VIDEOS/best.mp4\` (${fmtMB(before)}, 720x1280, 35.8s)`, "",
  "| Output | Size | Role |", "|--------|------|------|",
  ...rows.map(([n, s]) => `| \`/videos/${n}\` | ${fmtMB(s)} | ${n.includes("poster") ? "Poster" : n.startsWith("tour") ? "Tour (with audio)" : n.includes("mobile") ? "Mobile hero" : "Desktop hero"} |`),
].join("\n");
writeFileSync(join(ROOT, "VIDEO-INVENTORY.md"), md);

console.log("\n=== DONE ===");
for (const [n, s] of rows) console.log(`  /videos/${n}  ${fmtMB(s)}`);
console.log("Report: VIDEO-INVENTORY.md");

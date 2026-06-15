/**
 * Hotel Siddhi Vinayak — video pipeline (requires ffmpeg on PATH).
 *
 * Transcodes large originals (.MOV/.MP4) from _raw/VIDEOS/ into web-optimized,
 * max-1080p H.264 MP4s with a poster frame, tuned for fast loading and Core Web
 * Vitals (faststart moves the moov atom up so playback starts before full load).
 *
 * The single best clip → public/videos/hero.mp4 + public/videos/hero-poster.jpg
 * for the muted autoplay homepage hero background. Others → gallery clips.
 *
 * Usage:
 *   node scripts/process-videos.mjs                 # all clips in _raw/VIDEOS
 *   node scripts/process-videos.mjs --hero=IMG_1530.MOV
 */
import { execFileSync } from "node:child_process";
import { readdirSync, existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { join, resolve, extname, basename } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const RAW = join(ROOT, "_raw", "VIDEOS");
const OUT = join(ROOT, "public", "videos");
const heroArg = (process.argv.find((a) => a.startsWith("--hero=")) || "").split("=")[1];
const fmtMB = (b) => (b / 1048576).toFixed(1) + " MB";

function ffmpeg(args) { execFileSync("ffmpeg", ["-y", ...args], { stdio: "inherit" }); }

if (!existsSync(RAW)) { console.error(`Missing ${RAW} — download the VIDEOS folder into _raw/VIDEOS/`); process.exit(1); }
try { execFileSync("ffmpeg", ["-version"], { stdio: "ignore" }); }
catch { console.error("ffmpeg not found on PATH. Install it (https://ffmpeg.org/download.html) and re-run."); process.exit(1); }

mkdirSync(OUT, { recursive: true });
const clips = readdirSync(RAW).filter((f) => [".mov", ".mp4", ".m4v"].includes(extname(f).toLowerCase()));
if (!clips.length) { console.error("No videos in _raw/VIDEOS/"); process.exit(1); }

// Hero = explicit --hero, else the largest clip (usually the most complete walkthrough).
const hero = heroArg && clips.includes(heroArg)
  ? heroArg
  : clips.map((c) => ({ c, s: statSync(join(RAW, c)).size })).sort((a, b) => b.s - a.s)[0].c;

const rows = [];
// Shared encode: cap height 1080, even dims, H.264 high, CRF 26 (visually clean,
// small), AAC 128k, +faststart. Hero is muted (autoplay policy) → drop audio.
const baseV = ["-vf", "scale=-2:'min(1080,ih)'", "-c:v", "libx264", "-profile:v", "high", "-preset", "slow", "-crf", "26", "-pix_fmt", "yuv420p", "-movflags", "+faststart"];

for (const clip of clips) {
  const src = join(RAW, clip);
  const before = statSync(src).size;
  const isHero = clip === hero;
  const outName = isHero ? "hero.mp4" : basename(clip, extname(clip)).toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".mp4";
  const out = join(OUT, outName);

  if (isHero) ffmpeg([..."-i".split(" "), src, ...baseV, "-an", out]);              // hero: no audio
  else ffmpeg(["-i", src, ...baseV, "-c:a", "aac", "-b:a", "128k", out]);

  if (isHero) ffmpeg(["-i", src, "-ss", "00:00:01", "-frames:v", "1", "-vf", "scale=-2:1080", join(OUT, "hero-poster.jpg")]);

  const after = statSync(out).size;
  rows.push({ clip, out: `/videos/${outName}`, before, after, hero: isHero });
  console.log(`✓ ${clip} → /videos/${outName}  (${fmtMB(before)} → ${fmtMB(after)})${isHero ? "  [HERO + poster]" : ""}`);
}

const md = ["# Video Optimization Inventory — Hotel Siddhi Vinayak", "",
  "| Original | Optimized (≤1080p H.264) | Before | After | Role |",
  "|----------|--------------------------|--------|-------|------|",
  ...rows.map((r) => `| \`${r.clip}\` | \`${r.out}\` | ${fmtMB(r.before)} | ${fmtMB(r.after)} | ${r.hero ? "Hero background" : "Gallery"} |`),
].join("\n");
writeFileSync(join(ROOT, "VIDEO-INVENTORY.md"), md);
console.log(`\nHero: /videos/hero.mp4 (+ hero-poster.jpg). Report: VIDEO-INVENTORY.md`);
console.log("Set VIDEO_READY = true in lib/config.ts to enable the hero video.");

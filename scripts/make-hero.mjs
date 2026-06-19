// One-off: build a bright, golden-hour-warm homepage hero from the best Super
// Deluxe Room 310 photo (310-4) — full room, 16:9, lifted brightness + warm tone.
import sharp from "sharp";
import { resolve, join } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const src = join(ROOT, "_raw", "310", "310-4.jpg");
const out = join(ROOT, "public", "images", "hero", "super-deluxe-310-hero.webp");

const { data, info } = await sharp(src)
  .rotate()
  .resize({ width: 2000, height: 1125, fit: "cover", position: "centre" }) // 16:9, full room
  .linear([1.06, 1.0, 0.94], [6, 3, -3])         // warm golden tone (lift R, ease B)
  .normalise()
  .modulate({ brightness: 1.1, saturation: 1.08 }) // bright & welcoming
  .gamma(1.05)
  .sharpen({ sigma: 0.9, m1: 0.5, m2: 2.2 })
  .webp({ quality: 84 })
  .toBuffer({ resolveWithObject: true });

await sharp(data).toFile(out);
console.log(`✓ hero ${(info.size / 1024).toFixed(0)} KB  ${info.width}x${info.height} -> ${out}`);

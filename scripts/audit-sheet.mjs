// Builds a labeled contact sheet (grid montage) of a room category's images so
// they can be reviewed in a single glance. Usage: node scripts/audit-sheet.mjs <category-folder>
import sharp from "sharp";
import { readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const cat = process.argv[2] || "deluxe-room";
const dir = join(ROOT, "public", "images", "rooms", cat);
const files = readdirSync(dir).filter((f) => f.endsWith(".webp")).sort();

const COL = 3, CELL = 460, PAD = 28, LABEL = 34;
const rows = Math.ceil(files.length / COL);
const W = COL * CELL + PAD;
const H = rows * (CELL + LABEL) + PAD;

const cells = await Promise.all(files.map(async (f, i) => {
  const buf = await sharp(join(dir, f)).resize(CELL - PAD, CELL - PAD - LABEL, { fit: "cover", position: "centre" }).toBuffer();
  const c = i % COL, r = Math.floor(i / COL);
  const left = PAD + c * CELL;
  const top = PAD + r * (CELL + LABEL);
  const label = Buffer.from(
    `<svg width="${CELL - PAD}" height="${LABEL}"><rect width="100%" height="100%" fill="#1F1611"/><text x="8" y="22" font-family="sans-serif" font-size="20" fill="#E8D8B5">${i + 1}. ${f.replace(cat + "-jodhpur-", "#").replace(".webp", "")}</text></svg>`
  );
  return [
    { input: buf, left, top },
    { input: label, left, top: top + (CELL - PAD - LABEL) },
  ];
}));

const out = join(ROOT, "scripts", `_sheet-${cat}.png`);
await sharp({ create: { width: W, height: H, channels: 3, background: "#F8F4EE" } })
  .composite(cells.flat())
  .png()
  .toFile(out);
console.log("wrote", out, `(${files.length} images)`);

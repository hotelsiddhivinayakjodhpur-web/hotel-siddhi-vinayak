// Builds labeled contact-sheet montages from _raw/ folders so images can be
// reviewed visually and curated. Usage: node scripts/contact-sheet.mjs <out.jpg> <folder1> <folder2> ...
import sharp from "sharp";
import { readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, resolve, extname } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const RAW = join(ROOT, "_raw");
const [outName, ...dirs] = process.argv.slice(2);
const COLS = 4, TW = 360, TH = 240, LBL = 26, PAD = 6;

const tiles = [];
for (const d of dirs) {
  const abs = join(RAW, d);
  if (!existsSync(abs)) continue;
  for (const f of readdirSync(abs)) {
    if (![".jpg", ".jpeg", ".png", ".webp"].includes(extname(f).toLowerCase())) continue;
    tiles.push({ dir: d, file: f, path: join(abs, f) });
  }
}
const rows = Math.ceil(tiles.length / COLS);
const W = COLS * (TW + PAD) + PAD, H = rows * (TH + LBL + PAD) + PAD;

const composites = [];
for (let i = 0; i < tiles.length; i++) {
  const r = Math.floor(i / COLS), c = i % COLS;
  const x = PAD + c * (TW + PAD), y = PAD + r * (TH + LBL + PAD);
  const img = await sharp(tiles[i].path).rotate().resize(TW, TH, { fit: "cover" }).jpeg().toBuffer();
  composites.push({ input: img, top: y, left: x });
  const label = `${tiles[i].dir}/${tiles[i].file}`.slice(0, 40);
  const svg = `<svg width="${TW}" height="${LBL}"><rect width="100%" height="100%" fill="#1A1410"/><text x="6" y="18" font-family="monospace" font-size="14" fill="#C5A572">[${i}] ${label}</text></svg>`;
  composites.push({ input: Buffer.from(svg), top: y + TH, left: x });
}
mkdirSync(join(ROOT, "_review"), { recursive: true });
await sharp({ create: { width: W, height: H, channels: 3, background: "#000" } })
  .composite(composites).jpeg({ quality: 78 }).toFile(join(ROOT, "_review", outName));
console.log(`${outName}: ${tiles.length} tiles -> _review/${outName}`);
tiles.forEach((t, i) => console.log(`  [${i}] ${t.dir}/${t.file}`));

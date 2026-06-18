// Downloads the curated Instagram media (public CDN URLs from the connector) and
// processes them into self-hosted WebP (the CDN links expire, so we don't hotlink).
// Also writes lib/instagram.ts with permalinks + captions for linking.
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve, dirname } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const man = JSON.parse(readFileSync(join(ROOT, "scripts", "_ig-manifest.json"), "utf8"));
const OUT = join(ROOT, "public", "images", "instagram");

const rows = [];
for (const [name, m] of Object.entries(man)) {
  try {
    const res = await fetch(m.url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) { console.warn("FAIL " + name + " " + res.status); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    const outRel = `/images/instagram/${name}.webp`;
    const outAbs = join(ROOT, "public", outRel);
    mkdirSync(dirname(outAbs), { recursive: true });
    const info = await sharp(buf).rotate()
      .resize({ width: 1200, height: 800, fit: "cover", position: "centre" })
      .modulate({ saturation: 1.06 }).sharpen({ sigma: 0.8 })
      .webp({ quality: 80 }).toBuffer({ resolveWithObject: true });
    writeFileSync(outAbs, info.data);
    rows.push({ name, src: outRel, permalink: m.permalink, caption: m.caption, type: m.type, likes: m.likes });
    console.log(`✓ ${name}  ${(buf.length / 1024).toFixed(0)}KB → ${(info.info.size / 1024).toFixed(0)}KB`);
  } catch (e) { console.warn("ERR " + name + " " + e.message); }
}
writeFileSync(join(ROOT, "scripts", "_ig-processed.json"), JSON.stringify(rows, null, 1));
console.log(`\n${rows.length} Instagram assets processed.`);

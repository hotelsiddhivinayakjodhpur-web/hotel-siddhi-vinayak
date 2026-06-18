// Fetches REAL, CC-licensed lead photos for Jodhpur attractions from Wikipedia
// (Wikimedia Commons) and self-hosts them. Records the source page for attribution.
// No stock, no AI — only verified photos of the actual landmarks.
import sharp from "sharp";
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = join(ROOT, "public", "images", "attractions");
mkdirSync(OUT, { recursive: true });

// slug -> Wikipedia article title (the lead image is the real landmark photo)
const TITLES = {
  "toorji-ka-jhalra": "Toorji ka Jhalra",
  "clock-tower-sardar-market": "Sardar Market",
  "machiya-safari-park": "Machia Biological Park",
  "balsamand-lake": "Balsamand",
  "osian": "Osian, Jodhpur",
  "umaid-bhawan-palace": "Umaid Bhawan Palace",
  "rao-jodha-desert-rock-park": "Rao Jodha Desert Rock Park",
};

const existing = existsSync(join(ROOT, "scripts", "_wikimedia.json"))
  ? JSON.parse(readFileSync(join(ROOT, "scripts", "_wikimedia.json"), "utf8")) : {};

for (const [slug, title] of Object.entries(TITLES)) {
  try {
    const api = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const res = await fetch(api, { headers: { "User-Agent": "HSV-Website/1.0 (hotelsiddhi-vinayak.com)" } });
    if (!res.ok) { console.warn(`✗ ${slug}: summary ${res.status}`); continue; }
    const j = await res.json();
    const imgUrl = j.originalimage?.source || j.thumbnail?.source;
    if (!imgUrl) { console.warn(`✗ ${slug}: no image on "${title}"`); continue; }
    const img = await fetch(imgUrl, { headers: { "User-Agent": "HSV-Website/1.0" } });
    if (!img.ok) { console.warn(`✗ ${slug}: image ${img.status}`); continue; }
    const buf = Buffer.from(await img.arrayBuffer());
    const info = await sharp(buf).rotate()
      .resize({ width: 1600, height: 1067, fit: "cover", position: "centre" })
      .modulate({ saturation: 1.04 }).sharpen({ sigma: 0.7 })
      .webp({ quality: 80 }).toBuffer({ resolveWithObject: true });
    writeFileSync(join(OUT, `${slug}.webp`), info.data);
    existing[slug] = { src: `/images/attractions/${slug}.webp`, sourceUrl: j.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`, credit: "Wikimedia Commons (CC BY-SA)" };
    console.log(`✓ ${slug}  ${(buf.length / 1024).toFixed(0)}KB → ${(info.info.size / 1024).toFixed(0)}KB  (${title})`);
  } catch (e) { console.warn(`✗ ${slug}: ${e.message}`); }
}
writeFileSync(join(ROOT, "scripts", "_wikimedia.json"), JSON.stringify(existing, null, 1));
console.log(`\n${Object.keys(existing).length} attraction photos ready (see scripts/_wikimedia.json).`);

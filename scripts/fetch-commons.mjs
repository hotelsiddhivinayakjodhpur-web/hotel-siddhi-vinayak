// Fetches real photos from Wikimedia Commons File: search (CC-licensed) for
// attractions without a Wikipedia lead image. Records artist/license for credit.
import sharp from "sharp";
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = join(ROOT, "public", "images", "attractions");
mkdirSync(OUT, { recursive: true });
const store = existsSync(join(ROOT, "scripts", "_wikimedia.json")) ? JSON.parse(readFileSync(join(ROOT, "scripts", "_wikimedia.json"), "utf8")) : {};

const SEARCH = {
  "balsamand-lake": "Balsamand Lake palace Jodhpur",
  "bishnoi-village": "Bishnoi people Rajasthan",
  "chamunda-mata-temple": "Chamunda Mata temple Mehrangarh Jodhpur",
};

for (const [slug, q] of Object.entries(SEARCH)) {
  try {
    const api = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1600&format=json&origin=*`;
    const res = await fetch(api, { headers: { "User-Agent": "HSV-Website/1.0 (hotelsiddhi-vinayak.com)" } });
    const j = await res.json();
    const pages = Object.values(j.query?.pages || {});
    const pick = pages.map((p) => p.imageinfo?.[0]).filter((i) => i && /\.(jpe?g|png)$/i.test(i.url) && (i.thumburl || i.url))[0];
    if (!pick) { console.warn(`✗ ${slug}: no Commons image`); continue; }
    const url = pick.thumburl || pick.url;
    const img = await fetch(url, { headers: { "User-Agent": "HSV-Website/1.0" } });
    if (!img.ok) { console.warn(`✗ ${slug}: dl ${img.status}`); continue; }
    const buf = Buffer.from(await img.arrayBuffer());
    const info = await sharp(buf).rotate().resize({ width: 1600, height: 1067, fit: "cover", position: "centre" })
      .modulate({ saturation: 1.04 }).sharpen({ sigma: 0.7 }).webp({ quality: 80 }).toBuffer({ resolveWithObject: true });
    writeFileSync(join(OUT, `${slug}.webp`), info.data);
    const artist = (pick.extmetadata?.Artist?.value || "").replace(/<[^>]+>/g, "").trim().slice(0, 80);
    const lic = pick.extmetadata?.LicenseShortName?.value || "CC";
    store[slug] = { src: `/images/attractions/${slug}.webp`, sourceUrl: pick.descriptionurl, credit: `${artist || "Wikimedia Commons"} / ${lic}` };
    console.log(`✓ ${slug}  → ${(info.info.size / 1024).toFixed(0)}KB  (${lic})`);
  } catch (e) { console.warn(`✗ ${slug}: ${e.message}`); }
}
writeFileSync(join(ROOT, "scripts", "_wikimedia.json"), JSON.stringify(store, null, 1));
console.log(`\nTotal sourced: ${Object.keys(store).length}`);

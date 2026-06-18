// Real, CC-licensed Jodhpur photos for the blog (transport + skyline) that aren't
// covered by the attractions set. Wikipedia/Commons only — no stock, no Jaipur,
// no AI. Self-hosted as optimized WebP in public/images/blog/.
import sharp from "sharp";
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = join(ROOT, "public", "images", "blog");
mkdirSync(OUT, { recursive: true });
const store = existsSync(join(ROOT, "scripts", "_blog-media.json"))
  ? JSON.parse(readFileSync(join(ROOT, "scripts", "_blog-media.json"), "utf8")) : {};

// slug -> Wikipedia article title (lead image is a real photo of the subject)
const TITLES = {
  "jodhpur-blue-city": "Jodhpur",
  "jodhpur-railway-station": "Jodhpur Junction railway station",
  "jodhpur-airport": "Jodhpur Airport",
};
// Fallbacks via Commons File: search if the article has no usable lead image.
const SEARCH = {
  "jodhpur-railway-station": "Jodhpur Junction railway station",
  "jodhpur-airport": "Jodhpur Airport terminal",
};

async function fromSummary(title) {
  const api = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetch(api, { headers: { "User-Agent": "HSV-Website/1.0 (hotelsiddhi-vinayak.com)" } });
  if (!res.ok) return null;
  const j = await res.json();
  const url = j.originalimage?.source || j.thumbnail?.source;
  return url ? { url, sourceUrl: j.content_urls?.desktop?.page, credit: "Wikimedia Commons (CC BY-SA)" } : null;
}
async function fromCommons(q) {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1600&format=json&origin=*`;
  const res = await fetch(api, { headers: { "User-Agent": "HSV-Website/1.0" } });
  const j = await res.json();
  const pages = Object.values(j.query?.pages || {});
  const pick = pages.map((p) => p.imageinfo?.[0]).filter((i) => i && /\.(jpe?g|png)$/i.test(i.url))[0];
  if (!pick) return null;
  const lic = pick.extmetadata?.LicenseShortName?.value || "CC";
  return { url: pick.thumburl || pick.url, sourceUrl: pick.descriptionurl, credit: `Wikimedia Commons / ${lic}` };
}

for (const [slug, title] of Object.entries(TITLES)) {
  try {
    let pick = await fromSummary(title);
    if (!pick && SEARCH[slug]) pick = await fromCommons(SEARCH[slug]);
    if (!pick) { console.warn(`✗ ${slug}: no image`); continue; }
    const img = await fetch(pick.url, { headers: { "User-Agent": "HSV-Website/1.0" } });
    if (!img.ok) { console.warn(`✗ ${slug}: dl ${img.status}`); continue; }
    const buf = Buffer.from(await img.arrayBuffer());
    const info = await sharp(buf).rotate().resize({ width: 1600, height: 900, fit: "cover", position: "centre" })
      .modulate({ saturation: 1.04 }).sharpen({ sigma: 0.7 }).webp({ quality: 80 }).toBuffer({ resolveWithObject: true });
    writeFileSync(join(OUT, `${slug}.webp`), info.data);
    store[slug] = { src: `/images/blog/${slug}.webp`, sourceUrl: pick.sourceUrl, credit: pick.credit };
    console.log(`✓ ${slug} → ${(info.info.size / 1024).toFixed(0)}KB  (${pick.credit})`);
  } catch (e) { console.warn(`✗ ${slug}: ${e.message}`); }
}
writeFileSync(join(ROOT, "scripts", "_blog-media.json"), JSON.stringify(store, null, 1));
console.log(`\n${Object.keys(store).length} blog photos ready (see scripts/_blog-media.json).`);

// Decodes Drive download results (auto-saved JSON in the tool-results dir) into
// _raw/<folder>/<file> using scripts/_download-map.json (Drive id -> path).
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const RAW = join(ROOT, "_raw");
const MAP = JSON.parse(readFileSync(join(ROOT, "scripts", "_download-map.json"), "utf8"));
const TR = process.argv[2]; // tool-results directory

const files = readdirSync(TR).filter((f) => f.includes("download_file_content") && f.endsWith(".txt"));
let ok = 0, skip = 0;
const seen = new Set();

for (const f of files) {
  let d;
  try { d = JSON.parse(readFileSync(join(TR, f), "utf8")); } catch { continue; }
  if (!d || !d.id || !d.content) continue;
  const rel = MAP[d.id];
  if (!rel) { skip++; continue; }
  if (seen.has(d.id)) continue;
  seen.add(d.id);
  const out = join(RAW, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, Buffer.from(d.content, "base64"));
  ok++;
  console.log(`✓ ${rel}  (${(Buffer.byteLength(d.content, "base64") / 1024).toFixed(0)} KB) ← ${d.title}`);
}
console.log(`\nDecoded ${ok} files into _raw/. Map entries not yet downloaded: ${Object.keys(MAP).length - seen.size}.`);

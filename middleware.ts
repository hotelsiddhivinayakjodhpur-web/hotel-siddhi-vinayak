import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { site } from "@/lib/config";

// The single canonical host for the whole brand.
const CANONICAL_HOST = new URL(site.url).host; // "hotelsiddhi-vinayak.com"

// Hosts we never touch (local dev, Vercel preview deployments).
function isExemptHost(host: string): boolean {
  return (
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1") ||
    host.endsWith(".vercel.app")
  );
}

// Fold the www. variant of the canonical domain into the bare apex so there is
// exactly one indexable origin. (Any legacy domains should be redirected at the
// registrar / Vercel domain level — they are intentionally not referenced here.)
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (!host || host === CANONICAL_HOST || isExemptHost(host)) {
    return NextResponse.next();
  }
  if (host !== `www.${CANONICAL_HOST}`) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.host = CANONICAL_HOST;
  url.protocol = "https:";
  url.port = "";
  return NextResponse.redirect(url, 301);
}

export const config = {
  // Run on all paths except Next internals and static assets.
  matcher: ["/((?!_next/|.*\\..*).*)"],
};

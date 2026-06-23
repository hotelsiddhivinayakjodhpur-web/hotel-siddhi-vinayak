"use client";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Fires a GA4 page_view on client-side (SPA) route changes. The very first page
// view is already sent by gtag('config') on load, so we skip the initial render
// to avoid double-counting. Must be wrapped in <Suspense> (useSearchParams).
export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const qs = searchParams?.toString();
    window.gtag?.("event", "page_view", {
      page_path: pathname + (qs ? `?${qs}` : ""),
      page_location: window.location.href,
      page_title: document.title,
    });
    // Meta Pixel SPA page view (the initial view is sent by the pixel base code).
    window.fbq?.("track", "PageView");
  }, [pathname, searchParams]);

  return null;
}

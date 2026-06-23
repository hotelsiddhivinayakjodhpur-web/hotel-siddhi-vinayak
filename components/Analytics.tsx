"use client";
import Script from "next/script";
import { useEffect } from "react";

// GA4 — Google Analytics 4 via gtag.js. Loaded after the page is interactive
// (strategy="afterInteractive") so it never blocks first paint / LCP.
const GA_ID = "G-FC631B8GVJ";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function track(event: string, params: Record<string, unknown>) {
  window.gtag?.("event", event, params);
}

export default function Analytics() {
  // Delegated click tracking for the key conversion CTAs. One capture-phase
  // listener covers every instance of these buttons site-wide (header, hero,
  // footer, sticky bar, room cards, etc.) without touching each component.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const text = (a.textContent || "").trim().toLowerCase();
      if (/stayflexi\.com/i.test(href)) {
        track("book_now", { cta: "book_now", link_url: href, link_text: text.slice(0, 60) });
      } else if (/^tel:/i.test(href)) {
        track("call_now", { cta: "call_now", link_url: href });
      } else if (/wa\.me|api\.whatsapp|whatsapp/i.test(href)) {
        track("whatsapp_click", { cta: "whatsapp", link_url: href, link_text: text.slice(0, 60) });
      } else if (/^\/rooms\b/.test(href) && /view rooms/.test(text)) {
        track("view_rooms", { cta: "view_rooms_and_rates", link_url: href });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}

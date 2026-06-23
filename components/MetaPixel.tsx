"use client";
import Script from "next/script";
import { useEffect } from "react";

// Meta (Facebook) Pixel via fbq. Loaded after the page is interactive so it
// never blocks first paint. Runs alongside GA4 — independent of it.
const PIXEL_ID = "1771081630925672";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function MetaPixel() {
  // One capture-phase delegated listener fires a custom event per CTA click,
  // for every instance of these buttons site-wide. One click = one fbq call.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a") as HTMLAnchorElement | null;
      if (!a || !window.fbq) return;
      const href = a.getAttribute("href") || "";
      const text = (a.textContent || "").trim().toLowerCase();
      if (/stayflexi\.com/i.test(href)) {
        window.fbq("trackCustom", "BookNowClick", { link_url: href });
      } else if (/^tel:/i.test(href)) {
        window.fbq("trackCustom", "CallNowClick", { link_url: href });
      } else if (/wa\.me|api\.whatsapp|whatsapp/i.test(href)) {
        window.fbq("trackCustom", "WhatsAppClick", { link_url: href });
      } else if (/^\/rooms\b/.test(href) && /view rooms/.test(text)) {
        window.fbq("trackCustom", "ViewRoomsClick", { link_url: href });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Play, Heart, Instagram } from "lucide-react";
import { instagramFeed } from "@/lib/instagram";
import { site } from "@/lib/config";

const reelId = (permalink: string) => {
  const m = permalink.match(/\/(?:reel|p)\/([^/]+)/);
  return m ? m[1] : "";
};

export default function VideoGallery() {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [active, close]);

  return (
    <>
      <div className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3">
        {instagramFeed.map((v, i) => (
          <button
            key={v.permalink}
            onClick={() => setActive(i)}
            aria-label={`Play reel: ${v.caption}`}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <Image
              src={v.src}
              alt={v.caption}
              width={600}
              height={i % 3 === 0 ? 750 : 600}
              loading={i < 3 ? "eager" : "lazy"}
              className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg transition group-hover:scale-110">
              <Play size={24} className="ml-1 fill-ink" />
            </span>
            <span className="absolute inset-x-0 bottom-0 p-4 text-left">
              <span className="block text-sm font-medium text-white line-clamp-1">{v.caption}</span>
              <span className="mt-1 flex items-center gap-1 text-xs text-white/80"><Heart size={12} className="fill-white/80" /> {v.likes}</span>
            </span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4"
          onClick={close}
        >
          <button onClick={close} aria-label="Close" className="absolute right-4 top-4 text-sand hover:text-gold">
            <X size={32} />
          </button>
          <div className="w-full max-w-[400px]" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
              <iframe
                src={`https://www.instagram.com/reel/${reelId(instagramFeed[active].permalink)}/embed`}
                title={instagramFeed[active].caption}
                className="h-[640px] w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                loading="lazy"
              />
            </div>
            <a
              href={instagramFeed[active].permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 text-sm text-sand/80 hover:text-gold"
            >
              <Instagram size={16} /> Watch on Instagram @{site.instagramHandle}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

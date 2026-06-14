"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages, galleryCategories } from "@/lib/data";

export default function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof galleryCategories)[number]>("All");
  const [active, setActive] = useState<number | null>(null);

  const shown = galleryImages.filter((g) => filter === "All" || g.category === filter);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(() => setActive((a) => (a === null ? a : (a + 1) % shown.length)), [shown.length]);
  const prev = useCallback(() => setActive((a) => (a === null ? a : (a - 1 + shown.length) % shown.length)), [shown.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  return (
    <>
      {/* Category filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {galleryCategories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              filter === c ? "bg-gold text-ink" : "bg-white text-ink/70 hover:bg-gold/20"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3">
        {shown.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setActive(i)}
            aria-label={`View larger: ${img.alt}`}
            className="group block w-full overflow-hidden rounded-2xl break-inside-avoid focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={600}
              height={i % 2 ? 800 : 500}
              loading={i < 3 ? "eager" : "lazy"}
              className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4"
          onClick={close}
        >
          <button onClick={close} aria-label="Close" className="absolute right-4 top-4 text-sand hover:text-gold">
            <X size={32} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
            className="absolute left-2 sm:left-6 text-sand hover:text-gold"
          >
            <ChevronLeft size={40} />
          </button>
          <figure className="relative max-h-[85vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={shown[active].src.replace("w=1000", "w=1600")}
              alt={shown[active].alt}
              width={1600}
              height={1066}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-sand/80">{shown[active].alt}</figcaption>
          </figure>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
            className="absolute right-2 sm:right-6 text-sand hover:text-gold"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </>
  );
}

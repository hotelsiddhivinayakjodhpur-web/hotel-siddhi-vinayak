"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Muted, autoplay, looping background video for the homepage hero. Respects
// prefers-reduced-motion (renders the poster image only) and lazily plays once
// mounted so it never blocks LCP — the poster is the painted hero image.
export default function HeroVideo({
  src,
  poster,
  alt,
}: {
  src: string;
  poster: string;
  alt: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!reduced && ref.current) ref.current.play().catch(() => {});
  }, [reduced]);

  if (reduced) {
    return <Image src={poster} alt={alt} fill priority className="object-cover" sizes="100vw" />;
  }

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      aria-label={alt}
    >
      {/* H.264 MP4 (promo reel). */}
      <source src={src} type="video/mp4" />
    </video>
  );
}

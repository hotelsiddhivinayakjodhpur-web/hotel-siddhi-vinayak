import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats first; Next negotiates per-browser. AVIF ~30% smaller
    // than WebP → faster LCP on image-heavy hotel pages.
    formats: ["image/avif", "image/webp"],
    // Responsive breakpoints next/image generates from each master:
    // mobile → tablet → laptop → desktop → retina. `sizes` on each <Image>
    // picks the right one per viewport.
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [96, 160, 256, 384],
    // Local /images/** are used in production; Unsplash kept only until the last
    // placeholder is swapped, then this entry is removed.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;

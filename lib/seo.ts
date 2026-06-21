import type { Metadata } from "next";
import { site } from "./config";

// Builds per-page metadata with UNIQUE title/description/canonical and matching
// Open Graph (title, description, url) — so each route no longer reuses the
// homepage OG tags. og:image is inherited from the root layout.
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = `${site.url}${path}`;
  const ogTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: ogTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: ogTitle, description },
  };
}

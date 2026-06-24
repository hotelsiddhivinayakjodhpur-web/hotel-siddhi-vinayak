import type { MetadataRoute } from "next";
import { site } from "@/lib/config";
import { rooms } from "@/lib/data";
import { posts } from "@/lib/blog";
import { attractionsData } from "@/lib/attractions";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticRoutes = [
    "", "/booking", "/rooms", "/restaurant", "/gallery", "/videos", "/about", "/contact", "/faq", "/blog", "/nearby-attractions", "/hotel-policies",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/booking" || path === "/rooms" ? 0.9 : 0.8,
  }));

  const roomRoutes = rooms.map((r) => ({
    url: `${base}/rooms/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const blogRoutes = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const attractionRoutes = attractionsData.map((a) => ({
    url: `${base}/attractions/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...roomRoutes, ...blogRoutes, ...attractionRoutes];
}

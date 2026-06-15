import type { MetadataRoute } from "next";
import { site } from "@/lib/config";
import { posts, rooms } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticRoutes = [
    "", "/rooms", "/restaurant", "/gallery", "/about", "/contact", "/faq", "/blog", "/nearby-attractions",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/rooms" ? 0.9 : 0.8,
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

  return [...staticRoutes, ...roomRoutes, ...blogRoutes];
}

import type { Metadata } from "next";
import Link from "next/link";
import { Instagram } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import VideoGallery from "@/components/VideoGallery";
import { BreadcrumbSchema } from "@/components/Schema";
import { instagramFeed } from "@/lib/instagram";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Videos & Experiences",
  description: "Watch reels and videos from Hotel Siddhi Vinayak, Jodhpur — the hotel, the Blue City, Mehrangarh Fort, Umaid Bhawan, Mandore, Kaylana Lake and more.",
  alternates: { canonical: "/videos" },
};

// VideoObject list helps the page surface in video-rich search results.
const videoSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Videos & Experiences — Hotel Siddhi Vinayak, Jodhpur",
  itemListElement: instagramFeed.map((v, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "VideoObject",
      name: v.caption,
      description: v.caption,
      thumbnailUrl: `${site.url}${v.src}`,
      contentUrl: v.permalink,
      uploadDate: "2024-07-01",
    },
  })),
};

export default function VideosPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Videos", path: "/videos" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
      <PageHero title="Videos & Experiences" subtitle="Reels from the Blue City — tap any video to play." image="/images/attractions/mehrangarh-fort.webp" />
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Watch" title="Jodhpur in Motion" subtitle="Original reels from our Instagram — the hotel, the city, and the landmarks around us." />
          <VideoGallery />
          <div className="mt-12 text-center">
            <Link
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-7 py-3 font-medium text-white transition hover:opacity-90"
            >
              <Instagram size={18} /> Follow @{site.instagramHandle}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

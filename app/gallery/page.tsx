import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import { BreadcrumbSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Browse photos of Hotel Siddhi Vinayak, Jodhpur — rooms, lobby, dining and more.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }]} />
      <PageHero title="Gallery" subtitle="A glimpse of your stay with us." image="/images/gallery/property/hotel-01.webp" />
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-7xl px-6">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}

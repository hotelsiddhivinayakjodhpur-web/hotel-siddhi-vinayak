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
      <PageHero title="Gallery" subtitle="A glimpse of your stay with us." image="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1920&q=80" />
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-7xl px-6">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}

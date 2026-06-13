import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { galleryImages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description: "Browse photos of Hotel Siddhi Vinayak, Jodhpur — rooms, lobby, dining and more.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero title="Gallery" subtitle="A glimpse of your stay with us." image="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1920&q=80" />
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-7xl px-6 columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {galleryImages.map((img, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <div className="relative overflow-hidden rounded-2xl break-inside-avoid">
                <Image src={img.src} alt={img.alt} width={600} height={i % 2 ? 800 : 500}
                  className="w-full h-auto object-cover transition duration-500 hover:scale-105" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

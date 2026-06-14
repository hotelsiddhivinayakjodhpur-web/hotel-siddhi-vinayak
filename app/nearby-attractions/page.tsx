import type { Metadata } from "next";
import Image from "next/image";
import { MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { BreadcrumbSchema } from "@/components/Schema";
import { attractions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Nearby Attractions in Jodhpur",
  description: "Discover top attractions near Hotel Siddhi Vinayak — Mehrangarh Fort, Jaswant Thada, Umaid Bhawan Palace, Clock Tower and more in Jodhpur, Rajasthan.",
  alternates: { canonical: "/nearby-attractions" },
};

const attractionsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Tourist attractions near Hotel Siddhi Vinayak, Jodhpur",
  itemListElement: attractions.map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "TouristAttraction",
      name: a.name,
      description: a.description,
      image: a.image,
      address: { "@type": "PostalAddress", addressLocality: "Jodhpur", addressRegion: "Rajasthan", addressCountry: "IN" },
    },
  })),
};

export default function AttractionsPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Nearby Attractions", path: "/nearby-attractions" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionsSchema) }} />
      <PageHero title="Nearby Attractions" subtitle="Explore the best of the Blue City from our doorstep." image="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=80" />
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Things To See" title="Around Jodhpur" subtitle="Forts, palaces, gardens and markets — all within easy reach." />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {attractions.map((a, i) => (
              <Reveal key={a.name} delay={(i % 3) * 0.1}>
                <article className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
                  <div className="relative h-56 overflow-hidden">
                    <Image src={a.image} alt={a.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
                    <span className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-ink/80 px-3 py-1 text-xs text-sand">
                      <MapPin size={12} className="text-gold" /> {a.distance}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-ink">{a.name}</h3>
                    <p className="mt-2 text-sm text-ink/60 leading-relaxed">{a.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

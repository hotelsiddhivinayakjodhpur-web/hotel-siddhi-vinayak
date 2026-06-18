import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { BreadcrumbSchema } from "@/components/Schema";
import { attractionsData } from "@/lib/attractions";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Nearby Attractions in Jodhpur",
  description: "Discover top attractions near Hotel Siddhi Vinayak — Mehrangarh Fort, Jaswant Thada, Umaid Bhawan Palace, Toorji Ka Jhalra, Clock Tower and more in Jodhpur, Rajasthan, with distances, timings and visitor tips.",
  alternates: { canonical: "/nearby-attractions" },
};

const attractionsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Tourist attractions near Hotel Siddhi Vinayak, Jodhpur",
  itemListElement: attractionsData.map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${site.url}/attractions/${a.slug}`,
    item: {
      "@type": "TouristAttraction",
      name: a.name,
      description: a.whyVisit,
      image: `${site.url}${a.gallery[0].src}`,
      url: `${site.url}/attractions/${a.slug}`,
      address: { "@type": "PostalAddress", addressLocality: "Jodhpur", addressRegion: "Rajasthan", addressCountry: "IN" },
    },
  })),
};

export default function AttractionsPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Nearby Attractions", path: "/nearby-attractions" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionsSchema) }} />
      <PageHero title="Nearby Attractions" subtitle="Explore the best of the Blue City from our doorstep." image="/images/attractions/mehrangarh-fort.webp" />
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Things To See" title="Around Jodhpur" subtitle="Forts, palaces, gardens, lakes and markets — all within easy reach. Tap any place for history, timings, maps and visitor tips." />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {attractionsData.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 0.1}>
                <Link href={`/attractions/${a.slug}`} className="group block h-full overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
                  <div className="relative h-56 overflow-hidden">
                    <Image src={a.gallery[0].src} alt={a.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
                    <span className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-ink/80 px-3 py-1 text-xs text-sand">
                      <MapPin size={12} className="text-gold" /> {a.distance}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-ink">{a.name}</h3>
                    <p className="mt-2 text-sm text-ink/60 leading-relaxed line-clamp-3">{a.whyVisit}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold-dark group-hover:gap-2 transition-all">Explore <ArrowRight size={15} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

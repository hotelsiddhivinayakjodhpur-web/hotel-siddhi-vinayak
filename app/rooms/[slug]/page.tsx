import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Users, Maximize, BedDouble, Phone, MessageCircle, ArrowLeft } from "lucide-react";
import Reveal from "@/components/Reveal";
import { rooms } from "@/lib/data";
import { roomImages } from "@/lib/images";
import { site, whatsappLink, callLink, PHOTOS_READY } from "@/lib/config";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = rooms.find((x) => x.slug === slug);
  if (!r) return {};
  return {
    title: r.name,
    description: `${r.name} at Hotel Siddhi Vinayak, Jodhpur — ${r.occupancy.toLowerCase()}, ${r.bed.toLowerCase()}, ${r.size}. ${r.description} Contact us for the best available rate.`,
    alternates: { canonical: `/rooms/${r.slug}` },
    openGraph: { title: `${r.name} — Hotel Siddhi Vinayak`, description: r.description, images: [r.image], type: "website" },
  };
}

export default async function RoomCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = rooms.find((x) => x.slug === slug);
  if (!r) notFound();

  const gallery = PHOTOS_READY && roomImages[r.slug]?.length
    ? roomImages[r.slug]
    : [{ src: r.image, alt: `${r.name} at Hotel Siddhi Vinayak, Jodhpur`, width: 1400, height: 933 }];

  const roomSchema = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: r.name,
    description: r.description,
    url: `${site.url}/rooms/${r.slug}`,
    image: gallery.map((g) => `${site.url}${g.src}`),
    occupancy: { "@type": "QuantitativeValue", maxValue: parseInt(r.occupancy, 10) || undefined, unitText: "Guests" },
    bed: r.bed,
    amenityFeature: r.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a, value: true })),
    isPartOf: { "@type": "Hotel", name: site.name, url: site.url },
    offers: {
      "@type": "Offer",
      price: r.price,
      priceCurrency: site.currency,
      availability: "https://schema.org/InStock",
      url: `${site.url}/rooms/${r.slug}`,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: r.price,
        priceCurrency: site.currency,
        unitText: "per night (room only / EP plan)",
      },
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Rooms", item: `${site.url}/rooms` },
      { "@type": "ListItem", position: 3, name: r.name, item: `${site.url}/rooms/${r.slug}` },
    ],
  };

  const enquiry = whatsappLink(`Hi! I'd like to enquire about the ${r.name} at Hotel Siddhi Vinayak. Please share the best available rate and availability.`);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(roomSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="pt-28 pb-20 bg-sand">
        <div className="mx-auto max-w-6xl px-6">
          <Link href="/rooms" className="inline-flex items-center gap-1 text-gold-dark hover:gap-2 transition-all mb-6">
            <ArrowLeft size={16} /> All Rooms
          </Link>

          {/* Gallery — full-image framing (no crop): every photo shows the whole
              room. White mat keeps a consistent grid for portrait + landscape. */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden bg-white shadow-sm sm:col-span-2">
              <Image src={gallery[0].src} alt={gallery[0].alt} fill priority className="object-contain" sizes="(max-width:1024px) 100vw, 1024px" />
            </div>
            {gallery.slice(1).map((g, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-sm">
                <Image src={g.src} alt={g.alt} fill loading="lazy" className="object-contain" sizes="(max-width:640px) 100vw, 50vw" />
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-serif text-4xl text-ink">{r.name}</h1>
                <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold-dark">{r.highlight}</span>
              </div>
              <p className="mt-2 text-ink">
                <span className="font-serif text-3xl text-gold-dark">₹{r.price.toLocaleString("en-IN")}</span>
                <span className="text-sm text-ink/55"> / night · room only (EP)</span>
              </p>
              <p className="mt-4 text-ink/75 leading-relaxed text-lg">{r.description}</p>
              <div className="mt-6 flex flex-wrap gap-6 text-ink/70">
                <span className="flex items-center gap-2"><Maximize size={18} className="text-gold" /> {r.size}</span>
                <span className="flex items-center gap-2"><Users size={18} className="text-gold" /> {r.occupancy}</span>
                <span className="flex items-center gap-2"><BedDouble size={18} className="text-gold" /> {r.bed}</span>
              </div>
              <h2 className="mt-8 font-serif text-2xl text-ink">Room Amenities</h2>
              <ul className="mt-4 grid grid-cols-2 gap-3 text-ink/75 sm:grid-cols-3">
                {r.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2"><Check size={16} className="text-gold-dark" /> {a}</li>
                ))}
              </ul>
            </div>

            {/* Booking card */}
            <Reveal className="lg:col-span-1">
              <div className="sticky top-28 rounded-2xl bg-white p-6 shadow-lg">
                <p className="font-serif text-2xl text-ink">{r.name}</p>
                <p className="mt-1 text-sm text-ink/60">{r.count} {r.count > 1 ? "rooms" : "room"} of this type</p>
                <p className="mt-4"><span className="font-serif text-3xl text-gold-dark">₹{r.price.toLocaleString("en-IN")}</span><span className="text-sm text-ink/55">/night</span></p>
                <p className="mt-1 text-xs text-ink/55">Best rate guaranteed when you book direct — no OTA commission.</p>
                <a href={enquiry} target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-medium text-white transition hover:opacity-90">
                  <MessageCircle size={18} /> Enquire on WhatsApp
                </a>
                <a href={callLink} className="mt-3 flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-medium text-ink transition hover:bg-gold-dark hover:text-white">
                  <Phone size={17} /> Call Now
                </a>
                <Link href="/contact" className="mt-3 flex items-center justify-center gap-2 rounded-full border border-ink/15 px-6 py-3 font-medium text-ink transition hover:bg-sand">
                  Send an Enquiry
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

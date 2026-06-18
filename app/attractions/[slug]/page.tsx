import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Clock, CalendarHeart, Lightbulb, Phone, MessageCircle, BedDouble, ArrowLeft, ArrowRight, ExternalLink, Instagram } from "lucide-react";
import Reveal from "@/components/Reveal";
import { attractionsData, getAttraction } from "@/lib/attractions";
import { site, whatsappLink, callLink } from "@/lib/config";

export function generateStaticParams() {
  return attractionsData.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getAttraction(slug);
  if (!a) return {};
  const title = `${a.name}, Jodhpur — Guide, Distance & Tips`;
  const description = `${a.name}: ${a.tagline}. ${a.whyVisit} ${a.distance} from Hotel Siddhi Vinayak. History, timings, best time to visit and visitor tips.`;
  return {
    title, description,
    alternates: { canonical: `/attractions/${a.slug}` },
    openGraph: { title, description, url: `${site.url}/attractions/${a.slug}`, images: [a.gallery[0].src], type: "article" },
  };
}

export default async function AttractionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAttraction(slug);
  if (!a) notFound();

  const mapsEmbed = `https://maps.google.com/maps?q=${a.lat},${a.lng}(${encodeURIComponent(a.name)})&z=15&output=embed`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${a.lat},${a.lng}`;
  const nearby = a.nearby.map(getAttraction).filter(Boolean).slice(0, 3);
  const waMsg = `Hi! I'm interested in visiting ${a.name} during my stay at Hotel Siddhi Vinayak. Can you help with a room and local trips?`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: a.name,
    description: a.whyVisit,
    image: a.gallery.map((g) => `${site.url}${g.src}`),
    address: { "@type": "PostalAddress", addressLocality: "Jodhpur", addressRegion: "Rajasthan", addressCountry: "IN" },
    geo: { "@type": "GeoCoordinates", latitude: a.lat, longitude: a.lng },
    openingHours: a.hours,
    isAccessibleForFree: true,
    url: `${site.url}/attractions/${a.slug}`,
  };
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Attractions", item: `${site.url}/nearby-attractions` },
      { "@type": "ListItem", position: 3, name: a.name, item: `${site.url}/attractions/${a.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero gallery */}
      <section className="relative h-[60vh] min-h-[420px] w-full">
        <Image src={a.gallery[0].src} alt={a.name} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/20" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-6 pb-8 text-sand">
          <Link href="/nearby-attractions" className="mb-3 inline-flex items-center gap-1 text-sand/80 hover:text-gold"><ArrowLeft size={16} /> All Attractions</Link>
          <p className="text-gold uppercase tracking-[0.3em] text-xs">Jodhpur · {a.distance}</p>
          <h1 className="font-serif text-4xl sm:text-5xl mt-1">{a.name}</h1>
          <p className="mt-2 text-sand/85">{a.tagline}</p>
        </div>
      </section>

      <section className="bg-sand py-14">
        <div className="mx-auto max-w-5xl px-6 grid gap-10 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {a.gallery.length > 1 && (
              <div className="grid grid-cols-2 gap-3">
                {a.gallery.map((g, i) => (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white">
                    <Image src={g.src} alt={`${a.name} ${i + 1}`} fill loading="lazy" className="object-cover" sizes="(max-width:640px) 50vw, 33vw" />
                  </div>
                ))}
              </div>
            )}

            <Reveal><div><h2 className="font-serif text-2xl text-ink">History</h2><p className="mt-3 text-ink/75 leading-relaxed">{a.history}</p></div></Reveal>
            <Reveal><div><h2 className="font-serif text-2xl text-ink">Why Visit</h2><p className="mt-3 text-ink/75 leading-relaxed">{a.whyVisit}</p></div></Reveal>

            <Reveal>
              <div>
                <h2 className="font-serif text-2xl text-ink flex items-center gap-2"><Lightbulb size={20} className="text-gold-dark" /> Visitor Tips</h2>
                <ul className="mt-3 space-y-2 text-ink/75">
                  {a.tips.map((t) => <li key={t} className="flex gap-2"><span className="text-gold-dark">•</span> {t}</li>)}
                </ul>
              </div>
            </Reveal>

            {/* Map */}
            <div>
              <h2 className="font-serif text-2xl text-ink mb-3">Location</h2>
              <div className="overflow-hidden rounded-2xl border border-gold/20 shadow-sm">
                <iframe src={mapsEmbed} title={`Map of ${a.name}`} className="h-72 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-gold-dark hover:gap-2 transition-all">Open in Google Maps <ExternalLink size={15} /></a>
            </div>

            {a.gallery[0].credit && <p className="text-xs text-ink/40">Photo: {a.gallery[0].credit}</p>}
          </div>

          {/* Sticky info + CTAs */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl bg-white p-6 shadow-lg space-y-3">
                <p className="flex items-center gap-2 text-ink/80"><MapPin size={17} className="text-gold-dark" /> {a.distance} from the hotel</p>
                <p className="flex items-center gap-2 text-ink/80"><Clock size={17} className="text-gold-dark" /> {a.hours}</p>
                <p className="flex items-center gap-2 text-ink/80"><CalendarHeart size={17} className="text-gold-dark" /> Best time: {a.bestTime}</p>
                {a.reelUrl && <a href={a.reelUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gold-dark hover:underline"><Instagram size={17} /> Watch our reel</a>}
                <div className="border-t border-gold/15 pt-4 space-y-2">
                  <a href={whatsappLink(waMsg)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-medium text-white transition hover:opacity-90"><MessageCircle size={17} /> WhatsApp Us</a>
                  <Link href="/rooms" className="flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 font-medium text-ink transition hover:bg-gold-dark hover:text-white"><BedDouble size={17} /> Book a Room</Link>
                  <a href={callLink} className="flex items-center justify-center gap-2 rounded-full border border-ink/15 px-5 py-3 font-medium text-ink transition hover:bg-sand"><Phone size={16} /> Call Now</a>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Nearby */}
        {nearby.length > 0 && (
          <div className="mx-auto max-w-5xl px-6 mt-14">
            <h2 className="font-serif text-2xl text-ink mb-5">Nearby Attractions</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {nearby.map((n) => (
                <Link key={n!.slug} href={`/attractions/${n!.slug}`} className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
                  <div className="relative h-40 overflow-hidden">
                    <Image src={n!.gallery[0].src} alt={n!.name} fill loading="lazy" className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:640px) 100vw, 33vw" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg text-ink">{n!.name}</h3>
                    <span className="mt-1 inline-flex items-center gap-1 text-sm text-gold-dark group-hover:gap-2 transition-all">Explore <ArrowRight size={14} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Wifi, Car, Coffee, ShieldCheck, MapPin, Star, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import InquiryForm from "@/components/InquiryForm";
import MapEmbed from "@/components/MapEmbed";
import TrustStrip from "@/components/TrustStrip";
import Reviews from "@/components/Reviews";
import HeroVideo from "@/components/HeroVideo";
import { HotelSchema } from "@/components/Schema";
import { site, whatsappLink, VIDEO_READY } from "@/lib/config";
import { rooms, attractions } from "@/lib/data";

const features = [
  { icon: Wifi, title: "Free Wi-Fi", desc: "High-speed internet in every room." },
  { icon: Car, title: "Free Parking", desc: "Secure on-site parking for guests." },
  { icon: Coffee, title: "Room Service", desc: "In-room dining and refreshments." },
  { icon: ShieldCheck, title: "24×7 Front Desk", desc: "Round-the-clock assistance." },
];

export default function Home() {
  return (
    <>
      <HotelSchema />

      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center">
        {/* Mobile: static image = fast LCP. Desktop: ambient hero video. */}
        <Image
          src="/images/hero/hotel-siddhi-vinayak-exterior-jodhpur.webp"
          alt="Hotel Siddhi Vinayak exterior in Jodhpur, Rajasthan"
          fill priority sizes="100vw"
          className={`object-cover ${VIDEO_READY ? "md:hidden" : ""}`}
        />
        {VIDEO_READY && (
          <div className="absolute inset-0 hidden md:block">
            <HeroVideo
              src="/videos/hero.mp4"
              poster="/videos/hero-poster.jpg"
              alt="Hotel Siddhi Vinayak, Jodhpur — walkthrough"
            />
          </div>
        )}
        <div className="absolute inset-0 hero-overlay" />
        <Reveal className="relative z-10 px-6">
          <p className="text-gold uppercase tracking-[0.35em] text-sm mb-4">Welcome to Jodhpur</p>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-sand max-w-4xl mx-auto leading-tight">
            {site.name}
          </h1>
          <p className="mt-5 text-sand/85 text-lg max-w-xl mx-auto">{site.tagline}</p>
          {/* Above-the-fold social proof — real Google numbers */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sand">
            <Star size={16} className="fill-gold text-gold" aria-hidden="true" />
            <span className="text-sm">
              <strong className="font-semibold">{site.rating.value}</strong>/5 · <strong className="font-semibold">{site.rating.count}+</strong> Google reviews
            </span>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"
              className="rounded-full bg-gold px-8 py-3.5 font-medium text-ink transition hover:bg-gold-light">
              Book Direct on WhatsApp
            </a>
            <Link href="/rooms"
              className="rounded-full border border-sand/50 px-8 py-3.5 font-medium text-sand transition hover:bg-sand hover:text-ink">
              View Rooms &amp; Rates
            </Link>
          </div>
          <p className="mt-4 text-xs text-sand/70">Best rate guaranteed · No booking fees · Instant confirmation on WhatsApp</p>
        </Reveal>
      </section>

      {/* Trust strip — why book direct */}
      <TrustStrip />

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sand text-gold-dark">
                <f.icon size={28} />
              </div>
              <h3 className="font-serif text-xl text-ink">{f.title}</h3>
              <p className="mt-2 text-sm text-ink/60">{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Rooms preview */}
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Our Rooms" title="Stay in Comfort" subtitle="Four room categories — from Deluxe to Family Four Bed — for a restful stay in the Blue City." />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {rooms.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.1}>
                <Link href={`/rooms/${r.slug}`} className="group block overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
                  <div className="relative h-60 overflow-hidden">
                    <Image src={r.image} alt={`${r.name} at Hotel Siddhi Vinayak, Jodhpur`} fill className="object-cover transition duration-500 group-hover:scale-105" />
                    <span className="absolute top-4 right-4 rounded-full bg-gold px-3 py-1 text-xs font-medium text-ink">
                      {r.occupancy}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-ink">{r.name}</h3>
                    <p className="mt-2 text-sm text-ink/60 line-clamp-2">{r.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-gold-dark font-medium group-hover:gap-2 transition-all">
                      View room <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-2 items-center">
          <Reveal>
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image src="/images/gallery/property/hotel-02.webp" alt="Hotel Siddhi Vinayak building in Jodhpur" fill className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3">About the Hotel</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink">A Warm Welcome in the Heart of Jodhpur</h2>
            <p className="mt-5 text-ink/70 leading-relaxed">
              Located moments from the railway station and the old city, Hotel Siddhi Vinayak combines easy access,
              friendly service and comfortable rooms. Whether you are here to explore Mehrangarh Fort or passing
              through Marwar, we make sure your stay feels like home.
            </p>
            <div className="mt-6 flex items-center gap-2 text-ink">
              <Star className="fill-gold text-gold" size={20} />
              <span className="font-medium">{site.rating.value}</span>
              <span className="text-ink/50 text-sm">from {site.rating.count} guest reviews</span>
            </div>
            <Link href="/about" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sand transition hover:bg-gold hover:text-ink">
              Learn More <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Attractions preview */}
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Explore Jodhpur" title="Nearby Attractions" subtitle="The best of the Blue City, just minutes away." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {attractions.slice(0, 3).map((a, i) => (
              <Reveal key={a.name} delay={i * 0.1}>
                <div className="group relative h-64 overflow-hidden rounded-2xl">
                  <Image src={a.image} alt={a.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <div className="absolute bottom-0 p-5 text-sand">
                    <p className="flex items-center gap-1 text-xs text-gold"><MapPin size={13} /> {a.distance}</p>
                    <h3 className="font-serif text-xl">{a.name}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/nearby-attractions" className="inline-flex items-center gap-2 text-gold-dark font-medium hover:gap-3 transition-all">
              View All Attractions <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Guest reviews — social proof before the booking ask */}
      <Reviews />

      {/* Inquiry + Map */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle title="Book Your Stay" subtitle="Send us your dates and we'll confirm availability over WhatsApp." />
            <InquiryForm />
          </div>
          <div>
            <SectionTitle title="Find Us" subtitle="Conveniently located near Jodhpur Railway Station." />
            <MapEmbed />
          </div>
        </div>
      </section>
    </>
  );
}

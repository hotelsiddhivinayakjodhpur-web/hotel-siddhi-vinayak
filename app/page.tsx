import Link from "next/link";
import Image from "next/image";
import { Wifi, Car, Coffee, ShieldCheck, MapPin, Star, ArrowRight, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import InquiryForm from "@/components/InquiryForm";
import MapEmbed from "@/components/MapEmbed";
import TrustStrip from "@/components/TrustStrip";
import Counters from "@/components/Counters";
import Reviews from "@/components/Reviews";
import BookDirect from "@/components/BookDirect";
import AvailableOn from "@/components/AvailableOn";
import InstagramFollow from "@/components/InstagramFollow";
import HeroVideo from "@/components/HeroVideo";
import { HotelSchema } from "@/components/Schema";
import { site, whatsappLink, VIDEO_READY } from "@/lib/config";
import { rooms } from "@/lib/data";
import { attractionsData } from "@/lib/attractions";

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
          src="/images/hero/super-deluxe-310-hero.webp"
          alt="Premium Super Deluxe Room 310 at Hotel Siddhi Vinayak, Jodhpur — full room with bed, wardrobe, curtains and seating"
          fill priority sizes="100vw"
          className={`object-cover object-center ${VIDEO_READY ? "md:hidden" : ""}`}
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
        <div className="absolute inset-0 hero-overlay-home" />
        <Reveal className="relative z-10 px-6">
          <p className="text-gold-gradient uppercase tracking-[0.25em] text-xs sm:text-sm mb-4 font-semibold [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">Best Budget Hotel Near Jodhpur Railway Station</p>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-sand max-w-4xl mx-auto leading-tight [text-shadow:0_3px_22px_rgba(0,0,0,0.65)]">
            Comfortable Stay in the Heart of Jodhpur
          </h1>
          <p className="mt-5 text-sand text-base sm:text-lg max-w-2xl mx-auto [text-shadow:0_2px_14px_rgba(0,0,0,0.65)]">
            Clean Rooms • Family Friendly • Free Wi-Fi • 350 m from Railway Station
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"
              className="btn-gold rounded-full px-8 py-3.5 font-semibold">
              Book Direct on WhatsApp
            </a>
            <Link href="/rooms"
              className="btn-outline-lux rounded-full px-8 py-3.5 font-medium">
              View Rooms &amp; Rates
            </Link>
          </div>
          <p className="mt-6 text-sm text-sand [text-shadow:0_2px_12px_rgba(0,0,0,0.7)]">
            Trusted by Guests on Booking.com, MakeMyTrip, Agoda &amp; Expedia
          </p>
          <a href={site.social.google} target="_blank" rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-sand transition hover:bg-ink/50">
            <Star size={16} className="fill-gold text-gold" aria-hidden="true" />
            <span className="text-sm font-medium">Read All {site.rating.count}+ Reviews on Google</span>
          </a>
        </Reveal>
      </section>

      {/* Trust strip — why book direct */}
      <TrustStrip />

      {/* Animated stats */}
      <Counters />

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1} className="text-center">
              <div className="group mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold-sheen text-ink shadow-gold transition-transform duration-300 hover:scale-110">
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
                <Link href={`/rooms/${r.slug}`} className="card-lux group block h-full overflow-hidden rounded-2xl bg-white gold-frame">
                  <div className="relative h-60 overflow-hidden">
                    <Image src={r.image} alt={`${r.name} at Hotel Siddhi Vinayak, Jodhpur`} fill className="object-cover img-zoom" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-gold-cta px-3 py-1 text-xs font-semibold text-ink shadow-gold">
                      <Users size={12} /> {r.occupancy}
                    </span>
                    <span className="absolute bottom-4 left-4 rounded-full glass px-3 py-1 text-xs font-medium text-sand">
                      From ₹{r.price.toLocaleString("en-IN")}/night
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-ink">{r.name}</h3>
                    <p className="mt-2 text-sm text-ink/60 line-clamp-2">{r.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-gold-dark font-semibold group-hover:gap-2 transition-all">
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
              <Image src="/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-02.webp" alt="Super Deluxe room at Hotel Siddhi Vinayak, Jodhpur" fill className="object-cover" />
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
              <span className="font-medium">{site.rating.count}+ Guest Reviews</span>
              <span className="text-ink/50 text-sm">across Booking.com, MakeMyTrip, Agoda, Tripadvisor &amp; Google</span>
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
            {attractionsData.slice(0, 3).map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.1}>
                <Link href={`/attractions/${a.slug}`} className="group relative block h-64 overflow-hidden rounded-2xl">
                  <Image src={a.gallery[0].src} alt={a.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:640px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <div className="absolute bottom-0 p-5 text-sand">
                    <p className="flex items-center gap-1 text-xs text-gold"><MapPin size={13} /> {a.distance}</p>
                    <h3 className="font-serif text-xl">{a.name}</h3>
                  </div>
                </Link>
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

      {/* Book direct — OTA trust + commission-free direct CTAs */}
      <BookDirect />

      {/* Ratings + Available On — verified property links across every OTA */}
      <AvailableOn />

      {/* Instagram — authentic social proof + follow */}
      <InstagramFollow />

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

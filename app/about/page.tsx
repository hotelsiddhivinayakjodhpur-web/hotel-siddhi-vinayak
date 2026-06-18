import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Heart, MapPin, Sparkles, HandHeart, Users, Wallet, Clock, Landmark,
  BedDouble, UtensilsCrossed, Car, Wifi, Compass, Map as MapIcon,
  Train, Plane, Star, Phone, MessageCircle, ArrowRight,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { BreadcrumbSchema } from "@/components/Schema";
import { site, otas, whatsappLink, callLink } from "@/lib/config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Hotel Siddhi Vinayak — a clean, comfortable, family-friendly hotel in the heart of Jodhpur, about 350 m from the railway station. Warm hospitality, prime location and great value near Mehrangarh Fort and the Blue City.",
  alternates: { canonical: "/about" },
};

const whyChooseUs = [
  { icon: Sparkles, title: "Clean Rooms", desc: "Spotless, air-conditioned rooms maintained and sanitised daily by our housekeeping team." },
  { icon: Users, title: "Family Friendly", desc: "Spacious family and four-bed rooms, with a calm, safe environment for children and elders." },
  { icon: MapPin, title: "Prime Location", desc: "In the heart of Jodhpur — about 350 m from the railway station and minutes from the old city." },
  { icon: Wallet, title: "Affordable Rates", desc: "Honest, transparent pricing and our best rates when you book direct with us." },
  { icon: Clock, title: "24x7 Assistance", desc: "A 24-hour front desk and travel desk ready to help at any hour of your stay." },
  { icon: Landmark, title: "Nearby Attractions", desc: "Mehrangarh Fort, Jaswant Thada, Umaid Bhawan and the markets are all close by." },
];

const highlights = [
  { icon: BedDouble, title: "Room Categories", desc: "Deluxe, Super Deluxe, Triple Deluxe and Family Four-Bed rooms to suit every traveller." },
  { icon: UtensilsCrossed, title: "Restaurant", desc: "In-house dining serving fresh, hygienic vegetarian meals — including local Marwari favourites." },
  { icon: Car, title: "Free Parking", desc: "On-site free parking with EV charging for guests arriving by car." },
  { icon: Wifi, title: "Free Wi-Fi", desc: "Complimentary high-speed Wi-Fi throughout the hotel for work and streaming." },
  { icon: Compass, title: "Travel Assistance", desc: "Airport and railway pickups, sightseeing and day trips arranged by our travel desk." },
  { icon: MapIcon, title: "Local Guidance", desc: "Real local hosts to help you plan routes, timings and the best places to eat and shop." },
];

const distances = [
  { icon: Train, place: "Jodhpur Railway Station", dist: "≈ 350 m", time: "2 min" },
  { icon: Plane, place: "Jodhpur Airport (JDH)", dist: "≈ 5 km", time: "20 min" },
  { icon: Landmark, place: "Mehrangarh Fort", dist: "≈ 4 km", time: "15 min" },
  { icon: Landmark, place: "Jaswant Thada", dist: "≈ 4.5 km", time: "15 min" },
  { icon: Landmark, place: "Umaid Bhawan Palace", dist: "≈ 6 km", time: "20 min" },
];

// OTA presence (verified links from config + Goibibo, part of the MakeMyTrip group).
const otaBadges = [
  ...otas.filter((o) => ["Booking.com", "Agoda", "Expedia", "MakeMyTrip", "Cleartrip"].includes(o.name)),
  { name: "Goibibo", url: "https://www.goibibo.com/hotels/" },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <PageHero
        title="About Hotel Siddhi Vinayak"
        subtitle="Comfort, cleanliness and genuine hospitality in the heart of the Blue City."
        image="/images/about/about-hero-premium-room.webp"
      />

      {/* Our Story */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-2 items-center">
          <Reveal>
            <figure className="relative h-80 sm:h-[28rem] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/about/our-story-super-deluxe-310.webp"
                alt="Super Deluxe Room at Hotel Siddhi Vinayak, Jodhpur — clean bed, wardrobe, curtains and bedside lighting"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 600px"
              />
              <figcaption className="absolute bottom-0 left-0 bg-ink/55 px-3 py-1 text-xs text-sand/90">Our Super Deluxe Room, Jodhpur</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3">Our Story</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink">Your Home Away From Home in Jodhpur</h2>
            <div className="mt-5 space-y-4 text-ink/75 leading-relaxed">
              <p>
                Hotel Siddhi Vinayak was founded on a simple belief: every traveller deserves a clean, comfortable and
                genuinely welcoming place to rest. What began as a warm, family-run hotel near Jalori Gate has grown into
                one of Jodhpur's most dependable and best-located stays — yet our promise has never changed. We still
                greet every guest the way we always have: like family arriving home.
              </p>
              <p>
                Over the years we've welcomed thousands of guests — couples and honeymooners, families with young
                children, business travellers, pilgrims and backpackers from across India and the world. They return,
                and recommend us to others, for the same reasons: spotless rooms, honest pricing, an unbeatable central
                location, and a team that genuinely cares.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Story continued */}
        <div className="mx-auto max-w-4xl px-6 mt-12 space-y-6 text-ink/75 leading-relaxed">
          <div>
            <h3 className="font-serif text-2xl text-ink mb-2">Hospitality that feels personal</h3>
            <p>
              At the heart of Hotel Siddhi Vinayak is a hospitality philosophy rooted in the famous warmth of Rajasthan —
              <em> atithi devo bhava</em>, the guest is divine. We're proud to be real local hosts rather than a faceless
              chain. From the moment you arrive to the moment you leave, our 24-hour front desk and travel team are here
              to make your stay effortless: arranging a pickup, recommending where to eat, planning your sightseeing or
              simply pointing you to the best lassi in the old city. It's the kind of attentive, guest-first service that
              turns a first-time visitor into a returning friend.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl text-ink mb-2">Perfectly placed in the heart of Jodhpur</h3>
            <p>
              Location is where we truly shine. Hotel Siddhi Vinayak sits opposite M.G. Hospital near Jalori Gate — about
              <strong> 350 metres from Jodhpur Junction railway station</strong>, so arriving by train is as easy as a
              short walk, even with luggage and late-night arrivals. <strong>Jodhpur Airport is roughly 5 km away</strong>,
              about a 20-minute drive, and we're happy to arrange an airport pickup on request. Major bus routes and the
              central bus stand are close by too, making us a natural, stress-free base however you travel.
            </p>
            <p className="mt-3">
              Being this central means you spend less time commuting and more time exploring. The mighty
              <strong> Mehrangarh Fort</strong>, the serene marble <strong>Jaswant Thada</strong>, the grand
              <strong> Umaid Bhawan Palace</strong>, the restored Toorji Ka Jhalra stepwell and the bustling Clock Tower
              and Sardar Market are all within a few kilometres. Lakes, gardens and desert day trips to Osian and the
              Bishnoi villages are all easy to reach with help from our travel desk.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl text-ink mb-2">Comfortable for families and business travellers alike</h3>
            <p>
              Our range of air-conditioned rooms — Deluxe, Super Deluxe, Triple Deluxe and a spacious Family Four-Bed
              Room — means there's a comfortable fit for everyone. <strong>Families</strong> love the extra space, the
              calm and safe environment and the convenience of being close to everything. <strong>Business travellers</strong>
              value the fast free Wi-Fi, quiet rooms, work-friendly desks, free parking and the ability to reach the
              station or a meeting in minutes. Whether you're here for one night or a week, you'll find a clean, quiet,
              well-equipped room waiting for you.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl text-ink mb-2">Cleanliness and comfort you can count on</h3>
            <p>
              Cleanliness is non-negotiable for us. Every room is thoroughly cleaned and sanitised daily, with fresh
              linens, well-maintained bathrooms with hot water, and regularly serviced air-conditioning. Crisp bedding,
              good lighting and thoughtful little touches make the difference between a place you sleep and a place you
              rest. Combined with free Wi-Fi, an in-house restaurant, a sun terrace, free parking and a genuinely
              guest-first team, it all adds up to a stay that feels easy, safe and good value — exactly what you want
              when you're far from home in an unfamiliar city.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 bg-sand">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Why Choose Us" title="What Makes Us Special" subtitle="Six reasons guests pick Hotel Siddhi Vinayak — and come back." />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 0.1}>
                <div className="h-full rounded-2xl bg-white p-7 shadow-sm transition hover:shadow-md">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                    <v.icon size={26} />
                  </div>
                  <h3 className="font-serif text-xl text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm text-ink/65 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hotel Highlights */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Facilities" title="Hotel Highlights" subtitle="Everything you need for a comfortable, convenient stay." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={(i % 3) * 0.1}>
                <div className="flex h-full gap-4 rounded-2xl border border-gold/15 bg-sand/40 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-gold-dark shadow-sm">
                    <h.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-ink">{h.title}</h3>
                    <p className="mt-1 text-sm text-ink/65 leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Location Advantage */}
      <section className="py-16 sm:py-20 bg-ink text-sand">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-gold uppercase tracking-[0.3em] text-xs">Location Advantage</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-sand">Minutes From Everything That Matters</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sand/70">Our central position near Jalori Gate keeps the station, the airport and Jodhpur's greatest sights within easy reach.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {distances.map((d, i) => (
              <Reveal key={d.place} delay={(i % 5) * 0.08}>
                <div className="h-full rounded-2xl border border-sand/15 bg-white/5 p-6 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-gold">
                    <d.icon size={24} />
                  </div>
                  <p className="font-serif text-lg text-sand">{d.place}</p>
                  <p className="mt-2 text-2xl font-semibold text-gold">{d.dist}</p>
                  <p className="text-xs text-sand/60">approx. {d.time} away</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/nearby-attractions" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-medium text-ink transition hover:bg-gold-light">
              Explore Nearby Attractions <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust: reviews + OTA presence */}
      <section className="py-16 sm:py-20 bg-sand">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Trusted by Guests" title="Reviews & Where to Find Us" subtitle="Rated and booked by travellers across India's leading platforms." />

          <div className="grid gap-8 lg:grid-cols-2 items-stretch">
            {/* Google reviews */}
            <Reveal>
              <div className="flex h-full flex-col justify-center rounded-2xl bg-white p-8 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={26} className={i < Math.round(site.rating.value) ? "fill-gold" : "fill-gold/20"} />
                  ))}
                </div>
                <p className="mt-4 font-serif text-5xl text-ink">{site.rating.value}</p>
                <p className="mt-1 text-ink/60">based on <strong>{site.rating.count}+</strong> Google reviews</p>
                <a href={site.social.google} target="_blank" rel="noopener noreferrer" className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-sand">
                  Read our Google reviews <ArrowRight size={15} />
                </a>
              </div>
            </Reveal>

            {/* OTA presence */}
            <Reveal delay={0.15}>
              <div className="flex h-full flex-col justify-center rounded-2xl bg-white p-8 shadow-sm">
                <p className="text-center text-ink/70">You'll also find Hotel Siddhi Vinayak on India's top travel platforms:</p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  {otaBadges.map((o) => (
                    <a key={o.name} href={o.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-gold/30 bg-sand/50 px-5 py-2.5 text-sm font-medium text-ink transition hover:border-gold-dark hover:bg-gold/10">
                      {o.name}
                    </a>
                  ))}
                </div>
                <p className="mt-6 text-center text-sm text-ink/55">Booking direct with us always gets you the <strong>best available rate</strong> and personal help with your trip.</p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-medium text-white transition hover:opacity-90"><MessageCircle size={17} /> WhatsApp</a>
                  <a href={callLink} className="flex items-center gap-2 rounded-full bg-gold px-5 py-3 font-medium text-ink transition hover:bg-gold-light"><Phone size={16} /> Call Hotel</a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Users, Maximize, BedDouble, Phone, MessageCircle, ArrowRight, CalendarCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { rooms } from "@/lib/data";
import { whatsappLink, callLink, bookingLink } from "@/lib/config";
import { RoomsSchema, BreadcrumbSchema } from "@/components/Schema";
import RoomComparison from "@/components/RoomComparison";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Rooms & Suites",
  description:
    "Deluxe, Super Deluxe, Triple Deluxe and Family Four Bed rooms at Hotel Siddhi Vinayak, Jodhpur — clean, air-conditioned rooms with free Wi-Fi and free parking. Contact us for the best available rate.",
  path: "/rooms",
});

export default function RoomsPage() {
  return (
    <>
      <RoomsSchema />
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Rooms", path: "/rooms" }]} />
      <PageHero title="Rooms & Suites" subtitle="Four room categories, comfortable and well-appointed for every traveller." image="/images/rooms/covers/rooms-hero.webp" />
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-6xl px-6 space-y-12">
          {rooms.map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.05}>
              <article id={r.slug} className={`card-lux gold-frame scroll-mt-28 grid gap-8 rounded-2xl bg-white p-5 lg:grid-cols-2 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
                <Link href={`/rooms/${r.slug}`} className="relative block h-72 lg:h-full min-h-[280px] rounded-xl overflow-hidden group">
                  <Image src={r.image} alt={`${r.name} at Hotel Siddhi Vinayak, Jodhpur`} fill className="object-cover img-zoom" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full glass px-3 py-1 text-xs text-sand">{r.count} {r.count > 1 ? "rooms" : "room"} available</span>
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1 rounded-full bg-gold-cta px-3 py-1 text-xs font-semibold text-ink shadow-gold"><Users size={12} /> {r.occupancy}</span>
                </Link>
                <div className="p-3 lg:p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-serif text-3xl sm:text-4xl text-ink">{r.name}</h2>
                    <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-dark">{r.highlight}</span>
                  </div>
                  <div className="mt-2">
                    <span className="font-serif text-2xl text-gold-dark">Live Rates &amp; Availability</span>
                    <p className="text-sm text-ink/55">Rates update in real time from our booking engine.</p>
                  </div>
                  <p className="mt-4 text-ink/75 leading-relaxed">{r.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2.5 text-sm font-medium">
                    <span className="inline-flex items-center gap-2 rounded-full bg-sand px-3.5 py-1.5 text-ink/75"><Maximize size={15} className="text-gold-dark" /> {r.size}</span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-sand px-3.5 py-1.5 text-ink/75"><Users size={15} className="text-gold-dark" /> {r.occupancy}</span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-sand px-3.5 py-1.5 text-ink/75"><BedDouble size={15} className="text-gold-dark" /> {r.bed}</span>
                  </div>
                  <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-ink/70">
                    {r.amenities.map((a) => (
                      <li key={a} className="flex items-center gap-2"><Check size={15} className="text-gold-dark" /> {a}</li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a href={bookingLink}
                      aria-label={`Book the ${r.name} now — real-time availability`}
                      className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold">
                      <CalendarCheck size={17} /> Book Now
                    </a>
                    <a href={whatsappLink(`Hi! I'd like to enquire about the ${r.name} at Hotel Siddhi Vinayak. Please share the best available rate.`)}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-medium text-white transition hover:opacity-90">
                      <MessageCircle size={17} /> WhatsApp
                    </a>
                    <a href={callLink} className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-3 font-semibold text-gold-dark transition hover:bg-gold/10">
                      <Phone size={16} /> Call Now
                    </a>
                    <Link href={`/rooms/${r.slug}`} className="inline-flex items-center gap-1 px-2 py-3 font-medium text-gold-dark hover:gap-2 transition-all">
                      View room &amp; gallery <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <RoomComparison />
    </>
  );
}

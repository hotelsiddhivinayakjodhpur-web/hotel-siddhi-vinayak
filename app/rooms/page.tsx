import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Users, Maximize, BedDouble, Phone, MessageCircle, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { rooms } from "@/lib/data";
import { whatsappLink, callLink } from "@/lib/config";
import { RoomsSchema, BreadcrumbSchema } from "@/components/Schema";
import RoomComparison from "@/components/RoomComparison";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description:
    "Deluxe, Super Deluxe, Triple Deluxe and Family Four Bed rooms at Hotel Siddhi Vinayak, Jodhpur — clean, air-conditioned rooms with free Wi-Fi and free parking. Contact us for the best available rate.",
  alternates: { canonical: "/rooms" },
};

export default function RoomsPage() {
  return (
    <>
      <RoomsSchema />
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Rooms", path: "/rooms" }]} />
      <PageHero title="Rooms & Suites" subtitle="Four room categories, comfortable and well-appointed for every traveller." image="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1920&q=80" />
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-6xl px-6 space-y-12">
          {rooms.map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.05}>
              <article id={r.slug} className={`scroll-mt-28 grid gap-8 rounded-2xl bg-white p-5 shadow-md lg:grid-cols-2 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
                <Link href={`/rooms/${r.slug}`} className="relative block h-72 lg:h-full min-h-[280px] rounded-xl overflow-hidden group">
                  <Image src={r.image} alt={`${r.name} at Hotel Siddhi Vinayak, Jodhpur`} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 rounded-full bg-ink/80 px-3 py-1 text-xs text-sand">{r.count} {r.count > 1 ? "rooms" : "room"} available</span>
                </Link>
                <div className="p-3 lg:p-6">
                  <div className="flex items-center gap-3">
                    <h2 className="font-serif text-3xl text-ink">{r.name}</h2>
                    <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold-dark">{r.highlight}</span>
                  </div>
                  <p className="mt-1 text-ink">
                    <span className="text-sm text-ink/55">Starting from </span>
                    <span className="font-serif text-2xl text-gold-dark">₹{r.price.toLocaleString("en-IN")}</span>
                    <span className="text-sm text-ink/55">/night</span>
                  </p>
                  <p className="mt-3 text-ink/70 leading-relaxed">{r.description}</p>
                  <div className="mt-5 flex flex-wrap gap-5 text-sm text-ink/70">
                    <span className="flex items-center gap-2"><Maximize size={16} className="text-gold" /> {r.size}</span>
                    <span className="flex items-center gap-2"><Users size={16} className="text-gold" /> {r.occupancy}</span>
                    <span className="flex items-center gap-2"><BedDouble size={16} className="text-gold" /> {r.bed}</span>
                  </div>
                  <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-ink/70">
                    {r.amenities.map((a) => (
                      <li key={a} className="flex items-center gap-2"><Check size={15} className="text-gold-dark" /> {a}</li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a href={whatsappLink(`Hi! I'd like to enquire about the ${r.name} at Hotel Siddhi Vinayak. Please share the best available rate.`)}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-medium text-white transition hover:opacity-90">
                      <MessageCircle size={17} /> WhatsApp
                    </a>
                    <a href={callLink} className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 font-medium text-ink transition hover:bg-gold-dark hover:text-white">
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

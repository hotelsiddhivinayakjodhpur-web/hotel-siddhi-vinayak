import type { Metadata } from "next";
import Image from "next/image";
import { Check, Users, Maximize, BedDouble } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { rooms } from "@/lib/data";
import { whatsappLink } from "@/lib/config";

export const metadata: Metadata = {
  title: "Rooms & Tariff",
  description: "Explore Deluxe, Super Deluxe and Family Suite rooms at Hotel Siddhi Vinayak, Jodhpur. Clean, air-conditioned rooms with free Wi-Fi from ₹1499/night.",
  alternates: { canonical: "/rooms" },
};

export default function RoomsPage() {
  return (
    <>
      <PageHero title="Rooms & Suites" subtitle="Comfortable, well-appointed rooms for every traveller." image="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1920&q=80" />
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-6xl px-6 space-y-12">
          {rooms.map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.05}>
              <article className={`grid gap-8 rounded-2xl bg-white p-5 shadow-md lg:grid-cols-2 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
                <div className="relative h-72 lg:h-full min-h-[280px] rounded-xl overflow-hidden">
                  <Image src={r.image} alt={r.name} fill className="object-cover" />
                </div>
                <div className="p-3 lg:p-6">
                  <div className="flex items-baseline justify-between">
                    <h2 className="font-serif text-3xl text-ink">{r.name}</h2>
                    <p className="text-gold-dark font-semibold text-xl">₹{r.price}<span className="text-sm text-ink/50">/night</span></p>
                  </div>
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
                  <a href={whatsappLink(`Hi! I'd like to book the ${r.name} (₹${r.price}/night) at Hotel Siddhi Vinayak.`)}
                    target="_blank" rel="noopener noreferrer"
                    className="mt-6 inline-block rounded-full bg-gold px-7 py-3 font-medium text-ink transition hover:bg-gold-dark hover:text-white">
                    Book This Room
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

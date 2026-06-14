import type { Metadata } from "next";
import Image from "next/image";
import { Heart, MapPin, Sparkles, HandHeart } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { BreadcrumbSchema } from "@/components/Schema";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Hotel Siddhi Vinayak — a warm, comfortable hotel in the heart of Jodhpur, Rajasthan, known for friendly service and great location.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: HandHeart, title: "Warm Hospitality", desc: "Genuine Rajasthani warmth in every interaction." },
  { icon: MapPin, title: "Prime Location", desc: "Minutes from the railway station and old city." },
  { icon: Sparkles, title: "Clean & Comfortable", desc: "Spotless, air-conditioned rooms, maintained daily." },
  { icon: Heart, title: "Guest First", desc: "We go the extra mile to make your stay memorable." },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      <PageHero title="About Hotel Siddhi Vinayak" subtitle="Comfort, convenience and care in the Blue City." image="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1920&q=80" />
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-2 items-center">
          <Reveal>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80" alt="Hotel detail" fill className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3">Our Story</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink">Your Home Away From Home in Jodhpur</h2>
            <p className="mt-5 text-ink/70 leading-relaxed">
              Hotel Siddhi Vinayak was built on a simple idea: every traveller deserves a clean, comfortable and
              welcoming place to rest. Located in the heart of Jodhpur, we are perfectly positioned for guests
              exploring Rajasthan's iconic forts, palaces and bustling bazaars.
            </p>
            <p className="mt-4 text-ink/70 leading-relaxed">
              From business travellers and families to pilgrims and backpackers, our guests return for our friendly
              service, well-kept rooms and unbeatable location. We take pride in treating every guest like family.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Why Choose Us" title="What Makes Us Special" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-gold-dark shadow">
                  <v.icon size={26} />
                </div>
                <h3 className="font-serif text-xl text-ink">{v.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

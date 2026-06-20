import type { Metadata } from "next";
import Image from "next/image";
import { Utensils, Coffee, Clock, Phone, MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { BreadcrumbSchema } from "@/components/Schema";
import { galleryByCategory } from "@/lib/images";
import { whatsappLink, callLink } from "@/lib/config";

export const metadata: Metadata = {
  title: "Restaurant & Dining",
  description:
    "Dine at Hotel Siddhi Vinayak's in-house restaurant in Jodhpur — vegetarian Indian cuisine and 24-hour room service. Opposite M.G. Hospital, near Jalori Gate.",
  alternates: { canonical: "/restaurant" },
};

const photos = galleryByCategory.Restaurant;

const features = [
  { icon: Utensils, title: "Vegetarian Cuisine", desc: "Freshly prepared Indian vegetarian meals." },
  { icon: Coffee, title: "Room Service", desc: "In-room dining brought to your door." },
  { icon: Clock, title: "Flexible Hours", desc: "Meals and refreshments through the day." },
];

export default function RestaurantPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Restaurant", path: "/restaurant" }]} />
      <PageHero title="Restaurant & Dining" subtitle="Wholesome vegetarian cuisine and warm hospitality." image={photos[0].src} />

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <SectionTitle eyebrow="Dining" title="Eat Well, Stay Happy" subtitle="Our in-house restaurant serves freshly cooked vegetarian Indian food, with room service available throughout your stay." />
          <div className="grid gap-8 sm:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sand text-gold-dark">
                  <f.icon size={26} />
                </div>
                <h3 className="font-serif text-xl text-ink">{f.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{f.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((p, i) => (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                <div className="relative h-64 overflow-hidden rounded-2xl">
                  <Image src={p.src} alt={p.alt} fill loading="lazy" className="object-cover transition duration-500 hover:scale-105" sizes="(max-width:640px) 100vw, 33vw" />
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={whatsappLink("Hi! I'd like to ask about dining / meal options at Hotel Siddhi Vinayak.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-medium text-white transition hover:opacity-90">
              <MessageCircle size={18} /> Ask on WhatsApp
            </a>
            <a href={callLink} className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-medium text-ink transition hover:bg-gold-dark hover:text-white">
              <Phone size={17} /> Call Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

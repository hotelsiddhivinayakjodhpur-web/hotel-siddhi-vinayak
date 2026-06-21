import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Star, ShieldCheck, Zap, Train, Plane, Landmark, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import InquiryForm from "@/components/InquiryForm";
import MapEmbed from "@/components/MapEmbed";
import SectionTitle from "@/components/SectionTitle";
import { BreadcrumbSchema } from "@/components/Schema";
import SocialLinks from "@/components/SocialLinks";
import { site, whatsappLink, callLink } from "@/lib/config";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact & Booking",
  description: "Contact Hotel Siddhi Vinayak, Jodhpur. Call, WhatsApp or email to book direct for the best rates. About 350 m from Jodhpur Railway Station, near Jalori Gate.",
  path: "/contact",
});

const a = site.address;
const addressLine = `${a.street}, ${a.locality}, ${a.region} ${a.postalCode}`;

const quickCards = [
  { icon: Phone, label: "Call Now", value: site.phone, href: callLink, cls: "hover:border-gold-dark" },
  { icon: MessageCircle, label: "WhatsApp Booking", value: "Chat & book instantly", href: whatsappLink(), cls: "hover:border-[#25D366]", external: true },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}`, cls: "hover:border-gold-dark" },
  { icon: MapPin, label: "Hotel Address", value: addressLine, href: site.social.google, cls: "hover:border-gold-dark", external: true },
];

const landmarks = [
  { icon: Train, name: "Jodhpur Railway Station", dist: "≈ 350 m" },
  { icon: Plane, name: "Jodhpur Airport", dist: "≈ 5 km" },
  { icon: Landmark, name: "Mehrangarh Fort", dist: "≈ 4 km" },
  { icon: Landmark, name: "Umaid Bhawan Palace", dist: "≈ 6 km" },
  { icon: Landmark, name: "Clock Tower Market", dist: "≈ 3 km" },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <PageHero title="Contact & Booking" subtitle="We'd love to help plan your stay in the Blue City." image="/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-01.webp" />

      {/* Quick contact cards */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quickCards.map((c, i) => (
              <Reveal key={c.label} delay={(i % 4) * 0.08}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`card-lux group flex h-full flex-col items-center gap-2 rounded-2xl border border-gold/20 bg-white p-6 text-center transition ${c.cls}`}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-sheen text-ink shadow-gold transition-transform group-hover:scale-110">
                    <c.icon size={24} />
                  </span>
                  <span className="mt-1 font-serif text-lg text-ink">{c.label}</span>
                  <span className="text-sm text-ink/60 leading-snug">{c.value}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA + trust */}
      <section className="bg-ink py-12">
        <div className="mx-auto max-w-5xl px-6 text-center text-sand">
          <h2 className="font-serif text-2xl sm:text-3xl text-gold">Book Direct on WhatsApp for Best Rates</h2>
          <p className="mx-auto mt-2 max-w-xl text-sand/80">No booking fees, no OTA commission — just our best available rate and an instant reply.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-white transition hover:opacity-90"><MessageCircle size={19} /> Book on WhatsApp</a>
            <a href={callLink} className="btn-gold flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold"><Phone size={18} /> Call to Book</a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            <a href={site.social.google} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sand/85 hover:text-gold">
              <Star size={16} className="fill-gold text-gold" /> <strong>{site.rating.count}+</strong> Guest Reviews on Google
            </a>
            <span className="flex items-center gap-2 text-sand/85"><ShieldCheck size={16} className="text-gold" /> Secure direct booking</span>
            <span className="flex items-center gap-2 text-sand/85"><Zap size={16} className="text-gold" /> Instant WhatsApp confirmation</span>
          </div>
        </div>
      </section>

      {/* Details + form */}
      <section className="py-16 sm:py-20 bg-sand">
        <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-3xl text-ink mb-6">Get in Touch</h2>
            <ul className="space-y-5">
              <li className="flex gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-gold-dark shadow-sm"><MapPin size={20} /></div><div><p className="text-xs uppercase tracking-wider text-ink/50">Address</p><p className="text-ink">{addressLine}</p></div></li>
              <li className="flex gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-gold-dark shadow-sm"><Phone size={20} /></div><div><p className="text-xs uppercase tracking-wider text-ink/50">Phone</p><a href={callLink} className="text-ink hover:text-gold-dark">{site.phone}</a></div></li>
              <li className="flex gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-gold-dark shadow-sm"><Mail size={20} /></div><div><p className="text-xs uppercase tracking-wider text-ink/50">Email</p><a href={`mailto:${site.email}`} className="text-ink hover:text-gold-dark">{site.email}</a></div></li>
            </ul>
            <div className="mt-8">
              <p className="text-xs uppercase tracking-wider text-ink/50 mb-3">Follow Us</p>
              <SocialLinks iconSize={24} itemClassName="text-ink/70 hover:text-gold-dark" />
            </div>
            <div className="mt-8">
              <MapEmbed />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <InquiryForm />
          </Reveal>
        </div>
      </section>

      {/* Nearby landmarks */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Perfectly Located" title="Nearby Landmarks" subtitle="Minutes from the station, the airport and Jodhpur's greatest sights." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {landmarks.map((l, i) => (
              <Reveal key={l.name} delay={(i % 5) * 0.07}>
                <div className="gold-frame h-full rounded-2xl bg-sand/40 p-6 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold-dark"><l.icon size={22} /></div>
                  <p className="font-serif text-base text-ink leading-tight">{l.name}</p>
                  <p className="mt-2 text-lg font-semibold text-gold-dark">{l.dist}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/nearby-attractions" className="inline-flex items-center gap-2 text-gold-dark font-medium hover:gap-3 transition-all">Explore all attractions <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

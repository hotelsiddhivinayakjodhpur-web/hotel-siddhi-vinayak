import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import InquiryForm from "@/components/InquiryForm";
import MapEmbed from "@/components/MapEmbed";
import { BreadcrumbSchema } from "@/components/Schema";
import { site, whatsappLink, callLink } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description: "Contact Hotel Siddhi Vinayak, Jodhpur. Call, WhatsApp or send an inquiry to book your stay. Located near Jodhpur Railway Station.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const a = site.address;
  const items = [
    { icon: Phone, label: "Phone", value: site.phone, href: callLink },
    { icon: MessageCircle, label: "WhatsApp", value: site.phone, href: whatsappLink() },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Address", value: `${a.street}, ${a.locality}, ${a.region} ${a.postalCode}` },
    { icon: Clock, label: "Reception", value: "Open 24 hours" },
  ];
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <PageHero title="Contact Us" subtitle="We'd love to help plan your stay in Jodhpur." image="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1920&q=80" />
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-3xl text-ink mb-6">Get in Touch</h2>
            <ul className="space-y-5">
              {items.map((it) => (
                <li key={it.label} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand text-gold-dark">
                    <it.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-ink/50">{it.label}</p>
                    {it.href ? (
                      <a href={it.href} className="text-ink hover:text-gold-dark">{it.value}</a>
                    ) : (
                      <p className="text-ink">{it.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <MapEmbed />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <InquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

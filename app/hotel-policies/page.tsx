import type { Metadata } from "next";
import { ShieldCheck, IdCard, Clock, CreditCard, Ban, Scale, Phone, MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { BreadcrumbSchema } from "@/components/Schema";
import { site, whatsappLink, callLink } from "@/lib/config";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Hotel Policies",
  description:
    "Hotel Siddhi Vinayak, Jodhpur — official guest policies: ID requirements, check-in/check-out (11:00 AM), early check-in, payment, free cancellation up to 72 hours, house rules and jurisdiction.",
  path: "/hotel-policies",
});

// Grouped for clarity + machine readability. Wording kept faithful to the
// property's official policy.
const groups = [
  {
    icon: IdCard,
    title: "Identity & Documentation",
    items: [
      "Valid government photo ID is required for all guests.",
      "PAN Card is not accepted as identity proof.",
      "Foreign nationals must provide a valid Passport and Visa.",
      "Accommodation is provided only for registered guests.",
    ],
  },
  {
    icon: Clock,
    title: "Check-in & Check-out",
    items: [
      "Check-in time: 11:00 AM. Check-out time: 11:00 AM.",
      "Early check-in between 09:00 AM and 12:00 noon is complimentary, subject to availability.",
      "Early check-in between 05:00 AM and 09:00 AM is chargeable at 30% of the room rent.",
    ],
  },
  {
    icon: CreditCard,
    title: "Payment & Cancellation",
    items: [
      "100% advance payment is required at check-in.",
      "Free cancellation is available up to 72 hours before check-in.",
    ],
  },
  {
    icon: Ban,
    title: "House Rules & Conduct",
    items: [
      "Visitors are not allowed inside guest rooms.",
      "Smoking, alcohol, gambling, drugs, prostitution and any illegal activities are strictly prohibited.",
      "Outside food and food delivery are not permitted.",
    ],
  },
  {
    icon: Scale,
    title: "Legal",
    items: ["All disputes are subject to Jodhpur jurisdiction."],
  },
];

export default function HotelPoliciesPage() {
  // No standard schema.org "HotelPolicy" type exists; expose the page as a
  // WebPage with speakable + the policies as readable text so search/AI can
  // extract them. Check-in/out + cancellation also live in the Hotel schema.
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site.url}/hotel-policies#webpage`,
    url: `${site.url}/hotel-policies`,
    name: `Hotel Policies — ${site.name}`,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#policies-overview", ".policy-group"],
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Hotel Siddhi Vinayak guest policies",
      itemListElement: groups.flatMap((g) =>
        g.items.map((text, i) => ({ "@type": "ListItem", position: i + 1, name: `${g.title}: ${text}` }))
      ),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Hotel Policies", path: "/hotel-policies" }]} />
      <PageHero
        title="Hotel Policies"
        subtitle="Please review our guest policies for a smooth, comfortable stay."
        image="/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-01.webp"
      />

      <section className="bg-sand py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <p id="policies-overview" className="text-center text-ink/70 leading-relaxed">
            The following are the official guest policies of <strong>{site.name}</strong>, Jodhpur, Rajasthan.
            They help us keep every stay safe, fair and pleasant for all guests.
          </p>

          <div className="mt-10 space-y-6">
            {groups.map((g, i) => (
              <Reveal key={g.title} delay={(i % 5) * 0.05}>
                <div className="policy-group gold-frame rounded-2xl bg-white p-6 sm:p-7">
                  <h2 className="flex items-center gap-3 font-serif text-2xl text-ink">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                      <g.icon size={20} />
                    </span>
                    {g.title}
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {g.items.map((text) => (
                      <li key={text} className="flex gap-3 text-ink/75 leading-relaxed">
                        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-gold-dark" aria-hidden="true" />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Help CTA */}
          <div className="mt-12 rounded-2xl bg-ink p-8 text-center text-sand">
            <h2 className="font-serif text-2xl text-gold">Questions about our policies?</h2>
            <p className="mx-auto mt-2 max-w-xl text-sand/80">Our front desk is happy to help before you book or arrive.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a href={whatsappLink("Hi! I have a question about the hotel policies at Hotel Siddhi Vinayak.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-medium text-white transition hover:opacity-90"><MessageCircle size={18} /> WhatsApp Us</a>
              <a href={callLink} className="btn-gold flex items-center gap-2 rounded-full px-6 py-3 font-semibold"><Phone size={17} /> {site.phone}</a>
            </div>
            <p className="mt-4 inline-flex items-center gap-2 text-xs text-sand/55"><ShieldCheck size={14} /> Policies last reviewed June 2026 · subject to change without notice.</p>
          </div>
        </div>
      </section>
    </>
  );
}

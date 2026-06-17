import { Phone, MessageCircle, BadgeIndianRupee, ShieldCheck } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { otas, whatsappLink, callLink } from "@/lib/config";

// "Book Direct" trust section: shows the hotel is on every major OTA (credibility)
// while steering to commission-free direct booking via Call / WhatsApp.
export default function BookDirect() {
  return (
    <section className="bg-ink py-20 text-sand">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <SectionTitle
          eyebrow="Book With Confidence"
          title="Trusted Across Every Major Travel Platform"
          subtitle="Hotel Siddhi Vinayak is available on all leading OTAs — but you always get our best rate by booking direct."
          light
        />

        {/* Direct-booking advantages */}
        <div className="mx-auto mb-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {[
            { icon: BadgeIndianRupee, t: "Best Rate, Direct", d: "No third-party commission or markup" },
            { icon: ShieldCheck, t: "Instant Confirmation", d: "We reply on WhatsApp within minutes" },
            { icon: MessageCircle, t: "Personal Service", d: "Talk to the hotel, not a call centre" },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl bg-white/5 p-5">
              <b.icon className="mx-auto text-gold" size={26} />
              <p className="mt-2 font-medium">{b.t}</p>
              <p className="mt-1 text-sm text-sand/70">{b.d}</p>
            </div>
          ))}
        </div>

        {/* Primary direct CTAs */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 font-medium text-white transition hover:opacity-90">
            <MessageCircle size={18} /> Book Direct on WhatsApp
          </a>
          <a href={callLink}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 font-medium text-ink transition hover:bg-gold-light">
            <Phone size={17} /> Call to Book
          </a>
        </div>

        {/* OTA availability */}
        <p className="mt-10 text-sm text-sand/70">Also available on</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {otas.map((o) => (
            <a key={o.name} href={o.url} target="_blank" rel="noopener noreferrer"
              className="rounded-full border border-sand/25 px-5 py-2 text-sm text-sand/90 transition hover:border-gold hover:text-gold">
              {o.name}
            </a>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-xs leading-relaxed text-sand/55">
          Hotel Siddhi Vinayak is available across major travel platforms including MakeMyTrip,
          Booking.com, Agoda, Expedia and Cleartrip, while offering direct booking support via phone and WhatsApp.
        </p>
      </div>
    </section>
  );
}

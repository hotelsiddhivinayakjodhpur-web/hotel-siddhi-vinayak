import { CalendarCheck, ShieldCheck, RefreshCw, BadgePercent, Tag, ArrowRight } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { bookingLink } from "@/lib/config";

// Trust badges requested by the property.
const badges = [
  { icon: CalendarCheck, label: "Instant Confirmation" },
  { icon: ShieldCheck, label: "Secure Online Payment" },
  { icon: RefreshCw, label: "Real-Time Availability" },
  { icon: BadgePercent, label: "Direct Booking Benefits" },
  { icon: Tag, label: "Best Available Rate" },
];

/**
 * Real-Time Availability section — explains the live-inventory booking flow and
 * surfaces the Stayflexi booking engine (opens in a new tab). Stayflexi is named
 * only as the booking technology; no admin/dashboard URLs are exposed.
 */
export default function RealTimeAvailability({ light = false }: { light?: boolean }) {
  return (
    <section className={light ? "bg-ink py-20 text-sand" : "bg-white py-20"}>
      <div className="mx-auto max-w-5xl px-6 text-center">
        <SectionTitle
          eyebrow="Real-Time Availability"
          title="Live Rooms, Instant Confirmation"
          subtitle="Hotel Siddhi Vinayak uses Stayflexi Channel Manager and Booking Engine to provide real-time room availability, instant booking confirmation and synchronized inventory across all major travel platforms."
          light={light}
        />

        {/* Trust badges */}
        <ul className="mx-auto mt-2 flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {badges.map((b) => (
            <li
              key={b.label}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                light ? "bg-white/10 text-sand" : "border border-gold/25 bg-sand/40 text-ink/80"
              }`}
            >
              <b.icon size={16} className="text-gold" aria-hidden="true" />
              {b.label}
            </li>
          ))}
        </ul>

        {/* Booking engine CTA */}
        <div className="mt-9 flex flex-col items-center gap-3">
          <a
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold"
          >
            Check Availability &amp; Book <ArrowRight size={18} />
          </a>
          <p className={`text-xs ${light ? "text-sand/55" : "text-ink/45"}`}>
            Powered by Stayflexi · secure real-time booking
          </p>
        </div>

        {/* SEO / AEO structured line */}
        <p className={`mx-auto mt-8 max-w-2xl text-sm leading-relaxed ${light ? "text-sand/70" : "text-ink/60"}`}>
          Hotel Siddhi Vinayak offers direct online booking through Stayflexi with secure payments
          and real-time room availability.
        </p>
      </div>
    </section>
  );
}

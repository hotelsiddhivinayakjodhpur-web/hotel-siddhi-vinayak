import Link from "next/link";
import { Star, ExternalLink, ArrowRight } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { otas, site } from "@/lib/config";

// Verified guest ratings: only platforms we can independently confirm show a
// number (Google = live Google Business Profile data). The rest link to the real
// property page to "read reviews" — no fabricated scores.
const ratingPlatforms = ["Google", "Agoda", "Tripadvisor", "Booking.com", "MakeMyTrip", "Cleartrip"];
const ratings = ratingPlatforms
  .map((n) => otas.find((o) => o.name === n))
  .filter(Boolean) as typeof otas;

export default function AvailableOn() {
  const google = otas.find((o) => o.name === "Google");
  return (
    <section className="bg-sand py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow="Reviews & Availability"
          title="Rated & Booked Across the World's Top Platforms"
          subtitle="Find Hotel Siddhi Vinayak on every major travel site — each link opens our verified property page."
        />

        {/* Guest ratings */}
        <div className="grid gap-6 lg:grid-cols-[320px_1fr] items-stretch">
          {/* Verified Google rating */}
          {google && (
            <a href={google.url} target="_blank" rel="noopener noreferrer" className="card-lux gold-frame flex flex-col items-center justify-center rounded-2xl bg-white p-8 text-center">
              <span className="font-semibold tracking-wide" style={{ color: google.brand }}>Google</span>
              <p className="mt-2 font-serif text-5xl text-ink">{site.rating.count}+</p>
              <div className="mt-2 flex items-center justify-center gap-1 text-gold" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} className="fill-gold" />)}
              </div>
              <p className="mt-2 text-sm text-ink/60">verified guest reviews</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold-dark">Read on Google <ArrowRight size={14} /></span>
            </a>
          )}

          {/* Other review platforms (link to property pages) */}
          <div className="rounded-2xl border border-gold/15 bg-white p-6">
            <p className="text-sm text-ink/60">Read genuine guest reviews on our verified property pages:</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {ratings.filter((o) => o.name !== "Google").map((o) => (
                <a key={o.name} href={o.url} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border bg-white px-4 py-3 transition hover:-translate-y-0.5 hover:shadow-md"
                  style={{ borderColor: `${o.brand}33` }}>
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: o.brand }} />
                    <span className="font-semibold" style={{ color: o.brand }}>{o.name}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-ink/50 group-hover:text-ink/80">Reviews <ExternalLink size={12} /></span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Available on — all platforms */}
        <p className="mt-12 text-center text-xs font-semibold uppercase tracking-[0.25em] text-ink/50">Available On</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {otas.map((o) => (
            <a key={o.name} href={o.url} target="_blank" rel="noopener noreferrer"
              aria-label={`Hotel Siddhi Vinayak on ${o.name}`}
              className="group flex items-center gap-2 rounded-xl border bg-white px-4 py-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ borderColor: `${o.brand}33` }}>
              <span className="h-2.5 w-2.5 rounded-full transition-transform group-hover:scale-125" style={{ background: o.brand }} />
              <span className="font-semibold text-[15px]" style={{ color: o.brand }}>{o.name}</span>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/contact" className="inline-flex items-center gap-2 text-gold-dark font-medium hover:gap-3 transition-all">
            Book direct for the best rate <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

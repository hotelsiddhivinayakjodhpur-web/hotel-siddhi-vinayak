import { Star, MessageSquare, TrendingUp, BadgeCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { site } from "@/lib/config";
import { reviews, gbpStats } from "@/lib/data";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.min(1, Math.max(0, value - i));
        return (
          <span key={i} className="relative">
            <Star size={18} className="text-gold/30" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={18} className="fill-gold text-gold" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

// Social proof built on the REAL Google Business Profile numbers — volume of
// reviews + interactions is the credibility lever, and the CTA drives GBP clicks.
const googleReviewsUrl = site.social.google || "https://www.google.com/maps/search/?api=1&query=Hotel+Siddhi+Vinayak+Jodhpur";

export default function Reviews() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle eyebrow="Guest Reviews" title="Trusted by Thousands of Guests" subtitle="791+ guest reviews from real stays — see why travellers choose us in Jodhpur." />

        {/* Credibility — review VOLUME and multi-platform presence (rating de-emphasised) */}
        <div className="grid gap-5 sm:grid-cols-3">
          <Reveal>
            <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-sand p-7 text-center">
              <MessageSquare className="text-gold-dark" size={26} />
              <span className="mt-2 font-serif text-4xl text-ink">{gbpStats.reviewCount.toLocaleString("en-IN")}+</span>
              <p className="mt-1 text-sm text-ink/60">Guest Reviews</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-sand p-7 text-center">
              <BadgeCheck className="text-gold-dark" size={26} />
              <span className="mt-2 font-serif text-2xl text-ink leading-tight">Rated across<br />6 platforms</span>
              <p className="mt-1 text-sm text-ink/60">Booking.com, MakeMyTrip, Agoda, Tripadvisor & Google</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-sand p-7 text-center">
              <TrendingUp className="text-gold-dark" size={26} />
              <span className="mt-2 font-serif text-4xl text-ink">{gbpStats.interactions.toLocaleString("en-IN")}+</span>
              <p className="mt-1 text-sm text-ink/60">Recent profile interactions</p>
            </div>
          </Reveal>
        </div>

        {/* Real review cards appear here once added to lib/data.ts (reviews[]). */}
        {reviews.length > 0 && (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal key={r.author} delay={i * 0.1}>
                <figure className="flex h-full flex-col rounded-2xl bg-sand p-6 shadow-sm">
                  <Stars value={r.rating} />
                  <blockquote className="mt-4 flex-1 text-ink/75 leading-relaxed">“{r.text}”</blockquote>
                  <figcaption className="mt-5 flex items-center justify-between border-t border-gold/20 pt-4">
                    <span className="font-medium text-ink">{r.author}</span>
                    {r.source && <span className="text-xs text-ink/50">via {r.source}</span>}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="flex items-center gap-2 text-sm text-ink/60"><BadgeCheck size={16} className="text-gold-dark" /> Verified Google Business Profile · {site.address.locality}, {site.address.region}</p>
          <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 font-medium text-ink transition hover:bg-sand">
            Read &amp; write reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}

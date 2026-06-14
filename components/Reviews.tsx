import { Star } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { site } from "@/lib/config";
import { reviews } from "@/lib/data";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={15} className={i < value ? "fill-gold text-gold" : "text-gold/30"} />
      ))}
    </div>
  );
}

// Social proof section — real guest reviews placed BEFORE the booking form
// (proven conversion sequence: build trust, then ask for the booking).
export default function Reviews() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          eyebrow="Guest Reviews"
          title="Loved by Our Guests"
          subtitle={`Rated ${site.rating.value} out of 5 from ${site.rating.count} verified guest reviews.`}
        />
        <div className="grid gap-6 md:grid-cols-3">
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
      </div>
    </section>
  );
}

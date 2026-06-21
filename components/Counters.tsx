import { Users, BedDouble, LayoutGrid, MapPin } from "lucide-react";
import { site } from "@/lib/config";

// SSR-safe stats: the FINAL value is the rendered default, so the real numbers
// appear in raw HTML (view-source) for crawlers and no-JS visitors. No count-up
// from 0. Rating de-emphasised — review COUNT is the credibility lever.
type Stat = { icon: typeof Users; display: string; label: string };

const stats: Stat[] = [
  { icon: Users, display: `${site.rating.count}+`, label: "Happy Guest Reviews" },
  { icon: BedDouble, display: "20+", label: "Comfortable Rooms" },
  { icon: LayoutGrid, display: "4", label: "Room Categories" },
  { icon: MapPin, display: "350 m", label: "From the Railway Station" },
];

export default function Counters() {
  return (
    <section className="bg-ink py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-gold uppercase tracking-[0.3em] text-xs">By the Numbers</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-sand">Trusted by Travellers in Jodhpur</h2>
          <div className="lux-divider my-5" aria-hidden="true"><span className="lux-diamond" /></div>
        </div>
        <div className="mt-8 grid gap-5 grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="gold-frame rounded-2xl bg-white/5 px-6 py-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
                <s.icon size={26} />
              </div>
              <p className="font-serif text-4xl sm:text-5xl text-gold-gradient">{s.display}</p>
              <p className="mt-2 text-sm uppercase tracking-wider text-sand/70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

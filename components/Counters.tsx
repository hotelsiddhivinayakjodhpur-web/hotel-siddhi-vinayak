"use client";
import { useEffect, useRef, useState } from "react";
import { Users, BedDouble, Star, MapPin } from "lucide-react";
import { site } from "@/lib/config";

type Stat = { icon: typeof Users; value: number; suffix?: string; decimals?: number; label: string };

const stats: Stat[] = [
  { icon: Users, value: site.rating.count, suffix: "+", label: "Happy Guest Reviews" },
  { icon: BedDouble, value: 20, suffix: "+", label: "Comfortable Rooms" },
  { icon: Star, value: site.rating.value, decimals: 1, label: "Google Rating" },
  { icon: MapPin, value: 350, suffix: " m", label: "From the Railway Station" },
];

function useCountUp(target: number, run: boolean, decimals = 0, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString("en-IN");
}

function StatCard({ stat, run }: { stat: Stat; run: boolean }) {
  const display = useCountUp(stat.value, run, stat.decimals);
  return (
    <div className="gold-frame rounded-2xl bg-white/5 px-6 py-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
        <stat.icon size={26} />
      </div>
      <p className="font-serif text-4xl sm:text-5xl text-gold-gradient">
        {display}{stat.suffix || ""}
      </p>
      <p className="mt-2 text-sm uppercase tracking-wider text-sand/70">{stat.label}</p>
    </div>
  );
}

export default function Counters() {
  const ref = useRef<HTMLElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRun(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-ink py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-gold uppercase tracking-[0.3em] text-xs">By the Numbers</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-sand">Trusted by Travellers in Jodhpur</h2>
          <div className="lux-divider my-5" aria-hidden="true"><span className="lux-diamond" /></div>
        </div>
        <div className="mt-8 grid gap-5 grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => <StatCard key={s.label} stat={s} run={run} />)}
        </div>
      </div>
    </section>
  );
}

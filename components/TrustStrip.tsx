import { BadgeIndianRupee, Car, Wifi, Clock, TrainFront, ShieldCheck } from "lucide-react";

const items = [
  { icon: BadgeIndianRupee, label: "Best Rate — Book Direct" },
  { icon: Car, label: "Free Parking" },
  { icon: Wifi, label: "Free High-Speed Wi-Fi" },
  { icon: Clock, label: "24×7 Front Desk" },
  { icon: TrainFront, label: "Near Railway Station" },
  { icon: ShieldCheck, label: "Free Cancellation*" },
];

// Compact trust band placed directly under the hero — surfaces the reasons to
// book direct above the fold where high-intent visitors decide.
export default function TrustStrip() {
  return (
    <section aria-label="Why book direct" className="border-y border-gold/20 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-4 px-6 py-5 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((it) => (
          <div key={it.label} className="flex items-center justify-center gap-2 text-center">
            <it.icon size={18} className="shrink-0 text-gold-dark" aria-hidden="true" />
            <span className="text-xs font-medium text-ink/80 sm:text-sm">{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import { Check } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { rooms } from "@/lib/data";

// At-a-glance comparison of the four room categories — helps guests self-select
// the right room and nudges higher-value choices (premium value / family).
export default function RoomComparison() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="Compare Rooms" title="Find Your Perfect Room" subtitle="Four categories, one honest direct rate — pick what fits your trip." />

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-2xl border border-gold/20 md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand text-ink">
              <tr>
                <th className="p-4 font-medium">Room</th>
                <th className="p-4 font-medium">From / night</th>
                <th className="p-4 font-medium">Sleeps</th>
                <th className="p-4 font-medium">Beds</th>
                <th className="p-4 font-medium">Best for</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {rooms.map((r) => (
                <tr key={r.slug} className="text-ink/80">
                  <td className="p-4">
                    <span className="font-serif text-lg text-ink">{r.name}</span>
                    <span className="ml-2 rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-medium text-gold-dark">{r.highlight}</span>
                  </td>
                  <td className="p-4 font-semibold text-gold-dark">₹{r.price.toLocaleString("en-IN")}</td>
                  <td className="p-4">{r.occupancy}</td>
                  <td className="p-4">{r.bed}</td>
                  <td className="p-4">{r.bestFor}</td>
                  <td className="p-4">
                    <Link href={`/rooms/${r.slug}`} className="rounded-full bg-ink px-4 py-2 text-xs font-medium text-sand transition hover:bg-gold hover:text-ink">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="grid gap-4 md:hidden">
          {rooms.map((r) => (
            <div key={r.slug} className="rounded-2xl border border-gold/20 bg-white p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-ink">{r.name}</h3>
                <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-medium text-gold-dark">{r.highlight}</span>
              </div>
              <p className="mt-1"><span className="font-serif text-xl text-gold-dark">₹{r.price.toLocaleString("en-IN")}</span><span className="text-xs text-ink/55">/night</span></p>
              <ul className="mt-3 space-y-1 text-sm text-ink/70">
                <li className="flex items-center gap-2"><Check size={14} className="text-gold-dark" /> {r.occupancy} · {r.bed}</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-gold-dark" /> {r.bestFor}</li>
              </ul>
              <Link href={`/rooms/${r.slug}`} className="mt-4 inline-block rounded-full bg-ink px-5 py-2 text-sm font-medium text-sand transition hover:bg-gold hover:text-ink">View room</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

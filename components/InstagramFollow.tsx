import Image from "next/image";
import { Instagram, Play, Heart } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { site } from "@/lib/config";
import { instagramFeed } from "@/lib/instagram";

// Real Instagram content from @hotel_siddhi_vinayak_jodhpur — reel poster frames
// linking to the live posts. Authentic social proof + follow CTA.
const igUrl = site.social.instagram;

export default function InstagramFollow() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle eyebrow={`@${site.instagramHandle}`} title="Follow Us on Instagram" subtitle="Original reels from Hotel Siddhi Vinayak and the Blue City of Jodhpur." />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {instagramFeed.map((p, i) => (
            <a key={i} href={p.permalink} target="_blank" rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl bg-sand" title={p.caption}>
              <Image src={p.src} alt={p.caption} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:640px) 50vw, 16vw" />
              <span className="absolute right-2 top-2 text-white/90 drop-shadow"><Play size={16} fill="currentColor" /></span>
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/80 to-transparent p-2 text-[11px] text-sand opacity-0 transition group-hover:opacity-100">
                <span className="truncate pr-1">{p.caption}</span>
                <span className="flex items-center gap-0.5 shrink-0"><Heart size={11} fill="currentColor" /> {p.likes}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href={igUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 font-medium text-sand transition hover:bg-gold hover:text-ink">
            <Instagram size={18} /> Follow @{site.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}

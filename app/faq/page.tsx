"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { FaqSchema } from "@/components/Schema";
import { faqs } from "@/lib/data";
import { whatsappLink, callLink } from "@/lib/config";

// Group FAQs by category, preserving declaration order and a stable global index.
const groups = faqs.reduce<{ category: string; items: { f: (typeof faqs)[number]; i: number }[] }[]>((acc, f, i) => {
  const g = acc.find((x) => x.category === f.category);
  if (g) g.items.push({ f, i });
  else acc.push({ category: f.category, items: [{ f, i }] });
  return acc;
}, []);

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <FaqSchema />
      <PageHero title="Frequently Asked Questions" subtitle="Everything you need to know before you stay." image="/images/rooms/triple-deluxe-room/triple-deluxe-room-jodhpur-01.webp" />
      <section className="py-16 sm:py-20 bg-sand">
        <div className="mx-auto max-w-3xl px-6 space-y-10">
          {groups.map((g) => (
            <div key={g.category}>
              <h2 className="font-serif text-2xl text-ink mb-4">{g.category}</h2>
              <div className="space-y-3">
                {g.items.map(({ f, i }) => (
                  <Reveal key={i} delay={(i % 4) * 0.04}>
                    <div className="rounded-xl bg-white shadow-sm overflow-hidden gold-frame">
                      <button
                        onClick={() => setOpen(open === i ? null : i)}
                        aria-expanded={open === i}
                        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                      >
                        <span className="font-medium text-ink">{f.q}</span>
                        <ChevronDown size={20} className={`shrink-0 text-gold-dark transition-transform ${open === i ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {open === i && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <p className="px-6 pb-5 text-ink/70 leading-relaxed">{f.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}

          {/* Still have a question? */}
          <div className="rounded-2xl bg-ink p-8 text-center text-sand">
            <h2 className="font-serif text-2xl text-gold">Still have a question?</h2>
            <p className="mt-2 text-sand/80">Our team replies within minutes on WhatsApp — and books you at the best direct rate.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-medium text-white transition hover:opacity-90"><MessageCircle size={18} /> WhatsApp Us</a>
              <a href={callLink} className="btn-gold flex items-center gap-2 rounded-full px-6 py-3 font-semibold"><Phone size={17} /> Call Now</a>
              <Link href="/contact" className="flex items-center gap-2 rounded-full border border-sand/30 px-6 py-3 font-medium text-sand transition hover:bg-sand/10">Contact Page</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { faqs } from "@/lib/data";

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHero title="Frequently Asked Questions" subtitle="Everything you need to know before you stay." image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80" />
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-3xl px-6 space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="rounded-xl bg-white shadow-sm overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="font-medium text-ink">{f.q}</span>
                  <ChevronDown size={20} className={`shrink-0 text-gold transition-transform ${open === i ? "rotate-180" : ""}`} />
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
      </section>
    </>
  );
}

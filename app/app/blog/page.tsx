import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { posts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Travel Blog",
  description: "Travel tips and guides for Jodhpur from Hotel Siddhi Vinayak — things to do, best time to visit and how to reach us.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero title="Travel Blog" subtitle="Tips and guides to make the most of your Jodhpur trip." image="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1920&q=80" />
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <article className="group h-full overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
                <Link href={`/blog/${p.slug}`}>
                  <div className="relative h-52 overflow-hidden">
                    <Image src={p.image} alt={p.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <p className="flex items-center gap-1 text-xs text-ink/50"><Calendar size={13} /> {new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                    <h2 className="mt-2 font-serif text-xl text-ink">{p.title}</h2>
                    <p className="mt-2 text-sm text-ink/60 line-clamp-3">{p.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-gold-dark font-medium">Read More <ArrowRight size={15} /></span>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

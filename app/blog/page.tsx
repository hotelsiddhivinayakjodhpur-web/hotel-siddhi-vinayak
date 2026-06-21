import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { BreadcrumbSchema } from "@/components/Schema";
import { posts, readingTime } from "@/lib/blog";
import { site } from "@/lib/config";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Jodhpur Travel Blog",
  description: "Jodhpur travel guides, itineraries, food, shopping and seasonal tips from the local team at Hotel Siddhi Vinayak — everything you need to plan a perfect Blue City trip.",
  path: "/blog",
});

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

const blogListSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Jodhpur Travel Blog — Hotel Siddhi Vinayak",
  url: `${site.url}/blog`,
  blogPost: posts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    url: `${site.url}/blog/${p.slug}`,
    image: `${site.url}${p.hero.src}`,
    datePublished: p.date,
    dateModified: p.updated || p.date,
    articleSection: p.category,
  })),
};

export default function BlogPage() {
  const [featured, ...rest] = posts;
  const fMins = readingTime(featured);

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }} />
      <PageHero title="Jodhpur Travel Blog" subtitle="Local guides, itineraries and tips to make the most of the Blue City." image="/images/blog/jodhpur-blue-city.webp" />

      <section className="py-16 sm:py-20 bg-sand">
        <div className="mx-auto max-w-7xl px-6">
          {/* Featured */}
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-3xl bg-white shadow-md transition hover:shadow-xl md:grid-cols-2">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <Image src={featured.hero.src} alt={featured.hero.alt} fill priority className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 50vw" />
                <span className="absolute top-4 left-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink">Featured</span>
              </div>
              <div className="flex flex-col justify-center p-8">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-dark">{featured.category}</p>
                <h2 className="mt-2 font-serif text-2xl sm:text-3xl text-ink leading-tight">{featured.title}</h2>
                <p className="mt-3 text-ink/65 leading-relaxed line-clamp-3">{featured.excerpt}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-ink/50">
                  <span className="flex items-center gap-1"><Calendar size={13} /> {fmt(featured.date)}</span>
                  <span className="flex items-center gap-1"><Clock size={13} /> {fMins} min read</span>
                </div>
                <span className="mt-5 inline-flex items-center gap-1 font-medium text-gold-dark group-hover:gap-2 transition-all">Read the guide <ArrowRight size={16} /></span>
              </div>
            </Link>
          </Reveal>

          {/* Grid */}
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.1}>
                <article className="group h-full overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
                  <Link href={`/blog/${p.slug}`} className="block h-full">
                    <div className="relative h-52 overflow-hidden">
                      <Image src={p.hero.src} alt={p.hero.alt} fill loading="lazy" className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
                      <span className="absolute top-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-medium text-sand">{p.category}</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-ink/50">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {fmt(p.date)}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {readingTime(p)} min</span>
                      </div>
                      <h2 className="mt-2 font-serif text-xl text-ink leading-tight">{p.title}</h2>
                      <p className="mt-2 text-sm text-ink/60 line-clamp-3">{p.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-gold-dark font-medium group-hover:gap-2 transition-all">Read More <ArrowRight size={15} /></span>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

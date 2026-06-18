import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ArrowRight, Phone, MessageCircle, BedDouble, MapPin, User } from "lucide-react";
import Reveal from "@/components/Reveal";
import TableOfContents from "@/components/TableOfContents";
import ShareButtons from "@/components/ShareButtons";
import { posts, getPost, readingTime, getAdjacentPosts, getRelatedPosts, blogAuthor } from "@/lib/blog";
import { getAttraction } from "@/lib/attractions";
import { site, whatsappLink, callLink } from "@/lib/config";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${site.url}/blog/${post.slug}`,
      images: [{ url: post.hero.src, alt: post.hero.alt }],
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
    },
  };
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const mins = readingTime(post);
  const url = `${site.url}/blog/${post.slug}`;
  const { prev, next } = getAdjacentPosts(post.slug);
  const related = getRelatedPosts(post, 3);
  const attractions = post.relatedAttractions.map(getAttraction).filter(Boolean).slice(0, 4);
  const waMsg = `Hi! I was reading your Jodhpur guide "${post.title}" and would like to enquire about a room at Hotel Siddhi Vinayak.`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: [`${site.url}${post.hero.src}`],
    datePublished: post.date,
    dateModified: post.updated || post.date,
    inLanguage: "en-IN",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url, logo: { "@type": "ImageObject", url: `${site.url}/og-image.jpg` } },
    description: post.metaDescription,
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="pt-28 pb-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1 text-xs text-ink/50" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold-dark">Home</Link><span>/</span>
            <Link href="/blog" className="hover:text-gold-dark">Blog</Link><span>/</span>
            <span className="text-ink/70 line-clamp-1">{post.title}</span>
          </nav>

          {/* Header */}
          <p className="text-gold-dark text-xs font-semibold uppercase tracking-[0.2em]">{post.category}</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink/55">
            <span className="flex items-center gap-1.5"><User size={14} className="text-gold-dark" /> {blogAuthor.name}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-gold-dark" /> {fmt(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-gold-dark" /> {mins} min read</span>
          </div>

          {/* Hero */}
          <figure className="relative mt-8 h-72 sm:h-[26rem] rounded-2xl overflow-hidden shadow-lg">
            <Image src={post.hero.src} alt={post.hero.alt} fill priority className="object-cover" sizes="(max-width:1024px) 100vw, 1100px" />
            {post.hero.credit && <figcaption className="absolute bottom-0 right-0 bg-ink/55 px-2 py-0.5 text-[10px] text-sand/90">Photo: {post.hero.credit}</figcaption>}
          </figure>

          {/* Body + sidebar */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px]">
            <div className="min-w-0">
              {/* Intro */}
              <div className="space-y-5 text-ink/80 leading-relaxed text-lg">
                {post.intro.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              <div className="my-8"><ShareButtons url={url} title={post.title} /></div>

              {/* Sections */}
              <div className="space-y-12">
                {post.sections.map((s) => (
                  <section key={s.id} id={s.id} className="scroll-mt-28">
                    <h2 className="font-serif text-2xl sm:text-3xl text-ink">{s.heading}</h2>
                    <div className="mt-4 space-y-4 text-ink/80 leading-relaxed">
                      {s.body.map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                    {s.list && (
                      <ul className="mt-4 space-y-2 text-ink/80">
                        {s.list.map((li) => <li key={li} className="flex gap-2"><span className="mt-1 text-gold-dark">▸</span><span>{li}</span></li>)}
                      </ul>
                    )}
                    {s.image && (
                      <figure className="relative mt-6 h-64 sm:h-80 overflow-hidden rounded-xl">
                        <Image src={s.image.src} alt={s.image.alt} fill loading="lazy" className="object-cover" sizes="(max-width:1024px) 100vw, 760px" />
                      </figure>
                    )}
                  </section>
                ))}
              </div>

              {/* Inline CTA */}
              <div className="mt-12 rounded-2xl bg-ink p-7 text-center text-sand">
                <h3 className="font-serif text-2xl text-gold">Planning a trip to Jodhpur?</h3>
                <p className="mx-auto mt-2 max-w-xl text-sand/80">Stay in the heart of the Blue City — about 350 m from the railway station. Book direct for the best rate and we'll help plan your sightseeing.</p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <a href={whatsappLink(waMsg)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-medium text-white transition hover:opacity-90"><MessageCircle size={17} /> WhatsApp Us</a>
                  <Link href="/rooms" className="flex items-center gap-2 rounded-full bg-gold px-5 py-3 font-medium text-ink transition hover:bg-gold-light"><BedDouble size={17} /> Book a Room</Link>
                  <a href={callLink} className="flex items-center gap-2 rounded-full border border-sand/30 px-5 py-3 font-medium text-sand transition hover:bg-sand/10"><Phone size={16} /> Call Hotel</a>
                </div>
              </div>

              {/* FAQ */}
              {post.faqs.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-serif text-2xl sm:text-3xl text-ink">Frequently Asked Questions</h2>
                  <div className="mt-5 divide-y divide-gold/15 rounded-2xl border border-gold/15 bg-sand/40">
                    {post.faqs.map((f) => (
                      <details key={f.q} className="group p-5">
                        <summary className="flex cursor-pointer items-center justify-between gap-3 font-medium text-ink list-none">
                          {f.q}
                          <span className="text-gold-dark transition-transform group-open:rotate-45">+</span>
                        </summary>
                        <p className="mt-3 text-ink/75 leading-relaxed">{f.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {/* Related attractions */}
              {attractions.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-serif text-2xl text-ink mb-5">Attractions in this guide</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {attractions.map((a) => (
                      <Link key={a!.slug} href={`/attractions/${a!.slug}`} className="group flex gap-4 overflow-hidden rounded-xl border border-gold/15 bg-white p-3 transition hover:shadow-md">
                        <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg">
                          <Image src={a!.gallery[0].src} alt={a!.name} fill loading="lazy" className="object-cover transition group-hover:scale-105" sizes="96px" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-serif text-lg text-ink leading-tight">{a!.name}</h3>
                          <p className="mt-1 flex items-center gap-1 text-xs text-ink/50"><MapPin size={12} className="text-gold-dark" /> {a!.distance}</p>
                          <span className="mt-1 inline-flex items-center gap-1 text-xs text-gold-dark">Explore <ArrowRight size={12} /></span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author */}
              <div className="mt-12 flex gap-4 rounded-2xl border border-gold/15 bg-sand/40 p-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-dark"><User size={26} /></div>
                <div>
                  <p className="font-serif text-lg text-ink">{blogAuthor.name}</p>
                  <p className="text-xs uppercase tracking-wider text-gold-dark">{blogAuthor.role}</p>
                  <p className="mt-2 text-sm text-ink/70 leading-relaxed">{blogAuthor.bio}</p>
                </div>
              </div>

              <div className="mt-10 border-t border-gold/15 pt-6"><ShareButtons url={url} title={post.title} /></div>

              {/* Prev / Next */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {prev ? (
                  <Link href={`/blog/${prev.slug}`} className="group rounded-xl border border-gold/15 p-4 transition hover:bg-sand/50">
                    <span className="flex items-center gap-1 text-xs text-ink/50"><ArrowLeft size={13} /> Previous</span>
                    <p className="mt-1 font-serif text-ink group-hover:text-gold-dark line-clamp-2">{prev.title}</p>
                  </Link>
                ) : <span />}
                {next && (
                  <Link href={`/blog/${next.slug}`} className="group rounded-xl border border-gold/15 p-4 text-right transition hover:bg-sand/50 sm:col-start-2">
                    <span className="flex items-center justify-end gap-1 text-xs text-ink/50">Next <ArrowRight size={13} /></span>
                    <p className="mt-1 font-serif text-ink group-hover:text-gold-dark line-clamp-2">{next.title}</p>
                  </Link>
                )}
              </div>
            </div>

            {/* Sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-5">
                <TableOfContents items={post.sections.map((s) => ({ id: s.id, heading: s.heading }))} />
                <div className="rounded-2xl bg-gradient-to-br from-ink to-ink/90 p-5 text-sand">
                  <p className="font-serif text-lg text-gold">Stay in the Blue City</p>
                  <p className="mt-1 text-sm text-sand/80">Central, comfortable, and steps from the station.</p>
                  <div className="mt-4 space-y-2">
                    <a href={whatsappLink(waMsg)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"><MessageCircle size={15} /> WhatsApp</a>
                    <Link href="/rooms" className="flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-gold-light"><BedDouble size={15} /> Book a Room</Link>
                    <a href={callLink} className="flex items-center justify-center gap-2 rounded-full border border-sand/30 px-4 py-2.5 text-sm font-medium text-sand transition hover:bg-sand/10"><Phone size={14} /> Call Hotel</a>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-16 border-t border-gold/15 pt-10">
              <h2 className="font-serif text-2xl sm:text-3xl text-ink mb-6">Related Articles</h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {related.map((r, i) => (
                  <Reveal key={r.slug} delay={i * 0.1}>
                    <Link href={`/blog/${r.slug}`} className="group block h-full overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
                      <div className="relative h-40 overflow-hidden">
                        <Image src={r.hero.src} alt={r.hero.alt} fill loading="lazy" className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:640px) 100vw, 33vw" />
                      </div>
                      <div className="p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-dark">{r.category}</p>
                        <h3 className="mt-1 font-serif text-lg text-ink leading-tight line-clamp-2">{r.title}</h3>
                        <span className="mt-2 inline-flex items-center gap-1 text-sm text-gold-dark group-hover:gap-2 transition-all">Read <ArrowRight size={14} /></span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import { posts } from "@/lib/data";
import { site } from "@/lib/config";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, images: [post.image], type: "article" },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.image,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    description: post.excerpt,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article className="pt-28 pb-20 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <Link href="/blog" className="inline-flex items-center gap-1 text-gold-dark hover:gap-2 transition-all mb-6">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <p className="flex items-center gap-1 text-sm text-ink/50"><Calendar size={14} /> {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-ink">{post.title}</h1>
          <div className="relative mt-8 h-72 sm:h-96 rounded-2xl overflow-hidden shadow-lg">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
          <div className="mt-8 space-y-5 text-ink/75 leading-relaxed text-lg">
            {post.content.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>
      </article>
    </>
  );
}

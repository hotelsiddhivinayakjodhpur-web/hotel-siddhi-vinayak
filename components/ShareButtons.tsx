"use client";
import { useState } from "react";
import { Facebook, MessageCircle, Link2, Check, Share2 } from "lucide-react";

// X (Twitter) glyph isn't in lucide; small inline SVG keeps the set complete.
function XIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${enc(`${title} ${url}`)}`, Icon: MessageCircle, cls: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]" },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, Icon: Facebook, cls: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]" },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`, Icon: XIcon, cls: "hover:bg-ink hover:text-white hover:border-ink" },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/50">
        <Share2 size={14} /> Share
      </span>
      {links.map(({ label, href, Icon, cls }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          title={`Share on ${label}`}
          className={`flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors ${cls}`}
        >
          <Icon size={17} />
        </a>
      ))}
      <button
        onClick={copy}
        aria-label="Copy link"
        title="Copy link"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:bg-gold hover:text-ink hover:border-gold"
      >
        {copied ? <Check size={17} className="text-green-600" /> : <Link2 size={17} />}
      </button>
    </div>
  );
}

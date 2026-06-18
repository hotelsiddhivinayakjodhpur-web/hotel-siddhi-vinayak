"use client";
import { useEffect, useState } from "react";
import { List } from "lucide-react";

type Item = { id: string; heading: string };

export default function TableOfContents({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -65% 0px", threshold: 0 }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-gold/20 bg-white p-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left lg:cursor-default"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/60">
          <List size={15} className="text-gold-dark" /> On this page
        </span>
        <span className="text-ink/40 lg:hidden">{open ? "−" : "+"}</span>
      </button>
      <ul className={`mt-4 space-y-2 text-sm ${open ? "block" : "hidden"} lg:block`}>
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              onClick={(e) => handleClick(e, it.id)}
              className={`block border-l-2 pl-3 leading-snug transition-colors ${
                active === it.id ? "border-gold-dark font-medium text-gold-dark" : "border-transparent text-ink/60 hover:text-ink"
              }`}
            >
              {it.heading}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

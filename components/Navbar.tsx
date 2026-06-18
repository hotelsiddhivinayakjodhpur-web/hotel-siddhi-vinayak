"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { nav, site, callLink } from "@/lib/config";
import SocialLinks from "@/components/SocialLinks";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ink/95 backdrop-blur shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-serif text-xl sm:text-2xl text-gold tracking-wide">
            {site.name}
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-sand/70">
            Jodhpur · Rajasthan
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-7">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-sm uppercase tracking-wider transition-colors hover:text-gold ${
                  pathname === item.href ? "text-gold" : "text-sand/90"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <SocialLinks iconSize={18} itemClassName="text-sand/80 hover:text-gold" />
          </li>
          <li>
            <a
              href={callLink}
              className="flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-medium text-ink transition hover:bg-gold-light"
            >
              <Phone size={15} /> Call Now
            </a>
          </li>
        </ul>

        <button
          className="lg:hidden text-sand"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-ink/98"
          >
            <ul className="px-6 py-4 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block py-1 text-base ${
                      pathname === item.href ? "text-gold" : "text-sand/90"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={callLink}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-gold px-4 py-2 font-medium text-ink"
                >
                  <Phone size={16} /> Call Now
                </a>
              </li>
              <li className="pt-2">
                <SocialLinks className="justify-center" iconSize={22} itemClassName="text-sand/80 hover:text-gold" />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

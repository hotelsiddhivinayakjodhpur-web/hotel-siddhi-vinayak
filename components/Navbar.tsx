"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, CalendarCheck } from "lucide-react";
import { nav, site, callLink, bookingLink } from "@/lib/config";
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
        scrolled || open ? "bg-ink/95 backdrop-blur shadow-lg" : "bg-transparent"
      }`}
    >
      {/* ── TOP ROW · Brand zone (left) + Actions zone (right) ── */}
      <div
        className={`mx-auto flex max-w-[1760px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12 transition-all duration-300 ${
          scrolled ? "py-1.5" : "py-2.5"
        }`}
      >
        {/* Branding zone */}
        <Link href="/" aria-label={`${site.name} — home`} className="flex shrink-0 items-center gap-3">
          <Image
            src="/images/brand/sv-logo.png"
            alt={`${site.name} logo`}
            width={385}
            height={512}
            priority
            className="h-9 w-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] sm:h-10 lg:h-11"
          />
          <span className="flex flex-col leading-none">
            <span className="whitespace-nowrap font-serif text-lg text-gold tracking-wide sm:text-xl lg:text-2xl">
              {site.name}
            </span>
            <span className="mt-1 text-[9px] uppercase tracking-[0.22em] text-sand/60 sm:text-[10px]">
              Jodhpur · Rajasthan
            </span>
          </span>
        </Link>

        {/* Actions zone — social · Call · Book Now (desktop) */}
        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <SocialLinks iconSize={17} itemClassName="text-sand/75 hover:text-gold" />
          <span className="h-5 w-px bg-sand/20" aria-hidden="true" />
          {/* Matched gold CTA pair — equal prominence */}
          <div className="flex items-center gap-3">
            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center gap-1.5 rounded-full px-5 py-2 text-[13px] font-semibold"
            >
              <CalendarCheck size={15} /> Book Now
            </a>
            <a
              href={callLink}
              aria-label="Call the hotel"
              className="btn-gold flex items-center gap-1.5 rounded-full px-5 py-2 text-[13px] font-semibold"
            >
              <Phone size={15} /> Call Now
            </a>
          </div>
        </div>

        {/* Hamburger (mobile + tablet) */}
        <button
          className="text-sand lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ── NAV ROW · centered navigation (desktop only) ── */}
      <div className="hidden border-t border-sand/10 lg:block">
        <ul
          className={`mx-auto flex max-w-[1760px] items-center justify-center gap-x-7 px-5 xl:gap-x-9 transition-all duration-300 ${
            scrolled ? "py-1.5" : "py-2"
          }`}
        >
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`nav-link text-[13px] font-medium uppercase tracking-[0.15em] transition-colors hover:text-gold ${
                  pathname === item.href ? "text-gold" : "text-sand/85"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-ink/98 lg:hidden"
          >
            <ul className="px-4 py-4 space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`flex min-h-[48px] items-center gap-3 rounded-xl px-4 text-base transition-colors ${
                      pathname === item.href
                        ? "bg-gold/15 font-medium text-gold"
                        : "text-sand/90 hover:bg-white/5 hover:text-gold active:bg-white/10"
                    }`}
                  >
                    <span className={`h-4 w-[3px] rounded-full ${pathname === item.href ? "bg-gold" : "bg-transparent"}`} aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 grid grid-cols-2 gap-3">
                <a
                  href={bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 font-semibold"
                >
                  <CalendarCheck size={16} /> Book Now
                </a>
                <a
                  href={callLink}
                  className="btn-gold flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 font-semibold"
                >
                  <Phone size={16} /> Call Now
                </a>
              </li>
              <li className="pt-2">
                <SocialLinks className="justify-center" iconSize={22} showLabels itemClassName="text-sand/80 hover:text-gold" />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

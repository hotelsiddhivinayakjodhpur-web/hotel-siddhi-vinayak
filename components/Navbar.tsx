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
        scrolled ? "bg-ink/95 backdrop-blur shadow-lg py-2.5" : "bg-transparent py-3.5"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" aria-label={`${site.name} — home`} className="flex items-center gap-2 sm:gap-2.5">
          <Image
            src="/images/brand/sv-logo.png"
            alt={`${site.name} logo`}
            width={385}
            height={512}
            priority
            className="h-8 w-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] sm:h-9"
          />
          <span className="flex flex-col leading-none">
            <span className="whitespace-nowrap font-serif text-base text-gold tracking-wide sm:text-lg lg:text-xl">
              {site.name}
            </span>
            <span className="mt-0.5 text-[9px] uppercase tracking-[0.22em] text-sand/60 sm:text-[10px]">
              Jodhpur · Rajasthan
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-5 xl:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`nav-link text-[13px] font-medium uppercase tracking-[0.14em] transition-colors hover:text-gold ${
                  pathname === item.href ? "text-gold" : "text-sand/85"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="ml-1">
            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold"
            >
              <CalendarCheck size={15} /> Book Now
            </a>
          </li>
          <li>
            <a
              href={callLink}
              aria-label="Call the hotel"
              className="flex items-center gap-1.5 rounded-full border border-gold/40 px-3.5 py-2 text-[13px] font-semibold text-gold hover:bg-gold/10"
            >
              <Phone size={15} /> Call
            </a>
          </li>
        </ul>

        <button
          className="text-sand xl:hidden"
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
            className="overflow-hidden bg-ink/98 xl:hidden"
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
                  href={bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold mt-2 flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 font-semibold"
                >
                  <CalendarCheck size={16} /> Book Now
                </a>
              </li>
              <li>
                <a
                  href={callLink}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-gold/40 px-4 py-2 font-semibold text-gold"
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

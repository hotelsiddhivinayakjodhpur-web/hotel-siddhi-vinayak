import type { Metadata } from "next";
import { Phone, MessageCircle, CalendarCheck, ArrowRight, RefreshCw } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import RealTimeAvailability from "@/components/RealTimeAvailability";
import { BreadcrumbSchema } from "@/components/Schema";
import { bookingLink, whatsappLink, callLink, site } from "@/lib/config";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Book Your Stay",
  description:
    "Book Hotel Siddhi Vinayak, Jodhpur directly online with real-time availability and instant confirmation. Secure payments through Stayflexi, or book on Call / WhatsApp for the best direct rate.",
  path: "/booking",
});

export default function BookingPage() {
  return (
    <>
      {/* Warm up the connection to the booking engine so it opens faster (React hoists these to <head>). */}
      <link rel="preconnect" href="https://bookingengine.stayflexi.com" />
      <link rel="dns-prefetch" href="https://bookingengine.stayflexi.com" />
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Book Now", path: "/booking" }]} />
      <PageHero
        title="Book Your Stay"
        subtitle="Real-time availability and instant confirmation, direct from the hotel."
        image="/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-01.webp"
      />

      {/* Primary booking engine CTA + real-time note */}
      <section className="bg-sand py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-1.5 text-sm font-medium text-gold-dark">
            <RefreshCw size={15} /> Live inventory
          </span>
          <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">Check Live Availability</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink/70">
            Rates and availability are updated in real time through Stayflexi. Pick your dates for an
            instant, secure confirmation — at our best available direct rate.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 rounded-full px-9 py-4 text-lg font-semibold"
            >
              <CalendarCheck size={20} /> Check Availability &amp; Book <ArrowRight size={18} />
            </a>
            <p className="text-xs text-ink/45">Real-time rates &amp; availability · Secure booking powered by Stayflexi</p>
          </div>

          {/* Direct alternatives */}
          <div className="mt-10 border-t border-gold/15 pt-8">
            <p className="text-sm text-ink/60">Prefer to book with a person? We reply in minutes.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-medium text-white transition hover:opacity-90">
                <MessageCircle size={18} /> Book on WhatsApp
              </a>
              <a href={callLink} className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 font-medium text-ink transition hover:bg-white">
                <Phone size={17} /> {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Reveal>
        <RealTimeAvailability />
      </Reveal>
    </>
  );
}

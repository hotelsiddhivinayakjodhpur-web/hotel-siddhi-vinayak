import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { site, nav } from "@/lib/config";

export default function Footer() {
  const a = site.address;
  return (
    <footer className="bg-ink text-sand/80">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <h3 className="font-serif text-2xl text-gold">{site.name}</h3>
          <p className="mt-3 text-sm leading-relaxed">{site.tagline}</p>
          <div className="mt-4 flex gap-3">
            <a href={site.social.instagram} aria-label="Instagram" className="hover:text-gold"><Instagram size={20} /></a>
            <a href={site.social.facebook} aria-label="Facebook" className="hover:text-gold"><Facebook size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-gold font-medium uppercase tracking-wider text-sm mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-gold">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-gold font-medium uppercase tracking-wider text-sm mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><MapPin size={18} className="shrink-0 text-gold" /><span>{a.street}, {a.locality}, {a.region} {a.postalCode}</span></li>
            <li className="flex gap-2"><Phone size={18} className="shrink-0 text-gold" /><a href={`tel:${site.phoneRaw}`} className="hover:text-gold">{site.phone}</a></li>
            <li className="flex gap-2"><Mail size={18} className="shrink-0 text-gold" /><a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold font-medium uppercase tracking-wider text-sm mb-4">Stay Info</h4>
          <ul className="space-y-2 text-sm">
            <li>Check-in: {site.checkIn}</li>
            <li>Check-out: {site.checkOut}</li>
            <li>From ₹{site.startingPrice} / night</li>
            <li>Rating: {site.rating.value} ★ ({site.rating.count})</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sand/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-sand/50">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p>Jodhpur, Rajasthan, India</p>
        </div>
      </div>
    </footer>
  );
}

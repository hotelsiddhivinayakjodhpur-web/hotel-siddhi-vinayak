import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { site, nav } from "@/lib/config";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  const a = site.address;
  return (
    <footer className="bg-ink text-sand/80">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <h3 className="font-serif text-2xl text-gold">{site.name}</h3>
          <p className="mt-3 text-sm leading-relaxed">{site.tagline}</p>
          <p className="mt-5 text-gold font-medium uppercase tracking-wider text-xs">Follow Us</p>
          <SocialLinks className="mt-3" iconSize={20} itemClassName="text-sand/80 hover:text-gold" />
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

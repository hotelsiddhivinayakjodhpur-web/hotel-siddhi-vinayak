import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { whatsappLink, callLink, bookingLink } from "@/lib/config";

// Persistent bottom action bar on mobile — keeps Call / WhatsApp / View Rooms
// one tap away on every screen. Hidden on >=sm where the floating buttons +
// header CTAs take over. Respects the iOS/Android home-indicator safe area.
export default function StickyMobileBar() {
  return (
    <nav
      aria-label="Quick booking actions"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-gold/20 bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(26,20,16,0.08)] sm:hidden"
    >
      <a href={callLink} aria-label="Call the hotel" className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-ink">
        <Phone size={20} className="text-gold-dark" />
        <span className="text-[11px] font-medium">Call</span>
      </a>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book on WhatsApp"
        className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 bg-[#25D366] text-white"
      >
        <MessageCircle size={20} />
        <span className="text-[11px] font-medium">WhatsApp</span>
      </a>
      <a href={bookingLink} target="_blank" rel="noopener noreferrer" aria-label="Book now — real-time availability" className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-ink">
        <CalendarCheck size={20} className="text-gold-dark" />
        <span className="text-[11px] font-medium">Book Now</span>
      </a>
    </nav>
  );
}

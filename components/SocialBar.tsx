import { Instagram, Facebook, Youtube } from "lucide-react";
import { socialProfiles } from "./SocialLinks";

const ICON = { instagram: Instagram, facebook: Facebook, youtube: Youtube } as const;

// Fixed vertical social rail on the left edge — desktop only. Each profile opens
// in a new tab. Hidden on mobile (the sticky bottom bar covers contact there).
export default function SocialBar() {
  if (socialProfiles.length === 0) return null;
  return (
    <div className="hidden xl:flex fixed left-0 top-1/2 z-40 -translate-y-1/2 flex-col overflow-hidden rounded-r-xl shadow-lg">
      {socialProfiles.map(({ key, label, href }) => {
        const Icon = ICON[key as keyof typeof ICON];
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow Hotel Siddhi Vinayak on ${label}`}
            title={`Follow us on ${label}`}
            className="flex h-11 w-11 items-center justify-center bg-ink/90 text-sand transition-all hover:w-14 hover:bg-gold hover:text-ink"
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}

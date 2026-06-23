import { Instagram, Facebook, Youtube } from "lucide-react";
import { site } from "@/lib/config";

// Single source of truth for the hotel's social profiles. Only platforms with a
// real, non-empty URL render — so nothing broken ever ships.
export const socialProfiles = [
  { key: "instagram", label: "Instagram", href: site.social.instagram, Icon: Instagram },
  { key: "facebook", label: "Facebook", href: site.social.facebook, Icon: Facebook },
  { key: "youtube", label: "YouTube", href: site.social.youtube, Icon: Youtube },
].filter((s) => s.href && s.href.trim().length > 0);

type Props = {
  className?: string;
  iconSize?: number;
  /** Extra classes applied to each icon link (for hover colour etc.) */
  itemClassName?: string;
  /** Show the platform name beside each icon (Instagram / Facebook / YouTube). */
  showLabels?: boolean;
};

export default function SocialLinks({ className = "", iconSize = 20, itemClassName = "", showLabels = false }: Props) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {socialProfiles.map(({ key, label, href, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow Hotel Siddhi Vinayak on ${label}`}
          title={`Follow us on ${label}`}
          className={`inline-flex items-center gap-2 transition-colors ${itemClassName}`}
        >
          <Icon size={iconSize} />
          {showLabels && <span className="text-sm font-medium">{label}</span>}
        </a>
      ))}
    </div>
  );
}

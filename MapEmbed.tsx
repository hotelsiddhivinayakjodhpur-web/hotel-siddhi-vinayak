import { site } from "@/lib/config";

export default function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-2xl shadow-lg">
      <iframe
        src={site.mapsEmbed}
        title={`Map to ${site.name}`}
        width="100%"
        height="420"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

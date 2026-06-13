import { site } from "@/lib/config";
import { faqs } from "@/lib/data";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

export function HotelSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    priceRange: site.priceRange,
    starRating: { "@type": "Rating", ratingValue: "3" },
    address: postalAddress,
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    image: `${site.url}/og-image.jpg`,
    checkinTime: site.checkIn,
    checkoutTime: site.checkOut,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
    },
    amenityFeature: [
      "Free Wi-Fi", "Air Conditioning", "Free Parking", "Room Service", "24-hour Front Desk",
    ].map((n) => ({ "@type": "LocationFeatureSpecification", name: n, value: true })),
  };
  return <JsonLd data={data} />;
}

export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    image: `${site.url}/og-image.jpg`,
    url: site.url,
    telephone: site.phone,
    priceRange: site.priceRange,
    address: postalAddress,
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [site.social.instagram, site.social.facebook],
  };
  return <JsonLd data={data} />;
}

export function FaqSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <JsonLd data={data} />;
}

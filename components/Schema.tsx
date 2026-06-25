import { site, otas, bookingLink } from "@/lib/config";
import { faqs, rooms, reviews } from "@/lib/data";

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
    logo: `${site.url}/images/brand/sv-logo-square.png`,
    checkinTime: site.checkIn,
    checkoutTime: site.checkOut,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
    },
    // Only emit individual Review objects when REAL reviews are present — never
    // fabricated. The aggregateRating above mirrors the live Google rating.
    ...(reviews.length
      ? {
          review: reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.author },
            datePublished: r.date,
            reviewBody: r.text,
            reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
          })),
        }
      : {}),
    amenityFeature: [
      "Free Wi-Fi", "Air Conditioning", "Free Parking", "EV Charging", "Room Service",
      "24-hour Front Desk", "Sun Terrace", "Travel Desk", "In-house Restaurant", "Airport/Railway Pickup",
    ].map((n) => ({ "@type": "LocationFeatureSpecification", name: n, value: true })),
    // The 4 room types as priced offers / contained places (Rich Results eligible).
    containsPlace: rooms.map((r) => ({
      "@type": "HotelRoom",
      name: r.name,
      bed: r.bed,
      occupancy: { "@type": "QuantitativeValue", maxValue: parseInt(r.occupancy, 10) || undefined, unitText: "Guests" },
      url: `${site.url}/rooms/${r.slug}`,
    })),
    // Room types as offers WITHOUT a fixed price — rates are dynamic via the
    // Stayflexi booking engine; each links to the live rate/availability.
    makesOffer: rooms.map((r) => ({
      "@type": "Offer",
      name: `${r.name} (room only)`,
      availability: "https://schema.org/InStock",
      url: `${site.url}/rooms/${r.slug}`,
    })),
    // Direct online booking via the Stayflexi booking engine (real-time availability).
    potentialAction: {
      "@type": "ReserveAction",
      name: "Book a room — real-time availability",
      target: {
        "@type": "EntryPoint",
        urlTemplate: bookingLink,
        inLanguage: "en",
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "LodgingReservation", name: "Hotel Siddhi Vinayak room reservation" },
    },
    // NOTE: `speakable` is intentionally NOT on Hotel/LodgingBusiness — per Google
    // it is only valid on WebPage subtypes. Speakable lives on the FAQPage and the
    // /hotel-policies WebPage, where it is valid.
  };
  return <JsonLd data={data} />;
}

// Per-room schema with priced Offers — eligible for room/price rich results.
export function RoomsSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Rooms at ${site.name}`,
    itemListElement: rooms.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "HotelRoom",
        name: r.name,
        description: r.description,
        url: `${site.url}/rooms/${r.slug}`,
        image: r.image,
        occupancy: {
          "@type": "QuantitativeValue",
          maxValue: parseInt(r.occupancy, 10) || undefined,
          unitText: "Guests",
        },
        bed: r.bed,
        amenityFeature: r.amenities.map((a) => ({
          "@type": "LocationFeatureSpecification",
          name: a,
          value: true,
        })),
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          url: `${site.url}/rooms/${r.slug}`,
        },
      },
    })),
  };
  return <JsonLd data={data} />;
}

// Breadcrumb trail for deep pages (orientation + SERP breadcrumbs).
export function BreadcrumbSchema({ items }: { items: { name: string; path: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
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
    logo: `${site.url}/images/brand/sv-logo-square.png`,
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
    sameAs: [site.social.instagram, site.social.facebook, site.social.youtube, site.social.google, ...otas.map((o) => o.url)].filter(Boolean),
  };
  return <JsonLd data={data} />;
}

export function FaqSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".gold-frame"] },
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <JsonLd data={data} />;
}

// Brand entity — feeds the Knowledge Panel and links logo + social profiles.
export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/images/brand/sv-logo-square.png`,
      width: 512,
      height: 512,
    },
    image: `${site.url}/og-image.jpg`,
    telephone: site.phone,
    email: site.email,
    address: postalAddress,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phone,
        contactType: "reservations",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
    sameAs: [
      site.social.instagram,
      site.social.facebook,
      site.social.youtube,
      site.social.google,
      ...otas.map((o) => o.url),
    ].filter(Boolean),
  };
  return <JsonLd data={data} />;
}

// Site-level entity; publisher references the Organization @id. No SearchAction
// (the site has no on-site search, so a sitelinks searchbox would be invalid).
export function WebsiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en-IN",
    publisher: { "@id": `${site.url}/#organization` },
  };
  return <JsonLd data={data} />;
}

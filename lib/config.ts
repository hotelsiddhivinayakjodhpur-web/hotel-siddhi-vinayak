// Central business configuration — edit these values to match the real hotel.
export const site = {
  name: "Hotel Siddhi Vinayak",
  legalName: "Hotel Siddhi Vinayak",
  tagline: "Comfort & Hospitality in the Blue City",
  description:
    "Hotel Siddhi Vinayak is a comfortable, well-located hotel in Jodhpur, Rajasthan — opposite M.G. Hospital near Jalori Gate, about 350 m from Jodhpur Railway Station — offering clean air-conditioned rooms, free Wi-Fi, free parking, a sun terrace, a travel desk and warm hospitality with easy access to Mehrangarh Fort and the old city.",
  // The ONE canonical domain for the entire brand. Drives all SEO: canonical
  // tags, sitemap, robots, OG/Twitter URLs, and JSON-LD @id/url. No other domain
  // is referenced anywhere in this codebase.
  url: "https://hotelsiddhi-vinayak.com",
  phone: "+91 98290 00000",
  phoneRaw: "919829000000",
  whatsapp: "919829000000",
  // ⚠️ Verify this mailbox exists / forwards before launch (aligned to primary domain).
  email: "stay@hotelsiddhi-vinayak.com",
  // Real Google Business Profile address.
  address: {
    street: "MG Hospital Road, Medical Market, Opposite M.G. Hospital, Jalori Gate, Rawaton Ka Bass",
    locality: "Jodhpur",
    region: "Rajasthan",
    postalCode: "342001",
    country: "IN",
  },
  // ⚠️ Approx Jalori Gate coords — replace with the exact GBP pin lat/lng.
  geo: { lat: 26.2742, lng: 73.0227 },
  // ⚠️ Replace with the real GBP "Embed a map" iframe src for the exact pin.
  mapsEmbed:
    "https://www.google.com/maps?q=Hotel%20Siddhi%20Vinayak%2C%20Jalori%20Gate%2C%20Jodhpur&output=embed",
  priceRange: "₹₹",
  startingPrice: 1200,
  currency: "INR",
  // Live Google Business Profile rating (Jan–Jun 2026): 3.7★ from 791+ reviews.
  rating: { value: 3.7, count: 791 },
  checkIn: "12:00",
  checkOut: "11:00",
  social: {
    instagram: "https://instagram.com/hotelsiddhivinayak",
    facebook: "https://facebook.com/hotelsiddhivinayak",
    // ⚠️ Add the real Google Business Profile URL here for schema sameAs / GBP integration.
    google: "",
  },
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "Restaurant", href: "/restaurant" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Attractions", href: "/nearby-attractions" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const whatsappLink = (msg?: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    msg || "Hi! I would like to enquire about a room at Hotel Siddhi Vinayak."
  )}`;

export const callLink = `tel:${site.phoneRaw}`;

// Rates are not published — every room shows this until prices are finalized.
export const RATE_LABEL = "Contact for Best Available Rate";

// Real photos are processed into public/images — room/gallery pages render the
// local WebP galleries.
export const PHOTOS_READY = true;

// The only available walkthrough clip is a low-quality phone video (TV-on-wall),
// not premium enough for a hero. Disabled in favour of a luxury hero image until
// professional video footage is available.
export const VIDEO_READY = false;

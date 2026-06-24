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
  // Real number from the verified Google Business Profile.
  phone: "+91 89528 02559",
  phoneRaw: "918952802559",
  whatsapp: "918952802559",
  // Official hotel inbox (Google Business Profile contact email).
  email: "hotelsiddhivinayakjodhpur@gmail.com",
  // Real Google Business Profile address.
  address: {
    street: "MG Hospital Road, Medical Market, Opposite M.G. Hospital, Jalori Gate, Rawaton Ka Bass",
    locality: "Jodhpur",
    region: "Rajasthan",
    postalCode: "342001",
    country: "IN",
  },
  // Exact pin from the verified Google Business Profile.
  geo: { lat: 26.2849, lng: 73.0188 },
  mapsEmbed:
    "https://maps.google.com/maps?q=26.2849,73.0188(Hotel%20Siddhi%20Vinayak)&z=16&output=embed",
  priceRange: "₹₹",
  startingPrice: 1200,
  currency: "INR",
  // Live Google Business Profile rating (Jan–Jun 2026): 3.7★ from 791+ reviews.
  rating: { value: 3.7, count: 791 },
  checkIn: "11:00",
  checkOut: "11:00",
  social: {
    // All three verified June 2026 (browser screenshot + WebFetch + hotel's own site).
    instagram: "https://www.instagram.com/hotel_siddhi_vinayak_jodhpur/",
    // Official page "Hotel Siddhi Vinayak Jodhpur" (SV logo + real room cover, owner
    // is admin). Replaces facebook.com/hotelsiddhivinayak which showed
    // "This content isn't available right now".
    facebook: "https://www.facebook.com/people/Hotel-Siddhi-Vinayak-Jodhpur/61556092217218/",
    // Official channel "HOTEL SIDDHI VINAYAK JODHPUR" (has live videos).
    youtube: "https://www.youtube.com/@HOTELSIDDHIVINAYAKJODHPUR",
    // Real Google Business Profile (cid) — used for the "read reviews on Google"
    // CTA and schema sameAs.
    google: "https://maps.google.com/maps?cid=4688437108186437899",
  },
  instagramHandle: "hotel_siddhi_vinayak_jodhpur",
};

// OTA listings (verified to resolve June 2026). Shown in the Book-Direct section
// and emitted in schema sameAs. Booking direct (Call/WhatsApp) is always primary.
// Verified Hotel Siddhi Vinayak PROPERTY pages (not OTA homepages). Each opens in
// a new tab. `brand` drives the wordmark chip colour. `rating`/`reviews` shown only
// where independently verifiable (Google = live GBP data). Others are link-only.
export type Ota = { name: string; url: string; brand: string; rating?: number; reviews?: number };

export const otas: Ota[] = [
  { name: "Google", url: site.social.google, brand: "#4285F4", rating: 3.7, reviews: 791 },
  { name: "Booking.com", url: "https://www.booking.com/hotel/in/siddhi-vinayak-jodhpur.html", brand: "#003580" },
  { name: "MakeMyTrip", url: "https://www.makemytrip.com/hotels/hotel_siddhi_vinayak-details-jodhpur.html", brand: "#EB2026" },
  { name: "Agoda", url: "https://www.agoda.com/hotel-siddhi-vinayak-h52657289/hotel/jodhpur-in.html", brand: "#5C2D91" },
  { name: "Expedia", url: "https://www.expedia.com/h108903246", brand: "#1668E3" },
  { name: "Cleartrip", url: "https://www.cleartrip.com/hotels/details/4561215", brand: "#F47521" },
  { name: "Tripadvisor", url: "https://www.tripadvisor.in/HotelHighlight-g297668-d3173616-Reviews-Hotel_Siddhi_Vinayak-Jodhpur_Jodhpur_District_Rajasthan.html", brand: "#00AF87" },
  { name: "Hotels.com", url: "https://in.hotels.com/ho3485903872/hotel-siddhi-vinayak/", brand: "#D32F2F" },
  { name: "Trivago", url: "https://www.trivago.in/en-IN/lm/hotel-siddhi-vinayak-jodhpur", brand: "#E6492D" },
  { name: "ZenHotels", url: "https://www.zenhotels.com/hotel/en-us/india/jodhpur/mid10368493/hotel_siddhi_vinayak_4/", brand: "#1FB6A8" },
  { name: "Vio.com", url: "https://www.vio.com/Hotel/Search?hotelId=7433129", brand: "#2B6CF6" },
  { name: "Justdial", url: "https://www.justdial.com/Jodhpur/Hotel-Siddhi-Vinayak-Opposite-Pratap-School-Jalori-Gate/0291PX291-X291-110310093543-M4L2_BZDET", brand: "#1A8917" },
];

export const nav = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "Restaurant", href: "/restaurant" },
  { label: "Gallery", href: "/gallery" },
  { label: "Videos", href: "/videos" },
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

export const callLink = `tel:+${site.phoneRaw}`;

// Stayflexi booking engine — GUEST-FACING direct booking link only. Never expose
// admin, PMS, channel-manager or dashboard URLs publicly; Stayflexi is referenced
// only as the booking technology. This is the official direct-booking engine URL
// and is responsive across desktop + mobile. Every "Book Now" CTA opens it in a
// new tab.
export const STAYFLEXI_HOTEL_ID = "29355";
export const bookingLink = `https://bookingengine.stayflexi.com/?hotel_id=${STAYFLEXI_HOTEL_ID}`;
// Short reassurance lines shown beside booking CTAs.
export const BOOKING_TAGLINE = "Real-time rates & availability";
export const BOOKING_SECURE = "Secure booking powered by Stayflexi";

// Rates are not published — every room shows this until prices are finalized.
export const RATE_LABEL = "Contact for Best Available Rate";

// Real photos are processed into public/images — room/gallery pages render the
// local WebP galleries.
export const PHOTOS_READY = true;

// Hero video enabled (desktop only — mobile keeps the static luxury image for a
// fast LCP). Source is a phone walkthrough (best.mp4) optimized via FFmpeg into
// hero.webm/.mp4 (~2 MB). NOTE: footage is amateur, not professional — review the
// look before promoting to production; revert to `false` to fall back to the image.
// Homepage hero shows the best Super Deluxe room photo (Room 310) on every device
// — a static, fast-loading image converts better for a room-booking site than the
// mixed promo reel. Set true only to restore the autoplay video hero.
export const VIDEO_READY = false;

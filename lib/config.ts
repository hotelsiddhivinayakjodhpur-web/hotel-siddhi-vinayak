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
  // Exact pin from the verified Google Business Profile.
  geo: { lat: 26.2849, lng: 73.0188 },
  mapsEmbed:
    "https://maps.google.com/maps?q=26.2849,73.0188(Hotel%20Siddhi%20Vinayak)&z=16&output=embed",
  priceRange: "₹₹",
  startingPrice: 1200,
  currency: "INR",
  // Live Google Business Profile rating (Jan–Jun 2026): 3.7★ from 791+ reviews.
  rating: { value: 3.7, count: 791 },
  checkIn: "12:00",
  checkOut: "11:00",
  social: {
    instagram: "https://www.instagram.com/hotel_siddhi_vinayak_jodhpur/",
    facebook: "https://facebook.com/hotelsiddhivinayak",
    // ⚠️ Owner has a YouTube channel (hotelsiddhivinayakjodhpur@gmail.com) but the
    // exact channel URL is not yet confirmed. Leave empty so no broken link ships;
    // fill in the real channel URL (e.g. https://www.youtube.com/@handle) to enable
    // the YouTube icon everywhere automatically.
    youtube: "",
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

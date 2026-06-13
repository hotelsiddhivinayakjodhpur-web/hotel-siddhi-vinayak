// Central business configuration — edit these values to match the real hotel.
export const site = {
  name: "Hotel Siddhi Vinayak",
  legalName: "Hotel Siddhi Vinayak",
  tagline: "Comfort & Hospitality in the Blue City",
  description:
    "Hotel Siddhi Vinayak is a comfortable, well-located hotel in Jodhpur, Rajasthan offering clean rooms, warm hospitality and easy access to Mehrangarh Fort and the old city.",
  url: "https://hotelsiddhivinayak.com",
  phone: "+91 98290 00000",
  phoneRaw: "919829000000",
  whatsapp: "919829000000",
  email: "stay@hotelsiddhivinayak.com",
  address: {
    street: "Near Railway Station, High Court Road",
    locality: "Jodhpur",
    region: "Rajasthan",
    postalCode: "342001",
    country: "IN",
  },
  geo: { lat: 26.2967, lng: 73.0351 },
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.0!2d73.0351!3d26.2967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sJodhpur!5e0!3m2!1sen!2sin!4v1700000000000",
  priceRange: "₹₹",
  startingPrice: 1499,
  currency: "INR",
  rating: { value: 4.6, count: 248 },
  checkIn: "12:00",
  checkOut: "11:00",
  social: {
    instagram: "https://instagram.com/hotelsiddhivinayak",
    facebook: "https://facebook.com/hotelsiddhivinayak",
  },
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
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

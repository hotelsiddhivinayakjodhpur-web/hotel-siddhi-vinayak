export type Room = {
  slug: string;
  name: string;
  price: number;          // EP plan, ₹ per night (room only)
  priceConfirmed: boolean;
  roomNumbers: number[];  // real room folders in Drive that belong to this category
  count: number;          // number of rooms of this type
  size: string;
  occupancy: string;
  bed: string;
  image: string;          // cover (temporary stock until real photos are processed)
  description: string;
  amenities: string[];
  highlight: string;      // positioning badge shown on cards
  bestFor: string;        // short "best for" line for the comparison section
};

// Room taxonomy + EP-plan tariff from the property's real inventory.
// Categories must never be mixed (see image-map.json srcDirs).
export const rooms: Room[] = [
  {
    slug: "deluxe-room",
    name: "Deluxe Room",
    price: 1200,
    priceConfirmed: true,
    roomNumbers: [202, 203, 204, 205, 207, 208, 210],
    count: 7,
    size: "220 sq ft",
    occupancy: "2 Guests",
    bed: "1 Double Bed",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80",
    description:
      "A cosy, air-conditioned room with a comfortable double bed, modern bathroom and all essentials for a restful stay in the heart of Jodhpur.",
    amenities: ["Air Conditioning", "Free Wi-Fi", "LED TV", "Hot Water", "Daily Housekeeping", "Room Service"],
    highlight: "Budget-Friendly",
    bestFor: "Solo travellers & couples on a budget",
  },
  {
    slug: "super-deluxe-room",
    name: "Super Deluxe Room",
    price: 1350,
    priceConfirmed: true,
    roomNumbers: [301, 302, 303, 304, 305, 307, 308, 309, 310],
    count: 9,
    size: "300 sq ft",
    occupancy: "2-3 Guests",
    bed: "1 King Bed",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    description:
      "A spacious, premium room with upgraded furnishings and a private sitting area — our best value for couples and business travellers.",
    amenities: ["Air Conditioning", "Free Wi-Fi", "Smart TV", "Mini Fridge", "Room Service", "Work Desk", "Hot Water"],
    highlight: "Premium Value",
    bestFor: "Couples & business travellers wanting more space",
  },
  {
    slug: "triple-deluxe-room",
    name: "Triple Deluxe Room",
    price: 1400,
    priceConfirmed: true,
    roomNumbers: [201, 206, 209],
    count: 3,
    size: "320 sq ft",
    occupancy: "3 Guests",
    bed: "3 Single Beds / 1 Double + 1 Single",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
    description:
      "A roomy, air-conditioned room comfortably sleeping three — ideal for friends and small families travelling together.",
    amenities: ["Air Conditioning", "Free Wi-Fi", "Smart TV", "Hot Water", "Room Service", "Extra Bedding"],
    highlight: "Ideal for 3 Guests",
    bestFor: "Three friends or a small family",
  },
  {
    slug: "family-four-bed-room",
    name: "Family Four Bed Room",
    price: 1800,
    priceConfirmed: true,
    roomNumbers: [306],
    count: 1,
    size: "450 sq ft",
    occupancy: "4 Guests",
    bed: "2 Double Beds",
    image:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
    description:
      "Our largest room with four-bed comfort and extra space — the perfect choice for families exploring the Blue City together.",
    amenities: ["Air Conditioning", "Free Wi-Fi", "Smart TV", "Mini Fridge", "Room Service", "Family Friendly", "Hot Water"],
    highlight: "Best for Families",
    bestFor: "Families of four needing room to spread out",
  },
];

export type GalleryImage = { src: string; alt: string; category: "Rooms" | "Property" | "Dining" };

export const galleryCategories = ["All", "Rooms", "Property", "Dining"] as const;

export const galleryImages: GalleryImage[] = [
  { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80", alt: "Hotel Siddhi Vinayak facade in Jodhpur", category: "Property" },
  { src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=80", alt: "Deluxe room interior with queen bed", category: "Rooms" },
  { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80", alt: "Super Deluxe room with king bed", category: "Rooms" },
  { src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80", alt: "Hotel lobby and reception", category: "Property" },
  { src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80", alt: "Modern en-suite bathroom", category: "Rooms" },
  { src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80", alt: "Hotel restaurant interior", category: "Dining" },
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80", alt: "Family Suite with city view", category: "Rooms" },
  { src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1000&q=80", alt: "Dining area with breakfast service", category: "Dining" },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  { q: "Where is Hotel Siddhi Vinayak located in Jodhpur?", a: "We are on MG Hospital Road, Medical Market, opposite M.G. Hospital near Jalori Gate (Rawaton Ka Bass), Jodhpur — a central location close to the railway station, bus stand and the old city." },
  { q: "What are the check-in and check-out times?", a: "Check-in is from 12:00 PM and check-out is by 11:00 AM. Early check-in and late check-out can be arranged on request, subject to availability." },
  { q: "What room types and tariffs do you offer?", a: "We offer four room categories on an EP (room-only) plan: Deluxe Room from ₹1200/night, Super Deluxe Room from ₹1350/night, Triple Deluxe Room from ₹1400/night, and Family Four Bed Room from ₹1800/night. Contact us for the best available rate on your dates." },
  { q: "How do I get the best price?", a: "Always book direct with us by Call or WhatsApp — you get our best available rate with no third-party commission or booking fees, which is usually better than online travel agency (OTA) prices." },
  { q: "Do you have a restaurant?", a: "Yes, the hotel has an in-house restaurant serving vegetarian Indian meals, plus room service to your door." },
  { q: "Do you provide free Wi-Fi and parking?", a: "Yes — complimentary high-speed Wi-Fi in all rooms and common areas, and free on-site parking for guests travelling by car." },
  { q: "How far is Mehrangarh Fort from the hotel?", a: "Mehrangarh Fort is roughly 3-4 km away, about a 10-15 minute drive. The Clock Tower and Sardar Market are even closer." },
  { q: "Do you offer airport or station pickup?", a: "Yes, we can arrange paid pickup and drop. Please share your arrival details via WhatsApp or call us in advance." },
  { q: "Is the room rate inclusive of breakfast?", a: "Our standard tariff is EP (room only). Breakfast and meal packages can be added — ask us on WhatsApp for current options." },
  { q: "How can I book a room?", a: "Book instantly via WhatsApp, call us directly, or send an enquiry from the Contact page. We usually reply within minutes." },
];

export type Attraction = {
  name: string;
  distance: string;
  image: string;
  description: string;
};

export const attractions: Attraction[] = [
  { name: "Mehrangarh Fort", distance: "5 km", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80", description: "One of India's largest forts, towering over the blue city with palaces, museums and panoramic views." },
  { name: "Jaswant Thada", distance: "5.5 km", image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?auto=format&fit=crop&w=1000&q=80", description: "A serene white-marble cenotaph and garden, often called the 'Taj Mahal of Marwar'." },
  { name: "Umaid Bhawan Palace", distance: "6 km", image: "https://images.unsplash.com/photo-1624461751453-5e1d8e0b6f4e?auto=format&fit=crop&w=1000&q=80", description: "A grand 20th-century palace, part royal residence, part luxury hotel and museum." },
  { name: "Clock Tower & Sardar Market", distance: "3 km", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80", description: "The bustling heart of the old city — spices, textiles, handicrafts and authentic street food." },
  { name: "Toorji Ka Jhalra Stepwell", distance: "3.2 km", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80", description: "A beautifully restored 18th-century stepwell surrounded by cafés and boutique shops." },
  { name: "Mandore Gardens", distance: "9 km", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80", description: "Historic gardens with cenotaphs, temples and the ancient capital of Marwar." },
];

export type Review = {
  author: string;
  rating: number; // 1–5
  date: string; // ISO yyyy-mm-dd
  text: string;
  source?: string; // e.g. "Google", "Booking.com"
};

// Paste REAL, verified Google reviews here (author/date/text/rating exactly as on
// Google). Until then this stays EMPTY — we never fabricate reviews, and the
// schema only emits individual Review objects when real ones are present. The
// site shows the real aggregate (3.7★, 791+ reviews) and links to Google instead.
export const reviews: Review[] = [];

// Live Google Business Profile signals (Jan–Jun 2026) used for social proof.
export const gbpStats = {
  ratingValue: 3.7,
  reviewCount: 791,
  interactions: 4055, // profile interactions in the period
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: string[];
};

export const posts: Post[] = [
  {
    slug: "top-things-to-do-in-jodhpur",
    title: "Top 10 Things To Do in Jodhpur",
    date: "2025-01-15",
    excerpt: "From the mighty Mehrangarh Fort to hidden stepwells and street food, here's how to make the most of the Blue City.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Jodhpur, the Blue City of Rajasthan, blends royal heritage with vibrant local life. Whether you have a weekend or a week, there is plenty to explore within minutes of Hotel Siddhi Vinayak.",
      "Start with Mehrangarh Fort, one of the most magnificent forts in India. Spend a morning exploring its palaces and museums before the afternoon heat sets in.",
      "Wander through the Clock Tower and Sardar Market for spices, textiles and authentic Marwari snacks. Don't miss the famous mirchi vada and makhaniya lassi.",
      "End your day at the restored Toorji Ka Jhalra stepwell, surrounded by charming cafés — a perfect spot to relax after a day of sightseeing.",
    ],
  },
  {
    slug: "best-time-to-visit-jodhpur",
    title: "Best Time to Visit Jodhpur",
    date: "2025-02-02",
    excerpt: "Planning your trip to the Blue City? Here's a month-by-month guide to weather, festivals and crowds.",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    content: [
      "The best time to visit Jodhpur is between October and March, when the desert climate is pleasant and ideal for sightseeing.",
      "Winter (November to February) offers cool, comfortable days perfect for exploring forts and markets. This is peak tourist season, so book your stay early.",
      "If you enjoy festivals, time your visit with the Marwar Festival or Rajasthan International Folk Festival, usually held around October.",
      "Summers (April to June) are hot, but you'll find fewer crowds and better room rates. Whenever you visit, Hotel Siddhi Vinayak offers a comfortable, air-conditioned retreat.",
    ],
  },
  {
    slug: "how-to-reach-hotel-siddhi-vinayak",
    title: "How to Reach Hotel Siddhi Vinayak",
    date: "2025-03-10",
    excerpt: "Arriving by train, bus, or flight? Here's the easiest way to reach our hotel in the heart of Jodhpur.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    content: [
      "Hotel Siddhi Vinayak is conveniently located near Jodhpur Railway Station, making it easy to reach by any mode of transport.",
      "By Train: We are just a short ride from the railway station. Auto-rickshaws and taxis are readily available outside.",
      "By Air: Jodhpur Airport is about 5 km away, roughly a 20-minute drive. We can arrange a pickup on request.",
      "By Road: Jodhpur is well connected by state and private buses. The central bus stand is close by. Share your arrival details with us on WhatsApp and we'll guide you in.",
    ],
  },
];

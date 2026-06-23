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
    roomNumbers: [202, 204, 205, 207, 208, 210],
    count: 6,
    size: "220 sq ft",
    occupancy: "2 Guests",
    bed: "1 Double Bed",
    image: "/images/rooms/deluxe-room/deluxe-room-jodhpur-01.webp",
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
    bed: "1 King Bed", // VERIFY: king bed + sitting area (per description)
    image: "/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-01.webp",
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
    roomNumbers: [201, 203, 206, 209],
    count: 4,
    size: "320 sq ft",
    occupancy: "3 Guests",
    bed: "1 Double Bed + 1 Single Bed", // VERIFY: matches the room photos (double + single)
    image: "/images/rooms/triple-deluxe-room/triple-deluxe-room-jodhpur-01.webp",
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
    bed: "2 Double Beds", // VERIFY: 4-bed sleeping arrangement (2 doubles vs 4 singles)
    image: "/images/rooms/family-four-bed-room/family-four-bed-room-jodhpur-01.webp",
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
  { src: "/images/gallery/property/hotel-01.webp", alt: "Hotel Siddhi Vinayak exterior in Jodhpur", category: "Property" },
  { src: "/images/rooms/deluxe-room/deluxe-room-jodhpur-01.webp", alt: "Deluxe Room at Hotel Siddhi Vinayak", category: "Rooms" },
  { src: "/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-01.webp", alt: "Super Deluxe Room with king bed", category: "Rooms" },
  { src: "/images/gallery/dining/restaurant-01.webp", alt: "In-house restaurant at Hotel Siddhi Vinayak", category: "Dining" },
  { src: "/images/rooms/triple-deluxe-room/triple-deluxe-room-jodhpur-01.webp", alt: "Triple Deluxe Room sleeping three", category: "Rooms" },
  { src: "/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-03.webp", alt: "Super Deluxe Room", category: "Rooms" },
  { src: "/images/rooms/family-four-bed-room/family-four-bed-room-jodhpur-01.webp", alt: "Family Four Bed Room", category: "Rooms" },
  { src: "/images/rooms/deluxe-room/deluxe-room-jodhpur-02.webp", alt: "Deluxe Room interior", category: "Rooms" },
  { src: "/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-03.webp", alt: "Super Deluxe Room view", category: "Rooms" },
  { src: "/images/gallery/dining/restaurant-02.webp", alt: "Restaurant dining area, Hotel Siddhi Vinayak", category: "Dining" },
  { src: "/images/rooms/triple-deluxe-room/triple-deluxe-room-jodhpur-02.webp", alt: "Triple Deluxe Room interior", category: "Rooms" },
  { src: "/images/rooms/triple-deluxe-room/triple-deluxe-room-jodhpur-02.webp", alt: "Triple Deluxe Room", category: "Rooms" },
  { src: "/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-05.webp", alt: "Super Deluxe Room with TV", category: "Rooms" },
  { src: "/images/rooms/deluxe-room/deluxe-room-jodhpur-04.webp", alt: "Deluxe Room bathroom", category: "Rooms" },
  { src: "/images/rooms/family-four-bed-room/family-four-bed-room-jodhpur-02.webp", alt: "Family Four Bed Room beds", category: "Rooms" },
  { src: "/images/rooms/deluxe-room/deluxe-room-jodhpur-06.webp", alt: "Deluxe Room detail", category: "Rooms" },
];

export type Faq = { q: string; a: string; category: string };

export const faqs: Faq[] = [
  // ── Booking & Check-in ──
  { category: "Booking & Check-in", q: "What are the check-in and check-out timings?", a: "Check-in is from 12:00 PM (noon) and check-out is by 11:00 AM. Our front desk is staffed 24 hours, so arrivals at any hour are no problem." },
  { category: "Booking & Check-in", q: "Is early check-in available?", a: "Yes, early check-in can be arranged subject to room availability on the day. Message us on WhatsApp with your arrival time and we'll do our best to have your room ready." },
  { category: "Booking & Check-in", q: "Is late check-out available?", a: "Yes, late check-out is offered on request, subject to availability. Let the front desk know the evening before and we'll try to accommodate you." },
  { category: "Booking & Check-in", q: "Do you accept walk-in bookings?", a: "Yes, walk-in guests are welcome subject to availability. During peak season (Oct–Mar) we recommend calling or messaging ahead on WhatsApp to confirm a room." },
  { category: "Booking & Check-in", q: "How do I get the best price?", a: "Always book direct with us by Call or WhatsApp — you get our best available rate with no third-party commission or booking fees, usually better than online travel agency (OTA) prices." },
  { category: "Booking & Check-in", q: "Are room rates updated live?", a: "Yes. Rates and inventory are synchronized through Stayflexi Channel Manager across direct bookings and online travel agencies, so the availability and price you see when booking direct are always current." },
  { category: "Booking & Check-in", q: "Will I receive instant confirmation?", a: "Yes. All confirmed bookings receive instant confirmation. Booking direct on our website uses the Stayflexi booking engine with secure online payment and a real-time confirmation." },

  // ── Location ──
  { category: "Location", q: "How far is Hotel Siddhi Vinayak from Jodhpur Railway Station?", a: "About 350 metres — a 5-minute walk or a 2-minute auto-rickshaw ride from Jodhpur Junction. It's one of the most convenient hotels for train travellers." },
  { category: "Location", q: "How far is the hotel from Jodhpur Airport?", a: "Jodhpur Airport (JDH) is about 5 km away, roughly a 20-minute drive. We can arrange an airport pickup on request." },
  { category: "Location", q: "What tourist attractions are nearby?", a: "Mehrangarh Fort (≈ 4 km), Jaswant Thada (≈ 4.5 km), Umaid Bhawan Palace (≈ 6 km), the Clock Tower & Sardar Market (≈ 3 km) and the Toorji Ka Jhalra stepwell are all close by. Our travel desk can plan your sightseeing." },
  { category: "Location", q: "Where exactly is the hotel located?", a: "On MG Hospital Road, Medical Market, opposite M.G. Hospital near Jalori Gate (Rawaton Ka Bass), Jodhpur — central, near the railway station, bus stand and old city." },

  // ── Rooms ──
  { category: "Rooms", q: "Which room category is best for families?", a: "The Family Four Bed Room is ideal for families, with space and four-bed comfort. For three guests, the Triple Deluxe Room (one double + one single bed) is a great fit." },
  { category: "Rooms", q: "Do all rooms have air conditioning?", a: "Yes, every room is air-conditioned, with free Wi-Fi, an LED/Smart TV and a clean private bathroom." },
  { category: "Rooms", q: "Is hot water available 24 hours?", a: "Yes, hot water is available round the clock in all rooms." },
  { category: "Rooms", q: "Is daily housekeeping included?", a: "Yes, daily housekeeping is included with every stay, and fresh linens and towels are provided." },
  { category: "Rooms", q: "What room types and tariffs do you offer?", a: "Four room categories on an EP (room-only) plan: Deluxe from ₹1200/night, Super Deluxe from ₹1350/night, Triple Deluxe from ₹1400/night, and Family Four Bed from ₹1800/night. Contact us for the best available rate on your dates." },

  // ── Parking & Transport ──
  { category: "Parking & Transport", q: "Is free parking available?", a: "Yes, free on-site parking is available for guests travelling by car, and we also have an EV charging point." },
  { category: "Parking & Transport", q: "Can you arrange local sightseeing or taxi services?", a: "Yes — our travel desk can arrange taxis, day trips and guided sightseeing to Mehrangarh, the Bishnoi villages, Osian and more. Just ask at the front desk or on WhatsApp." },
  { category: "Parking & Transport", q: "Do you offer airport or station pickup?", a: "Yes, we can arrange paid pickup and drop for the airport or railway station. Please share your arrival details via WhatsApp or call us in advance." },

  // ── Food ──
  { category: "Food", q: "Does the hotel have a restaurant?", a: "Yes, the hotel has an in-house restaurant serving freshly prepared vegetarian Indian meals, including local Marwari favourites." },
  { category: "Food", q: "Is breakfast available?", a: "Yes. Our standard tariff is room-only (EP), and breakfast or meal packages can be added — ask us on WhatsApp for current options." },
  { category: "Food", q: "Can food be served to the room?", a: "Yes, room service brings meals and refreshments to your door through the day." },

  // ── Policies ──
  { category: "Policies", q: "Are unmarried couples allowed?", a: "Yes, couples are welcome. As per standard policy, all guests must present a valid government-issued photo ID (Aadhaar, passport, driving licence, voter ID, etc.) at check-in." },
  { category: "Policies", q: "Are pets allowed?", a: "We are unable to accommodate pets at this time, so that we can maintain a comfortable, allergy-free environment for all guests." },
  { category: "Policies", q: "What payment methods are accepted?", a: "We accept cash, UPI (Google Pay, PhonePe, Paytm) and major debit/credit cards. You can also pay by UPI on WhatsApp in advance to confirm your booking." },
];

// Attraction data now lives in lib/attractions.ts with REAL, credited photos
// (Wikimedia Commons / our own Instagram) and full detail-page content. The old
// array here used stock Unsplash images and has been removed.

export type Review = {
  author: string;
  rating: number; // 1–5
  date: string; // ISO yyyy-mm-dd
  text: string;
  source?: string; // e.g. "Google", "Booking.com"
};

// REAL verified Google reviews (pulled from the connected Google Business Profile).
// Selected genuine positive reviews; the honest 3.7/790+ aggregate and a "read all
// on Google" link are shown alongside. Not fabricated.
export const reviews: Review[] = [
  {
    author: "Jyoti Prakash", rating: 5, date: "2025-11-03", source: "Google",
    text: "A delightful experience from start to finish. The staff were incredibly cooperative and attentive — their hospitality truly made me feel at home. The room was spacious, clean and well-maintained, and the prime location made it easy to reach Mehrangarh Fort and the markets. The food was a highlight too. Highly recommend.",
  },
  {
    author: "lokesh singh Panwar", rating: 5, date: "2026-06-05", source: "Google",
    text: "Very cordial staff and service quality is very good. I am a regular customer and would advise you to stay here and enjoy the hospitality.",
  },
  {
    author: "Deepak Sharma", rating: 5, date: "2026-05-23", source: "Google",
    text: "The room is nice and clean. Next time I come to Jodhpur, I will book directly at Siddhi Vinayak only.",
  },
  {
    author: "Meena Saini", rating: 5, date: "2026-05-11", source: "Google",
    text: "The hotel is very nice and the rooms are very clean. The room service is excellent, the food tastes good and the staff is very friendly.",
  },
  {
    author: "Rahul Sharma", rating: 5, date: "2026-05-19", source: "Google",
    text: "Very good experience. Clean room and good breakfast.",
  },
  {
    author: "Prajwal Shrivastava", rating: 5, date: "2026-05-07", source: "Google",
    text: "Food quality and staff behaviour are also very good.",
  },
];

// Live Google Business Profile signals (Jan–Jun 2026) used for social proof.
export const gbpStats = {
  ratingValue: 3.7,
  reviewCount: 791,
  interactions: 4055, // profile interactions in the period
};

// Blog posts now live in lib/blog.ts as rich, long-form posts with REAL Jodhpur
// images, FAQs, related attractions and full SEO metadata. The old 3-post array
// here used stock Unsplash images (incl. a Jaipur Hawa Mahal shot and a resort
// pool) and has been removed.

// Jodhpur attractions — real, verified info. Photos are real (Wikimedia Commons,
// CC-licensed, credited) or our own Instagram content. No stock, no AI.
export type AttractionImg = { src: string; credit?: string; sourceUrl?: string };
export type Attraction = {
  slug: string;
  name: string;
  tagline: string;
  distance: string; // from the hotel
  lat: number;
  lng: number;
  hours: string;
  bestTime: string;
  gallery: AttractionImg[];
  history: string;
  whyVisit: string;
  tips: string[];
  nearby: string[]; // slugs
  reelUrl?: string; // our Instagram reel, if any
};

const ig = (name: string) => ({ src: `/images/instagram/attractions/${name}.webp`, credit: "© Hotel Siddhi Vinayak (Instagram)" });
const wiki = (slug: string, credit = "Wikimedia Commons (CC BY-SA)") => ({ src: `/images/attractions/${slug}.webp`, credit, sourceUrl: "https://commons.wikimedia.org" });

export const attractionsData: Attraction[] = [
  {
    slug: "mehrangarh-fort", name: "Mehrangarh Fort", tagline: "Jodhpur's mighty hilltop fort",
    distance: "≈ 4 km · 15 min drive", lat: 26.2978, lng: 73.0183, hours: "9:00 AM – 5:00 PM (daily)", bestTime: "October–March, early morning",
    gallery: [wiki("mehrangarh-fort")],
    history: "Founded in 1459 by Rao Jodha, Mehrangarh is one of India's largest forts, rising 120 m above the Blue City on a sheer rock. Its palaces, courtyards and museum trace over five centuries of Marwar's royal history.",
    whyVisit: "Sweeping views over the indigo old city, intricately carved palaces (Moti Mahal, Phool Mahal), a superb museum of arms, paintings and palanquins, and the Flying Fox zipline circuit.",
    tips: ["Buy tickets online to skip queues", "Take the lift up, walk down through the ramparts", "Sunset from the ramparts is unforgettable"],
    nearby: ["chamunda-mata-temple", "jaswant-thada", "flying-fox", "blue-city-heritage-walk"],
  },
  {
    slug: "jaswant-thada", name: "Jaswant Thada", tagline: "The 'Taj Mahal of Marwar'",
    distance: "≈ 4.5 km · 15 min drive", lat: 26.3000, lng: 73.0247, hours: "9:00 AM – 5:00 PM (daily)", bestTime: "Morning, October–March",
    gallery: [wiki("jaswant-thada")],
    history: "Built in 1899 in memory of Maharaja Jaswant Singh II, this serene cenotaph is carved from intricately sheeted white marble that glows amber in the sun, set beside a tranquil garden and lake.",
    whyVisit: "A peaceful, photogenic marble memorial with royal portraits and lovely fort views — a calm contrast to the bustling old city.",
    tips: ["Combine with Mehrangarh (next door)", "Visit early for soft light on the marble", "Modest dress appreciated"],
    nearby: ["mehrangarh-fort", "chamunda-mata-temple", "blue-city-heritage-walk"],
  },
  {
    slug: "umaid-bhawan-palace", name: "Umaid Bhawan Palace", tagline: "A living royal palace & museum",
    distance: "≈ 6 km · 20 min drive", lat: 26.2818, lng: 73.0470, hours: "Museum 9:00 AM – 5:00 PM", bestTime: "October–March",
    gallery: [wiki("umaid-bhawan-palace"), ig("umaid-bhawan")],
    history: "One of the world's largest private residences, completed in 1943 for Maharaja Umaid Singh. Today it is part royal home, part luxury hotel and part museum showcasing Art-Deco grandeur.",
    whyVisit: "Magnificent golden-sandstone architecture, vintage cars, clocks and royal memorabilia in the museum, and beautiful gardens.",
    tips: ["Only the museum is open to non-guests", "Allow an hour for the museum", "Great for architecture lovers"],
    nearby: ["mehrangarh-fort", "clock-tower-sardar-market"],
    reelUrl: "https://www.instagram.com/reel/C8gTATYSRQv/",
  },
  {
    slug: "rao-jodha-desert-rock-park", name: "Rao Jodha Desert Rock Park", tagline: "Restored desert ecology below the fort",
    distance: "≈ 4 km · 15 min drive", lat: 26.2960, lng: 73.0220, hours: "7:00 AM – 6:00 PM (daily)", bestTime: "Cool mornings, post-monsoon",
    gallery: [wiki("rao-jodha-desert-rock-park")],
    history: "Opened in 2011, this 70-hectare park restores the natural desert and rock ecology around Mehrangarh, with native Thar plants and walking trails through volcanic rock.",
    whyVisit: "Easy nature trails, birdlife and dramatic close-up views of the fort walls — a green, quiet escape.",
    tips: ["Carry water and a hat", "Guided walks available at the visitor centre", "Best right after the monsoon when it's green"],
    nearby: ["mehrangarh-fort", "jaswant-thada"],
  },
  {
    slug: "toorji-ka-jhalra", name: "Toorji Ka Jhalra Stepwell", tagline: "A restored 18th-century stepwell",
    distance: "≈ 3 km · 12 min drive", lat: 26.2929, lng: 73.0240, hours: "Open access (daylight)", bestTime: "Morning or late afternoon",
    gallery: [wiki("toorji-ka-jhalra", "Wikimedia Commons / CC BY-SA")],
    history: "Built around 1740 by the queen consort of Maharaja Abhaya Singh, this stepwell of carved rose-red sandstone was beautifully restored and is now ringed by cafés and boutiques.",
    whyVisit: "A striking, Instagrammable geometric stepwell in the heart of the old city — great for photos and a coffee nearby.",
    tips: ["Go early to beat crowds", "Pair with the Clock Tower market", "Cafés around it are great for a break"],
    nearby: ["clock-tower-sardar-market", "blue-city-heritage-walk", "mehrangarh-fort"],
  },
  {
    slug: "clock-tower-sardar-market", name: "Clock Tower & Sardar Market", tagline: "The beating heart of the old city",
    distance: "≈ 3 km · 12 min drive", lat: 26.2926, lng: 73.0241, hours: "Market ≈ 9:00 AM – 9:00 PM", bestTime: "Late afternoon to evening",
    gallery: [wiki("clock-tower-sardar-market", "Wikimedia Commons / CC BY-SA")],
    history: "The Ghanta Ghar (Clock Tower) was built by Maharaja Sardar Singh in the late 19th century and stands at the centre of Sardar Market, a vibrant bazaar of spices, textiles and handicrafts.",
    whyVisit: "Authentic Jodhpur street life — spices, bandhej textiles, lac bangles, and famous street food like mirchi vada and makhaniya lassi.",
    tips: ["Try the makhaniya lassi nearby", "Bargain politely", "Evenings are liveliest"],
    nearby: ["toorji-ka-jhalra", "blue-city-heritage-walk", "mehrangarh-fort"],
  },
  {
    slug: "mandore-gardens", name: "Mandore Gardens", tagline: "Ancient capital, cenotaphs & gardens",
    distance: "≈ 9 km · 25 min drive", lat: 26.3389, lng: 73.0386, hours: "8:00 AM – 8:00 PM (daily)", bestTime: "Morning, winter",
    gallery: [wiki("mandore-gardens"), ig("mandore")],
    history: "Mandore was the capital of Marwar before Jodhpur. Its gardens hold towering, temple-like cenotaphs (devals) of Jodhpur's rulers, the Hall of Heroes and old temples.",
    whyVisit: "Atmospheric royal cenotaphs, shady gardens and resident langurs — history and greenery in one spot.",
    tips: ["Combine with Mandore Cenotaphs", "Watch your belongings around the monkeys", "Cooler in the morning"],
    nearby: ["mandore-cenotaphs", "machiya-safari-park"],
    reelUrl: "https://www.instagram.com/reel/C8WOUbztb_E/",
  },
  {
    slug: "mandore-cenotaphs", name: "Mandore Cenotaphs", tagline: "Temple-like royal memorials",
    distance: "≈ 9 km · 25 min drive", lat: 26.3392, lng: 73.0388, hours: "8:00 AM – 8:00 PM (daily)", bestTime: "Morning, winter",
    gallery: [wiki("mandore-gardens")],
    history: "Unlike typical domed chhatris, the cenotaphs of Mandore are built like full temples in red sandstone, dedicated to Marwar's kings — a unique architectural style.",
    whyVisit: "Beautifully carved, towering devals set in the Mandore gardens — a photographer's favourite.",
    tips: ["Part of Mandore Gardens", "Great light in the early morning", "Combine with the Hall of Heroes"],
    nearby: ["mandore-gardens", "machiya-safari-park"],
  },
  {
    slug: "kaylana-lake", name: "Kaylana Lake", tagline: "Sunset lake on the city's edge",
    distance: "≈ 11 km · 25 min drive", lat: 26.2766, lng: 72.9520, hours: "Daylight hours", bestTime: "Sunset; monsoon & winter",
    gallery: [wiki("kaylana-lake"), ig("kaylana-lake")],
    history: "An artificial lake built in 1872 by Pratap Singh, spread over around 84 sq km, fed by the Indira Gandhi Canal and surrounded by rocky hills.",
    whyVisit: "Serene sunsets, boating and migratory birds in winter — a refreshing break from the city.",
    tips: ["Go for sunset", "Boating is available", "Lovely after the monsoon"],
    nearby: ["machiya-safari-park", "rao-jodha-desert-rock-park"],
    reelUrl: "https://www.instagram.com/reel/C89curJSCza/",
  },
  {
    slug: "machiya-safari-park", name: "Machiya Safari Park", tagline: "Wildlife on the Jaisalmer road",
    distance: "≈ 9 km · 20 min drive", lat: 26.2900, lng: 72.9650, hours: "9:00 AM – 5:30 PM (Tue–Sun)", bestTime: "Morning; winter",
    gallery: [wiki("machiya-safari-park")],
    history: "A biological park beside Kaylana Lake, home to deer, desert fox, monkeys, nilgai, wild boar and a variety of birds, with a sunset viewpoint.",
    whyVisit: "An easy half-day nature outing with native Thar wildlife and great sunset views.",
    tips: ["Closed on Mondays", "Mornings are best for sightings", "Combine with Kaylana Lake"],
    nearby: ["kaylana-lake", "rao-jodha-desert-rock-park"],
  },
  {
    slug: "chamunda-mata-temple", name: "Chamunda Mata Temple", tagline: "Revered temple atop Mehrangarh",
    distance: "≈ 4 km · 15 min drive", lat: 26.2968, lng: 73.0170, hours: "6:00 AM – 8:00 PM (approx)", bestTime: "Morning; during Dussehra",
    gallery: [wiki("chamunda-mata-temple", "Wikimedia Commons / CC BY-SA")],
    history: "Installed by Rao Jodha in 1460 at the southern end of Mehrangarh, Chamunda Mata is the favoured goddess of the Jodhpur royal family and the city's people.",
    whyVisit: "A deeply revered temple with panoramic city views; especially vibrant during Dussehra celebrations.",
    tips: ["Reached via Mehrangarh", "Remove footwear before entering", "Mornings are calmer"],
    nearby: ["mehrangarh-fort", "jaswant-thada"],
  },
  {
    slug: "bishnoi-village", name: "Bishnoi Village Safari", tagline: "Rural life & wildlife of the Bishnoi",
    distance: "≈ 20 km · 40 min drive", lat: 26.1800, lng: 73.0500, hours: "Tours by arrangement", bestTime: "October–March, mornings",
    gallery: [wiki("bishnoi-village", "Wikimedia Commons / CC BY-SA")],
    history: "The Bishnoi are a community famed for centuries of environmental protection. A village safari visits their hamlets, traditional crafts, opium-tea ceremony and blackbuck-rich countryside.",
    whyVisit: "An authentic glimpse of rural Rajasthan, handicrafts (block printing, pottery, weaving) and wildlife like blackbuck and chinkara.",
    tips: ["Book a guided jeep safari (we can arrange)", "Carry cash for crafts", "Respect local customs and photography norms"],
    nearby: ["osian", "kaylana-lake"],
  },
  {
    slug: "osian", name: "Osian Desert & Temples", tagline: "Ancient temples on the Thar's edge",
    distance: "≈ 65 km · 1.5 hr drive", lat: 26.7167, lng: 72.9120, hours: "Temples ≈ 6:00 AM – 7:00 PM", bestTime: "October–March",
    gallery: [wiki("osian", "Wikimedia Commons / CC BY-SA")],
    history: "An ancient town with beautifully carved 8th–11th century Hindu and Jain temples (Sachiya Mata, Mahavira), and a gateway to Thar desert camps and camel safaris.",
    whyVisit: "Exquisite medieval temple architecture plus desert dunes, camel rides and overnight camps.",
    tips: ["A full-day trip from Jodhpur", "Combine temples with a dune sunset", "Start early to beat the heat"],
    nearby: ["bishnoi-village"],
  },
  {
    slug: "flying-fox", name: "Flying Fox Jodhpur", tagline: "Ziplining over Mehrangarh",
    distance: "≈ 4 km · 15 min drive", lat: 26.2989, lng: 73.0185, hours: "Sessions through the day", bestTime: "October–March; book ahead",
    gallery: [wiki("mehrangarh-fort", "Wikimedia Commons (CC BY-SA) — Mehrangarh, the zipline location")],
    history: "A circuit of zipline runs set around the Mehrangarh fort walls and lakes, run as an adventure activity over the historic ramparts.",
    whyVisit: "A thrilling bird's-eye view of the fort, lakes and Blue City — adventure with a heritage backdrop.",
    tips: ["Book in advance, especially in peak season", "Wear closed shoes", "Combine with a Mehrangarh visit"],
    nearby: ["mehrangarh-fort", "rao-jodha-desert-rock-park"],
  },
  {
    slug: "blue-city-heritage-walk", name: "Blue City Heritage Walk", tagline: "The famous indigo lanes of Jodhpur",
    distance: "≈ 3 km · 12 min drive", lat: 26.2934, lng: 73.0205, hours: "Best by daylight", bestTime: "Early morning; winter",
    gallery: [ig("blue-city")],
    history: "The old city's tightly packed houses are painted in shades of indigo blue — once linked to Brahmin homes — giving Jodhpur its nickname, the 'Blue City'.",
    whyVisit: "Wander narrow blue lanes below the fort, meet artisans, and capture Jodhpur's most iconic photographs.",
    tips: ["Go early for empty lanes and soft light", "Hire a local guide for the hidden corners", "Wear comfortable shoes"],
    nearby: ["toorji-ka-jhalra", "clock-tower-sardar-market", "mehrangarh-fort"],
    reelUrl: "https://www.instagram.com/reel/DK863Mvzq-1/",
  },
];

export const getAttraction = (slug: string) => attractionsData.find((a) => a.slug === slug);

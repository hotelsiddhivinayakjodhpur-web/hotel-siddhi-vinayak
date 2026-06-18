// Jodhpur travel blog — long-form, SEO-focused posts for Hotel Siddhi Vinayak.
// Every image is a REAL Jodhpur photo (self-hosted WebP): Wikimedia Commons
// (CC BY-SA, credited) or our own Instagram. No stock, no Jaipur, no AI.

export type BlogImage = { src: string; alt: string; credit?: string };
export type BlogSection = { id: string; heading: string; body: string[]; image?: BlogImage; list?: string[] };
export type BlogFAQ = { q: string; a: string };
export type BlogPost = {
  slug: string;
  title: string;          // H1
  metaTitle: string;      // <title>
  metaDescription: string;
  excerpt: string;
  date: string;           // published
  updated?: string;
  category: string;
  hero: BlogImage;
  intro: string[];        // lead paragraphs (before the table of contents)
  sections: BlogSection[];
  faqs: BlogFAQ[];
  relatedAttractions: string[]; // slugs from lib/attractions.ts
  tags: string[];
};

export const blogAuthor = {
  name: "The Hotel Siddhi Vinayak Team",
  role: "Local Jodhpur hosts",
  bio: "We've welcomed guests to the Blue City for years. Everything here is written by our front-desk and travel-desk team from first-hand local knowledge — the timings, the shortcuts and the spots we send our own guests to.",
};

// Image helpers — all point to real, self-hosted Jodhpur photos.
const A = (slug: string, alt: string): BlogImage => ({ src: `/images/attractions/${slug}.webp`, alt, credit: "Wikimedia Commons (CC BY-SA)" });
const IG = (name: string, alt: string): BlogImage => ({ src: `/images/instagram/attractions/${name}.webp`, alt, credit: "© Hotel Siddhi Vinayak (Instagram)" });
const B = (slug: string, alt: string): BlogImage => ({ src: `/images/blog/${slug}.webp`, alt, credit: "Wikimedia Commons (CC BY-SA)" });
const HOTEL: BlogImage = { src: "/hero/hotel-siddhi-vinayak-exterior-jodhpur.webp", alt: "Hotel Siddhi Vinayak exterior, Jodhpur", credit: "© Hotel Siddhi Vinayak" };
const DINING: BlogImage = { src: "/images/gallery/dining/restaurant-01.webp", alt: "Dining at Hotel Siddhi Vinayak, Jodhpur", credit: "© Hotel Siddhi Vinayak" };

// ===== Helpers =====
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export function postWordCount(p: BlogPost): number {
  const text = [...p.intro, ...p.sections.flatMap((s) => [s.heading, ...s.body, ...(s.list || [])]), ...p.faqs.flatMap((f) => [f.q, f.a])].join(" ");
  return text.trim().split(/\s+/).length;
}

export const readingTime = (p: BlogPost): number => Math.max(1, Math.round(postWordCount(p) / 220));

export function getAdjacentPosts(slug: string): { prev?: BlogPost; next?: BlogPost } {
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return { prev: posts[i - 1], next: posts[i + 1] };
}

export function getRelatedPosts(post: BlogPost, n = 3): BlogPost[] {
  const scored = posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      let score = p.category === post.category ? 2 : 0;
      score += p.tags.filter((t) => post.tags.includes(t)).length;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, n).map((s) => s.p);
}

// ===== Posts (display order; newest/most-important first) =====
export const posts: BlogPost[] = [
  {
    slug: "complete-jodhpur-travel-guide",
    title: "The Complete Jodhpur Travel Guide (2026)",
    metaTitle: "Complete Jodhpur Travel Guide 2026 — Things to Do, Stay & Tips",
    metaDescription: "The complete Jodhpur travel guide: how to reach, when to visit, the best forts, palaces, markets and food, plus where to stay. Written by local Blue City hosts.",
    excerpt: "Everything you need to plan a perfect trip to the Blue City — how to get there, when to go, what to see, what to eat and where to stay.",
    date: "2026-06-15",
    category: "Travel Guides",
    hero: B("jodhpur-blue-city", "Aerial view of the blue houses of old Jodhpur below Mehrangarh Fort"),
    intro: [
      "Jodhpur — the Blue City, the gateway to the Thar Desert and the second-largest city in Rajasthan — is one of India's most rewarding destinations. A mighty fort on a cliff, a sea of indigo houses, royal cenotaphs, lively bazaars and some of the best street food in Rajasthan all sit within a few kilometres of each other.",
      "This complete guide pulls together everything we tell our own guests at Hotel Siddhi Vinayak: how to reach Jodhpur, the best time to visit, how many days you need, the landmarks worth your time, what to eat, what to buy, and how to base yourself in the heart of the city. Use the table of contents to jump to what you need.",
    ],
    sections: [
      {
        id: "why-jodhpur", heading: "Why visit Jodhpur",
        body: [
          "Jodhpur earns its 'Blue City' nickname from the indigo-washed houses clustered below Mehrangarh Fort — a view that has become one of the most photographed scenes in India. But the city is far more than a single photograph. Founded in 1459 by Rao Jodha, it was the capital of the kingdom of Marwar and remains a living centre of Rajasthani culture, craft and cuisine.",
          "What makes Jodhpur special is how compact and authentic it feels. The fort, the old city markets, the stepwells and the cenotaphs are all close together, and ordinary life still plays out in the blue lanes. It is grand enough to fill a long weekend yet relaxed enough to enjoy slowly.",
        ],
        image: A("mehrangarh-fort", "Mehrangarh Fort towering over the Blue City of Jodhpur"),
      },
      {
        id: "how-to-reach", heading: "How to reach Jodhpur",
        body: [
          "Jodhpur is well connected by air, rail and road. Jodhpur Airport (JDH) has direct flights from Delhi, Mumbai and other major cities and is about 5 km from the city centre. Jodhpur Junction is a major railway station with trains from Delhi, Jaipur, Ahmedabad and beyond — and it sits just about 350 metres from Hotel Siddhi Vinayak, so arriving by train could not be easier.",
          "By road, smooth highways connect Jodhpur to Jaipur (about 5–6 hours), Udaipur (about 4–5 hours) and Jaisalmer (about 5 hours), making it a natural stop on any Rajasthan itinerary. Once you are in the city, autos and taxis are inexpensive and easy to find.",
        ],
        list: [
          "By air: Jodhpur Airport (JDH), ~5 km / 20 minutes from the city",
          "By train: Jodhpur Junction, ~350 m from Hotel Siddhi Vinayak",
          "By road: Jaipur ~5–6 hrs, Udaipur ~4–5 hrs, Jaisalmer ~5 hrs",
        ],
      },
      {
        id: "best-time", heading: "Best time to visit",
        body: [
          "The best time to visit Jodhpur is October to March, when desert days are warm and pleasant and evenings are cool. This is peak season, so book accommodation early, especially around Diwali and the winter holidays.",
          "July to September brings the monsoon, when the surrounding hills turn green and the lakes fill — a beautiful and underrated time to visit. April to June is hot, but rooms are cheaper and the major sights are far less crowded. Whenever you come, an air-conditioned base makes the trip comfortable.",
        ],
      },
      {
        id: "top-sights", heading: "The landmarks worth your time",
        body: [
          "Start with Mehrangarh Fort, one of the largest and best-preserved forts in India, about 4 km from the hotel. Beside it, the white-marble Jaswant Thada cenotaph is a serene 10-minute walk. Down in the old city, the restored Toorji Ka Jhalra stepwell and the bustling Clock Tower & Sardar Market capture everyday Jodhpur. A little further out, Umaid Bhawan Palace, Mandore Gardens and Kaylana Lake round out the classic sights.",
          "If you have more time, add the Rao Jodha Desert Rock Park below the fort, a Bishnoi village safari for rural Rajasthan, and a day trip to the ancient temples of Osian on the desert's edge.",
        ],
        image: A("toorji-ka-jhalra", "The restored Toorji Ka Jhalra stepwell in old Jodhpur"),
      },
      {
        id: "food", heading: "What to eat",
        body: [
          "Jodhpur is a food destination in its own right. Try the fiery mirchi vada and pyaaz kachori for breakfast, makhaniya lassi (saffron-spiced and topped with cream) at the Clock Tower, and a thali of dal baati churma for a proper Marwari meal. The city is also famous for its sweets, especially mawa kachori.",
          "Most of the best-known stalls cluster around Sardar Market and the Clock Tower, all within a short ride of the hotel. After a day of street food, a calm sit-down dinner back at your hotel is a welcome end to the day.",
        ],
      },
      {
        id: "where-to-stay", heading: "Where to stay in Jodhpur",
        body: [
          "Staying in the heart of the city saves you time and taxi fares — you are minutes from the railway station, the old city and the fort. Hotel Siddhi Vinayak sits opposite M.G. Hospital near Jalori Gate, about 350 m from Jodhpur Junction, with clean air-conditioned rooms, free Wi-Fi, free parking, a sun terrace, a travel desk and a 24-hour front desk.",
          "We can arrange airport and station pickups, local sightseeing and day trips to Osian or the Bishnoi villages — just message us ahead of your stay and we'll have everything ready when you arrive.",
        ],
        image: HOTEL,
      },
    ],
    faqs: [
      { q: "How many days do you need in Jodhpur?", a: "Two days covers the highlights (fort, old city, palace and a lake). Three days lets you add Mandore, Kaylana Lake and a Bishnoi or Osian day trip at a relaxed pace." },
      { q: "Is Jodhpur safe for tourists?", a: "Yes. Jodhpur is a popular, well-visited city and generally very safe, including for families and solo travellers. Use normal precautions in crowded markets and agree auto fares in advance." },
      { q: "How far is Hotel Siddhi Vinayak from the railway station?", a: "About 350 metres — roughly a 5-minute walk or a 2-minute auto ride from Jodhpur Junction." },
      { q: "What is Jodhpur famous for?", a: "Mehrangarh Fort, the blue houses of the old city, Marwari food like mirchi vada and makhaniya lassi, and as a gateway to the Thar Desert." },
    ],
    relatedAttractions: ["mehrangarh-fort", "jaswant-thada", "toorji-ka-jhalra", "umaid-bhawan-palace"],
    tags: ["travel guide", "planning", "overview", "first time"],
  },
  {
    slug: "2-day-jodhpur-itinerary",
    title: "The Perfect 2-Day Jodhpur Itinerary",
    metaTitle: "2-Day Jodhpur Itinerary — See the Best of the Blue City",
    metaDescription: "A practical 2-day Jodhpur itinerary covering Mehrangarh Fort, Jaswant Thada, the Clock Tower market, Toorji stepwell and Umaid Bhawan, with timings and tips from local hosts.",
    excerpt: "Only have a weekend? This tight, tried-and-tested 2-day plan covers the fort, the old city, a palace and a lake without rushing.",
    date: "2026-06-12",
    category: "Itineraries",
    hero: A("mehrangarh-fort", "Mehrangarh Fort at the start of a 2-day Jodhpur itinerary"),
    intro: [
      "Two days is enough to see the very best of Jodhpur if you plan well. This itinerary is the one we hand to guests at Hotel Siddhi Vinayak who arrive on the morning train and leave two evenings later. It balances the big landmarks with the small pleasures — a stepwell café, a market lassi, a sunset view — without feeling rushed.",
      "Everything below is within about 6 km of the hotel, so you spend your time sightseeing rather than commuting.",
    ],
    sections: [
      {
        id: "day-1-morning", heading: "Day 1, morning: Mehrangarh Fort",
        body: [
          "Start early at Mehrangarh Fort (about 4 km / 15 minutes from the hotel), ideally by 9:00 AM when it opens and the light is soft. Take the lift up and walk down through the ramparts, exploring the palaces and the excellent museum of arms, paintings and palanquins. Give it two to three hours.",
          "Buy tickets online to skip the queue, and don't miss the views over the indigo old city from the upper terraces — this is the classic Blue City panorama.",
        ],
        image: A("mehrangarh-fort", "View over the blue old city from Mehrangarh Fort"),
      },
      {
        id: "day-1-afternoon", heading: "Day 1, afternoon: Jaswant Thada & old city",
        body: [
          "A 10-minute walk from the fort brings you to Jaswant Thada, the serene white-marble royal cenotaph often called the 'Taj Mahal of Marwar'. It's a calm, photogenic spot with lovely fort views.",
          "In the late afternoon, head down to the old city. Explore the restored Toorji Ka Jhalra stepwell, have a coffee at one of the cafés around it, then wander toward the Clock Tower as the markets come alive.",
        ],
      },
      {
        id: "day-1-evening", heading: "Day 1, evening: Clock Tower & Sardar Market",
        body: [
          "Spend the evening in Sardar Market around the landmark Clock Tower (Ghanta Ghar), about 3 km from the hotel. This is Jodhpur at its liveliest — spices, textiles, lac bangles and street food. Try a makhaniya lassi and a plate of mirchi vada, then head back to the hotel for dinner and rest.",
        ],
        image: A("clock-tower-sardar-market", "The Clock Tower and Sardar Market in old Jodhpur at dusk"),
      },
      {
        id: "day-2-morning", heading: "Day 2, morning: Umaid Bhawan Palace",
        body: [
          "On day two, visit Umaid Bhawan Palace (about 6 km away), one of the world's largest private residences and now part royal home, part luxury hotel and part museum. The museum opens at 9:00 AM; allow about an hour for the vintage cars, clocks and Art-Deco grandeur.",
        ],
        image: IG("umaid-bhawan", "Umaid Bhawan Palace, Jodhpur"),
      },
      {
        id: "day-2-afternoon", heading: "Day 2, afternoon: a lake or the rock park",
        body: [
          "After the palace, choose your pace. For nature, head to the Rao Jodha Desert Rock Park below the fort for easy trails and birdlife, or drive out to Kaylana Lake (about 11 km) for a peaceful sunset over the water. Both are gentle, scenic ways to wind down before your departure.",
          "If you're leaving by the evening train, the hotel's location 350 m from Jodhpur Junction means you can sightsee until late and still make your train comfortably.",
        ],
      },
    ],
    faqs: [
      { q: "Can you see Jodhpur in 2 days?", a: "Yes. Two days comfortably covers Mehrangarh Fort, Jaswant Thada, the old city markets, Umaid Bhawan Palace and a lake or the rock park if you start each day early." },
      { q: "What's the best area to stay for a short Jodhpur trip?", a: "Stay central, near the railway station and old city. Hotel Siddhi Vinayak is about 350 m from Jodhpur Junction and within 6 km of every sight in this itinerary." },
      { q: "Is two days enough for Jodhpur with kids?", a: "Yes — keep mornings for sightseeing and afternoons relaxed. The fort lift, the rock park and a lake sunset all work well for families." },
    ],
    relatedAttractions: ["mehrangarh-fort", "jaswant-thada", "clock-tower-sardar-market", "umaid-bhawan-palace"],
    tags: ["itinerary", "weekend", "2 days", "planning"],
  },
  {
    slug: "3-day-jodhpur-itinerary",
    title: "The Ideal 3-Day Jodhpur Itinerary",
    metaTitle: "3-Day Jodhpur Itinerary — Forts, Old City & Desert Day Trip",
    metaDescription: "A relaxed 3-day Jodhpur itinerary: Mehrangarh and the old city, Umaid Bhawan and the lakes, plus a desert day trip to Osian or a Bishnoi village. Local tips and distances included.",
    excerpt: "Three days lets you go beyond the highlights — add Mandore, the lakes, and a desert or village day trip for a fuller taste of Marwar.",
    date: "2026-06-09",
    category: "Itineraries",
    hero: A("mandore-gardens", "Cenotaphs at Mandore Gardens, part of a 3-day Jodhpur itinerary"),
    intro: [
      "Three days is the sweet spot for Jodhpur. You get the two-day highlights without rushing, plus time for the places most visitors miss — Mandore's temple-like cenotaphs, a quiet lake sunset, and a day trip into the Thar countryside. This is the itinerary we recommend to guests who want to feel the city rather than tick it off.",
      "As with all our plans, everything is built around a central base so you spend your time exploring, not commuting.",
    ],
    sections: [
      {
        id: "day-1", heading: "Day 1: Mehrangarh Fort & the old city",
        body: [
          "Dedicate your first day to the heart of Jodhpur. Spend the morning at Mehrangarh Fort, walk over to Jaswant Thada, then drop into the old city in the afternoon for the Toorji Ka Jhalra stepwell and the Clock Tower market. End with street food and a lassi as the bazaar lights up.",
          "This mirrors a classic first day and gets the must-sees done while your energy is high.",
        ],
        image: A("jaswant-thada", "The white marble Jaswant Thada cenotaph in Jodhpur"),
      },
      {
        id: "day-2", heading: "Day 2: Umaid Bhawan, Mandore & a lake",
        body: [
          "On day two, start at Umaid Bhawan Palace, then drive out to Mandore Gardens (about 9 km), the former capital of Marwar, with its towering, temple-like royal cenotaphs and shady gardens full of langurs. In the late afternoon, head to Kaylana Lake for sunset, or to Machiya Safari Park beside it for desert wildlife.",
          "This day pairs heritage and nature and shows you a softer, greener side of Jodhpur.",
        ],
        image: A("mandore-gardens", "Mandore Gardens cenotaphs near Jodhpur"),
      },
      {
        id: "day-3", heading: "Day 3: a desert or village day trip",
        body: [
          "Use your third day for a day trip. Osian (about 65 km) has exquisite 8th–11th century Hindu and Jain temples and access to desert dunes and camel safaris. Alternatively, a Bishnoi village safari (about 20 km) offers an authentic look at rural Rajasthan — handicrafts, an opium-tea ceremony and blackbuck-rich countryside.",
          "We can arrange either trip from the travel desk with a driver who knows the routes, so you're back in the city by evening.",
        ],
        image: A("osian", "Ancient temples at Osian near Jodhpur"),
      },
      {
        id: "tips", heading: "Tips to make 3 days flow",
        body: [
          "Start each day early to beat both the heat and the crowds. Keep your fort and palace visits to mornings, and save lakes, parks and markets for the cooler late afternoon and evening.",
        ],
        list: [
          "Book Mehrangarh tickets online in advance",
          "Carry water and a hat for the rock park and Osian",
          "Agree day-trip fares with your driver before you set off",
          "Keep your last afternoon flexible if you're catching a train",
        ],
      },
    ],
    faqs: [
      { q: "Is 3 days too long for Jodhpur?", a: "Not at all. Three days lets you add Mandore, the lakes and a desert or village day trip beyond the core sights, at a comfortable pace." },
      { q: "What day trips are possible from Jodhpur?", a: "Popular day trips include Osian (ancient temples and dunes, ~65 km) and a Bishnoi village safari (~20 km). Both can be arranged from the hotel travel desk." },
      { q: "How do I get around for 3 days in Jodhpur?", a: "Autos are great for short in-city hops; for day trips and lakes, hire a car with a driver. We can organise reliable drivers for our guests." },
    ],
    relatedAttractions: ["mehrangarh-fort", "mandore-gardens", "osian", "bishnoi-village"],
    tags: ["itinerary", "3 days", "day trip", "planning"],
  },
  {
    slug: "best-places-to-visit-in-jodhpur",
    title: "The Best Places to Visit in Jodhpur",
    metaTitle: "Best Places to Visit in Jodhpur — Top Sights & Distances",
    metaDescription: "The best places to visit in Jodhpur, from Mehrangarh Fort and Umaid Bhawan to Toorji stepwell, Mandore and Kaylana Lake — with distances from the city centre and visitor tips.",
    excerpt: "A curated rundown of Jodhpur's must-see places — forts, palaces, stepwells, gardens and lakes — with distances and the best time to visit each.",
    date: "2026-06-06",
    category: "Attractions",
    hero: A("umaid-bhawan-palace", "Umaid Bhawan Palace, one of the best places to visit in Jodhpur"),
    intro: [
      "Jodhpur packs an extraordinary range of sights into a small area. In a single day you can stand on the ramparts of one of India's greatest forts, wander a 300-year-old stepwell, and watch the sun set over a desert lake. This guide rounds up the best places to visit, roughly in the order most people see them, with distances from the city centre.",
      "Every place below is within easy reach of Hotel Siddhi Vinayak, and each links to a detailed page with timings, maps and tips.",
    ],
    sections: [
      {
        id: "mehrangarh", heading: "Mehrangarh Fort",
        body: [
          "No visit to Jodhpur is complete without Mehrangarh Fort (about 4 km from the city centre). Rising 120 metres above the Blue City, it is one of the largest forts in India, with carved palaces, a superb museum and unbeatable views. Allow two to three hours and go early.",
        ],
        image: A("mehrangarh-fort", "Mehrangarh Fort above the Blue City"),
      },
      {
        id: "jaswant-thada", heading: "Jaswant Thada",
        body: [
          "A short walk from the fort, Jaswant Thada is a graceful white-marble cenotaph set beside a garden and lake. The thin marble glows amber in the sun, and it's a calm contrast to the busy old city. It pairs perfectly with a fort morning.",
        ],
      },
      {
        id: "umaid-bhawan", heading: "Umaid Bhawan Palace",
        body: [
          "About 6 km from the centre, Umaid Bhawan Palace is a 20th-century Art-Deco masterpiece — part royal residence, part luxury hotel and part museum. The museum's vintage cars, clocks and royal memorabilia are well worth the hour.",
        ],
      },
      {
        id: "toorji-clock-tower", heading: "Toorji Ka Jhalra & the Clock Tower",
        body: [
          "In the old city, the restored Toorji Ka Jhalra stepwell is one of Jodhpur's most striking and photogenic spots, ringed by cafés. A few minutes away, the Clock Tower and Sardar Market are the beating heart of the city — spices, textiles and famous street food.",
        ],
        image: A("toorji-ka-jhalra", "Toorji Ka Jhalra stepwell in Jodhpur"),
      },
      {
        id: "mandore-lakes", heading: "Mandore Gardens & the lakes",
        body: [
          "For a quieter half-day, Mandore Gardens (about 9 km) holds temple-like royal cenotaphs in shaded grounds, while Kaylana Lake (about 11 km) and neighbouring Machiya Safari Park offer sunsets, boating and desert wildlife. The Rao Jodha Desert Rock Park below the fort adds easy nature trails close to the centre.",
        ],
        image: A("kaylana-lake", "Sunset over Kaylana Lake near Jodhpur"),
      },
    ],
    faqs: [
      { q: "What is the number one place to visit in Jodhpur?", a: "Mehrangarh Fort — it is the city's defining landmark, with palaces, a museum and panoramic Blue City views. Visit it first." },
      { q: "How many sights can you cover in a day in Jodhpur?", a: "Comfortably three to four if they're close together — for example the fort, Jaswant Thada and the old city markets, all within a few kilometres." },
      { q: "Are Jodhpur's attractions close to each other?", a: "Most are within 6 km of the city centre and the hotel. The lakes, Mandore and Osian are further out and best paired into half- or full-day trips." },
    ],
    relatedAttractions: ["mehrangarh-fort", "jaswant-thada", "umaid-bhawan-palace", "kaylana-lake"],
    tags: ["attractions", "sightseeing", "must see", "overview"],
  },
  {
    slug: "hidden-gems-of-jodhpur",
    title: "Hidden Gems of Jodhpur: Beyond the Fort",
    metaTitle: "Hidden Gems of Jodhpur — Offbeat Places & Local Secrets",
    metaDescription: "Discover the hidden gems of Jodhpur beyond Mehrangarh Fort — the Rao Jodha rock park, Mandore cenotaphs, blue-city lanes, Bishnoi villages and quiet sunset spots locals love.",
    excerpt: "Seen the fort? Here are the quieter corners of Jodhpur that most visitors miss — rock parks, blue lanes, village safaris and secret sunset points.",
    date: "2026-06-03",
    category: "Attractions",
    hero: A("rao-jodha-desert-rock-park", "Trails through the Rao Jodha Desert Rock Park below Mehrangarh"),
    intro: [
      "Mehrangarh Fort and the Clock Tower draw the crowds, but some of the most memorable parts of Jodhpur are the ones you have almost to yourself. After years of hosting guests, these are the offbeat places our team sends people to when they want to slow down and see the real city.",
      "None of these are far — they just don't make most one-day itineraries. Build one or two into your trip and Jodhpur opens up.",
    ],
    sections: [
      {
        id: "rao-jodha", heading: "Rao Jodha Desert Rock Park",
        body: [
          "Right below the fort, this restored 70-hectare park brings back the natural desert ecology of the Thar, with native plants, birdlife and walking trails through volcanic rock. It's quiet, green after the monsoon, and gives you dramatic close-up views of the fort walls without the crowds.",
        ],
        image: A("rao-jodha-desert-rock-park", "Volcanic rock trails in the Rao Jodha Desert Rock Park"),
      },
      {
        id: "mandore-cenotaphs", heading: "The Mandore cenotaphs",
        body: [
          "Most visitors photograph the fort's chhatris but never see Mandore's. Here the royal cenotaphs are built like full temples in red sandstone — a unique architectural style — set in gardens that were the capital of Marwar before Jodhpur existed. Early morning light is magical.",
        ],
      },
      {
        id: "blue-lanes", heading: "The blue lanes at dawn",
        body: [
          "Everyone knows the Blue City, but few experience it the right way: early, before the lanes fill. Walk the indigo alleys below the fort at dawn for soft light, open doorways and the city waking up. A local guide can lead you to the quietest, most photogenic corners.",
        ],
        image: IG("blue-city", "The indigo blue lanes of old Jodhpur"),
      },
      {
        id: "bishnoi", heading: "A Bishnoi village safari",
        body: [
          "About 20 km out, the Bishnoi villages offer a glimpse of rural Rajasthan few tourists see — a community famed for centuries of conservation, with block printing, pottery and weaving, an opium-tea ceremony, and countryside full of blackbuck and chinkara. It's one of the most authentic half-days you can have here.",
        ],
      },
    ],
    faqs: [
      { q: "What are some offbeat places in Jodhpur?", a: "The Rao Jodha Desert Rock Park, the Mandore cenotaphs, the quiet blue lanes at dawn, and a Bishnoi village safari are all rewarding and far less crowded than the main fort." },
      { q: "Is the Rao Jodha Desert Rock Park worth visiting?", a: "Yes, especially after the monsoon. It's a peaceful nature walk with native Thar plants, birds and superb close-up views of Mehrangarh's walls." },
      { q: "Can I do a Bishnoi village safari from Jodhpur?", a: "Yes — it's about 20 km from the city and easily arranged as a half-day jeep safari. Our travel desk can set it up with a trusted guide." },
    ],
    relatedAttractions: ["rao-jodha-desert-rock-park", "mandore-cenotaphs", "blue-city-heritage-walk", "bishnoi-village"],
    tags: ["attractions", "offbeat", "hidden gems", "nature"],
  },
  {
    slug: "family-trip-guide-to-jodhpur",
    title: "Jodhpur with Family: A Complete Trip Guide",
    metaTitle: "Family Trip to Jodhpur — Kid-Friendly Guide & Where to Stay",
    metaDescription: "A family trip guide to Jodhpur: kid-friendly sights like the fort lift, rock park, lakes and safari, plus practical tips, timings and family-friendly stays near the station.",
    excerpt: "Travelling with kids or parents? Here's how to enjoy Jodhpur as a family — easy sights, gentle pacing and a comfortable, central base.",
    date: "2026-05-30",
    category: "Travel Guides",
    hero: A("machiya-safari-park", "Wildlife at Machiya Safari Park, a family-friendly spot in Jodhpur"),
    intro: [
      "Jodhpur is a wonderful family destination — the history is genuinely exciting for kids, the distances are short, and there's enough nature and wildlife to keep younger travellers happy between the forts and palaces. This guide is built around real families we've hosted, with gentle pacing and plenty of breaks.",
      "The key is to stay central, start mornings early, and keep afternoons relaxed. Here's how to make it work.",
    ],
    sections: [
      {
        id: "fort-for-kids", heading: "The fort, made easy",
        body: [
          "Mehrangarh Fort is a hit with children — cannons, swords, palanquins and big views. Take the lift up to save little legs, then walk gently down. The audio guide keeps older kids engaged. For the adventurous, the Flying Fox zipline circuit around the fort is a memorable (and supervised) thrill for teens.",
        ],
        image: A("mehrangarh-fort", "Mehrangarh Fort, a family highlight in Jodhpur"),
      },
      {
        id: "nature", heading: "Wildlife and open space",
        body: [
          "Balance the heritage with nature. Machiya Safari Park beside Kaylana Lake has deer, nilgai, desert fox, monkeys and birds, with a sunset viewpoint — a relaxed outing kids love. The Rao Jodha Desert Rock Park offers easy, safe trails close to the centre. A sunset at Kaylana Lake, with boating, is a calm way to end a day.",
        ],
        image: A("kaylana-lake", "Kaylana Lake at sunset, a calm family outing in Jodhpur"),
      },
      {
        id: "food-families", heading: "Food the whole family will enjoy",
        body: [
          "Jodhpur's street food is fun, but go gently with spice for children. Makhaniya lassi is a safe, delicious treat, and most eateries offer mild dal, sabzi and roti. Keeping a calm, familiar dinner back at the hotel each night helps reset tired kids.",
        ],
      },
      {
        id: "practical", heading: "Practical family tips",
        body: [
          "A central, comfortable base makes family travel far easier. Hotel Siddhi Vinayak is about 350 m from the railway station, with air-conditioned family rooms, free parking and a 24-hour front desk, so arrivals and naps are simple to manage.",
        ],
        list: [
          "Choose a family or four-bed room for space",
          "Sightsee in the cooler morning, rest in the afternoon",
          "Carry water, hats and sunscreen for the parks",
          "Ask the front desk to arrange a car with a child-friendly driver",
        ],
        image: HOTEL,
      },
    ],
    faqs: [
      { q: "Is Jodhpur good for a family trip?", a: "Very. Short distances, an exciting fort, lakes and a safari park, and plenty of family accommodation make it easy and enjoyable with children or elderly parents." },
      { q: "What can kids do in Jodhpur?", a: "Explore Mehrangarh Fort (with a lift), spot wildlife at Machiya Safari Park, walk the Rao Jodha rock park, enjoy a lake sunset and boating, and try a makhaniya lassi." },
      { q: "Does Hotel Siddhi Vinayak have family rooms?", a: "Yes — including a spacious Family Four-Bed Room and Triple Deluxe rooms, all air-conditioned, plus free parking and a 24-hour desk for easy family stays." },
    ],
    relatedAttractions: ["mehrangarh-fort", "machiya-safari-park", "kaylana-lake", "rao-jodha-desert-rock-park"],
    tags: ["family", "kids", "travel guide", "planning"],
  },
  {
    slug: "jodhpur-food-guide",
    title: "Jodhpur Food Guide: What & Where to Eat",
    metaTitle: "Jodhpur Food Guide — Mirchi Vada, Lassi & Marwari Thali",
    metaDescription: "A local Jodhpur food guide: mirchi vada, pyaaz kachori, makhaniya lassi, dal baati churma and mawa kachori, plus where to eat around the Clock Tower and Sardar Market.",
    excerpt: "From fiery mirchi vada to saffron lassi and dal baati churma — a local's guide to eating your way through the Blue City.",
    date: "2026-05-27",
    category: "Food & Dining",
    hero: A("clock-tower-sardar-market", "Sardar Market near the Clock Tower, the heart of Jodhpur's street food"),
    intro: [
      "Jodhpur is one of the best food cities in Rajasthan, and much of its magic is in the street. Marwari cuisine is rich, spicy and proudly vegetarian, built around gram flour, ghee, chillies and clever desert ingredients. This guide covers what to eat, where the famous spots are, and how to enjoy it all without overdoing the heat.",
      "Most of the legendary stalls cluster around the Clock Tower and Sardar Market, an easy ride from Hotel Siddhi Vinayak.",
    ],
    sections: [
      {
        id: "must-try", heading: "Dishes you have to try",
        body: [
          "Begin with the icons. Mirchi vada — a large green chilli stuffed with spiced potato, battered and fried — is Jodhpur's signature snack. Pyaaz kachori, a flaky pastry filled with spiced onion, is the classic breakfast. For something sweet, mawa kachori is a deep-fried pastry filled with reduced milk and soaked in syrup.",
        ],
        list: [
          "Mirchi vada — the city's signature chilli fritter",
          "Pyaaz kachori — flaky spiced-onion pastry",
          "Makhaniya lassi — thick saffron lassi topped with cream",
          "Dal baati churma — the definitive Marwari thali dish",
          "Mawa kachori — a rich, syrup-soaked sweet",
        ],
      },
      {
        id: "lassi", heading: "The makhaniya lassi ritual",
        body: [
          "No food tour of Jodhpur is complete without a makhaniya lassi — a thick, saffron-spiced yoghurt drink crowned with a thick layer of cream (makhan). The most famous shops are near the Clock Tower, and a tall glass on a hot afternoon is one of the city's great simple pleasures.",
        ],
        image: A("clock-tower-sardar-market", "Lassi and street food stalls around the Clock Tower in Jodhpur"),
      },
      {
        id: "thali", heading: "A proper Marwari thali",
        body: [
          "For a full meal, seek out a Rajasthani thali built around dal baati churma — baked wheat balls (baati) crushed into ghee and dal, served with sweet churma and an array of sabzis. It's hearty, festive food, and the best way to understand Marwari cooking. Gatte ki sabzi (gram-flour dumplings in yoghurt curry) and ker sangri (a desert bean-and-berry dish) are wonderful additions.",
        ],
      },
      {
        id: "where", heading: "Where to eat — and a calm dinner",
        body: [
          "The Clock Tower and Sardar Market area is street-food central; rooftop cafés around the Toorji stepwell offer fort views with your meal. After a day of grazing, a relaxed, familiar dinner back at your hotel is welcome — and lets you control the spice level after a big day out.",
        ],
        image: DINING,
      },
    ],
    faqs: [
      { q: "What food is Jodhpur famous for?", a: "Mirchi vada, pyaaz kachori, makhaniya lassi, dal baati churma and mawa kachori. Jodhpur's cuisine is rich, spicy and largely vegetarian." },
      { q: "Where is the best street food in Jodhpur?", a: "Around the Clock Tower (Ghanta Ghar) and Sardar Market, where the city's most famous lassi, kachori and vada shops cluster together." },
      { q: "Is Jodhpur food very spicy?", a: "It can be — mirchi vada especially. Ask for milder versions, balance with lassi and curd-based dishes, and ease in gradually if you're sensitive to heat." },
    ],
    relatedAttractions: ["clock-tower-sardar-market", "toorji-ka-jhalra", "blue-city-heritage-walk"],
    tags: ["food", "street food", "dining", "culture"],
  },
  {
    slug: "shopping-in-jodhpur",
    title: "Shopping in Jodhpur: A Local Buyer's Guide",
    metaTitle: "Shopping in Jodhpur — Markets, Handicrafts & What to Buy",
    metaDescription: "What to buy in Jodhpur and where: bandhej textiles, lac bangles, spices, leather juttis, antiques and block prints around Sardar Market and the Clock Tower, with bargaining tips.",
    excerpt: "Spices, bandhej, bangles, juttis and antiques — a practical guide to shopping the Blue City's markets, and how to bargain well.",
    date: "2026-05-24",
    category: "Shopping",
    hero: A("clock-tower-sardar-market", "Textiles and handicrafts in Sardar Market, Jodhpur"),
    intro: [
      "Jodhpur is a fantastic place to shop. The markets around the Clock Tower are packed with the crafts Rajasthan is famous for — tie-dye textiles, lac bangles, spices, leather and antiques — often at better prices than the bigger tourist cities. This guide covers what to buy, where to find it, and how to bargain without stress.",
      "All of it is within a short ride of Hotel Siddhi Vinayak, so you can shop in the cool of the evening and be back for dinner.",
    ],
    sections: [
      {
        id: "what-to-buy", heading: "What to buy",
        body: [
          "Jodhpur's specialities reward a little browsing. Look for bandhej (bandhani) tie-dye fabrics, hand-block prints, embroidered juttis (leather slippers), colourful lac bangles, fragrant spices and tea, and the antiques and refurbished furniture the city is known for among collectors.",
        ],
        list: [
          "Bandhej & block-print textiles and scarves",
          "Lac bangles and silver jewellery",
          "Leather juttis and bags",
          "Spices, dried Mathania chillies and tea",
          "Antiques, brassware and carved woodwork",
        ],
      },
      {
        id: "where", heading: "Where to shop",
        body: [
          "Sardar Market, framed by the Clock Tower, is the main hub — a maze of lanes for textiles, bangles and spices. Nai Sarak and Tripolia Bazaar are good for fabrics and tie-dye, while the Umaid Bhawan and fort areas have curated handicraft and antique shops. For authentic village crafts, a Bishnoi safari lets you buy block printing and pottery directly from artisans.",
        ],
        image: A("clock-tower-sardar-market", "Shopping lanes around the Clock Tower in Jodhpur"),
      },
      {
        id: "bargaining", heading: "How to bargain (politely)",
        body: [
          "Bargaining is expected in the markets but not in fixed-price emporiums. Browse a little first, ask the price, then counter at roughly 50–60% and settle somewhere in the middle. Stay friendly — a smile goes further than a hard line. Buy spices and packaged goods from shops with visible turnover, and ask about export-quality packing for fragile antiques.",
        ],
      },
    ],
    faqs: [
      { q: "What should I buy in Jodhpur?", a: "Bandhej and block-print textiles, lac bangles, leather juttis, spices and dried chillies, and antiques or brassware — all Jodhpur specialities." },
      { q: "Where is the main market in Jodhpur?", a: "Sardar Market around the Clock Tower (Ghanta Ghar) is the central shopping hub, with Nai Sarak and Tripolia Bazaar nearby for textiles." },
      { q: "Is bargaining normal in Jodhpur markets?", a: "Yes, in the street markets. Start lower, settle in the middle and stay friendly. Fixed-price handicraft emporiums don't bargain." },
    ],
    relatedAttractions: ["clock-tower-sardar-market", "toorji-ka-jhalra", "bishnoi-village"],
    tags: ["shopping", "markets", "handicrafts", "culture"],
  },
  {
    slug: "best-sunset-points-in-jodhpur",
    title: "The Best Sunset Points in Jodhpur",
    metaTitle: "Best Sunset Points in Jodhpur — Fort Views & Lake Sunsets",
    metaDescription: "The best sunset points in Jodhpur: Mehrangarh's ramparts, Jaswant Thada, Kaylana Lake, the rock park and rooftop cafés over the Blue City — with the ideal timing for each.",
    excerpt: "Golden hour in the Blue City is unforgettable. Here are the best places to watch the sun go down over forts, lakes and indigo rooftops.",
    date: "2026-05-21",
    category: "Attractions",
    hero: A("kaylana-lake", "Sunset over Kaylana Lake near Jodhpur"),
    intro: [
      "Jodhpur is made for sunsets. The desert light turns the sandstone fort gold, the blue houses deepen to violet, and the lakes on the city's edge mirror the sky. After many evenings chasing the best light, these are our favourite spots and exactly when to be there.",
      "Aim to arrive 30–45 minutes before sunset to settle in, and check the day's sunset time so you don't miss the best few minutes.",
    ],
    sections: [
      {
        id: "fort", heading: "Mehrangarh Fort ramparts",
        body: [
          "The upper ramparts of Mehrangarh Fort give you the definitive Jodhpur sunset — the whole indigo old city glowing below as the sky turns. If you're inside for the late afternoon, find a west-facing terrace. The fort is about 4 km from the city centre.",
        ],
        image: A("mehrangarh-fort", "Golden-hour view from Mehrangarh Fort over the Blue City"),
      },
      {
        id: "jaswant-thada", heading: "Jaswant Thada",
        body: [
          "The white marble of Jaswant Thada glows beautifully in low sun, with the fort as a backdrop and the lake reflecting the colour. It's quieter than the fort and a lovely, gentle place to end the day.",
        ],
      },
      {
        id: "kaylana", heading: "Kaylana Lake & the rock park",
        body: [
          "For a classic lake sunset, Kaylana Lake (about 11 km) is the spot — open water, rocky hills and birds settling for the night. Neighbouring Machiya Safari Park has a dedicated sunset viewpoint. Closer in, the Rao Jodha Desert Rock Park offers golden light on the fort walls.",
        ],
        image: A("kaylana-lake", "The sun setting over Kaylana Lake, Jodhpur"),
      },
      {
        id: "rooftops", heading: "Old-city rooftops",
        body: [
          "Finally, the rooftop cafés around the Toorji stepwell and the blue lanes give you fort-and-rooftop sunsets with a cold drink in hand — the most relaxed option, and great for photos of the Blue City catching the last light.",
        ],
      },
    ],
    faqs: [
      { q: "Where is the best sunset view in Jodhpur?", a: "The ramparts of Mehrangarh Fort, for the glowing Blue City below. Kaylana Lake and Jaswant Thada are the best quieter alternatives." },
      { q: "What time is sunset in Jodhpur?", a: "Roughly 6:00–6:30 PM in winter and 7:00–7:30 PM in summer. Arrive 30–45 minutes early for the best light." },
      { q: "Can you watch the sunset from a rooftop café in Jodhpur?", a: "Yes — rooftop cafés around the Toorji stepwell and the old-city blue lanes offer fort views at golden hour, ideal for photos." },
    ],
    relatedAttractions: ["mehrangarh-fort", "jaswant-thada", "kaylana-lake", "rao-jodha-desert-rock-park"],
    tags: ["attractions", "sunset", "photography", "nature"],
  },
  {
    slug: "jodhpur-heritage-walk-guide",
    title: "A Jodhpur Heritage Walk Guide (Blue City on Foot)",
    metaTitle: "Jodhpur Heritage Walk Guide — Blue City Walking Route & Tips",
    metaDescription: "A self-guided Jodhpur heritage walk through the Blue City: Toorji stepwell, the Clock Tower, the indigo lanes and up toward Mehrangarh Fort, with a route, timing and photo tips.",
    excerpt: "The best way to feel Jodhpur is on foot. Here's a self-guided heritage walk through the stepwells, markets and indigo lanes of the old city.",
    date: "2026-05-18",
    category: "Travel Guides",
    hero: IG("blue-city", "The indigo lanes of the Blue City on a Jodhpur heritage walk"),
    intro: [
      "Jodhpur's old city is best understood slowly, on foot. A morning walk takes you past a 300-year-old stepwell, through a spice-and-textile bazaar, and into the indigo lanes beneath the fort where daily life unfolds. This is the self-guided heritage walk we recommend to guests — about 2 to 3 hours at an easy pace.",
      "Start early, around 7:00–8:00 AM, for soft light, cool air and quiet lanes before the city gets busy.",
    ],
    sections: [
      {
        id: "start-toorji", heading: "Start: Toorji Ka Jhalra stepwell",
        body: [
          "Begin at Toorji Ka Jhalra, the beautifully restored 18th-century stepwell of carved rose-red sandstone. Early morning, before the cafés fill, the geometry is at its most photogenic. Grab a coffee here to set you up for the walk.",
        ],
        image: A("toorji-ka-jhalra", "Toorji Ka Jhalra stepwell at the start of the heritage walk"),
      },
      {
        id: "clock-tower", heading: "Through Sardar Market & the Clock Tower",
        body: [
          "From the stepwell, wind toward the Clock Tower (Ghanta Ghar) through Sardar Market. Even early, the spice and produce sellers are setting up. This is the commercial heart of old Jodhpur and a great place to watch the city wake up — and to taste a fresh kachori.",
        ],
      },
      {
        id: "blue-lanes", heading: "Into the blue lanes",
        body: [
          "Climb gently from the market into the tightly packed indigo houses below the fort. These narrow lanes — once linked to Brahmin homes — give Jodhpur its name. Take your time: open doorways, blue walls, children heading to school and the fort looming above make this the most atmospheric stretch of the walk.",
        ],
        image: IG("blue-city", "Walking the blue lanes beneath Mehrangarh Fort"),
      },
      {
        id: "finish-fort", heading: "Finish: up toward Mehrangarh",
        body: [
          "The walk naturally rises toward Mehrangarh Fort. You can end with the climb (or a short auto ride) up to the gates and reward yourself with the Blue City panorama. From here it's an easy ride back to the hotel for a late breakfast.",
        ],
      },
      {
        id: "tips", heading: "Walking tips",
        body: [
          "Wear comfortable shoes — the lanes are uneven and stepped. Carry water, go early, and consider a local guide for the hidden corners and the stories behind the houses.",
        ],
        list: [
          "Best started 7:00–8:00 AM for light and quiet",
          "Wear sturdy, comfortable shoes",
          "Ask before photographing people and homes",
          "Hire a local guide to find the quietest lanes",
        ],
      },
    ],
    faqs: [
      { q: "How long is a Jodhpur heritage walk?", a: "Allow 2 to 3 hours at an easy pace from the Toorji stepwell through Sardar Market and the blue lanes up toward the fort." },
      { q: "Is the Blue City walk safe and easy?", a: "Yes. It's a popular, safe route. The lanes are uneven and stepped, so wear good shoes and go early to avoid heat and crowds." },
      { q: "Do I need a guide for the Jodhpur old city walk?", a: "Not essential, but a local guide adds context and leads you to the most photogenic, quiet corners. We can arrange one for our guests." },
    ],
    relatedAttractions: ["toorji-ka-jhalra", "clock-tower-sardar-market", "blue-city-heritage-walk", "mehrangarh-fort"],
    tags: ["heritage walk", "old city", "walking", "photography"],
  },
  {
    slug: "weekend-trip-to-jodhpur",
    title: "A Perfect Weekend Trip to Jodhpur",
    metaTitle: "Weekend Trip to Jodhpur — 48-Hour Plan from a Local Host",
    metaDescription: "Plan the perfect weekend trip to Jodhpur: a Friday-evening-to-Sunday plan covering the fort, old city, palace and a lake, with travel tips and a central place to stay.",
    excerpt: "Short on time? A weekend is plenty for the Blue City. Here's a relaxed 48-hour plan that still feels like a proper getaway.",
    date: "2026-05-15",
    category: "Itineraries",
    hero: B("jodhpur-blue-city", "The Blue City of Jodhpur, an ideal weekend getaway"),
    intro: [
      "Jodhpur is one of the best weekend escapes in north-west India. It's compact, well connected, and full enough of forts, food and colour to feel like a real trip in just 48 hours. This plan assumes a Friday-evening arrival and a Sunday-evening departure — exactly how many of our weekend guests travel.",
      "Staying near the station keeps your weekend efficient: less time in transit, more time in the city.",
    ],
    sections: [
      {
        id: "friday", heading: "Friday evening: arrive & ease in",
        body: [
          "Arrive by the evening train or flight and check in. If you have energy, head to the Clock Tower for a first taste of Sardar Market and a makhaniya lassi, or simply relax on the hotel's sun terrace and save your energy for an early start. Being about 350 m from Jodhpur Junction means a late arrival is stress-free.",
        ],
      },
      {
        id: "saturday", heading: "Saturday: fort, old city & markets",
        body: [
          "Give Saturday to the essentials. Morning at Mehrangarh Fort and Jaswant Thada; afternoon in the old city for the Toorji stepwell and the blue lanes; evening back at the Clock Tower for street food. It's a full, satisfying day that captures the soul of Jodhpur.",
        ],
        image: A("mehrangarh-fort", "Mehrangarh Fort, the centrepiece of a Jodhpur weekend"),
      },
      {
        id: "sunday", heading: "Sunday: palace & a lake before you leave",
        body: [
          "On Sunday, visit Umaid Bhawan Palace in the morning, then take a gentle drive to Kaylana Lake or the Rao Jodha rock park before lunch. You'll be back in plenty of time for an afternoon or evening departure — bags can wait at the hotel while you make the most of your last hours.",
        ],
        image: IG("umaid-bhawan", "Umaid Bhawan Palace on a Jodhpur weekend"),
      },
    ],
    faqs: [
      { q: "Is a weekend enough for Jodhpur?", a: "Yes. A Friday-evening to Sunday-evening trip covers the fort, old city, a palace and a lake comfortably, especially if you stay centrally." },
      { q: "How do I get to Jodhpur for a weekend?", a: "Overnight or evening trains from Delhi, Jaipur and Ahmedabad are popular, as are short flights. Jodhpur Junction is about 350 m from Hotel Siddhi Vinayak." },
      { q: "What's the most efficient Jodhpur weekend base?", a: "A central hotel near the railway station and old city. Hotel Siddhi Vinayak keeps you within 6 km of every sight in this plan." },
    ],
    relatedAttractions: ["mehrangarh-fort", "jaswant-thada", "umaid-bhawan-palace", "kaylana-lake"],
    tags: ["itinerary", "weekend", "getaway", "planning"],
  },
  {
    slug: "jodhpur-in-winter",
    title: "Jodhpur in Winter: The Best Season to Visit",
    metaTitle: "Jodhpur in Winter — Weather, What to Pack & Things to Do",
    metaDescription: "Jodhpur in winter (October–March): pleasant weather, festivals, what to pack and the best things to do in peak season, with tips on booking ahead and a central place to stay.",
    excerpt: "Cool, sunny days and clear desert skies make winter the best time to visit Jodhpur. Here's how to make the most of peak season.",
    date: "2026-05-12",
    category: "Seasons",
    hero: A("mehrangarh-fort", "Mehrangarh Fort under clear winter skies in Jodhpur"),
    intro: [
      "Winter — roughly October to March — is the best time to visit Jodhpur. Days are warm and sunny, evenings are pleasantly cool, and the desert light is at its clearest, which makes the fort and the Blue City look their very best. It's also festival season, so the city is full of life.",
      "Because it's peak season, a little planning goes a long way. Here's what to expect and how to make the most of it.",
    ],
    sections: [
      {
        id: "weather", heading: "Winter weather & what to pack",
        body: [
          "Expect comfortable daytime temperatures, ideal for sightseeing, with cooler mornings and evenings — December and January nights can get genuinely chilly in the desert. Pack layers: light clothes for the day and a jacket or shawl for early starts and after dark. Sun protection still matters under the bright winter sun.",
        ],
        list: [
          "Light, breathable clothes for daytime",
          "A warm layer for mornings and evenings",
          "Sunglasses, hat and sunscreen",
          "Comfortable walking shoes for forts and lanes",
        ],
      },
      {
        id: "what-to-do", heading: "Best things to do in winter",
        body: [
          "Winter is perfect for everything Jodhpur does best — long fort mornings at Mehrangarh, unhurried heritage walks through the old city, lake sunsets at Kaylana, and day trips to Osian and the Bishnoi villages without the summer heat. The clear skies make this the prime season for photography.",
        ],
        image: A("kaylana-lake", "Clear winter light over Kaylana Lake, Jodhpur"),
      },
      {
        id: "festivals", heading: "Winter festivals",
        body: [
          "Time your trip with a festival if you can. The Marwar Festival and the Rajasthan International Folk Festival (RIFF) at Mehrangarh bring music and dance to the fort, while Diwali lights up the whole city. These are magical but busy times — book early.",
        ],
      },
      {
        id: "book-ahead", heading: "Book ahead for peak season",
        body: [
          "Winter is when Jodhpur fills up, especially around Diwali, Christmas and New Year. Reserve your room and any fort or festival tickets well in advance. A centrally located stay like Hotel Siddhi Vinayak, near the station and old city, saves time and keeps a busy season relaxed.",
        ],
        image: HOTEL,
      },
    ],
    faqs: [
      { q: "Is winter the best time to visit Jodhpur?", a: "Yes. October to March offers warm, sunny days, cool evenings and clear skies — ideal for forts, walks and photography. It's peak season, so book early." },
      { q: "How cold does Jodhpur get in winter?", a: "Days stay comfortable for sightseeing, but December and January mornings and nights can be chilly in the desert. Carry a warm layer." },
      { q: "Do I need to book early for a winter trip to Jodhpur?", a: "Yes, especially around Diwali and the winter holidays, when rooms and festival tickets sell out. Reserve well ahead." },
    ],
    relatedAttractions: ["mehrangarh-fort", "kaylana-lake", "umaid-bhawan-palace", "osian"],
    tags: ["seasons", "winter", "weather", "festivals"],
  },
  {
    slug: "jodhpur-in-monsoon",
    title: "Jodhpur in Monsoon: The Green Side of the Desert",
    metaTitle: "Jodhpur in Monsoon — Weather, Things to Do & Why It's Worth It",
    metaDescription: "Jodhpur in monsoon (July–September): cooler air, green hills, full lakes and fewer crowds. The best things to do, what to expect and tips for a rainy-season visit.",
    excerpt: "The monsoon transforms the Thar — green hills, brimming lakes and dramatic skies. Here's why rainy-season Jodhpur is wonderfully underrated.",
    date: "2026-05-09",
    category: "Seasons",
    hero: A("kaylana-lake", "Kaylana Lake full and green during the Jodhpur monsoon"),
    intro: [
      "Most people picture Jodhpur as bone-dry desert, but the monsoon — roughly July to September — shows a completely different city. The surrounding hills turn green, the lakes fill, the air cools, and the crowds thin out. It's an underrated, atmospheric and great-value time to visit if you don't mind the occasional shower.",
      "Rain in the Thar is usually brief and dramatic rather than all-day, so with a little flexibility you can have a beautiful trip.",
    ],
    sections: [
      {
        id: "weather", heading: "What the monsoon is like",
        body: [
          "Jodhpur gets relatively modest rainfall compared with much of India, often in short, heavy bursts that clear quickly. Temperatures drop from the summer highs to something far more pleasant, and the light after the rain is gorgeous for photography. Pack a light rain layer and quick-dry shoes, and keep your plans flexible around the showers.",
        ],
      },
      {
        id: "what-to-do", heading: "Best things to do in the monsoon",
        body: [
          "This is the season for the lakes and parks. Kaylana Lake and Balsamand are at their fullest and most beautiful, the Rao Jodha Desert Rock Park turns green and alive with birds, and Machiya Safari Park is lush. The fort and old city look spectacular under dramatic monsoon skies, and indoor sights like the Umaid Bhawan museum are perfect for a rainy hour.",
        ],
        image: A("rao-jodha-desert-rock-park", "The Rao Jodha rock park turning green in the monsoon"),
      },
      {
        id: "why-visit", heading: "Why visit in the rains",
        body: [
          "Beyond the scenery, the monsoon means fewer tourists, shorter queues and better room rates. The city feels relaxed, and you'll often have viewpoints and cafés to yourself. For photographers and travellers who prefer a slower pace, it's arguably the most rewarding season of all.",
        ],
      },
      {
        id: "tips", heading: "Monsoon travel tips",
        body: [
          "Keep mornings for outdoor sights in case of afternoon showers, carry a compact umbrella, and have an indoor backup (museum, café, market) for the heaviest rain. An air-conditioned, central base makes it easy to duck back and wait out a downpour in comfort.",
        ],
        list: [
          "Travel with a light rain layer and quick-dry shoes",
          "Do outdoor sights in the morning",
          "Keep an indoor backup for heavy showers",
          "Enjoy lower rates and thinner crowds",
        ],
      },
    ],
    faqs: [
      { q: "Is it good to visit Jodhpur in the monsoon?", a: "Yes, if you're flexible. Expect cooler air, green hills, full lakes, fewer crowds and better rates. Showers are usually short and dramatic rather than all-day." },
      { q: "How much does it rain in Jodhpur?", a: "Relatively little compared with much of India, often in short heavy bursts between July and September. Many days stay dry with beautiful post-rain light." },
      { q: "What can you do in Jodhpur when it rains?", a: "Visit the Umaid Bhawan museum, explore Sardar Market's covered lanes, enjoy a rooftop café with fort views, or relax at your hotel until the shower passes." },
    ],
    relatedAttractions: ["kaylana-lake", "rao-jodha-desert-rock-park", "machiya-safari-park", "umaid-bhawan-palace"],
    tags: ["seasons", "monsoon", "weather", "nature"],
  },
  {
    slug: "famous-temples-of-jodhpur",
    title: "The Famous Temples of Jodhpur",
    metaTitle: "Famous Temples of Jodhpur — Chamunda Mata, Osian & More",
    metaDescription: "A guide to the famous temples of Jodhpur and around: Chamunda Mata atop Mehrangarh, the ancient Sachiya Mata and Jain temples of Osian, Mandore's shrines and more, with timings and tips.",
    excerpt: "From the goddess temple crowning the fort to the ancient carved shrines of Osian, here are Jodhpur's most revered temples and how to visit them.",
    date: "2026-05-06",
    category: "Attractions",
    hero: A("chamunda-mata-temple", "Chamunda Mata Temple atop Mehrangarh Fort, Jodhpur"),
    intro: [
      "Faith and architecture meet beautifully in and around Jodhpur. The city's temples range from the goddess shrine that crowns Mehrangarh Fort to the exquisitely carved 8th-century temples of Osian on the desert's edge. This guide covers the most famous and how to include them respectfully in your trip.",
      "Remember to remove your footwear before entering, dress modestly, and check whether photography is allowed inside.",
    ],
    sections: [
      {
        id: "chamunda", heading: "Chamunda Mata Temple",
        body: [
          "Installed by Rao Jodha in 1460 at the southern end of Mehrangarh, Chamunda Mata is the favoured goddess of the Jodhpur royal family and the city's people. The temple offers panoramic views over the Blue City and is especially vibrant during Dussehra. It's reached through the fort, about 4 km from the city centre.",
        ],
        image: A("chamunda-mata-temple", "Panoramic views from Chamunda Mata Temple, Jodhpur"),
      },
      {
        id: "osian", heading: "The ancient temples of Osian",
        body: [
          "About 65 km away, Osian is an ancient temple town with beautifully carved 8th–11th century Hindu and Jain temples, including the hilltop Sachiya Mata temple and the Mahavira Jain temple. The craftsmanship is extraordinary, and the desert setting makes it a memorable full-day trip, often combined with dunes and a camel safari.",
        ],
        image: A("osian", "Carved ancient temples at Osian near Jodhpur"),
      },
      {
        id: "mandore", heading: "Mandore's temples & shrines",
        body: [
          "At Mandore Gardens (about 9 km), the temple-like royal cenotaphs sit alongside old temples and the Hall of Heroes, where local deities are carved into the rock. It's a peaceful, atmospheric place that blends worship, memorial and garden.",
        ],
      },
      {
        id: "etiquette", heading: "Temple etiquette",
        body: [
          "Visiting temples in Jodhpur is welcoming and rewarding when you follow local custom.",
        ],
        list: [
          "Remove footwear before entering",
          "Dress modestly (cover shoulders and knees)",
          "Ask before photographing inside shrines",
          "Visit early mornings for a calmer experience",
        ],
      },
    ],
    faqs: [
      { q: "What is the most famous temple in Jodhpur?", a: "Chamunda Mata Temple, atop Mehrangarh Fort, is the city's most revered — the royal family's goddess, with sweeping Blue City views, especially lively during Dussehra." },
      { q: "Are the Osian temples worth visiting?", a: "Yes. Osian's 8th–11th century Hindu and Jain temples are exquisitely carved and set in the desert — a rewarding full-day trip from Jodhpur, ~65 km away." },
      { q: "What should I wear to visit temples in Jodhpur?", a: "Dress modestly with shoulders and knees covered, and be ready to remove your footwear before entering. Mornings are the calmest time to visit." },
    ],
    relatedAttractions: ["chamunda-mata-temple", "osian", "mandore-gardens", "mehrangarh-fort"],
    tags: ["temples", "heritage", "culture", "attractions"],
  },
  {
    slug: "why-stay-at-hotel-siddhi-vinayak",
    title: "Why Stay at Hotel Siddhi Vinayak in Jodhpur",
    metaTitle: "Why Stay at Hotel Siddhi Vinayak — Hotel Near Jodhpur Station",
    metaDescription: "Comfortable, central and great value: why Hotel Siddhi Vinayak is an ideal base in Jodhpur — 350 m from the railway station, near the old city, with AC rooms, free parking and a travel desk.",
    excerpt: "Location, comfort and genuine local hospitality — here's why guests choose Hotel Siddhi Vinayak as their base in the Blue City.",
    date: "2026-05-03",
    category: "Our Hotel",
    hero: HOTEL,
    intro: [
      "Choosing where to stay shapes your whole Jodhpur trip. After welcoming guests to the Blue City for years, we've built Hotel Siddhi Vinayak around the things that actually make a trip easier: an unbeatable central location, clean and comfortable air-conditioned rooms, honest value, and a team that treats you like a guest in our home.",
      "Here's an honest look at what staying with us is like and why it works so well as a base.",
    ],
    sections: [
      {
        id: "location", heading: "An unbeatable central location",
        body: [
          "We're opposite M.G. Hospital near Jalori Gate, about 350 metres from Jodhpur Junction railway station and roughly 5 km from the airport. Mehrangarh Fort, the Clock Tower market and the old city are all within a few kilometres. That means less time in autos and more time exploring — and stress-free late arrivals and early departures by train.",
        ],
      },
      {
        id: "rooms", heading: "Comfortable, well-equipped rooms",
        body: [
          "Our rooms are clean, air-conditioned and designed for a restful stay after a busy day of sightseeing, with free Wi-Fi, LED/Smart TVs and hot water. We offer a range of categories — Deluxe, Super Deluxe, Triple Deluxe and a spacious Family Four-Bed Room — so couples, friends and families all have a comfortable fit.",
        ],
        list: [
          "Air-conditioned Deluxe, Super Deluxe, Triple & Family rooms",
          "Free high-speed Wi-Fi and LED/Smart TVs",
          "Free parking and EV charging",
          "Sun terrace, travel desk and 24-hour front desk",
        ],
      },
      {
        id: "services", heading: "Services that make travel easy",
        body: [
          "Our travel desk arranges airport and station pickups, local sightseeing, and day trips to Osian and the Bishnoi villages with trusted drivers. The 24-hour front desk, free parking, sun terrace and in-house dining mean the practical side of your trip is handled, so you can focus on Jodhpur.",
        ],
        image: DINING,
      },
      {
        id: "book-direct", heading: "Best rates when you book direct",
        body: [
          "Booking directly with us — by phone, WhatsApp or our website — gets you our best available rate and lets us tailor your stay, from early check-in requests to arranging your sightseeing in advance. We're real local hosts, not a call centre, and we're happy to help plan your trip before you even arrive.",
        ],
      },
    ],
    faqs: [
      { q: "How far is Hotel Siddhi Vinayak from Jodhpur railway station?", a: "About 350 metres — a 5-minute walk or a 2-minute auto from Jodhpur Junction, making train arrivals and departures very convenient." },
      { q: "What facilities does Hotel Siddhi Vinayak offer?", a: "Air-conditioned rooms, free Wi-Fi, free parking with EV charging, a sun terrace, a travel desk, in-house dining and a 24-hour front desk." },
      { q: "How do I get the best rate at Hotel Siddhi Vinayak?", a: "Book direct by phone, WhatsApp or our website for the best available rate and personalised help with pickups and sightseeing." },
    ],
    relatedAttractions: ["mehrangarh-fort", "clock-tower-sardar-market", "umaid-bhawan-palace", "jaswant-thada"],
    tags: ["hotel", "where to stay", "book direct", "our hotel"],
  },
  {
    slug: "top-things-to-do-in-jodhpur",
    title: "Top 10 Things to Do in Jodhpur",
    metaTitle: "Top 10 Things to Do in Jodhpur — Forts, Markets & More",
    metaDescription: "The top 10 things to do in Jodhpur: Mehrangarh Fort, Jaswant Thada, Toorji stepwell, the Clock Tower market, Umaid Bhawan Palace, lakes and street food — with distances and tips.",
    excerpt: "From the mighty Mehrangarh Fort to hidden stepwells and street food, here are the ten experiences that define a trip to the Blue City.",
    date: "2026-04-28",
    updated: "2026-06-15",
    category: "Attractions",
    hero: A("mehrangarh-fort", "Mehrangarh Fort, the top thing to do in Jodhpur"),
    intro: [
      "Jodhpur, the Blue City of Rajasthan, blends royal heritage with vibrant local life. Whether you have a weekend or a week, there is plenty to explore within minutes of Hotel Siddhi Vinayak. Here are the ten experiences we think capture the city best, with distances and timing tips.",
      "They're listed roughly in the order most visitors enjoy them, and almost all are within 6 km of the hotel.",
    ],
    sections: [
      {
        id: "mehrangarh", heading: "1. Explore Mehrangarh Fort",
        body: [
          "Start with Mehrangarh Fort (about 4 km away), one of the most magnificent forts in India. Spend a morning exploring its palaces and museums before the afternoon heat sets in, and don't miss the Blue City views from the ramparts.",
        ],
        image: A("mehrangarh-fort", "The palaces and ramparts of Mehrangarh Fort"),
      },
      {
        id: "jaswant-thada", heading: "2. Visit Jaswant Thada",
        body: [
          "A short walk from the fort, the white-marble Jaswant Thada cenotaph — the 'Taj Mahal of Marwar' — is a serene, photogenic spot with lovely fort views and a peaceful garden.",
        ],
      },
      {
        id: "toorji", heading: "3. See the Toorji Ka Jhalra stepwell",
        body: [
          "In the old city, the restored Toorji Ka Jhalra stepwell is one of Jodhpur's most striking sights — carved rose-red sandstone surrounded by charming cafés, perfect for a relaxed break.",
        ],
        image: A("toorji-ka-jhalra", "The Toorji Ka Jhalra stepwell in old Jodhpur"),
      },
      {
        id: "clock-tower", heading: "4. Shop & eat at the Clock Tower",
        body: [
          "Wander through the Clock Tower and Sardar Market for spices, textiles and authentic Marwari snacks. Don't miss the famous mirchi vada and makhaniya lassi.",
        ],
        image: A("clock-tower-sardar-market", "The Clock Tower and Sardar Market, Jodhpur"),
      },
      {
        id: "umaid", heading: "5. Tour Umaid Bhawan Palace",
        body: [
          "Visit Umaid Bhawan Palace (about 6 km), a 20th-century Art-Deco marvel that's part royal home, part luxury hotel and part museum, with vintage cars and royal memorabilia.",
        ],
        image: IG("umaid-bhawan", "Umaid Bhawan Palace, Jodhpur"),
      },
      {
        id: "rest", heading: "6–10. Lakes, parks, temples, walks & day trips",
        body: [
          "Round out your trip with the rest of our top ten: (6) a sunset at Kaylana Lake; (7) wildlife at Machiya Safari Park; (8) easy trails in the Rao Jodha Desert Rock Park; (9) a dawn heritage walk through the blue lanes; and (10) a day trip to the ancient temples of Osian or a Bishnoi village safari for rural Rajasthan.",
          "Each of these has its own detailed guide with timings, maps and tips — follow the related links below to plan.",
        ],
        image: A("kaylana-lake", "Sunset at Kaylana Lake, Jodhpur"),
      },
    ],
    faqs: [
      { q: "What are the top things to do in Jodhpur?", a: "Mehrangarh Fort, Jaswant Thada, the Toorji stepwell, the Clock Tower market, Umaid Bhawan Palace, Kaylana Lake, Machiya Safari Park, the rock park, a Blue City walk and a day trip to Osian or the Bishnoi villages." },
      { q: "How many days do you need to do everything in Jodhpur?", a: "Two days covers the top five; three days lets you add the lakes, parks and a day trip comfortably." },
      { q: "What is the must-do experience in Jodhpur?", a: "Mehrangarh Fort, ideally in the morning, followed by the Blue City old town and street food at the Clock Tower in the evening." },
    ],
    relatedAttractions: ["mehrangarh-fort", "jaswant-thada", "toorji-ka-jhalra", "clock-tower-sardar-market"],
    tags: ["attractions", "things to do", "must see", "overview"],
  },
  {
    slug: "best-time-to-visit-jodhpur",
    title: "Best Time to Visit Jodhpur (Month-by-Month)",
    metaTitle: "Best Time to Visit Jodhpur — Month-by-Month Weather Guide",
    metaDescription: "The best time to visit Jodhpur: a month-by-month guide to weather, festivals and crowds. Winter is peak season; the monsoon is green and quiet; summer is hot but great value.",
    excerpt: "Planning your trip to the Blue City? Here's a clear month-by-month guide to weather, festivals and crowds so you can pick the perfect time.",
    date: "2026-04-20",
    updated: "2026-06-15",
    category: "Seasons",
    hero: B("jodhpur-blue-city", "The Blue City of Jodhpur from above, under clear skies"),
    intro: [
      "The best time to visit Jodhpur is between October and March, when the desert climate is pleasant and ideal for sightseeing. But every season has its own appeal, and the right time depends on what you want — clear skies and festivals, green landscapes and low prices, or quiet sights and bargains.",
      "Here's how the year breaks down, with the Blue City at its best in each season.",
    ],
    sections: [
      {
        id: "winter", heading: "October–March: peak season",
        body: [
          "Winter offers cool, comfortable days perfect for exploring forts and markets, with clear skies that make the fort and the Blue City glow. This is peak tourist season, so book your stay early. December and January evenings can be chilly, so pack a layer.",
          "If you enjoy festivals, time your visit with the Marwar Festival or the Rajasthan International Folk Festival at Mehrangarh, usually held around October.",
        ],
        image: A("mehrangarh-fort", "Mehrangarh Fort under clear winter skies"),
      },
      {
        id: "summer", heading: "April–June: hot but great value",
        body: [
          "Summers are hot, often very hot by midday, but you'll find far fewer crowds and better room rates. If you visit in summer, sightsee in the early morning and evening, stay hydrated, and retreat to an air-conditioned room in the afternoon. The fort and museums are still rewarding in the cooler hours.",
        ],
      },
      {
        id: "monsoon", heading: "July–September: green & quiet",
        body: [
          "The monsoon brings cooler air, green hills and full lakes, with short, dramatic showers rather than all-day rain. Crowds are thin and rates are low. It's an underrated, atmospheric time to visit — especially for the lakes, the rock park and post-rain photography.",
        ],
        image: A("kaylana-lake", "Kaylana Lake full during the Jodhpur monsoon"),
      },
      {
        id: "whenever", heading: "Whenever you visit",
        body: [
          "Whatever the season, a comfortable, central base makes all the difference. Hotel Siddhi Vinayak offers air-conditioned rooms near the station and old city, so you're well placed and comfortable in any weather.",
        ],
      },
    ],
    faqs: [
      { q: "What is the best month to visit Jodhpur?", a: "November to February offer the most pleasant weather for sightseeing. October and March are also excellent and slightly less crowded." },
      { q: "Is it worth visiting Jodhpur in summer?", a: "Yes, if you plan around the heat — sightsee early and late, stay hydrated, and book an air-conditioned room. You'll enjoy fewer crowds and lower rates." },
      { q: "Is the monsoon a good time to visit Jodhpur?", a: "It's underrated — green hills, full lakes, fewer crowds and good rates, with mostly short showers. Keep mornings for outdoor sights." },
    ],
    relatedAttractions: ["mehrangarh-fort", "kaylana-lake", "umaid-bhawan-palace", "toorji-ka-jhalra"],
    tags: ["seasons", "best time", "weather", "planning"],
  },
  {
    slug: "how-to-reach-hotel-siddhi-vinayak",
    title: "How to Reach Hotel Siddhi Vinayak, Jodhpur",
    metaTitle: "How to Reach Hotel Siddhi Vinayak — Jodhpur Station & Airport",
    metaDescription: "How to reach Hotel Siddhi Vinayak in Jodhpur by train, air, bus or car. We're about 350 m from Jodhpur Junction and 5 km from the airport, near Jalori Gate and the old city.",
    excerpt: "Arriving by train, flight, bus or car? Here's the easiest way to reach our hotel in the heart of Jodhpur, with pickup options.",
    date: "2026-04-12",
    updated: "2026-06-15",
    category: "Travel Tips",
    hero: B("jodhpur-railway-station", "Jodhpur Junction railway station, near Hotel Siddhi Vinayak"),
    intro: [
      "Hotel Siddhi Vinayak is conveniently located near Jodhpur Railway Station, opposite M.G. Hospital near Jalori Gate, making it easy to reach by any mode of transport. Here's how to get to us from wherever you're arriving — and how we can help.",
      "Wherever you land, share your arrival details with us on WhatsApp and we'll guide you in or arrange a pickup.",
    ],
    sections: [
      {
        id: "train", heading: "By train",
        body: [
          "Jodhpur Junction is one of the city's main stations and a hub for trains from Delhi, Jaipur, Ahmedabad and beyond. We're only about 350 metres away — a 5-minute walk or a 2-minute auto ride. It's the easiest and most popular way to reach us, and ideal for overnight trains.",
        ],
        image: B("jodhpur-railway-station", "Arriving at Jodhpur Junction railway station"),
      },
      {
        id: "air", heading: "By air",
        body: [
          "Jodhpur Airport (JDH) is about 5 km away, roughly a 20-minute drive, with direct flights from Delhi, Mumbai and other major cities. We can arrange a pickup on request — just send us your flight details in advance.",
        ],
        image: B("jodhpur-airport", "Jodhpur Airport, about 5 km from the hotel"),
      },
      {
        id: "road", heading: "By road & bus",
        body: [
          "Jodhpur is well connected by state and private buses, and the central bus stand is close by. If you're driving, smooth highways link Jodhpur to Jaipur (5–6 hrs), Udaipur (4–5 hrs) and Jaisalmer (5 hrs), and we offer free parking with EV charging for guests who arrive by car.",
        ],
      },
      {
        id: "pickup", heading: "Pickups & help on arrival",
        body: [
          "Our 24-hour front desk means you can arrive at any hour. Message us on WhatsApp with your train or flight details and we'll arrange a pickup or send clear directions, so getting here is the easy part of your trip.",
        ],
        image: HOTEL,
      },
    ],
    faqs: [
      { q: "How far is Hotel Siddhi Vinayak from Jodhpur railway station?", a: "About 350 metres — a 5-minute walk or 2-minute auto ride from Jodhpur Junction." },
      { q: "How far is the hotel from Jodhpur Airport?", a: "Around 5 km, roughly a 20-minute drive. We can arrange an airport pickup on request." },
      { q: "Can the hotel arrange a pickup?", a: "Yes. Share your train or flight details on WhatsApp and our 24-hour front desk will arrange a pickup or guide you in." },
    ],
    relatedAttractions: ["mehrangarh-fort", "clock-tower-sardar-market", "jaswant-thada"],
    tags: ["travel tips", "how to reach", "transport", "our hotel"],
  },
];

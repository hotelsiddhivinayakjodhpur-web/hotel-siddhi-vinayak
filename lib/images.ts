/**
 * PRODUCTION IMAGE MANIFEST — single source of truth for all real hotel photography.
 *
 * Status: SCAFFOLD. The app still uses the existing (placeholder) image URLs in
 * lib/data.ts and the page heroes. Once the real photos are dropped into the
 * paths below (see public/images/README.md), this manifest gets wired into
 * data.ts + the heroes and ALL stock images are removed in one pass.
 *
 * Rules:
 *  - All photos are WebP (1600px longest edge for heroes/full, ~1000px for cards/gallery).
 *  - Filenames are lowercase, hyphenated, descriptive + location for image SEO.
 *  - Every entry carries descriptive alt text (no "image of"/keyword stuffing).
 *  - width/height are intrinsic px so next/image reserves space (no layout shift).
 *  - All gallery/below-the-fold images are lazy-loaded (loading="lazy"); only the
 *    homepage hero uses priority.
 */

export type Img = { src: string; alt: string; width: number; height: number };

/** Open Graph / social share card — 1200×630, JPG for scraper compatibility. */
export const ogImage = "/og-image.jpg";

/** Hero images. The homepage hero is the only `priority` image on the site. */
export const hero = {
  home: {
    src: "/images/hero/hotel-siddhi-vinayak-exterior-jodhpur.webp",
    alt: "Hotel Siddhi Vinayak exterior at dusk in Jodhpur, Rajasthan",
    width: 1920,
    height: 1080,
  } satisfies Img,
  rooms: {
    src: "/images/hero/hotel-siddhi-vinayak-deluxe-room.webp",
    alt: "Deluxe room with queen bed at Hotel Siddhi Vinayak, Jodhpur",
    width: 1920,
    height: 1080,
  } satisfies Img,
  gallery: {
    src: "/images/property/hotel-siddhi-vinayak-lobby.webp",
    alt: "Reception and lobby at Hotel Siddhi Vinayak, Jodhpur",
    width: 1920,
    height: 1080,
  } satisfies Img,
  about: {
    src: "/images/property/hotel-siddhi-vinayak-facade.webp",
    alt: "Front facade of Hotel Siddhi Vinayak near Jodhpur railway station",
    width: 1920,
    height: 1080,
  } satisfies Img,
  contact: {
    src: "/images/property/hotel-siddhi-vinayak-entrance.webp",
    alt: "Entrance of Hotel Siddhi Vinayak in the heart of Jodhpur",
    width: 1920,
    height: 1080,
  } satisfies Img,
  attractions: {
    src: "/images/gallery/property/hotel-siddhi-vinayak-rooftop-view.webp",
    alt: "View of the Blue City from Hotel Siddhi Vinayak, Jodhpur",
    width: 1920,
    height: 1080,
  } satisfies Img,
};

/** Per-room galleries (first image is the room card/cover). */
export const roomImages: Record<string, Img[]> = {
  "deluxe-room": [
    { src: "/images/rooms/deluxe-room/deluxe-room-jodhpur-01.webp", alt: "Deluxe room with queen bed and AC at Hotel Siddhi Vinayak, Jodhpur", width: 1200, height: 800 },
    { src: "/images/rooms/deluxe-room/deluxe-room-jodhpur-02.webp", alt: "Deluxe room seating and work area, Hotel Siddhi Vinayak", width: 1200, height: 800 },
    { src: "/images/rooms/deluxe-room/deluxe-room-jodhpur-03.webp", alt: "Modern en-suite bathroom in the Deluxe room", width: 1200, height: 800 },
  ],
  "super-deluxe-room": [
    { src: "/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-01.webp", alt: "Super Deluxe room with king bed at Hotel Siddhi Vinayak, Jodhpur", width: 1200, height: 800 },
    { src: "/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-02.webp", alt: "Super Deluxe room sitting area and smart TV", width: 1200, height: 800 },
    { src: "/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-03.webp", alt: "Super Deluxe room bathroom with hot water", width: 1200, height: 800 },
  ],
  "family-suite": [
    { src: "/images/rooms/family-suite/family-suite-jodhpur-01.webp", alt: "Family Suite with king and twin beds at Hotel Siddhi Vinayak, Jodhpur", width: 1200, height: 800 },
    { src: "/images/rooms/family-suite/family-suite-jodhpur-02.webp", alt: "Family Suite lounge corner with city view", width: 1200, height: 800 },
    { src: "/images/rooms/family-suite/family-suite-jodhpur-03.webp", alt: "Family Suite second sleeping area", width: 1200, height: 800 },
  ],
};

/** Gallery page, grouped by the existing categories (Rooms / Property / Dining). */
export const galleryByCategory: Record<"Rooms" | "Property" | "Dining", Img[]> = {
  Rooms: [
    { src: "/images/gallery/rooms/deluxe-room-interior.webp", alt: "Deluxe room interior at Hotel Siddhi Vinayak, Jodhpur", width: 1000, height: 750 },
    { src: "/images/gallery/rooms/super-deluxe-room-king-bed.webp", alt: "Super Deluxe room with king bed", width: 1000, height: 1333 },
    { src: "/images/gallery/rooms/family-suite-city-view.webp", alt: "Family Suite with city view", width: 1000, height: 750 },
    { src: "/images/gallery/rooms/room-bathroom.webp", alt: "Clean modern bathroom", width: 1000, height: 1333 },
  ],
  Property: [
    { src: "/images/gallery/property/hotel-facade-jodhpur.webp", alt: "Hotel Siddhi Vinayak facade in Jodhpur", width: 1000, height: 750 },
    { src: "/images/gallery/property/lobby-reception.webp", alt: "Lobby and reception area", width: 1000, height: 750 },
    { src: "/images/gallery/property/hotel-rooftop-view.webp", alt: "Rooftop view of the Blue City", width: 1000, height: 1333 },
  ],
  Dining: [
    { src: "/images/gallery/dining/restaurant-interior.webp", alt: "In-house restaurant interior", width: 1000, height: 750 },
    { src: "/images/gallery/dining/breakfast-spread.webp", alt: "Breakfast service at Hotel Siddhi Vinayak", width: 1000, height: 750 },
  ],
};

/** Blog cover images keyed by post slug. */
export const blogImages: Record<string, Img> = {
  "top-things-to-do-in-jodhpur": { src: "/images/blog/top-things-to-do-in-jodhpur.webp", alt: "Mehrangarh Fort overlooking the Blue City of Jodhpur", width: 1200, height: 675 },
  "best-time-to-visit-jodhpur": { src: "/images/blog/best-time-to-visit-jodhpur.webp", alt: "Clock Tower and Sardar Market in Jodhpur", width: 1200, height: 675 },
  "how-to-reach-hotel-siddhi-vinayak": { src: "/images/blog/how-to-reach-hotel-siddhi-vinayak.webp", alt: "Street near Hotel Siddhi Vinayak close to Jodhpur railway station", width: 1200, height: 675 },
};

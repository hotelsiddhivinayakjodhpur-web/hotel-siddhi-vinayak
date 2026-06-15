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

/** Per-room-category galleries (first image is the room card/cover). Keys match
 *  the room slugs in lib/data.ts. Photos are auto-selected from the room-number
 *  folders in Drive per the category mapping in scripts/image-map.json. */
export const roomImages: Record<string, Img[]> = {
  "deluxe-room": [
    { src: "/images/rooms/deluxe-room/deluxe-room-jodhpur-01.webp", alt: "Deluxe Room with double bed and AC at Hotel Siddhi Vinayak, Jodhpur", width: 1400, height: 933 },
    { src: "/images/rooms/deluxe-room/deluxe-room-jodhpur-02.webp", alt: "Deluxe Room interior, Hotel Siddhi Vinayak Jodhpur", width: 1400, height: 933 },
    { src: "/images/rooms/deluxe-room/deluxe-room-jodhpur-03.webp", alt: "Modern en-suite bathroom in the Deluxe Room", width: 1400, height: 933 },
    { src: "/images/rooms/deluxe-room/deluxe-room-jodhpur-04.webp", alt: "Deluxe Room detail at Hotel Siddhi Vinayak", width: 1400, height: 933 },
  ],
  "super-deluxe-room": [
    { src: "/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-01.webp", alt: "Super Deluxe Room with king bed at Hotel Siddhi Vinayak, Jodhpur", width: 1400, height: 933 },
    { src: "/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-02.webp", alt: "Super Deluxe Room sitting area and smart TV", width: 1400, height: 933 },
    { src: "/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-03.webp", alt: "Super Deluxe Room en-suite bathroom", width: 1400, height: 933 },
    { src: "/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-04.webp", alt: "Super Deluxe Room detail, Hotel Siddhi Vinayak Jodhpur", width: 1400, height: 933 },
  ],
  "triple-deluxe-room": [
    { src: "/images/rooms/triple-deluxe-room/triple-deluxe-room-jodhpur-01.webp", alt: "Triple Deluxe Room sleeping three at Hotel Siddhi Vinayak, Jodhpur", width: 1400, height: 933 },
    { src: "/images/rooms/triple-deluxe-room/triple-deluxe-room-jodhpur-02.webp", alt: "Triple Deluxe Room interior, Hotel Siddhi Vinayak Jodhpur", width: 1400, height: 933 },
    { src: "/images/rooms/triple-deluxe-room/triple-deluxe-room-jodhpur-03.webp", alt: "Triple Deluxe Room en-suite bathroom", width: 1400, height: 933 },
  ],
  "family-four-bed-room": [
    { src: "/images/rooms/family-four-bed-room/family-four-bed-room-jodhpur-01.webp", alt: "Family Four Bed Room at Hotel Siddhi Vinayak, Jodhpur", width: 1400, height: 933 },
    { src: "/images/rooms/family-four-bed-room/family-four-bed-room-jodhpur-02.webp", alt: "Family Four Bed Room with two double beds", width: 1400, height: 933 },
    { src: "/images/rooms/family-four-bed-room/family-four-bed-room-jodhpur-03.webp", alt: "Family Four Bed Room en-suite bathroom", width: 1400, height: 933 },
  ],
};

/** Gallery page, grouped by category (Rooms / Property / Dining / Amenities). */
export type GalleryCat = "Rooms" | "Property" | "Dining" | "Amenities";
export const galleryByCategory: Record<GalleryCat, Img[]> = {
  Rooms: [
    { src: "/images/gallery/rooms/deluxe-room-interior.webp", alt: "Deluxe Room interior at Hotel Siddhi Vinayak, Jodhpur", width: 1280, height: 853 },
    { src: "/images/gallery/rooms/super-deluxe-room-king-bed.webp", alt: "Super Deluxe Room with king bed", width: 1280, height: 853 },
    { src: "/images/gallery/rooms/triple-deluxe-room.webp", alt: "Triple Deluxe Room sleeping three", width: 1280, height: 853 },
    { src: "/images/gallery/rooms/family-four-bed-room.webp", alt: "Family Four Bed Room", width: 1280, height: 853 },
  ],
  Property: [
    { src: "/images/gallery/property/hotel-facade-jodhpur.webp", alt: "Hotel Siddhi Vinayak facade in Jodhpur", width: 1280, height: 853 },
    { src: "/images/gallery/property/lobby-reception.webp", alt: "Lobby and reception area", width: 1280, height: 853 },
    { src: "/images/gallery/property/hotel-corridor.webp", alt: "Hotel corridor and common area", width: 1280, height: 853 },
  ],
  Dining: [
    { src: "/images/gallery/dining/restaurant-interior.webp", alt: "In-house restaurant at Hotel Siddhi Vinayak, Jodhpur", width: 1280, height: 853 },
    { src: "/images/gallery/dining/restaurant-seating.webp", alt: "Restaurant dining and seating area", width: 1280, height: 853 },
  ],
  Amenities: [
    { src: "/images/gallery/amenities/reception.webp", alt: "24-hour reception desk", width: 1280, height: 853 },
    { src: "/images/gallery/amenities/parking.webp", alt: "Free on-site parking", width: 1280, height: 853 },
  ],
};

/** Blog cover images keyed by post slug. */
export const blogImages: Record<string, Img> = {
  "top-things-to-do-in-jodhpur": { src: "/images/blog/top-things-to-do-in-jodhpur.webp", alt: "Mehrangarh Fort overlooking the Blue City of Jodhpur", width: 1200, height: 675 },
  "best-time-to-visit-jodhpur": { src: "/images/blog/best-time-to-visit-jodhpur.webp", alt: "Clock Tower and Sardar Market in Jodhpur", width: 1200, height: 675 },
  "how-to-reach-hotel-siddhi-vinayak": { src: "/images/blog/how-to-reach-hotel-siddhi-vinayak.webp", alt: "Street near Hotel Siddhi Vinayak close to Jodhpur railway station", width: 1200, height: 675 },
};

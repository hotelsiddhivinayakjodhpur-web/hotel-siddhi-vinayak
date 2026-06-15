/**
 * PRODUCTION IMAGE MANIFEST — real Hotel Siddhi Vinayak photography.
 * Generated WebP masters live in public/images/** (see scripts/process-images.mjs).
 * next/image serves responsive mobile/tablet/desktop variants from these.
 */
export type Img = { src: string; alt: string; width: number; height: number };

export const ogImage = "/og-image.jpg";

export const hero = {
  home: { src: "/images/hero/hotel-siddhi-vinayak-exterior-jodhpur.webp", alt: "Hotel Siddhi Vinayak exterior in Jodhpur, Rajasthan", width: 1920, height: 1080 } satisfies Img,
  rooms: { src: "/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-01.webp", alt: "Super Deluxe room at Hotel Siddhi Vinayak, Jodhpur", width: 1400, height: 933 } satisfies Img,
  gallery: { src: "/images/gallery/property/hotel-02.webp", alt: "Hotel Siddhi Vinayak, Jodhpur", width: 1280, height: 853 } satisfies Img,
  about: { src: "/images/gallery/property/hotel-01.webp", alt: "Hotel Siddhi Vinayak building in Jodhpur", width: 1280, height: 853 } satisfies Img,
  contact: { src: "/images/hero/hotel-siddhi-vinayak-exterior-jodhpur.webp", alt: "Hotel Siddhi Vinayak entrance, Jodhpur", width: 1920, height: 1080 } satisfies Img,
  restaurant: { src: "/images/gallery/dining/restaurant-01.webp", alt: "Restaurant at Hotel Siddhi Vinayak, Jodhpur", width: 1280, height: 853 } satisfies Img,
};

export const roomImages: Record<string, Img[]> = {
  "deluxe-room": [
    { src: "/images/rooms/deluxe-room/deluxe-room-jodhpur-01.webp", alt: "Deluxe Room at Hotel Siddhi Vinayak, Jodhpur", width: 1400, height: 933 },
    { src: "/images/rooms/deluxe-room/deluxe-room-jodhpur-02.webp", alt: "Deluxe Room interior, Hotel Siddhi Vinayak Jodhpur", width: 1400, height: 933 },
    { src: "/images/rooms/deluxe-room/deluxe-room-jodhpur-03.webp", alt: "Deluxe Room bathroom, Hotel Siddhi Vinayak", width: 1400, height: 933 },
    { src: "/images/rooms/deluxe-room/deluxe-room-jodhpur-04.webp", alt: "Deluxe Room detail, Hotel Siddhi Vinayak Jodhpur", width: 1400, height: 933 },
    { src: "/images/rooms/deluxe-room/deluxe-room-jodhpur-05.webp", alt: "Deluxe Room view, Hotel Siddhi Vinayak Jodhpur", width: 1400, height: 933 },
  ],
  "super-deluxe-room": [
    { src: "/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-01.webp", alt: "Super Deluxe Room at Hotel Siddhi Vinayak, Jodhpur", width: 1400, height: 933 },
    { src: "/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-02.webp", alt: "Super Deluxe Room interior, Hotel Siddhi Vinayak Jodhpur", width: 1400, height: 933 },
    { src: "/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-03.webp", alt: "Super Deluxe Room view, Hotel Siddhi Vinayak", width: 1400, height: 933 },
    { src: "/images/rooms/super-deluxe-room/super-deluxe-room-jodhpur-04.webp", alt: "Super Deluxe Room detail, Hotel Siddhi Vinayak Jodhpur", width: 1400, height: 933 },
  ],
  "triple-deluxe-room": [
    { src: "/images/rooms/triple-deluxe-room/triple-deluxe-room-jodhpur-01.webp", alt: "Triple Deluxe Room at Hotel Siddhi Vinayak, Jodhpur", width: 1400, height: 933 },
    { src: "/images/rooms/triple-deluxe-room/triple-deluxe-room-jodhpur-02.webp", alt: "Triple Deluxe Room interior, Hotel Siddhi Vinayak Jodhpur", width: 1400, height: 933 },
    { src: "/images/rooms/triple-deluxe-room/triple-deluxe-room-jodhpur-03.webp", alt: "Triple Deluxe Room bathroom, Hotel Siddhi Vinayak", width: 1400, height: 933 },
    { src: "/images/rooms/triple-deluxe-room/triple-deluxe-room-jodhpur-04.webp", alt: "Triple Deluxe Room detail, Hotel Siddhi Vinayak Jodhpur", width: 1400, height: 933 },
  ],
  "family-four-bed-room": [
    { src: "/images/rooms/family-four-bed-room/family-four-bed-room-jodhpur-01.webp", alt: "Family Four Bed Room at Hotel Siddhi Vinayak, Jodhpur", width: 1400, height: 933 },
    { src: "/images/rooms/family-four-bed-room/family-four-bed-room-jodhpur-02.webp", alt: "Family Four Bed Room interior, Hotel Siddhi Vinayak Jodhpur", width: 1400, height: 933 },
    { src: "/images/rooms/family-four-bed-room/family-four-bed-room-jodhpur-03.webp", alt: "Family Four Bed Room view, Hotel Siddhi Vinayak", width: 1400, height: 933 },
    { src: "/images/rooms/family-four-bed-room/family-four-bed-room-jodhpur-04.webp", alt: "Family Four Bed Room detail, Hotel Siddhi Vinayak Jodhpur", width: 1400, height: 933 },
  ],
};

export type GalleryCat = "Rooms" | "Property" | "Dining";
export const galleryByCategory: Record<GalleryCat, Img[]> = {
  Rooms: [
    roomImages["deluxe-room"][0],
    roomImages["super-deluxe-room"][0],
    roomImages["triple-deluxe-room"][0],
    roomImages["family-four-bed-room"][0],
    roomImages["super-deluxe-room"][1],
    roomImages["family-four-bed-room"][1],
  ],
  Property: [
    { src: "/images/gallery/property/hotel-01.webp", alt: "Hotel Siddhi Vinayak exterior, Jodhpur", width: 1280, height: 853 },
    { src: "/images/gallery/property/hotel-02.webp", alt: "Hotel Siddhi Vinayak building, Jodhpur", width: 1280, height: 853 },
    { src: "/images/gallery/property/hotel-03.webp", alt: "Hotel Siddhi Vinayak, opposite M.G. Hospital, Jodhpur", width: 1280, height: 853 },
  ],
  Dining: [
    { src: "/images/gallery/dining/restaurant-01.webp", alt: "In-house restaurant at Hotel Siddhi Vinayak, Jodhpur", width: 1280, height: 853 },
    { src: "/images/gallery/dining/restaurant-02.webp", alt: "Restaurant dining area, Hotel Siddhi Vinayak", width: 1280, height: 853 },
  ],
};

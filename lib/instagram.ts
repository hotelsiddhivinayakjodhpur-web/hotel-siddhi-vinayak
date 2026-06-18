// Real content from @hotel_siddhi_vinayak_jodhpur (via the connected Instagram
// Insights source). Reel poster frames are self-hosted; cards link to the live
// Instagram permalinks. Refresh by re-running scripts/fetch-instagram.mjs.
export type IgItem = { src: string; permalink: string; caption: string; likes: number };

export const instagramFeed: IgItem[] = [
  { src: "/images/instagram/feed/ig-1.webp", permalink: "https://www.instagram.com/reel/C8gTATYSRQv/", caption: "Umaid Bhawan Palace, Jodhpur", likes: 294 },
  { src: "/images/instagram/feed/ig-2.webp", permalink: "https://www.instagram.com/reel/C8WOUbztb_E/", caption: "Mandore Garden, Jodhpur", likes: 158 },
  { src: "/images/instagram/feed/ig-3.webp", permalink: "https://www.instagram.com/reel/C8oaY2wyej8/", caption: "Surpura Safari Park", likes: 77 },
  { src: "/images/instagram/feed/ig-4.webp", permalink: "https://www.instagram.com/reel/C8v_mWJt4s4/", caption: "Rao Jodha Desert Rock Park", likes: 60 },
  { src: "/images/instagram/feed/ig-5.webp", permalink: "https://www.instagram.com/reel/C89curJSCza/", caption: "Kaylana Lake in monsoon", likes: 48 },
  { src: "/images/instagram/feed/ig-6.webp", permalink: "https://www.instagram.com/reel/C9UzTwzSo56/", caption: "Near the railway station", likes: 30 },
];

// "Discover Jodhpur" — original attraction reels by the hotel.
export const jodhpurReels: (IgItem & { name: string })[] = [
  { name: "Umaid Bhawan Palace", src: "/images/instagram/attractions/umaid-bhawan.webp", permalink: "https://www.instagram.com/reel/C8gTATYSRQv/", caption: "A grand 20th-century palace, part royal residence and museum.", likes: 294 },
  { name: "Mandore Garden", src: "/images/instagram/attractions/mandore.webp", permalink: "https://www.instagram.com/reel/C8WOUbztb_E/", caption: "Historic gardens, cenotaphs and the ancient capital of Marwar.", likes: 158 },
  { name: "Surpura Safari Park", src: "/images/instagram/attractions/surpura.webp", permalink: "https://www.instagram.com/reel/C8oaY2wyej8/", caption: "Wildlife and nature just outside the city.", likes: 77 },
  { name: "Kaylana Lake", src: "/images/instagram/attractions/kaylana-lake.webp", permalink: "https://www.instagram.com/reel/C89curJSCza/", caption: "A serene lake — especially beautiful in the monsoon.", likes: 48 },
  { name: "The Blue City", src: "/images/instagram/attractions/blue-city.webp", permalink: "https://www.instagram.com/reel/DK863Mvzq-1/", caption: "The famous indigo streets of old Jodhpur.", likes: 18 },
];

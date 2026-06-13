# Hotel Siddhi Vinayak — Official Website

Production-ready luxury hotel website built with **Next.js 15, TypeScript, Tailwind CSS & Framer Motion**.

## Pages
Home · Rooms · Gallery · About · Contact · FAQ · Blog · Nearby Attractions

## Features
- WhatsApp booking button + Click-to-call (floating)
- Inquiry form that opens a pre-filled WhatsApp message
- Google Maps embed
- Hotel, LocalBusiness & FAQ JSON-LD schema
- Full SEO metadata + OpenGraph/Twitter cards
- Dynamic `sitemap.xml` and `robots.txt`

## Getting Started
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Configure your hotel details
Edit **`lib/config.ts`** — phone, WhatsApp number, email, address, geo
coordinates, Google Maps embed URL, prices and social links. Everything
else updates automatically.

Edit **`lib/data.ts`** for rooms, gallery images, FAQs, attractions and blog posts.

## Replace images
The demo uses Unsplash images. Swap the URLs in `lib/data.ts` and the page
heroes with your own hotel photos (upload to `/public` and reference as `/your-photo.jpg`).
Add `public/og-image.jpg` (1200×630) for social sharing.

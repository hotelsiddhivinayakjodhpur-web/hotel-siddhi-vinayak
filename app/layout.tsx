import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Self-hosted via next/font — no render-blocking Google Fonts request (CWV win),
// no layout shift (size-adjust fallback), premium luxury pairing.
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import StickyMobileBar from "@/components/StickyMobileBar";
import SocialBar from "@/components/SocialBar";
import { LocalBusinessSchema } from "@/components/Schema";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Best Hotel in Jodhpur, Rajasthan`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Hotel Siddhi Vinayak", "hotels in Jodhpur", "budget hotel Jodhpur",
    "hotel near Jodhpur railway station", "Jodhpur accommodation", "stay in Jodhpur Rajasthan",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Best Hotel in Jodhpur`,
    description: site.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Hotel Siddhi Vinayak — budget hotel near Jodhpur Railway Station" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Jodhpur`,
    description: site.description,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <LocalBusinessSchema />
        <Navbar />
        {/* pb on mobile reserves space for the sticky bottom action bar */}
        <main className="pb-16 sm:pb-0">{children}</main>
        <Footer />
        <FloatingButtons />
        <StickyMobileBar />
        <SocialBar />
      </body>
    </html>
  );
}

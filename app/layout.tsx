import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
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
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: site.name }],
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
    <html lang="en">
      <body>
        <LocalBusinessSchema />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}

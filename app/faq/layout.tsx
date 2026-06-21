import type { Metadata } from "next";
import { FaqSchema, BreadcrumbSchema } from "@/components/Schema";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Frequently Asked Questions",
  description:
    "FAQs for Hotel Siddhi Vinayak, Jodhpur — check-in/out times, early check-in, distance from the railway station and airport, room types, parking, food, payment and booking policies.",
  path: "/faq",
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FaqSchema />
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]} />
      {children}
    </>
  );
}

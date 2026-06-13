import type { Metadata } from "next";
import { FaqSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Hotel Siddhi Vinayak, Jodhpur — check-in times, location, Wi-Fi, parking, booking and more.",
  alternates: { canonical: "/faq" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FaqSchema />
      {children}
    </>
  );
}

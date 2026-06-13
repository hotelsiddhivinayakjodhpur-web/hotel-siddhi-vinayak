"use client";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { whatsappLink, callLink } from "@/lib/config";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <motion.a
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition"
      >
        <MessageCircle size={26} />
      </motion.a>
      <motion.a
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.55, type: "spring" }}
        href={callLink}
        aria-label="Call hotel"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink shadow-lg hover:scale-110 transition"
      >
        <Phone size={24} />
      </motion.a>
    </div>
  );
}

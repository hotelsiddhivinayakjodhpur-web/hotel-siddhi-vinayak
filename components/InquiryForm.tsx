"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/config";

export default function InquiryForm() {
  const [form, setForm] = useState({
    name: "", phone: "", checkin: "", checkout: "", guests: "2", room: "Deluxe Room", message: "",
  });
  const [sent, setSent] = useState(false);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `New Booking Inquiry — Hotel Siddhi Vinayak%0A%0AName: ${form.name}%0APhone: ${form.phone}%0ACheck-in: ${form.checkin}%0ACheck-out: ${form.checkout}%0AGuests: ${form.guests}%0ARoom: ${form.room}%0AMessage: ${form.message}`;
    window.open(whatsappLink(decodeURIComponent(msg)), "_blank");
    setSent(true);
  };

  const field = "w-full rounded-lg border border-gold/30 bg-white px-4 py-3 text-ink outline-none focus:border-gold focus:ring-1 focus:ring-gold";

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl bg-sand p-6 sm:p-8 shadow-xl"
    >
      <h3 className="font-serif text-2xl text-ink">Send an Inquiry</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <input required placeholder="Full Name" value={form.name} onChange={(e) => update("name", e.target.value)} className={field} />
        <input required placeholder="Phone Number" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={field} />
        <div>
          <label className="block text-xs text-ink/60 mb-1">Check-in</label>
          <input type="date" required value={form.checkin} onChange={(e) => update("checkin", e.target.value)} className={field} />
        </div>
        <div>
          <label className="block text-xs text-ink/60 mb-1">Check-out</label>
          <input type="date" required value={form.checkout} onChange={(e) => update("checkout", e.target.value)} className={field} />
        </div>
        <select value={form.guests} onChange={(e) => update("guests", e.target.value)} className={field}>
          {["1", "2", "3", "4", "5+"].map((g) => <option key={g}>{g}</option>)}
        </select>
        <select value={form.room} onChange={(e) => update("room", e.target.value)} className={field}>
          {["Deluxe Room", "Super Deluxe Room", "Family Suite"].map((r) => <option key={r}>{r}</option>)}
        </select>
      </div>
      <textarea placeholder="Any special requests?" rows={3} value={form.message} onChange={(e) => update("message", e.target.value)} className={field} />
      <button type="submit" className="rounded-full bg-gold px-6 py-3 font-medium text-ink transition hover:bg-gold-dark hover:text-white">
        Send via WhatsApp
      </button>
      {sent && <p className="text-center text-sm text-green-700">Opening WhatsApp… If nothing happens, please call us directly.</p>}
    </motion.form>
  );
}

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/config";
import { rooms } from "@/lib/data";

export default function InquiryForm() {
  const [form, setForm] = useState({
    name: "", phone: "", checkin: "", checkout: "", guests: "2", room: "Deluxe Room", message: "",
  });
  const [sent, setSent] = useState(false);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 1) Save the lead + trigger AiSensy WhatsApp (guest thank-you + hotel alert).
    //    Fire-and-forget so the UX is instant; failures are handled server-side.
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "booking", source: "inquiry-form", ...form, roomType: form.room }),
    }).catch(() => {});
    // 2) Also open the guest's own WhatsApp chat (guest-initiated message).
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
        <div>
          <label htmlFor="iq-name" className="block text-xs text-ink/60 mb-1">Full Name <span className="text-gold-dark">*</span></label>
          <input id="iq-name" name="name" autoComplete="name" required placeholder="Your name" value={form.name} onChange={(e) => update("name", e.target.value)} className={field} />
        </div>
        <div>
          <label htmlFor="iq-phone" className="block text-xs text-ink/60 mb-1">Phone Number <span className="text-gold-dark">*</span></label>
          <input id="iq-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="+91 …" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={field} />
        </div>
        <div>
          <label htmlFor="iq-checkin" className="block text-xs text-ink/60 mb-1">Check-in <span className="text-gold-dark">*</span></label>
          <input id="iq-checkin" name="checkin" type="date" required value={form.checkin} onChange={(e) => update("checkin", e.target.value)} className={field} />
        </div>
        <div>
          <label htmlFor="iq-checkout" className="block text-xs text-ink/60 mb-1">Check-out <span className="text-gold-dark">*</span></label>
          <input id="iq-checkout" name="checkout" type="date" required value={form.checkout} onChange={(e) => update("checkout", e.target.value)} className={field} />
        </div>
        <div>
          <label htmlFor="iq-guests" className="block text-xs text-ink/60 mb-1">Guests</label>
          <select id="iq-guests" name="guests" value={form.guests} onChange={(e) => update("guests", e.target.value)} className={field}>
            {["1", "2", "3", "4", "5+"].map((g) => <option key={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="iq-room" className="block text-xs text-ink/60 mb-1">Room Type</label>
          <select id="iq-room" name="room" value={form.room} onChange={(e) => update("room", e.target.value)} className={field}>
            {rooms.map((r) => <option key={r.slug}>{r.name}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="iq-message" className="block text-xs text-ink/60 mb-1">Special requests</label>
        <textarea id="iq-message" name="message" placeholder="Early check-in, airport pickup, extra bed…" rows={3} value={form.message} onChange={(e) => update("message", e.target.value)} className={field} />
      </div>
      <button type="submit" className="rounded-full bg-gold px-6 py-3 font-medium text-ink transition hover:bg-gold-dark hover:text-white">
        Send via WhatsApp
      </button>
      <p className="text-center text-xs text-ink/55">Best rate guaranteed when you book direct · We usually reply within minutes</p>
      {sent && <p role="status" aria-live="polite" className="text-center text-sm text-green-700">Opening WhatsApp… If nothing happens, please call us directly.</p>}
    </motion.form>
  );
}

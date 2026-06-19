import Reveal from "./Reveal";

export default function SectionTitle({ eyebrow, title, subtitle, light = false }: { eyebrow?: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <Reveal className="text-center max-w-2xl mx-auto mb-12">
      {eyebrow && <p className="text-gold uppercase tracking-[0.3em] text-xs mb-3">{eyebrow}</p>}
      <h2 className={`font-serif text-3xl sm:text-4xl ${light ? "text-sand" : "text-ink"}`}>{title}</h2>
      <div className="lux-divider my-5" aria-hidden="true"><span className="lux-diamond" /></div>
      {subtitle && <p className={`${light ? "text-sand/70" : "text-ink/60"}`}>{subtitle}</p>}
    </Reveal>
  );
}

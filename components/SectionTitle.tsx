import Reveal from "./Reveal";

export default function SectionTitle({ eyebrow, title, subtitle, light = false }: { eyebrow?: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <Reveal className="text-center max-w-2xl mx-auto mb-12">
      {eyebrow && <p className={`font-semibold uppercase tracking-[0.3em] text-xs mb-3 ${light ? "text-gold" : "text-gold-dark"}`}>{eyebrow}</p>}
      <h2 className={`font-serif text-3xl sm:text-4xl lg:text-[2.75rem] ${light ? "text-sand" : "text-ink"}`}>{title}</h2>
      <div className="lux-divider my-5" aria-hidden="true"><span className="lux-diamond" /></div>
      {subtitle && <p className={`text-base leading-relaxed ${light ? "text-sand/80" : "text-ink/70"}`}>{subtitle}</p>}
    </Reveal>
  );
}

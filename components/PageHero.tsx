import Image from "next/image";
import Reveal from "./Reveal";

export default function PageHero({ title, subtitle, image }: { title: string; subtitle?: string; image: string }) {
  return (
    <section className="relative h-[55vh] min-h-[380px] flex items-center justify-center text-center">
      <Image src={image} alt={title} fill priority className="object-cover" />
      <div className="absolute inset-0 hero-overlay" />
      <Reveal className="relative z-10 px-6">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-sand">{title}</h1>
        {subtitle && <p className="mt-4 text-sand/80 max-w-xl mx-auto">{subtitle}</p>}
      </Reveal>
    </section>
  );
}

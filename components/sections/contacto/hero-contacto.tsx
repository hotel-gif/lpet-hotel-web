import { HeroBackground } from "@/components/hero-background";
import type { Dictionary } from "@/lib/i18n";

export function HeroContacto({ m }: { m: Dictionary }) {
  const t = m.contacto_page.hero;
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground
        src="/img/contacto.jpg"
        gradientClass="bg-gradient-to-b from-forest-dark/30 via-forest-dark/35 to-forest-dark/55"
      />

      <div className="container-wide text-center text-paper pt-24 pb-16">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-5 text-paper font-normal tracking-[0.03em]"
          style={{ fontFamily: "var(--font-serif), serif" }}
        >
          {t.title}
        </h1>
        <p
          className="text-lg md:text-2xl text-paper/95 font-normal"
          style={{ fontFamily: "var(--font-serif), serif" }}
        >
          {t.subtitle}
        </p>
      </div>
    </section>
  );
}

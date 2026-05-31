import { HeroBackground } from "@/components/hero-background";
import type { Dictionary } from "@/lib/i18n";

export function HeroEventos({ m }: { m: Dictionary }) {
  const t = m.eventos_page.hero;
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground
        src="/img/eventos-hero.jpg"
        gradientClass="bg-gradient-to-b from-forest-dark/35 via-forest-dark/40 to-forest-dark/55"
      />

      <div className="container-wide text-center text-paper pt-24 pb-16">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-paper font-normal tracking-[0.01em]"
          style={{ fontFamily: "var(--font-serif), serif" }}
        >
          {t.title}
        </h1>
      </div>
    </section>
  );
}

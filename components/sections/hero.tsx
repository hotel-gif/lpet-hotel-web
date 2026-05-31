import { HeroBackground } from "@/components/hero-background";
import type { Dictionary } from "@/lib/i18n";

export function Hero({ m }: { m: Dictionary }) {
  // Prefijo de assets para GitHub Pages (subpath). Vacío en local/Vercel/Cloudflare.
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const t = m.hero as {
    eyebrow: string;
    title: string;
    subtitle: string;
    lead: string;
    cta_primary: string;
    cta_secondary: string;
  };
  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden">
      <HeroBackground
        videoSources={[
          { src: `${base}/video/hero.webm`, type: "video/webm" },
          { src: `${base}/video/hero.mp4`, type: "video/mp4" },
        ]}
        poster={`${base}/video/hero-poster.webp`}
        gradientClass="bg-gradient-to-b from-forest-dark/15 via-transparent to-forest-dark/45"
      />

      <div className="container-wide text-center text-paper pb-24 md:pb-32 pt-32">
        {/* Subtitulo dentro del h1 (como span) para que la frase clave
            "Hotel boutique cerca de Bogota" forme parte del H1 (SEO), sin
            cambiar el diseno: titulo serif grande + subtitulo sans debajo. */}
        <h1 className="mb-8 text-paper font-normal">
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl whitespace-nowrap leading-[1.1] mb-4 tracking-[0.03em]">
            {t.title}
          </span>
          <span
            className="block text-lg md:text-2xl text-paper/95 font-normal"
            style={{ fontFamily: "var(--font-gotham), system-ui, sans-serif" }}
          >
            {t.subtitle}
          </span>
        </h1>
        <div className="w-16 h-px bg-paper/60 mx-auto mb-8" />
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://hotels.cloudbeds.com/reservation/i0wxBO"
            target="_blank"
            rel="noopener"
            className="btn btn-outline-light"
          >
            {t.cta_primary}
          </a>
        </div>
      </div>

      {/* Chevron animado — invita a hacer scroll */}
      <a
        href="#intro"
        aria-label="Desplázate hacia abajo"
        className="scroll-chevron absolute bottom-6 left-1/2 -translate-x-1/2 text-paper/85 hover:text-paper transition-colors"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}

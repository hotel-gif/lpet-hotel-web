import { HeroBackground } from "@/components/hero-background";
import { BookingBar } from "@/components/booking-bar";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Hero({ m, locale }: { m: Dictionary; locale: Locale }) {
  // Prefijo de assets para GitHub Pages (subpath). Vacío en local/Vercel/Cloudflare.
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const t = m.hero as {
    eyebrow: string;
    title: string;
    subtitle: string;
    lead: string;
    cta_primary: string;
    cta_secondary: string;
    book_checkin: string;
    book_checkout: string;
  };
  return (
    <section className="hero relative min-h-screen flex items-end justify-center overflow-hidden">
      <HeroBackground
        videoSources={[
          { src: `${base}/video/hero.webm`, type: "video/webm" },
          { src: `${base}/video/hero.mp4`, type: "video/mp4" },
        ]}
        poster={`${base}/video/hero-poster.webp`}
        gradientClass="bg-gradient-to-b from-forest-dark/15 via-transparent to-forest-dark/45"
      />

      {/* hero-inner: el rediseño lo desplaza y desvanece al hacer scroll (--hero-exit).
          El h1 lleva el titulo + la frase clave (SEO) en dos .line con entrada
          escalonada (line-reveal). */}
      <div className="hero-inner container-wide text-center text-paper pb-24 md:pb-32 pt-32">
        <h1 className="mb-8 text-paper font-normal">
          <span className="line">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl whitespace-normal md:whitespace-nowrap leading-[1.1] tracking-[0.03em]">
              {t.title}
            </span>
          </span>
          <span className="line">
            <span
              className="block text-lg md:text-2xl text-paper/95 font-normal"
              style={{ fontFamily: "var(--font-gotham), system-ui, sans-serif" }}
            >
              {t.subtitle}
            </span>
          </span>
        </h1>
        <div className="hero-sub w-16 h-px bg-paper/60 mx-auto mb-8" />
        {/* Reserva directa: el huésped elige fechas y el motor de Cloudbeds
            abre con esas fechas ya seleccionadas (antes era un botón en blanco). */}
        <div className="hero-actions flex justify-center">
          <BookingBar
            locale={locale}
            labels={{
              checkin: t.book_checkin,
              checkout: t.book_checkout,
              cta: t.cta_primary,
            }}
          />
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

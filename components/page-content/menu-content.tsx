"use client";

import { useEffect, useRef, useState } from "react";
import { SmartLink } from "@/components/smart-link";
import { MENU } from "@/lib/menu-data";
import type { Dictionary, Locale } from "@/lib/i18n";

// Prefijo para assets estáticos servidos desde /public en el export con basePath
// (GitHub Pages). En Vercel/local es "". Mismo patrón que components/sections/community.tsx.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const gotham = { fontFamily: "var(--font-gotham), sans-serif" } as const;
const serif = {
  fontFamily: "var(--font-serif), Baskervville, Georgia, serif",
} as const;

export function MenuContent({ m, locale }: { m: Dictionary; locale: Locale }) {
  const t = m.menu;
  const [active, setActive] = useState(MENU[0].id);
  const navRef = useRef<HTMLDivElement>(null);

  // Scroll-spy: marca como activa la sección visible para resaltar su chip.
  useEffect(() => {
    const sections = MENU.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Línea de disparo por debajo del header fijo + nav sticky.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Mantiene el chip activo centrado en el carril horizontal (solo mueve el
  // scroll del nav, nunca el de la página). Respeta prefers-reduced-motion.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const chip = nav.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (!chip) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const left = chip.offsetLeft - nav.clientWidth / 2 + chip.clientWidth / 2;
    nav.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  const pdfHref = `${BASE_PATH}/docs/menu-${locale === "en" ? "ingles" : "espanol"}.pdf`;

  return (
    <>
      {/* Banda superior oscura: da legibilidad al header fijo (texto blanco) y
          presenta la bienvenida + selector de idioma. */}
      <section className="relative bg-forest text-cream">
        <div className="container-wide pt-32 pb-14 md:pt-40 md:pb-20 text-center">
          <p
            className="text-gold text-[11px] md:text-xs tracking-[0.28em] uppercase mb-7"
            style={gotham}
          >
            {t.kicker}
          </p>

          {/* Selector de idioma tipo pill (ES | EN) — enlaza a la ruta espejo. */}
          <div className="mb-9 flex justify-center">
            <div
              role="group"
              aria-label={t.lang.aria}
              className="inline-flex items-center gap-1 rounded-full border border-cream/25 bg-cream/10 p-1 backdrop-blur-sm"
            >
              <SmartLink
                href="/menu"
                aria-current={locale === "es" ? "true" : undefined}
                className={`rounded-full px-5 py-1.5 text-xs font-medium tracking-[0.08em] transition-colors ${
                  locale === "es"
                    ? "bg-cream text-forest-dark"
                    : "text-cream/80 hover:text-cream"
                }`}
              >
                {t.lang.es}
              </SmartLink>
              <SmartLink
                href="/en/menu"
                aria-current={locale === "en" ? "true" : undefined}
                className={`rounded-full px-5 py-1.5 text-xs font-medium tracking-[0.08em] transition-colors ${
                  locale === "en"
                    ? "bg-cream text-forest-dark"
                    : "text-cream/80 hover:text-cream"
                }`}
              >
                {t.lang.en}
              </SmartLink>
            </div>
          </div>

          <h1 className="text-cream text-3xl md:text-5xl max-w-3xl mx-auto leading-tight">
            {t.welcome.title}
          </h1>
          <p
            className="mt-6 max-w-2xl mx-auto text-cream/85 text-base md:text-lg leading-[1.85]"
            style={gotham}
          >
            {t.welcome.body}
          </p>
        </div>
      </section>

      {/* Nav de secciones tipo chips, anclado y con scroll horizontal en móvil. */}
      <nav
        aria-label={t.nav_aria}
        className="sticky top-[86px] md:top-[94px] z-30 bg-paper/95 backdrop-blur-md border-b border-forest/10"
      >
        <style>{`.menu-chips::-webkit-scrollbar{display:none}`}</style>
        <div
          ref={navRef}
          className="menu-chips container-wide flex gap-2 overflow-x-auto py-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {MENU.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              data-chip={s.id}
              aria-current={active === s.id ? "true" : undefined}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-colors ${
                active === s.id
                  ? "bg-forest text-cream"
                  : "border border-forest/20 text-forest-dark hover:border-forest/40"
              }`}
              style={gotham}
            >
              {s.title[locale]}
            </a>
          ))}
        </div>
      </nav>

      {/* Secciones del menú. */}
      <div className="bg-paper">
        <div className="container-wide max-w-3xl py-14 md:py-20 flex flex-col gap-16 md:gap-20">
          {MENU.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-[150px] md:scroll-mt-[160px]">
              <header className="mb-8">
                <h2 className="text-2xl md:text-3xl text-forest-dark">{s.title[locale]}</h2>
                <div className="mt-3 h-px w-16 bg-gold" aria-hidden="true" />
                {s.note && (
                  <p className="mt-4 text-sm italic text-forest/70" style={gotham}>
                    {s.note[locale]}
                  </p>
                )}
              </header>

              {s.layout === "cards" ? (
                <div className="flex flex-col divide-y divide-forest/10">
                  {s.items.map((it, i) => (
                    <article key={i} className="py-5 first:pt-0">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-lg md:text-xl text-forest-dark leading-snug">
                          {it.name[locale]}
                        </h3>
                        {it.price && (
                          <span
                            className="shrink-0 text-gold font-medium text-base md:text-lg"
                            style={gotham}
                          >
                            {it.price}
                          </span>
                        )}
                      </div>
                      {it.desc && (
                        <p
                          className="mt-1.5 text-sm md:text-[15px] leading-relaxed text-forest/75"
                          style={gotham}
                        >
                          {it.desc[locale]}
                        </p>
                      )}
                      {it.addon && (
                        <p className="mt-1.5 text-xs md:text-sm text-forest/60" style={gotham}>
                          {it.addon[locale]}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <ul className="flex flex-col gap-3.5">
                  {s.items.map((it, i) => (
                    <li key={i} className="flex items-baseline gap-3">
                      <span className="text-forest-dark text-[15px] md:text-base" style={serif}>
                        {it.name[locale]}
                      </span>
                      <span
                        className="flex-1 border-b border-dotted border-forest/30 -translate-y-[3px]"
                        aria-hidden="true"
                      />
                      <span className="shrink-0 text-gold font-medium" style={gotham}>
                        {it.price}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>

      {/* Cierre: nota de precios, redes y enlace secundario al PDF. */}
      <div className="bg-cream border-t border-forest/10">
        <div className="container-wide max-w-3xl py-10 text-center flex flex-col items-center gap-4">
          <p className="text-xs md:text-sm text-forest/70" style={gotham}>
            {t.priceNote}
          </p>
          <p className="text-sm text-forest-dark" style={gotham}>
            {t.social}
          </p>
          <a
            href={pdfHref}
            target="_blank"
            rel="noopener"
            className="text-xs text-forest/50 underline underline-offset-4 hover:text-forest/80 transition-colors"
            style={gotham}
          >
            {t.pdf}
          </a>
        </div>
      </div>
    </>
  );
}

"use client";

import { SmartLink as Link } from "@/components/smart-link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { SOCIAL } from "@/lib/social";
import { reservationUrl } from "@/lib/booking";

export function SiteHeader({ m, locale }: { m: Dictionary; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prefijo de idioma: "" para español (raíz), "/en" para inglés.
  const prefix = locale === "en" ? "/en" : "";
  const home = prefix || "/";

  const reservationHref = reservationUrl(locale);

  // Normaliza el slash final: en el export estatico (GitHub Pages, trailingSlash)
  // usePathname() devuelve "/eventos/" pero los href son "/eventos" -> sin esto el
  // subrayado dorado de "pagina actual" no coincide en las subpaginas.
  const norm = (p: string) => p.replace(/\/+$/, "") || "/";

  const NAV = [
    { href: home, label: m.nav.home },
    { href: `${prefix}/alojamiento`, label: m.nav.accommodation },
    { href: `${prefix}/eventos`, label: m.nav.events },
    { href: `${prefix}/experiencias`, label: m.nav.experiences },
    { href: `${prefix}/matrimonios`, label: m.nav.weddings },
    { href: `${prefix}/contacto`, label: m.nav.contact },
  ];

  // Enlace al MISMO contenido en el otro idioma (rutas espejo).
  const pathNoLocale = pathname.replace(/^\/en/, "") || "/";
  const esHref = pathNoLocale;
  const enHref = pathNoLocale === "/" ? "/en" : `/en${pathNoLocale}`;

  // Paginas SIN hero oscuro (legales): el header debe ir solido desde arriba,
  // si no el texto blanco queda ilegible sobre el fondo claro.
  const heroless = /(?:^|\/)(terminos|politica-de-datos)\/?$/.test(pathname);
  const solid = scrolled || heroless;

  const linkColor = solid ? "text-forest-dark" : "text-white";
  const bg = solid
    ? "bg-paper/95 backdrop-blur-md shadow-[0_4px_24px_-8px_rgba(31,58,46,0.12)]"
    : "bg-transparent";

  const LangSwitch = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center gap-1.5 text-xs tracking-wide ${className}`}>
      <Link
        href={esHref}
        aria-label="Español"
        className={locale === "es" ? "font-bold" : "opacity-60 hover:opacity-100"}
      >
        ES
      </Link>
      <span className="opacity-40">|</span>
      <Link
        href={enHref}
        aria-label="English"
        className={locale === "en" ? "font-bold" : "opacity-60 hover:opacity-100"}
      >
        EN
      </Link>
    </div>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bg}`}>
      <div className="header-enter container-wide flex items-center justify-between py-4">
        <Link href={home} className="flex min-w-0 items-center shrink-0">
          {/* width/height = proporcion REAL del SVG (viewBox 521.92x153.91). Con los
              valores viejos (186x64) el navegador usaba igual el ratio del archivo y
              el logo salia mas ancho de lo previsto: en iPhone se comia media
              pantalla y quedaba pegado al boton de menu. */}
          <Image
            src={solid ? "/img/logo-dark.svg" : "/img/logo.svg"}
            alt="La Palma y El Tucán"
            width={522}
            height={154}
            priority
            className="h-11 sm:h-12 md:h-16 w-auto transition-opacity duration-300"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-[15px]">
          {NAV.map((item) => {
            const isActive = norm(pathname) === norm(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`${linkColor} transition-opacity ${
                  isActive
                    ? "font-medium underline decoration-gold decoration-2 underline-offset-8"
                    : "nav-underline"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <LangSwitch className={`hidden md:flex ${linkColor}`} />

          <div className="hidden md:flex items-center gap-3">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener"
                aria-label={s.label}
                className={`${linkColor} hover:opacity-70 transition-opacity`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>

          <a
            href={reservationHref}
            target="_blank"
            rel="noopener"
            className="hidden md:inline-flex btn btn-rose"
          >
            {m.nav.book}
          </a>

          <button
            onClick={() => setOpen(!open)}
            aria-label={locale === "en" ? "Menu" : "Menú"}
            aria-expanded={open}
            className={`lg:hidden flex flex-col gap-1.5 p-2 ${linkColor}`}
          >
            <span className={`block w-5 h-0.5 bg-current transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-current ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-current transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden bg-paper border-t border-forest/8 px-6 py-6 flex flex-col gap-4 shadow-soft">
          {NAV.map((item) => {
            const isActive = norm(pathname) === norm(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`text-lg ${
                  isActive
                    ? "text-forest font-medium underline decoration-gold decoration-2 underline-offset-4"
                    : "text-forest-dark"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={reservationHref}
            target="_blank"
            rel="noopener"
            className="btn btn-rose mt-3 self-start"
          >
            {m.nav.book}
          </a>
          <LangSwitch className="text-forest-dark mt-2" />
        </nav>
      )}
    </header>
  );
}

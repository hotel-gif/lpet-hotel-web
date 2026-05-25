"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";

const SOCIAL = [
  { href: "https://www.tiktok.com/@lapalmayeltucan_hotel", label: "TikTok", path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.94a8.16 8.16 0 0 0 4.77 1.52V7a4.85 4.85 0 0 1-1.84-.31z" },
  { href: "https://www.facebook.com/lapalmayeltucanboutiquehotel", label: "Facebook", path: "M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" },
  { href: "https://www.instagram.com/lapalmayeltucan_hotel/", label: "Instagram", path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.81.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.81-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.81-.25-2.23-.41a3.71 3.71 0 0 1-1.38-.9 3.71 3.71 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.81.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.55-.79.31-1.46.72-2.13 1.38C1.34 2.68.93 3.34.62 4.14.33 4.9.13 5.77.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.55 2.91.31.79.72 1.46 1.38 2.13.66.66 1.33 1.07 2.13 1.38.76.29 1.63.49 2.91.55C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.55a5.83 5.83 0 0 0 2.13-1.38 5.83 5.83 0 0 0 1.38-2.13c.29-.76.49-1.63.55-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.55-2.91a5.83 5.83 0 0 0-1.38-2.13A5.83 5.83 0 0 0 19.86.62c-.76-.29-1.63-.49-2.91-.55C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84ZM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4Zm6.4-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44Z" },
  { href: "https://www.linkedin.com/company/la-palma-y-el-tucan/", label: "LinkedIn", path: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.04c.48-.91 1.65-1.85 3.4-1.85 3.63 0 4.3 2.39 4.3 5.5v6.24ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" },
];

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

  const linkColor = scrolled ? "text-forest-dark" : "text-white";
  const bg = scrolled
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
      <div className="container-wide flex items-center justify-between py-4">
        <Link href={home} className="flex items-center shrink-0">
          <Image
            src="/img/logo.svg"
            alt="La Palma y El Tucán"
            width={140}
            height={48}
            priority
            className={`h-12 w-auto transition-[filter] duration-300 ${
              scrolled
                ? "[filter:brightness(0)]"
                : "[filter:brightness(0)_invert(1)]"
            }`}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={`${linkColor} hover:opacity-70 transition-opacity`}>
              {item.label}
            </Link>
          ))}
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
            href="https://hotels.cloudbeds.com/reservation/i0wxBO"
            target="_blank"
            rel="noopener"
            className={`hidden md:inline-flex btn ${scrolled ? "btn-outline-dark" : "btn-outline-light"}`}
          >
            {m.nav.book}
          </a>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
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
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-forest-dark text-lg">
              {item.label}
            </Link>
          ))}
          <a
            href="https://hotels.cloudbeds.com/reservation/i0wxBO"
            target="_blank"
            rel="noopener"
            className="btn btn-primary mt-3 self-start"
          >
            {m.nav.book}
          </a>
          <LangSwitch className="text-forest-dark mt-2" />
        </nav>
      )}
    </header>
  );
}

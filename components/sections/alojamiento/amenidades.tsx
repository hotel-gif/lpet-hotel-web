"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n";

const ICONS: Record<string, React.ReactNode> = {
  mountain: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="18" r="4" />
      <path d="M6 50 L24 26 L34 38 L42 30 L58 50 Z" />
      <path d="M16 40 q4 -4 8 0 q4 4 8 0" />
    </svg>
  ),
  tub: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M44 22 v-6 a4 4 0 0 0 -8 0 v6" />
      <circle cx="40" cy="22" r="2.2" fill="currentColor" />
      <path d="M6 30 h52 v6 a8 8 0 0 1 -8 8 H14 a8 8 0 0 1 -8 -8 z" />
      <path d="M14 44 v6 M50 44 v6" />
    </svg>
  ),
  shower: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 18 h36 q4 0 4 4 v4 H10 v-4 q0 -4 4 -4 z" />
      <path d="M32 8 v10" />
      <path d="M18 34 v6 M26 34 v6 M32 36 v6 M38 34 v6 M46 34 v6" />
      <path d="M22 46 v4 M30 48 v4 M38 46 v4 M44 48 v4" />
    </svg>
  ),
  safe: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="2" />
      <circle cx="32" cy="32" r="10" />
      <path d="M27 32 l4 4 l6 -8" />
      <path d="M14 18 v4 M14 42 v4 M50 18 v4 M50 42 v4" />
    </svg>
  ),
  deck: (
    // Baranda de terraza con tablones de madera (un "deck"/balcón).
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 24 h48" />
      <path d="M8 24 v20 M56 24 v20" />
      <path d="M18 24 v14 M30 24 v14 M42 24 v14" />
      <path d="M6 44 h52" />
      <path d="M12 50 h40 M16 56 h32" />
    </svg>
  ),
  net: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="8" width="48" height="48" />
      <path d="M8 22 L56 22 M8 36 L56 36 M8 50 L56 50" />
      <path d="M22 8 L22 56 M36 8 L36 56 M50 8 L50 56" />
      <circle cx="44" cy="44" r="4" fill="currentColor" />
    </svg>
  ),
  bed: (
    // Cama de perfil con almohada (ropa de cama / lencería de lujo).
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 28 V46 H56 V40" />
      <path d="M8 40 H50 Q56 40 56 46" />
      <path d="M13 40 v-4 a3 3 0 0 1 3 -3 h7 a3 3 0 0 1 3 3 v4" />
      <path d="M8 46 v5 M56 46 v5" />
    </svg>
  ),
  minibar: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="16" y="6" width="32" height="52" rx="2" />
      <path d="M16 26 h32" />
      <path d="M22 16 v4 M22 36 v8" />
    </svg>
  ),
  sandals: (
    // Chancla / flip-flop vista desde arriba (correa en Y).
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 8 C 21 8 17 18 17 32 C 17 46 23 56 32 56 C 41 56 47 46 47 32 C 47 18 43 8 32 8 Z" />
      <path d="M32 15 L25 27 M32 15 L39 27 M25 27 Q32 31 39 27" />
    </svg>
  ),
  hanger: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 18 a4 4 0 1 1 4 -4" />
      <path d="M32 18 L8 44 h48 z" />
    </svg>
  ),
};

function AmenidadItem({
  label,
  icon,
  delay,
}: {
  label: string;
  icon: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`stagger-item flex flex-col items-center text-center ${
        shown ? "is-shown" : ""
      }`}
      style={{ ["--stagger-delay" as string]: `${delay}ms` }}
    >
      <div className="text-forest-dark mb-3 w-14 h-14 md:w-16 md:h-16">
        {ICONS[icon]}
      </div>
      <p
        className="text-sm md:text-base text-forest-dark/85"
        style={{ fontFamily: "var(--font-gotham), sans-serif" }}
      >
        {label}
      </p>
    </div>
  );
}

export function Amenidades({ m }: { m: Dictionary }) {
  const t = m.alojamiento.amenidades;

  return (
    <section className="bg-[#dde3e0] py-20 md:py-28">
      <div className="container-wide">
        <h2
          className="text-center text-3xl md:text-5xl text-forest-dark font-normal mb-14 md:mb-20"
          style={{ fontFamily: "var(--font-serif), serif" }}
        >
          {t.title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-12 gap-x-6 max-w-5xl mx-auto">
          {t.items.map((item, i) => (
            <AmenidadItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              delay={i * 130}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

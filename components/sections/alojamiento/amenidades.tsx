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
  towels: (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="12" y="14" width="40" height="36" rx="2" />
      <path d="M20 14 v36 M28 14 v36 M36 14 v36 M44 14 v36" />
      <path d="M12 22 h40 M12 42 h40" />
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
    // Alpargata vista de perfil (calzado de tela slip-on).
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 40 q-1 -10 11 -13 q7 -2 12 2 q7 5 19 7 q5 1 5 6 q0 5 -6 5 H16 q-8 0 -8 -7 z" />
      <path d="M19 29 q9 -3 16 2" />
      <path d="M8 50 q4 4 12 4 h28 q5 0 6 -4" />
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

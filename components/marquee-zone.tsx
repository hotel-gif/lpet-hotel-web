"use client";

import { useRef, type ReactNode } from "react";

/**
 * Envuelve un carrusel marquee (.marquee-track) y lo RALENTIZA (no lo detiene)
 * al pasar el cursor o enfocar con teclado, usando la Web Animations API
 * (playbackRate) para que la desaceleracion sea suave y sin saltos.
 * Si el JS no corre o hay prefers-reduced-motion (animacion CSS = none),
 * simplemente no hace nada.
 */
const HOVER_RATE = 0.9; // solo 10% más lento al interactuar (sigue fluyendo)

export function MarqueeZone({
  children,
  className = "",
  id,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function setRate(rate: number) {
    const track = ref.current?.querySelector<HTMLElement>(".marquee-track");
    track?.getAnimations().forEach((a) => {
      a.playbackRate = rate;
    });
  }

  return (
    <div
      ref={ref}
      id={id}
      className={`marquee-zone ${className}`}
      tabIndex={0}
      aria-label={ariaLabel}
      onMouseEnter={() => setRate(HOVER_RATE)}
      onMouseLeave={() => setRate(1)}
      onFocus={() => setRate(HOVER_RATE)}
      onBlur={() => setRate(1)}
    >
      {children}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type VideoSource = { src: string; type: string };

type Props = {
  /** Imagen de fondo (cuando no hay video). */
  src?: string;
  /** Fuentes de video (WebM primero, MP4 fallback). Si se pasan, se usa <video> en vez de <Image>. */
  videoSources?: VideoSource[];
  /** Poster del video (se pinta al instante mientras carga). También sirve de fallback. */
  poster?: string;
  priority?: boolean;
  /** Tailwind classes para el gradient overlay (sin posicionamiento). */
  gradientClass?: string;
  /** Intensidad del parallax (0 = sin parallax, 0.3 = imagen scrollea al 70% del ritmo). */
  speed?: number;
};

export function HeroBackground({
  src,
  videoSources,
  poster,
  priority = true,
  gradientClass = "bg-gradient-to-b from-forest-dark/30 via-forest-dark/35 to-forest-dark/55",
  speed = 0.3,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const hasVideo = !!videoSources && videoSources.length > 0;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // El parallax mueve el contenedor en cada frame de scroll. Sobre un <video>
    // que se está decodificando eso causa tirones (jank), así que lo omitimos.
    if (hasVideo) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          const y = window.scrollY;
          // Solo aplica mientras el hero está cerca del viewport
          if (y < window.innerHeight * 1.5) {
            ref.current.style.transform = `translate3d(0, ${y * speed}px, 0)`;
          }
        }
        raf = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed, hasVideo]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div ref={ref} className={`absolute inset-0 ${hasVideo ? "" : "will-change-transform"}`}>
        {hasVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            aria-hidden="true"
          >
            {videoSources!.map((v) => (
              <source key={v.src} src={v.src} type={v.type} />
            ))}
          </video>
        ) : (
          <Image
            src={src!}
            alt=""
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover hero-kenburns"
          />
        )}
      </div>
      <div className={`absolute inset-0 ${gradientClass}`} />
    </div>
  );
}

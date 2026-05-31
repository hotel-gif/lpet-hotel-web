"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number; // ms
  className?: string;
  /**
   * Si true (default), re-anima al volver al viewport y se atenua sutilmente al
   * salir (salida + re-entrada). Si false, es one-shot (revela una sola vez).
   */
  repeat?: boolean;
  /** Salida suave (no se desvanece del todo): para secciones de fondo a color. */
  softExit?: boolean;
}

/**
 * Envuelve cualquier sección. Al entrar al viewport agrega `in-view` (fade-in +
 * slide-up, definido en globals.css). En modo repeat, al salir COMPLETAMENTE del
 * viewport agrega `is-leaving` (atenuado sutil) y reanima al volver.
 * Tiene red de seguridad: si el observer nunca dispara, revela igual.
 */
export function AnimateOnScroll({
  children,
  delay = 0,
  className = "",
  repeat = false,
  softExit = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Red de seguridad: si el observer nunca dispara (JS lento/error), revela.
    const safety = window.setTimeout(() => setShown(true), 1200);
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          clearTimeout(safety);
          const reveal = () => {
            setShown(true);
            setLeaving(false);
          };
          if (delay > 0) setTimeout(reveal, delay);
          else reveal();
          if (!repeat) obs.disconnect(); // one-shot solo si repeat=false
        } else if (repeat && entry.intersectionRatio === 0) {
          // Solo al salir COMPLETAMENTE del viewport (evita parpadeo en bordes).
          setLeaving(true);
        }
      },
      { threshold: [0, 0.12], rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearTimeout(safety);
    };
  }, [delay, repeat]);

  return (
    <div
      ref={ref}
      data-repeat={repeat ? "true" : undefined}
      data-reveal={softExit ? "soft" : undefined}
      className={`scroll-fade ${shown && !leaving ? "in-view" : ""} ${
        leaving ? "is-leaving" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

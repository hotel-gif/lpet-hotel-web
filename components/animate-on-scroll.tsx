"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number; // ms
  className?: string;
  /**
   * Si true (default): al entrar al viewport revela (fade + blur-in) y, mientras
   * SALE por el borde superior (aun parcialmente visible), se atenua suave (~70%,
   * no desaparece) y reanima al volver a bajar. Si false, one-shot.
   */
  repeat?: boolean;
  /** Salida aun mas sutil (secciones de fondo a color): atenua menos. */
  softExit?: boolean;
}

/**
 * Envuelve cualquier seccion. Dos IntersectionObservers:
 *  - Entrada: al asomar ~12% desde abajo agrega `in-view` (fade + blur-in).
 *  - Salida VISIBLE (modo repeat, default): cuando el borde superior de la seccion
 *    cruza una linea ~12% desde arriba del viewport (es decir, mientras se va por
 *    arriba y AUN se ve), agrega `is-leaving` (atenuado suave). Al bajar de vuelta,
 *    reanima. Solo atenua si la seccion ya se habia revelado.
 * Sin IntersectionObserver, revela igual (red de seguridad).
 */
export function AnimateOnScroll({
  children,
  delay = 0,
  className = "",
  repeat = true,
  softExit = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [leaving, setLeaving] = useState(false);
  // Persiste entre callbacks sin recrear el efecto: marca si llego a revelarse.
  const hasShown = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    // ── Observer de ENTRADA: revela al asomar desde abajo (o al volver desde arriba).
    const reveal = () => {
      hasShown.current = true;
      setShown(true);
      setLeaving(false);
    };
    const obsIn = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (delay > 0) setTimeout(reveal, delay);
          else reveal();
          if (!repeat) obsIn.disconnect(); // one-shot solo si repeat=false
        }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );
    obsIn.observe(el);

    // ── Observer de SALIDA (solo repeat): atenua SOLO cuando la seccion ya casi se
    //    fue por arriba, es decir cuando su borde INFERIOR sube por encima del centro
    //    del viewport (la seccion ocupa <50% superior). Asi el contenido que lees
    //    sigue nitido; el atenuado es solo de la "cola" que se va. Linea = centro.
    let obsOut: IntersectionObserver | null = null;
    if (repeat) {
      obsOut = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          if (!hasShown.current) return; // aun no revelada: no atenuar
          const center = (window.innerHeight || 0) * 0.5;
          if (e.isIntersecting) {
            // La seccion cruza el centro -> aun ocupa buena parte: nitida.
            setLeaving(false);
            setShown(true);
          } else if (e.boundingClientRect.bottom < center) {
            // Su parte baja ya subio por encima del centro -> casi fuera: atenua.
            setLeaving(true);
          } else {
            // Esta por debajo del centro (entrando / totalmente visible): nitida.
            setLeaving(false);
          }
        },
        // Linea de disparo en el centro vertical del viewport (root de altura ~0).
        { threshold: 0, rootMargin: "-50% 0px -50% 0px" }
      );
      obsOut.observe(el);
    }

    return () => {
      obsIn.disconnect();
      obsOut?.disconnect();
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

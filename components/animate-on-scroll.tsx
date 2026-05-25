"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number; // ms
  className?: string;
}

/**
 * Envuelve cualquier sección. Cuando entra al viewport, agrega clase `in-view`
 * que activa la transición fade-in + slide-up (definida en globals.css).
 * Una sola vez: una vez que entró ya no se reanima.
 */
export function AnimateOnScroll({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setShown(true), delay);
          } else {
            setShown(true);
          }
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`scroll-fade ${shown ? "in-view" : ""} ${className}`}>
      {children}
    </div>
  );
}

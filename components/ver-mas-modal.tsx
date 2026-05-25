"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  /** Texto del botón (ej. "Ver más"). */
  label: string;
  /** Título que se muestra en el modal. */
  title: string;
  /** Párrafo de detalle. */
  detail: string;
};

/**
 * Botón "Ver más" que abre un modal editorial (tarjeta blanca centrada,
 * título serif, línea divisoria, párrafo y botón de cierre).
 * Replica el comportamiento del sitio original de La Palma y El Tucán.
 */
export function VerMasButton({ label, title, detail }: Props) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  const onOpen = () => {
    setClosing(false);
    setOpen(true);
  };
  // Inicia la animación de salida; el desmontaje real ocurre en onAnimationEnd.
  // Si el usuario prefiere menos movimiento, no hay animación → cerramos al instante.
  const requestClose = () => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setOpen(false);
      setClosing(false);
      return;
    }
    setClosing(true);
  };
  // Llamado cuando termina la animación de la tarjeta.
  const handleAnimEnd = () => {
    if (closing) {
      setOpen(false);
      setClosing(false);
    }
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKey);
    // Bloquea el scroll del body mientras el modal está abierto
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="border border-paper text-paper px-8 py-2 text-sm tracking-[0.05em] hover:bg-paper hover:text-forest-dark transition-colors backdrop-blur-sm bg-forest-dark/20"
        style={{ fontFamily: "var(--font-gotham), sans-serif" }}
      >
        {label}
      </button>

      {open && mounted && createPortal(
        <div
          className={`fixed inset-0 z-[10000] flex items-center justify-center p-5 bg-forest-dark/55 backdrop-blur-sm ${
            closing ? "modal-overlay-out" : "modal-overlay"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={requestClose}
        >
          <div
            className={`relative w-full max-w-lg bg-white px-8 py-12 md:px-14 md:py-16 text-center shadow-[0_30px_80px_-30px_rgba(18,34,24,0.5)] ${
              closing ? "modal-card-out" : "modal-card"
            }`}
            onClick={(e) => e.stopPropagation()}
            onAnimationEnd={handleAnimEnd}
          >
            <button
              type="button"
              onClick={requestClose}
              aria-label="Cerrar"
              className="absolute top-4 right-4 md:top-5 md:right-5 text-forest-dark/60 hover:text-forest-dark transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <h3
              className="text-2xl md:text-3xl lg:text-4xl text-forest-dark leading-[1.2]"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              {title}
            </h3>
            <div className="mt-6 mb-7 w-24 h-px mx-auto" style={{ backgroundColor: "#a14a5a" }} />
            <p
              className="text-base md:text-lg leading-[1.8] text-forest-dark/85"
              style={{ fontFamily: "var(--font-gotham), sans-serif" }}
            >
              {detail}
            </p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

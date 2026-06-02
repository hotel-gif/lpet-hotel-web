"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  /** Ruta al PDF (ya con basePath si aplica). */
  src: string;
  /** Texto del botón (ej. "Instrucciones de llegada"). */
  label: string;
};

/**
 * Botón que abre el PDF de indicaciones de llegada DENTRO de una ventana
 * (modal con el PDF embebido), en vez de descargarlo. Reusa la animación de
 * modal del sitio (modal-overlay / modal-card). En móviles donde el visor
 * embebido no funciona, el enlace "Abrir en pestaña nueva" sirve de respaldo.
 */
export function ComoLlegarModal({ src, label }: Props) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  const onOpen = () => {
    setClosing(false);
    setOpen(true);
  };
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
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // #view=FitH: el visor ajusta el PDF al ancho disponible.
  const viewerSrc = `${src}#view=FitH`;

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="btn btn-outline-light mb-12 inline-flex items-center gap-2"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="16" y2="17" />
        </svg>
        {label}
      </button>

      {open &&
        mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 bg-forest-dark/55 backdrop-blur-sm ${
              closing ? "modal-overlay-out" : "modal-overlay"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            onClick={requestClose}
          >
            <div
              className={`relative w-full max-w-4xl h-[85vh] flex flex-col bg-white overflow-hidden rounded-xl shadow-[0_30px_80px_-30px_rgba(18,34,24,0.5)] ${
                closing ? "modal-card-out" : "modal-card"
              }`}
              onClick={(e) => e.stopPropagation()}
              onAnimationEnd={handleAnimEnd}
            >
              {/* Barra superior: título + abrir en pestaña + cerrar */}
              <div className="flex items-center justify-between gap-4 px-4 md:px-6 py-3 border-b border-forest-dark/10 shrink-0">
                <span
                  className="text-sm md:text-base text-forest-dark/85"
                  style={{ fontFamily: "var(--font-gotham), sans-serif" }}
                >
                  {label}
                </span>
                <div className="flex items-center gap-4">
                  <a
                    href={src}
                    target="_blank"
                    rel="noopener"
                    className="text-xs md:text-sm text-forest underline underline-offset-4 hover:text-forest-dark transition-colors whitespace-nowrap"
                    style={{ fontFamily: "var(--font-gotham), sans-serif" }}
                  >
                    Abrir en pestaña nueva ↗
                  </a>
                  <button
                    type="button"
                    onClick={requestClose}
                    aria-label="Cerrar"
                    className="text-forest-dark/60 hover:text-forest-dark transition-colors"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* PDF embebido */}
              <iframe
                src={viewerSrc}
                title={label}
                className="flex-1 w-full bg-[#525659]"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

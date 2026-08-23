"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ResenaGoogle } from "@/lib/google-reviews";

const STARS_GOLD = "#c9a227";
const TEXT_DARK = "#352d2a";
const BORDER_LIGHT = "#e8e3da";
const QUOTE_BORDER = "#a14a5a";
const SERIF = "var(--font-serif), 'Baskervville', Georgia, serif";
const SANS = "var(--font-gotham), 'Lato', system-ui, sans-serif";

/** Cada cuánto avanza el carrusel. */
const INTERVALO = 6500;
/** Duración del fundido de salida y entrada. */
const FUNDIDO = 420;

/**
 * Rotador de opiniones: muestra dos a la vez y avanza de una en una, así la
 * pareja visible siempre cambia sin que la última página quede coja cuando el
 * número de reseñas es impar (Google devuelve 5).
 *
 * Se detiene al pasar el cursor o al enfocar con el teclado, y no se mueve
 * solo si el sistema pide movimiento reducido.
 */
export function ReviewsCarousel({
  resenas,
  textoAnterior,
  textoSiguiente,
}: {
  resenas: ResenaGoogle[];
  textoAnterior: string;
  textoSiguiente: string;
}) {
  const [inicio, setInicio] = useState(0);
  const [visible, setVisible] = useState(true);
  const [pausado, setPausado] = useState(false);
  const [animar, setAnimar] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = resenas.length;

  // Respeta la preferencia del sistema: sin movimiento automático ni fundido.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const aplicar = () => setAnimar(!mq.matches);
    aplicar();
    mq.addEventListener("change", aplicar);
    return () => mq.removeEventListener("change", aplicar);
  }, []);

  const mover = useCallback(
    (paso: number) => {
      if (total <= 2) return;
      if (!animar) {
        setInicio((i) => (i + paso + total) % total);
        return;
      }
      // Fundido de salida, cambio de contenido, fundido de entrada.
      setVisible(false);
      window.setTimeout(() => {
        setInicio((i) => (i + paso + total) % total);
        setVisible(true);
      }, FUNDIDO);
    },
    [total, animar],
  );

  useEffect(() => {
    if (pausado || !animar || total <= 2) return;
    timer.current = setTimeout(() => mover(1), INTERVALO);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [inicio, pausado, animar, total, mover]);

  if (!total) return null;

  // Ventana de dos: cuando solo hay una reseña, se muestra sola.
  const parVisible =
    total === 1 ? [resenas[0]] : [resenas[inicio], resenas[(inicio + 1) % total]];

  return (
    <div
      style={{ maxWidth: "980px", margin: "24px auto 0" }}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{
          gap: "24px",
          opacity: visible ? 1 : 0,
          transition: animar ? `opacity ${FUNDIDO}ms ease` : "none",
          transform: visible ? "translateX(0)" : "translateX(-14px)",
        }}
        aria-live="polite"
      >
        {parVisible.map((r, i) => (
          <article
            key={`${inicio}-${i}`}
            className="relative flex flex-col"
            style={{
              background: "#fff",
              padding: "34px 28px",
              borderLeft: `3px solid ${QUOTE_BORDER}`,
              gap: "16px",
              boxShadow: "0 6px 20px rgba(53,45,42,0.05)",
              minHeight: "260px",
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: "4px",
                left: "16px",
                fontFamily: SERIF,
                fontSize: "3.5rem",
                color: BORDER_LIGHT,
                lineHeight: 1,
              }}
            >
              &ldquo;
            </span>

            <p
              style={{
                fontFamily: SERIF,
                fontStyle: "italic",
                fontSize: "1.05rem",
                lineHeight: 1.55,
                color: TEXT_DARK,
                position: "relative",
                zIndex: 1,
              }}
            >
              {r.texto.length > 300 ? `${r.texto.slice(0, 300)}…` : r.texto}
            </p>

            {/* Atribución exigida por la licencia de Google. */}
            <div className="flex items-center gap-3 mt-auto pt-2">
              {r.foto && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={r.foto}
                  alt=""
                  width={36}
                  height={36}
                  loading="lazy"
                  style={{ borderRadius: "50%", flexShrink: 0 }}
                />
              )}
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: SANS, fontSize: "0.9rem", color: TEXT_DARK }}>
                  {r.perfil ? (
                    <a href={r.perfil} target="_blank" rel="noopener noreferrer">
                      {r.autor}
                    </a>
                  ) : (
                    r.autor
                  )}
                </div>
                <div style={{ fontFamily: SANS, fontSize: "0.78rem", color: "#666" }}>
                  <span style={{ color: STARS_GOLD, letterSpacing: "1px" }}>
                    {"★".repeat(r.estrellas)}
                  </span>{" "}
                  · {r.cuando}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {total > 2 && (
        <div className="flex items-center justify-center gap-4" style={{ marginTop: "20px" }}>
          <button
            type="button"
            onClick={() => mover(-1)}
            aria-label={textoAnterior}
            style={botonEstilo}
          >
            ‹
          </button>

          <div className="flex items-center gap-2">
            {resenas.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => mover(i - inicio)}
                aria-label={`${i + 1} / ${total}`}
                aria-current={i === inicio}
                style={{
                  width: i === inicio ? "18px" : "7px",
                  height: "7px",
                  borderRadius: "4px",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  background: i === inicio ? QUOTE_BORDER : "#c6c0b6",
                  transition: "width .3s ease, background .3s ease",
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => mover(1)}
            aria-label={textoSiguiente}
            style={botonEstilo}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

const botonEstilo = {
  width: "34px",
  height: "34px",
  borderRadius: "50%",
  border: `1px solid ${BORDER_LIGHT}`,
  background: "#fff",
  color: TEXT_DARK,
  fontSize: "1.3rem",
  lineHeight: 1,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
} as const;

"use client";

import { useEffect, useState } from "react";

/**
 * Skeleton overlay que cubre la pantalla hasta que window.onload dispara.
 * Fade out de 450ms y desmonta. Safety timeout de 1.5s.
 */
export function PageLoadOverlay() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let safetyTimer: NodeJS.Timeout;
    function startFadeOut() {
      setFading(true);
      setTimeout(() => setVisible(false), 500);
    }
    if (document.readyState === "complete") {
      const t = setTimeout(startFadeOut, 200);
      return () => clearTimeout(t);
    }
    function onLoad() {
      setTimeout(startFadeOut, 250);
    }
    window.addEventListener("load", onLoad, { once: true });
    safetyTimer = setTimeout(startFadeOut, 1500);
    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(safetyTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`page-load-overlay ${fading ? "fading-out" : ""}`}
      aria-busy="true"
      aria-live="polite"
    >
      {/* Header skeleton */}
      <div className="px-6 md:px-12 py-5 flex items-center justify-between max-w-[1280px] mx-auto">
        <div className="shimmer" style={{ width: 140, height: 40 }} />
        <div className="hidden lg:flex gap-7">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="shimmer" style={{ width: 72, height: 12 }} />
          ))}
        </div>
        <div className="shimmer" style={{ width: 100, height: 36, borderRadius: 999 }} />
      </div>

      {/* Hero skeleton */}
      <div className="relative h-[60vh] md:h-[70vh] mx-6 md:mx-12 mt-2 flex items-end justify-center pb-20">
        <div
          className="absolute inset-0 shimmer"
          style={{ borderRadius: 0 }}
        />
        <div className="relative z-10 text-center px-6 max-w-3xl w-full flex flex-col items-center gap-4">
          <div className="shimmer" style={{ width: "min(80%,520px)", height: 48 }} />
          <div className="shimmer" style={{ width: "min(60%,320px)", height: 22, marginTop: 8 }} />
          <div className="shimmer" style={{ width: 56, height: 1, opacity: 0.5, marginTop: 16 }} />
          <div className="shimmer" style={{ width: 160, height: 44, borderRadius: 999, marginTop: 8 }} />
        </div>
      </div>

      {/* Section placeholder cards */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mt-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="shimmer w-full aspect-[4/5]" />
        <div className="flex flex-col gap-3">
          <div className="shimmer" style={{ width: "70%", height: 36 }} />
          <div className="shimmer" style={{ width: 80, height: 2, marginTop: 8, marginBottom: 12 }} />
          <div className="shimmer" style={{ width: "100%", height: 14 }} />
          <div className="shimmer" style={{ width: "100%", height: 14 }} />
          <div className="shimmer" style={{ width: "90%", height: 14 }} />
        </div>
      </div>
    </div>
  );
}

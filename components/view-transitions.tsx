"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Envuelve las navegaciones internas de <Link>/<a> en
 * document.startViewTransition() para tener una transicion de SALIDA + entrada
 * real entre paginas. Si el navegador no soporta la View Transitions API o el
 * usuario prefiere menos movimiento, NO intercepta: la navegacion es normal y
 * queda el route-fade-in de globals.css como fallback (gated por html:not(.vt)).
 */
function supportsVT(): boolean {
  return (
    typeof document !== "undefined" &&
    typeof (document as Document & { startViewTransition?: unknown })
      .startViewTransition === "function"
  );
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function ViewTransitions() {
  const router = useRouter();

  useEffect(() => {
    if (!supportsVT()) return; // fallback: navegacion normal + route-fade-in

    // Marca <html> para que el CSS desactive el route-fade-in (la VT lo maneja).
    document.documentElement.classList.add("vt");

    function onClick(e: MouseEvent) {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;

      const targetEl = e.target as Element | null;
      const anchor = targetEl
        ? (targetEl.closest("a[href]") as HTMLAnchorElement | null)
        : null;
      if (!anchor) return;

      const target = anchor.getAttribute("target");
      if (target && target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      if (anchor.getAttribute("rel")?.includes("external")) return;
      if (anchor.dataset.noVt !== undefined) return; // escotilla manual

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return; // externo
      // mismo path (solo cambia el hash) -> deja el scroll/ancla nativo
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      )
        return;

      if (prefersReducedMotion()) return; // sin animacion -> navegacion nativa

      e.preventDefault();
      const href = url.pathname + url.search + url.hash;
      const doc = document as Document & {
        startViewTransition: (cb: () => void) => { finished: Promise<void> };
      };
      doc.startViewTransition(() => {
        router.push(href);
      });
    }

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.documentElement.classList.remove("vt");
    };
  }, [router]);

  return null;
}

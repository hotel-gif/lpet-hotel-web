"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Envuelve el contenido de cada ruta. Cambiar `key` cuando cambia el pathname
 * fuerza a React a remontar el árbol, lo que dispara la animación CSS
 * `.route-shell` (fade-in + slide-up suave) en cada navegación.
 */
export function RouteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="route-shell">
      {children}
    </div>
  );
}

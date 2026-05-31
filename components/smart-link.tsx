"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

/**
 * Link interno seguro para el export estatico de GitHub Pages.
 *
 * Bug: Next App Router con `output: export` + `basePath` INTERCEPTA el clic
 * (incluso en <a> planos) y antepone el basePath a un href que YA lo tiene
 * -> navega a …/lpet-hotel-web/lpet-hotel-web/eventos y da 404. La navegacion
 * normal del navegador (window.location) si funciona.
 *
 * Por eso, SOLO en el build con basePath (GitHub Pages) renderizamos un <a> con
 * la URL correcta (basePath + trailing slash) y en el onClick FORZAMOS
 * window.location, evitando el router roto. En local/dev y SSR (sin basePath)
 * usamos <Link> nativo y se conserva la navegacion SPA.
 */
export function SmartLink({ href, children, onClick, ...rest }: Props) {
  const isInternalPath = href.startsWith("/");

  if (BASE_PATH && isInternalPath) {
    const path = href === "/" ? "/" : href.replace(/\/$/, "") + "/";
    const full = `${BASE_PATH}${path}`;
    const handle = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      // Respeta clic-medio, ctrl/cmd-clic, etc. (abrir en pestana nueva).
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      // Gana al interceptor del router: navegacion real del navegador.
      e.preventDefault();
      e.stopPropagation();
      window.location.assign(full);
    };
    return (
      <a href={full} onClickCapture={handle} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}

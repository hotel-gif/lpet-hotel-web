"use client";

import { useEffect, useRef } from "react";

/**
 * Inserta un formulario de Bitrix24 en la página.
 *
 * Bitrix entrega su formulario como un script que se auto-inyecta donde se
 * coloca. En React no basta con pegar ese fragmento: hay que crear el elemento
 * a mano tras el montaje, porque el HTML puesto con `dangerouslySetInnerHTML`
 * nunca ejecuta sus scripts.
 *
 * El script se carga solo cuando el bloque entra en pantalla. La página de
 * contacto pesa lo suyo y este recurso viene de los servidores de Bitrix: si se
 * cargara de entrada retrasaría el primer dibujado en móvil, que es el 83% de
 * las visitas.
 *
 * Los datos entran directo al CRM: no pasan por el sitio ni por `/api/crm`.
 * Los campos, los textos y el destino en el embudo se configuran en Bitrix.
 */
export function BitrixForm({
  formId,
  securityCode,
  portal = "b28223031",
  className,
}: {
  /** Número del formulario en Bitrix (el del `loader_N.js`). */
  formId: number | string;
  /** Código público del formulario, visible en su script de inserción. */
  securityCode: string;
  /** Identificador del portal en el CDN de Bitrix. */
  portal?: string;
  className?: string;
}) {
  const contenedor = useRef<HTMLDivElement>(null);
  const yaCargado = useRef(false);

  useEffect(() => {
    const nodo = contenedor.current;
    if (!nodo || yaCargado.current) return;

    const cargar = () => {
      if (yaCargado.current) return;
      yaCargado.current = true;

      const s = document.createElement("script");
      s.async = true;
      // Bitrix usa este atributo para saber qué formulario dibujar y dónde.
      s.setAttribute("data-b24-form", `inline/${formId}/${securityCode}`);
      s.setAttribute("data-skip-moving", "true");
      // El sufijo cambia cada 3 minutos: es la caché que recomienda Bitrix,
      // suficiente para que un cambio de campos se vea pronto sin recargar el
      // archivo en cada visita.
      s.src =
        `https://cdn.bitrix24.es/${portal}/crm/form/loader_${formId}.js` +
        `?${Math.floor(Date.now() / 180000)}`;
      nodo.appendChild(s);
    };

    // Sin IntersectionObserver (navegadores viejos), se carga de una vez.
    if (typeof IntersectionObserver === "undefined") {
      cargar();
      return;
    }

    const obs = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          cargar();
          obs.disconnect();
        }
      },
      // Empieza a cargar un poco antes de que el formulario se vea, para que
      // esté listo cuando el visitante llegue.
      { rootMargin: "300px" },
    );
    obs.observe(nodo);
    return () => obs.disconnect();
  }, [formId, securityCode, portal]);

  return <div ref={contenedor} className={className} />;
}

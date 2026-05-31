import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";

export function Community({ m }: { m: Dictionary }) {
  const t = m.community as {
    title: string;
    cta: string;
  };

  return (
    <section
      id="comunidad"
      className="relative text-paper overflow-hidden"
      style={{ backgroundColor: "#445f56" }}
    >
      <div className="container-wide py-20 md:py-28 text-center">
        {/* Título */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl mb-8 leading-[1.15] text-paper">
          {t.title}
        </h2>

        {/* Línea decorativa horizontal larga */}
        <div className="w-32 md:w-48 h-px bg-paper/40 mx-auto mb-12" />

        {/* Botón Instrucciones de llegada */}
        <a
          href="#mapa"
          className="btn btn-outline-light mb-16"
        >
          {t.cta}
        </a>

        {/* Mapa */}
        <div id="mapa" className="relative max-w-3xl mx-auto aspect-[826/1024]">
          <Image
            src="/img/mapa.jpg"
            alt="Mapa del hotel cerca de Bogotá en Zipacón — La Palma y El Tucán"
            fill
            sizes="(min-width: 768px) 800px, 100vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}

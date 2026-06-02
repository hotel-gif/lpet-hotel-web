import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";

export function Community({ m }: { m: Dictionary }) {
  // Prefijo de assets para GitHub Pages (subpath). Vacío en local/Vercel.
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
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

        {/* Botón: descarga el PDF de indicaciones de llegada */}
        <a
          href={`${base}/docs/como-llegar-lpet-hotel.pdf`}
          download
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {t.cta}
        </a>

        {/* Mapa — acotado para que quepa en una sola pantalla */}
        <div
          id="mapa"
          className="relative mx-auto aspect-[826/1024] w-full max-w-sm max-h-[70vh]"
        >
          <Image
            src="/img/mapa.jpg"
            alt="Mapa del hotel cerca de Bogotá en Zipacón — La Palma y El Tucán"
            fill
            sizes="(min-width: 768px) 384px, 100vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}

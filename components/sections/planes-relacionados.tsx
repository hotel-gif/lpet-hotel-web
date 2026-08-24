import Image from "next/image";

/**
 * Enlaces a las landings de planes (`public/<slug>/`).
 *
 * Existen desde hace meses y hasta ahora ninguna página del sitio las
 * enlazaba: Google solo llegaba a ellas por el sitemap y las trataba como
 * páginas huérfanas — cero impresiones en 90 días (Search Console, 24-ago-2026).
 * Esta sección les da entradas reales desde las páginas del tema que les toca.
 *
 * Se usa `<a>` y no `<Link>` a propósito: las landings son HTML estáticos que
 * Next sirve por *rewrite*, no rutas del App Router. El router de Next
 * intentaría resolverlas como página React y fallaría; el navegador tiene que
 * hacer una navegación normal.
 *
 * Los textos van aquí y no en `messages/`: las landings solo existen en
 * español, así que la sección únicamente se monta en las páginas ES.
 */

export type Plan = {
  slug: string;
  titulo: string;
  texto: string;
  imagen: string;
};

/** Catálogo único, para que los textos no se dupliquen por página. */
export const PLANES: Record<string, Plan> = {
  bodas: {
    slug: "bodas-en-finca",
    titulo: "Bodas en finca cafetera",
    texto: "Ceremonia al aire libre entre cafetales, a 90 minutos de Bogotá.",
    imagen: "/img/matrimonios-2.jpg",
  },
  corporativos: {
    slug: "eventos-corporativos-finca",
    titulo: "Eventos corporativos",
    texto: "Reuniones, retiros y team building en el bosque de niebla.",
    imagen: "/img/eventos-1.jpg",
  },
  coffeeTour: {
    slug: "coffee-tour",
    titulo: "Coffee Tour",
    texto: "Un día completo en la finca, con transporte desde Bogotá y almuerzo.",
    imagen: "/img/tour-cafe-1.jpg",
  },
  aves: {
    slug: "birdwatching",
    titulo: "Avistamiento de aves",
    texto: "Más de 150 especies en bosque de niebla, con guía experto.",
    imagen: "/img/experiencia-aves.jpg",
  },
  romantica: {
    slug: "escapada-romantica",
    titulo: "Escapada romántica",
    texto: "Cabaña privada, tina y terraza con vista al bosque.",
    imagen: "/img/cabana-3.jpg",
  },
  escapadas: {
    slug: "escapadas-cerca-de-bogota",
    titulo: "Escapadas cerca de Bogotá",
    texto: "Desconéctate un fin de semana sin salir de Cundinamarca.",
    imagen: "/img/intro-hotel.jpg",
  },
};

export function PlanesRelacionados({
  planes,
  titulo = "Planes para tu visita",
  lead,
}: {
  planes: Plan[];
  titulo?: string;
  lead?: string;
}) {
  if (!planes.length) return null;

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "#e8e6df" }}>
      <div className="container-wide">
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl md:text-3xl mb-4 leading-tight">{titulo}</h2>
          {lead && <p className="text-ink-soft leading-relaxed">{lead}</p>}
        </div>

        <div
          className={`grid gap-6 ${
            planes.length === 1
              ? "md:grid-cols-1 max-w-md"
              : planes.length === 2
                ? "sm:grid-cols-2"
                : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {planes.map((p) => (
            <a
              key={p.slug}
              href={`/${p.slug}`}
              className="card-soft group flex flex-col overflow-hidden"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={p.imagen}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col gap-2">
                <h3 className="text-lg leading-snug text-forest-dark">{p.titulo}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{p.texto}</p>
                <span className="text-sm mt-2 text-forest group-hover:underline">
                  Ver el plan →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

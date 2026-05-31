import Image from "next/image";
import { MarqueeZone } from "@/components/marquee-zone";
import type { Dictionary } from "@/lib/i18n";

const PHOTOS = [
  "/img/cabana-1.jpg",
  "/img/cabana-2.jpg",
  "/img/cabana-3.jpg",
  "/img/cabana-4.jpg",
  "/img/cabana-5.jpg",
  "/img/cabana-6.jpg",
  "/img/cabana-7.jpg",
  "/img/cabana-8.jpg",
  "/img/cabana-9.jpg",
];

const LOOP_PHOTOS = [...PHOTOS, ...PHOTOS];

export function Cabanas({ m }: { m: Dictionary }) {
  const t = m.cabanas as {
    title: string;
    lead: string;
    intro_extra?: string;
    cta?: string;
  };

  return (
    <section
      id="cabanas"
      className="relative text-paper overflow-hidden"
      style={{ backgroundColor: "#445f56" }}
    >
      {/* Hojas decorativas — derecha grande */}
      <div
        aria-hidden
        className="hidden md:block absolute top-32 -right-20 md:top-40 md:-right-24 w-[450px] md:w-[700px] h-[450px] md:h-[700px] pointer-events-none z-0"
        style={{ transform: "rotate(-127deg)" }}
      >
        <Image
          src="/img/hojas.png"
          alt=""
          fill
          sizes="700px"
          className="object-contain leaf-animated"
        />
      </div>

      {/* Hojas decorativas — izquierda grande (espejada) */}
      <div
        aria-hidden
        className="hidden md:block absolute top-32 -left-20 md:top-40 md:-left-24 w-[450px] md:w-[700px] h-[450px] md:h-[700px] pointer-events-none z-0"
        style={{ transform: "rotate(53deg) scaleX(-1)" }}
      >
        <Image
          src="/img/hojas.png"
          alt=""
          fill
          sizes="700px"
          className="object-contain leaf-animated-2"
        />
      </div>

      {/* Texto a la izquierda, columna vacía a la derecha */}
      <div className="relative z-10 pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="container-wide grid md:grid-cols-2 gap-10 items-center">
          <div className="md:pr-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 leading-[1.1] text-paper whitespace-pre-line">
              {t.title}
            </h2>
            <div className="w-16 h-px bg-gold mb-8" />
            <p className="text-cream/90 leading-relaxed mb-5">{t.lead}</p>
            {t.intro_extra && (
              <p className="text-cream/90 leading-relaxed mb-10">{t.intro_extra}</p>
            )}
            <a href="#cabanas-galeria" className="btn btn-outline-light">
              {t.cta ?? "Ver cabañas"}
            </a>
          </div>
          <div className="hidden md:block" />
        </div>
      </div>

      {/* Carrusel infinito auto-scroll */}
      <MarqueeZone
        id="cabanas-galeria"
        className="relative z-10 pb-20 md:pb-28 pt-8 overflow-hidden"
        ariaLabel="Galería de cabañas — desplazamiento automático; pasa el cursor o enfoca para ralentizar"
      >
        <div className="marquee-track flex gap-4 md:gap-6">
          {LOOP_PHOTOS.map((src, i) => (
            <div
              key={i}
              className="hover-zoom shrink-0 w-[280px] sm:w-[340px] md:w-[420px] aspect-[3/4] relative rounded-2xl overflow-hidden"
            >
              <Image
                src={src}
                alt={`Cabaña La Palma y El Tucán ${(i % PHOTOS.length) + 1}`}
                fill
                sizes="(min-width: 768px) 420px, 280px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </MarqueeZone>
    </section>
  );
}

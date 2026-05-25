import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";

export function Sustainability({ m }: { m: Dictionary }) {
  const t = m.sustainability;
  return (
    <section
      id="sostenibilidad"
      className="relative text-paper overflow-hidden"
      style={{ backgroundColor: "#445f56" }}
    >
      {/* Hojas decorativas — izquierda grande */}
      <div
        aria-hidden
        className="absolute top-1/2 -translate-y-1/2 -left-24 md:-left-28 w-[400px] md:w-[600px] h-[400px] md:h-[600px] pointer-events-none z-0"
        style={{ transform: "translateY(-50%) rotate(45deg)" }}
      >
        <Image
          src="/img/hojas.png"
          alt=""
          fill
          sizes="600px"
          className="object-contain leaf-animated-3"
        />
      </div>

      {/* Hojas decorativas — derecha (más sutil) */}
      <div
        aria-hidden
        className="absolute top-1/2 -translate-y-1/2 -right-24 md:-right-28 w-[400px] md:w-[600px] h-[400px] md:h-[600px] pointer-events-none z-0 opacity-50"
        style={{ transform: "translateY(-50%) rotate(-135deg) scaleX(-1)" }}
      >
        <Image
          src="/img/hojas.png"
          alt=""
          fill
          sizes="600px"
          className="object-contain leaf-animated-4"
        />
      </div>

      {/* Contenido centrado */}
      <div className="relative z-10 py-20 md:py-28">
        {/* Ornamento decorativo superior */}
        <div className="container-wide text-center mb-8">
          <svg
            className="mx-auto opacity-70"
            width="60"
            height="20"
            viewBox="0 0 60 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 2C20 2 15 10 5 10C15 10 20 18 30 18C40 18 45 10 55 10C45 10 40 2 30 2Z"
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.6"
            />
            <circle cx="30" cy="10" r="1.5" fill="currentColor" opacity="0.6" />
          </svg>
        </div>

        <div className="container-wide max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-8 leading-[1.15] text-paper whitespace-pre-line">
            Nuestra{"\n"}sostenibilidad
          </h2>
          <p className="text-cream/90 leading-relaxed mb-5">{t.p1}</p>
          <p className="text-cream/90 leading-relaxed">{t.p2}</p>
        </div>

        {/* Ornamento decorativo inferior */}
        <div className="container-wide text-center mt-8">
          <svg
            className="mx-auto opacity-70"
            width="60"
            height="20"
            viewBox="0 0 60 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 2C20 2 15 10 5 10C15 10 20 18 30 18C40 18 45 10 55 10C45 10 40 2 30 2Z"
              stroke="currentColor"
              strokeWidth="0.8"
              opacity="0.6"
            />
            <circle cx="30" cy="10" r="1.5" fill="currentColor" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Banner ancho completo — min-height: 90vh como el original (#brxe-xqulbp) */}
      <div className="relative w-full min-h-[90vh] overflow-hidden">
        <Image
          src="/img/sostenibilidad.jpg"
          alt="La Palma y El Tucán Hotel"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={false}
        />
      </div>
    </section>
  );
}

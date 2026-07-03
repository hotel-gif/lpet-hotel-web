import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";

// Banda de reconocimiento — Tripadvisor Travelers' Choice 2026.
// Va justo debajo de la sección de reseñas (ver home-content.tsx).
export function TravelersChoice({ m }: { m: Dictionary }) {
  const t = m.travelersChoice;

  return (
    <section className="bg-forest text-cream py-16 md:py-24">
      <div className="container-wide">
        <div className="max-w-2xl mx-auto text-center px-4">
          {t.eyebrow ? (
            <p className="text-gold text-xs md:text-sm tracking-[0.28em] uppercase mb-8">
              {t.eyebrow}
            </p>
          ) : null}

          <Image
            src="/img/travelers-choice-2026.png"
            alt={t.badgeAlt}
            width={180}
            height={220}
            className="mx-auto h-auto w-[140px] md:w-[168px]"
          />

          <h2 className="text-3xl md:text-4xl mt-8 mb-5 leading-tight text-paper">
            {t.title}
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-7" />
          <p className="text-cream/80 leading-relaxed">{t.lead}</p>
        </div>
      </div>
    </section>
  );
}

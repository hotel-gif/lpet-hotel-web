import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { BitrixForm } from "@/components/bitrix-form";

export function Newsletter({ m }: { m: Dictionary }) {
  const t = m.newsletter;

  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#e8e6df" }}>
      {/* Container con padding lateral y vertical — NO full-bleed */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Wrapper con imagen de fondo y modal centrado */}
        <div className="relative min-h-[700px] md:min-h-[800px] overflow-hidden flex items-center justify-center">
          {/* Imagen de fondo panorámica */}
          <Image
            src="/img/newsletter-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            quality={90}
          />

          {/* Modal blanco */}
          <div className="relative z-10 max-w-2xl w-full mx-4 p-10 md:p-16 bg-white shadow-xl">
            <h2 className="text-2xl md:text-3xl lg:text-[2rem] text-center mb-6 leading-snug text-forest-dark">
              {t.title_part1}
              <strong className="font-bold">{t.title_highlight}</strong>
              {t.title_part2}
            </h2>
            <p className="text-sm md:text-base text-ink-soft text-center mb-10 leading-relaxed max-w-md mx-auto">
              {t.lead}
            </p>

            {/* Formulario nativo de Bitrix24 (ID 19, «Inscripcion Newsletter
                Pagina Web»). Los campos, el texto del botón y el mensaje de
                confirmación se configuran en Bitrix, sin tocar el sitio. */}
            <BitrixForm formId={19} securityCode="zhg9c3" />
          </div>
        </div>
      </div>
    </section>
  );
}

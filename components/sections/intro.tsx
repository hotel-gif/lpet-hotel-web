import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";

export function Intro({ m }: { m: Dictionary }) {
  const t = m.intro;
  return (
    <section id="intro" className="py-20 md:py-28 bg-cream">
      <div className="container-wide grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
        {/* Imagen izquierda — más pequeña, aspect cuadrado */}
        <div className="relative aspect-[4/5] max-w-md mx-auto md:max-w-none w-full overflow-hidden rounded-md">
          <Image
            src="/img/intro-hotel.jpg"
            alt="La Palma y El Tucán Hotel"
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover"
          />
        </div>

        {/* Texto derecha */}
        <div className="md:pl-4">
          <h2 className="text-4xl md:text-5xl mb-5 leading-tight">{t.title}</h2>
          <div className="w-16 h-px bg-gold mb-8" />
          <p className="text-ink-soft mb-5 leading-relaxed">{t.p1}</p>
          <p className="text-ink-soft leading-relaxed">{t.p2}</p>
        </div>
      </div>
    </section>
  );
}

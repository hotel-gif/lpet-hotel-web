import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";

export function Events({ m }: { m: Dictionary }) {
  const t = m.events;
  return (
    <section id="weddings" className="py-20 md:py-28">
      <div className="container-wide grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="img-rounded relative aspect-[4/5]">
          <Image
            src="/img/eventos.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl mb-6 leading-tight">{t.title}</h2>
          <p className="text-ink-soft mb-8 leading-relaxed">{t.lead}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary">{t.cta_weddings}</a>
            <a href="#events" className="btn btn-outline-dark">{t.cta_corporate}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

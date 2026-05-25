import Image from "next/image";
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
  "/img/hab-02.jpg",
  "/img/hab-06.jpg",
];

const LOOP_PHOTOS = [...PHOTOS, ...PHOTOS];

export function IntroAlojamiento({ m }: { m: Dictionary }) {
  const t = m.alojamiento.intro;

  return (
    <section className="bg-paper">
      <div className="container-wide pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="max-w-5xl">
          <p
            className="text-base md:text-lg leading-[1.85] text-forest-dark/85 mb-8"
            style={{ fontFamily: "var(--font-gotham), sans-serif" }}
          >
            {t.body}
          </p>
          <a
            href="https://hotels.cloudbeds.com/reservation/i0wxBO"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center bg-forest-dark text-paper px-9 py-3.5 text-sm tracking-[0.05em] hover:bg-forest transition-colors"
            style={{ fontFamily: "var(--font-gotham), sans-serif" }}
          >
            {t.cta}
          </a>
        </div>
      </div>

      <div className="relative overflow-hidden pb-16 md:pb-20">
        <div className="marquee-track flex gap-4 md:gap-6">
          {LOOP_PHOTOS.map((src, i) => (
            <div
              key={i}
              className="hover-zoom shrink-0 w-[280px] sm:w-[340px] md:w-[420px] aspect-[3/4] relative rounded-md overflow-hidden"
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
      </div>
    </section>
  );
}

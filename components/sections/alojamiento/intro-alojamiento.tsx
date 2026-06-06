import Image from "next/image";
import { MarqueeZone } from "@/components/marquee-zone";
import type { Dictionary, Locale } from "@/lib/i18n";
import { reservationUrl } from "@/lib/booking";

const PHOTOS = [
  "/img/habitacion-1.jpg",
  "/img/habitacion-2.jpg",
  "/img/habitacion-3.jpg",
  "/img/habitacion-4.jpg",
  "/img/habitacion-5.jpg",
  "/img/habitacion-6.jpg",
  "/img/habitacion-7.jpg",
  "/img/habitacion-8.jpg",
  "/img/habitacion-9.jpg",
];

const LOOP_PHOTOS = [...PHOTOS, ...PHOTOS];

export function IntroAlojamiento({ m, locale }: { m: Dictionary; locale: Locale }) {
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
            href={reservationUrl(locale)}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center bg-rose text-white px-9 py-3.5 text-sm tracking-[0.05em] hover:bg-rose-dark transition-colors"
            style={{ fontFamily: "var(--font-gotham), sans-serif" }}
          >
            {t.cta}
          </a>
        </div>
      </div>

      <MarqueeZone
        className="relative overflow-hidden pb-16 md:pb-20"
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

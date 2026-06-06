import { HeroAlojamiento } from "@/components/sections/alojamiento/hero-alojamiento";
import { IntroAlojamiento } from "@/components/sections/alojamiento/intro-alojamiento";
import { Amenidades } from "@/components/sections/alojamiento/amenidades";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import type { Dictionary, Locale } from "@/lib/i18n";

export function AlojamientoContent({ m, locale }: { m: Dictionary; locale: Locale }) {
  return (
    <>
      <HeroAlojamiento m={m} />
      <AnimateOnScroll>
        <IntroAlojamiento m={m} locale={locale} />
      </AnimateOnScroll>
      {/* Fondo a color (#dde3e0) -> softExit para atenuar poco al salir */}
      <AnimateOnScroll softExit>
        <Amenidades m={m} />
      </AnimateOnScroll>
    </>
  );
}

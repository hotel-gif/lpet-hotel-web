import { HeroAlojamiento } from "@/components/sections/alojamiento/hero-alojamiento";
import { IntroAlojamiento } from "@/components/sections/alojamiento/intro-alojamiento";
import { Amenidades } from "@/components/sections/alojamiento/amenidades";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import type { Dictionary } from "@/lib/i18n";

export function AlojamientoContent({ m }: { m: Dictionary }) {
  return (
    <>
      <HeroAlojamiento m={m} />
      <AnimateOnScroll>
        <IntroAlojamiento m={m} />
      </AnimateOnScroll>
      <Amenidades m={m} />
    </>
  );
}

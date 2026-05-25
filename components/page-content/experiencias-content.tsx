import { HeroExperiencias } from "@/components/sections/experiencias/hero-experiencias";
import { IntroExperiencias } from "@/components/sections/experiencias/intro-experiencias";
import { BlockCarousel } from "@/components/sections/experiencias/block-carousel";
import { TourGrid } from "@/components/sections/experiencias/tour-grid";
import { DayTour } from "@/components/sections/experiencias/day-tour";
import { BlockDual } from "@/components/sections/experiencias/block-dual";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import type { Dictionary } from "@/lib/i18n";

type ExtraBlock = Parameters<typeof BlockDual>[0];

export function ExperienciasContent({ m }: { m: Dictionary }) {
  const tour = m.experiencias_page.tour_cafe;
  const deg = m.experiencias_page.degustacion;
  const extras = m.experiencias_page.extras as ExtraBlock[];

  return (
    <>
      <HeroExperiencias m={m} />
      <AnimateOnScroll>
        <IntroExperiencias m={m} />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <BlockCarousel
          title={tour.title}
          body={tour.body}
          caption={tour.caption}
          images={tour.images}
          imageSide="right"
        />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <TourGrid m={m} />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <BlockCarousel
          title={deg.title}
          body={deg.body}
          numbered_list={deg.numbered_list}
          note={deg.note}
          images={deg.images}
          imageSide="left"
        />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <DayTour m={m} />
      </AnimateOnScroll>
      {extras.map((block, i) => (
        <AnimateOnScroll key={i}>
          <BlockDual {...block} />
        </AnimateOnScroll>
      ))}
    </>
  );
}

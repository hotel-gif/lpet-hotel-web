import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Cabanas } from "@/components/sections/cabanas";
import { Experiences } from "@/components/sections/experiences";
import { Sustainability } from "@/components/sections/sustainability";
import { Community } from "@/components/sections/community";
import { Newsletter } from "@/components/sections/newsletter";
import { FAQ } from "@/components/sections/faq";
import { Reviews } from "@/components/sections/reviews";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { FaqSchema } from "@/components/structured-data";
import type { Dictionary } from "@/lib/i18n";

export function HomeContent({ m }: { m: Dictionary }) {
  return (
    <>
      <FaqSchema m={m} />
      <Hero m={m} />
      <AnimateOnScroll>
        <Intro m={m} />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Cabanas m={m} />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Experiences m={m} />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Sustainability m={m} />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Community m={m} />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Newsletter m={m} />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <FAQ m={m} />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <Reviews m={m} />
      </AnimateOnScroll>
    </>
  );
}

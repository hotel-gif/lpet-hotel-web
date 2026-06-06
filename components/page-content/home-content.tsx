import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Cabanas } from "@/components/sections/cabanas";
import { Experiences } from "@/components/sections/experiences";
import { Sustainability } from "@/components/sections/sustainability";
import { Community } from "@/components/sections/community";
import { Newsletter } from "@/components/sections/newsletter";
import { FAQ } from "@/components/sections/faq";
import { Reviews } from "@/components/sections/reviews";
import { MotionSystem } from "@/components/motion-system";
import { FaqSchema } from "@/components/structured-data";
import type { Dictionary, Locale } from "@/lib/i18n";

export function HomeContent({ m, locale }: { m: Dictionary; locale: Locale }) {
  return (
    <>
      <FaqSchema m={m} />
      {/* Motor de animaciones del rediseño: hero entrance/exit, reveal, count-up */}
      <MotionSystem />
      <Hero m={m} locale={locale} />
      <div className="reveal" data-anim="fade">
        <Intro m={m} />
      </div>
      <div className="reveal" data-anim="fade">
        <Cabanas m={m} locale={locale} />
      </div>
      <div className="reveal" data-anim="fade">
        <Experiences m={m} />
      </div>
      <div className="reveal" data-anim="fade">
        <Sustainability m={m} />
      </div>
      <div className="reveal" data-anim="fade">
        <Community m={m} />
      </div>
      <div className="reveal" data-anim="fade">
        <Newsletter m={m} />
      </div>
      <div className="reveal" data-anim="fade">
        <FAQ m={m} />
      </div>
      <div className="reveal" data-anim="fade">
        <Reviews m={m} />
      </div>
    </>
  );
}

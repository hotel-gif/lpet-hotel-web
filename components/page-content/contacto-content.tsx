import { HeroContacto } from "@/components/sections/contacto/hero-contacto";
import { ContactoForm } from "@/components/sections/contacto/contacto-form";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import type { Dictionary } from "@/lib/i18n";

export function ContactoContent({ m }: { m: Dictionary }) {
  const t = m.contacto_page;

  return (
    <>
      <HeroContacto m={m} />
      <section className="bg-paper py-20 md:py-28">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 lg:gap-28 items-start">
            <AnimateOnScroll>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl text-forest-dark leading-[1.1] mb-6"
                style={{ fontFamily: "var(--font-serif), serif" }}
              >
                {t.title}
              </h2>
              <div
                className="w-32 h-px mb-10"
                style={{ backgroundColor: "#a14a5a" }}
              />
              <div
                className="space-y-5 text-lg md:text-xl leading-[1.75] text-forest-dark/85"
                style={{ fontFamily: "var(--font-gotham), sans-serif" }}
              >
                <p>{t.body_1}</p>
                <p>{t.body_2}</p>
                <p>
                  {t.body_3_prefix}
                  <a
                    href={`mailto:${t.email}`}
                    className="text-forest-dark underline underline-offset-4 hover:text-forest"
                  >
                    {t.email}
                  </a>
                  {t.body_3_mid}
                  <a
                    href={t.whatsapp_link}
                    target="_blank"
                    rel="noopener"
                    className="text-forest-dark underline underline-offset-4 hover:text-forest"
                  >
                    {t.whatsapp_display}
                  </a>
                  {t.body_3_suffix}
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <ContactoForm m={m} />
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}

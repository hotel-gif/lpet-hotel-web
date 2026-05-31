import Image from "next/image";
import { StaggerItem } from "@/components/stagger-item";
import { VerMasButton } from "@/components/ver-mas-modal";
import type { Dictionary } from "@/lib/i18n";

interface Space {
  label: string;
  image: string;
  detail: string;
}

export function Experiences({ m }: { m: Dictionary }) {
  const t = m.experiences as {
    title: string;
    lead: string;
    cta: string;
    spaces: Space[];
  };

  return (
    <section id="experiences" className="bg-paper py-20 md:py-28">
      <div className="container-wide">
        <h2
          className="text-center text-3xl md:text-4xl lg:text-5xl text-forest-dark leading-[1.2] max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-serif), serif" }}
        >
          {t.title}
        </h2>
        <div className="mt-8 w-24 h-px bg-forest-dark/30 mx-auto" />

        <div className="mt-14 md:mt-20 grid md:grid-cols-3 gap-8 md:gap-10">
          {t.spaces.map((space, i) => (
            <StaggerItem key={space.label} delay={i * 180} className="flex flex-col">
              <h3
                className="text-center text-2xl md:text-3xl text-forest-dark mb-6"
                style={{ fontFamily: "var(--font-serif), serif" }}
              >
                {space.label}
              </h3>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={space.image}
                  alt={space.label}
                  fill
                  sizes="(min-width: 768px) 30vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-end justify-center pb-8">
                  <VerMasButton label={t.cta} title={space.label} detail={space.detail} />
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>

        <p
          className="mt-16 md:mt-20 max-w-4xl mx-auto text-center text-lg md:text-xl leading-[1.8] text-forest-dark/85"
          style={{ fontFamily: "var(--font-gotham), sans-serif" }}
        >
          {t.lead}
        </p>
      </div>
    </section>
  );
}

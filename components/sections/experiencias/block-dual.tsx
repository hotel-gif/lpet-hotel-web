import Image from "next/image";
import { StaggerItem } from "@/components/stagger-item";

type Subsection = { title: string; body: string };

type Props = {
  variant: "light" | "soft";
  image: string;
  imageSide: "left" | "right";
  subsections: Subsection[];
  note?: string;
};

export function BlockDual({
  variant,
  image,
  imageSide,
  subsections,
  note,
}: Props) {
  const isImageLeft = imageSide === "left";
  const bgClass = variant === "light" ? "bg-paper" : "";
  const bgStyle =
    variant === "soft" ? { backgroundColor: "#ebe5d4" } : undefined;

  return (
    <section className={`${bgClass} py-16 md:py-24`} style={bgStyle}>
      <div className="container-wide">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center">
          <div
            className={`relative aspect-[4/3] md:aspect-[4/5] overflow-hidden rounded-2xl ${
              isImageLeft ? "md:order-1" : "md:order-2"
            }`}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>

          <div className={isImageLeft ? "md:order-2" : "md:order-1"}>
            <div className="max-w-xl space-y-10">
              {subsections.map((sub, i) => (
                <StaggerItem key={sub.title} delay={i * 220}>
                  <h3
                    className="text-3xl md:text-4xl text-forest-dark mb-5 leading-[1.15]"
                    style={{ fontFamily: "var(--font-serif), serif" }}
                  >
                    {sub.title}
                  </h3>
                  <p
                    className="text-lg md:text-xl leading-[1.8] text-forest-dark/80"
                    style={{ fontFamily: "var(--font-gotham), sans-serif" }}
                  >
                    {sub.body}
                  </p>
                </StaggerItem>
              ))}
              {note && (
                <p
                  className="text-sm md:text-base italic text-forest-dark/60 pt-2"
                  style={{ fontFamily: "var(--font-gotham), sans-serif" }}
                >
                  {note}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

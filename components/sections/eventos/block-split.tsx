import Image from "next/image";
import { SmartLink as Link } from "@/components/smart-link";

type Block = {
  variant: "dark" | "light" | "soft";
  title?: string;
  subtitle?: string;
  body: string;
  body_extra?: string;
  footnote?: string;
  image: string;
  imageSide: "left" | "right";
  cta?: { label: string; href: string };
  divider?: boolean;
};

export function BlockSplit({ block }: { block: Block }) {
  const isDark = block.variant === "dark";
  const isSoft = block.variant === "soft";
  const isImageLeft = block.imageSide === "left";

  const bgClass = isDark ? "" : isSoft ? "" : "bg-paper";
  const bgStyle = isDark
    ? { backgroundColor: "#000" }
    : isSoft
    ? { backgroundColor: "#dde3e0" }
    : undefined;
  const textColor = isDark ? "text-paper" : "text-forest-dark";
  const bodyColor = isDark ? "text-paper/85" : "text-forest-dark/80";

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
              src={block.image}
              alt=""
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>

          <div className={isImageLeft ? "md:order-2" : "md:order-1"}>
            <div className="max-w-xl">
              {block.title && (
                <h2
                  className={`text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6 ${textColor}`}
                  style={{ fontFamily: "var(--font-serif), serif" }}
                >
                  {block.title}
                </h2>
              )}
              {block.subtitle && (
                <p
                  className={`text-xl md:text-2xl mb-6 ${
                    isDark ? "text-paper" : "text-forest-dark"
                  }`}
                  style={{ fontFamily: "var(--font-gotham), sans-serif" }}
                >
                  {block.subtitle}
                </p>
              )}
              <p
                className={`text-lg md:text-xl leading-[1.8] ${bodyColor}`}
                style={{ fontFamily: "var(--font-gotham), sans-serif" }}
              >
                {block.body}
              </p>

              {block.body_extra && (
                <p
                  className={`mt-6 text-base md:text-lg leading-[1.85] ${bodyColor}`}
                  style={{ fontFamily: "var(--font-gotham), sans-serif" }}
                >
                  {block.body_extra}
                </p>
              )}

              {block.footnote && (
                <p
                  className={`mt-8 text-lg md:text-xl ${
                    isDark ? "text-paper" : "text-forest-dark"
                  }`}
                  style={{ fontFamily: "var(--font-gotham), sans-serif" }}
                >
                  {block.footnote}
                </p>
              )}

              {block.cta && (
                <div className="mt-9">
                  <Link
                    href={block.cta.href}
                    className={`inline-flex items-center justify-center border px-9 py-3.5 text-sm tracking-[0.05em] transition-colors ${
                      isDark
                        ? "border-paper text-paper hover:bg-paper hover:text-forest-dark"
                        : "border-forest-dark text-forest-dark hover:bg-forest-dark hover:text-paper"
                    }`}
                    style={{ fontFamily: "var(--font-gotham), sans-serif" }}
                  >
                    {block.cta.label}
                  </Link>
                </div>
              )}

              {block.divider && (
                <div
                  className="mt-9 w-32 h-px"
                  style={{ backgroundColor: "#a14a5a" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

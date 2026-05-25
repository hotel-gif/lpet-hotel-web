"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  title: string;
  body?: string;
  caption?: string;
  numbered_list?: string[];
  note?: string;
  images: string[];
  imageSide: "left" | "right";
};

export function BlockCarousel({
  title,
  body,
  caption,
  numbered_list,
  note,
  images,
  imageSide,
}: Props) {
  const [index, setIndex] = useState(0);
  const isImageLeft = imageSide === "left";

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "#000" }}>
      <div className="container-wide">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center">
          <div
            className={`relative aspect-[4/3] md:aspect-[4/5] overflow-hidden ${
              isImageLeft ? "md:order-1" : "md:order-2"
            }`}
          >
            {images.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt=""
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                className={`object-cover carousel-img ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
                priority={i === 0}
              />
            ))}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === index ? "bg-paper" : "bg-paper/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className={isImageLeft ? "md:order-2" : "md:order-1"}>
            <div className="max-w-xl">
              <h2
                className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 text-paper"
                style={{ fontFamily: "var(--font-serif), serif" }}
              >
                {title}
              </h2>

              {body && (
                <p
                  className="text-lg md:text-xl leading-[1.8] text-paper/85"
                  style={{ fontFamily: "var(--font-gotham), sans-serif" }}
                >
                  {body}
                </p>
              )}

              {numbered_list && (
                <ol
                  className="mt-6 space-y-4 text-lg md:text-xl leading-[1.8] text-paper/85 list-decimal pl-6"
                  style={{ fontFamily: "var(--font-gotham), sans-serif" }}
                >
                  {numbered_list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              )}

              {caption && (
                <p
                  className="mt-6 text-sm md:text-base italic text-paper/65"
                  style={{ fontFamily: "var(--font-gotham), sans-serif" }}
                >
                  {caption}
                </p>
              )}

              {note && (
                <p
                  className="mt-8 text-sm md:text-base italic text-paper/65"
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

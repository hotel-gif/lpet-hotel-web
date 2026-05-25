import type { Dictionary } from "@/lib/i18n";

export function IntroExperiencias({ m }: { m: Dictionary }) {
  const t = m.experiencias_page.intro;
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xl md:text-2xl leading-[1.6] text-forest-dark/85"
            style={{ fontFamily: "var(--font-gotham), sans-serif" }}
          >
            {t.body_1}
          </p>
          <p
            className="mt-8 text-xl md:text-2xl leading-[1.6] text-forest-dark/85"
            style={{ fontFamily: "var(--font-gotham), sans-serif" }}
          >
            {t.body_2}
          </p>
          <div
            className="mt-10 w-40 h-px mx-auto"
            style={{ backgroundColor: "#a14a5a" }}
          />
        </div>
      </div>
    </section>
  );
}

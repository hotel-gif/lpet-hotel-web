import type { Dictionary } from "@/lib/i18n";

export function DayTour({ m }: { m: Dictionary }) {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="container-wide">
        <p
          className="max-w-4xl mx-auto text-center text-xl md:text-2xl leading-[1.6] text-forest-dark/85"
          style={{ fontFamily: "var(--font-gotham), sans-serif" }}
        >
          {m.experiencias_page.day_tour}
        </p>
      </div>
    </section>
  );
}

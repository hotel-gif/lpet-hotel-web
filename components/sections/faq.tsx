import type { Dictionary } from "@/lib/i18n";

export function FAQ({ m }: { m: Dictionary }) {
  const t = m.faq;
  return (
    <section id="faq" className="bg-paper py-20 md:py-28">
      <div className="container-wide">
        {/* Encabezado centrado */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight text-forest-dark">
            {t.title}
          </h2>
          {/* Línea decorativa burgundy/rosa */}
          <div className="w-24 h-px mx-auto mb-10" style={{ backgroundColor: "#a14a5a" }} />
          <p className="text-ink-soft leading-relaxed mb-2">{t.lead}</p>
        </div>

        {/* Lista de preguntas con divisores horizontales (sin cards) */}
        <div className="max-w-4xl mx-auto border-t border-forest/15">
          {t.items.map((item, i) => (
            <details
              key={i}
              className="group border-b border-forest/15 transition-all"
            >
              <summary
                className="cursor-pointer list-none flex items-center justify-between gap-4 py-6 px-2 md:px-4 hover:opacity-80 transition-opacity"
                style={{ color: "#a08054" }}
              >
                <span className="text-base md:text-lg font-normal">
                  {item.q}
                </span>
                <span
                  className="text-2xl md:text-3xl font-light transition-transform group-open:rotate-45 shrink-0"
                  style={{ color: "#a08054" }}
                >
                  +
                </span>
              </summary>
              <div className="px-2 md:px-4 pb-6 pt-1">
                <p className="text-ink-soft leading-relaxed">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

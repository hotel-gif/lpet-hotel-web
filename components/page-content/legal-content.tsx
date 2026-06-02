import type { LegalDoc } from "@/lib/legal";

/**
 * Renderiza un documento legal (Términos / Política de datos) con tipografía
 * sobria de lectura larga. Recibe el documento ya resuelto por idioma desde
 * lib/legal.ts. Sin estado: es contenido estático.
 */
export function LegalContent({ doc }: { doc: LegalDoc }) {
  return (
    <article className="bg-paper text-forest-dark">
      <div className="container-wide max-w-3xl py-24 md:py-32">
        <h1 className="text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-12 text-forest-dark">
          {doc.title}
        </h1>

        <div className="space-y-10">
          {doc.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-lg md:text-xl font-semibold tracking-tight mb-4 text-forest-dark">
                {section.heading}
              </h2>
              <div className="space-y-4 text-[15px] md:text-base leading-[1.75] text-forest-dark/85">
                {section.blocks.map((block, j) => {
                  if (block.kind === "p") {
                    return <p key={j}>{block.text}</p>;
                  }
                  if (block.kind === "sub") {
                    return (
                      <p key={j} className="font-medium text-forest-dark mt-2">
                        {block.text}
                      </p>
                    );
                  }
                  return (
                    <ul key={j} className="list-disc pl-6 space-y-2 marker:text-gold">
                      {block.items.map((item, k) => (
                        <li key={k}>{item}</li>
                      ))}
                    </ul>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}

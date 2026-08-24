import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { ExperienciasContent } from "@/components/page-content/experiencias-content";
import { PlanesRelacionados, PLANES } from "@/components/sections/planes-relacionados";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getDictionary("es");
  return buildMetadata({ locale: "es", path: "/experiencias", title: m.experiencias_page.metadata.title, description: m.experiencias_page.metadata.description });
}

export default async function Page() {
  const m = await getDictionary("es");
  return (
    <>
      <ExperienciasContent m={m} />
      {/* Las landings de planes solo existen en español: por eso van
          aquí y no en el componente de contenido, que comparte EN. */}
      <PlanesRelacionados
        planes={[PLANES.coffeeTour, PLANES.aves]}
        titulo="Nuestros planes de día"
        lead="Dos experiencias que puedes vivir sin quedarte a dormir."
      />
    </>
  );
}

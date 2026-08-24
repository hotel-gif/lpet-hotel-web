import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { MatrimoniosContent } from "@/components/page-content/matrimonios-content";
import { PlanesRelacionados, PLANES } from "@/components/sections/planes-relacionados";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getDictionary("es");
  return buildMetadata({ locale: "es", path: "/matrimonios", title: m.matrimonios_page.metadata.title, description: m.matrimonios_page.metadata.description });
}

export default async function Page() {
  const m = await getDictionary("es");
  return (
    <>
      <MatrimoniosContent m={m} />
      {/* Las landings de planes solo existen en español: por eso van
          aquí y no en el componente de contenido, que comparte EN. */}
      <PlanesRelacionados
        planes={[PLANES.bodas]}
        titulo="Todo sobre bodas en la finca"
        lead="Reunimos en una sola página los espacios, los tiempos y lo que incluye celebrar aquí."
      />
    </>
  );
}

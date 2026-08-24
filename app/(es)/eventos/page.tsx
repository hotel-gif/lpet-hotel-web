import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { EventosContent } from "@/components/page-content/eventos-content";
import { PlanesRelacionados, PLANES } from "@/components/sections/planes-relacionados";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getDictionary("es");
  return buildMetadata({ locale: "es", path: "/eventos", title: m.eventos_page.metadata.title, description: m.eventos_page.metadata.description });
}

export default async function Page() {
  const m = await getDictionary("es");
  return (
    <>
      <EventosContent m={m} />
      {/* Las landings de planes solo existen en español: por eso van
          aquí y no en el componente de contenido, que comparte EN. */}
      <PlanesRelacionados
        planes={[PLANES.corporativos]}
        titulo="Eventos de empresa, en detalle"
        lead="Salones, actividades de equipo y logística para grupos, a 90 minutos de Bogotá."
      />
    </>
  );
}

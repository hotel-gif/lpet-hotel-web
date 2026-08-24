import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { AlojamientoContent } from "@/components/page-content/alojamiento-content";
import { PlanesRelacionados, PLANES } from "@/components/sections/planes-relacionados";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getDictionary("es");
  return buildMetadata({ locale: "es", path: "/alojamiento", title: m.alojamiento.metadata.title, description: m.alojamiento.metadata.description });
}

export default async function Page() {
  const m = await getDictionary("es");
  return (
    <>
      <AlojamientoContent m={m} locale="es" />
      {/* Las landings de planes solo existen en español: por eso van
          aquí y no en el componente de contenido, que comparte EN. */}
      <PlanesRelacionados
        planes={[PLANES.romantica, PLANES.escapadas]}
        titulo="Planes de alojamiento"
        lead="Escapadas pensadas para desconectar cerca de la ciudad."
      />
    </>
  );
}

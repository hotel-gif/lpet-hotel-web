import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { AlojamientoContent } from "@/components/page-content/alojamiento-content";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getDictionary("es");
  return buildMetadata({ locale: "es", path: "/alojamiento", title: m.alojamiento.metadata.title, description: m.alojamiento.metadata.description });
}

export default async function Page() {
  const m = await getDictionary("es");
  return <AlojamientoContent m={m} />;
}

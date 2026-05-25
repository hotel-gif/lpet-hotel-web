import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { EventosContent } from "@/components/page-content/eventos-content";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getDictionary("es");
  return buildMetadata({ locale: "es", path: "/eventos", title: m.eventos_page.metadata.title, description: m.eventos_page.metadata.description });
}

export default async function Page() {
  const m = await getDictionary("es");
  return <EventosContent m={m} />;
}

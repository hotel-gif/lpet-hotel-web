import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { EventosContent } from "@/components/page-content/eventos-content";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getDictionary("en");
  return buildMetadata({ locale: "en", path: "/eventos", title: m.eventos_page.metadata.title, description: m.eventos_page.metadata.description });
}

export default async function Page() {
  const m = await getDictionary("en");
  return <EventosContent m={m} />;
}

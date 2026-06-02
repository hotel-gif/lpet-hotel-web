import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { HomeContent } from "@/components/page-content/home-content";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getDictionary("es");
  return buildMetadata({ locale: "es", path: "", title: m.metadata.title, description: m.metadata.description });
}

export default async function Page() {
  const m = await getDictionary("es");
  return <HomeContent m={m} locale="es" />;
}

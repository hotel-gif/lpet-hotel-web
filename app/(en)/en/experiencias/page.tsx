import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { ExperienciasContent } from "@/components/page-content/experiencias-content";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getDictionary("en");
  return buildMetadata({ locale: "en", path: "/experiencias", title: m.experiencias_page.metadata.title, description: m.experiencias_page.metadata.description });
}

export default async function Page() {
  const m = await getDictionary("en");
  return <ExperienciasContent m={m} />;
}

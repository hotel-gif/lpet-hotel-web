import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { MatrimoniosContent } from "@/components/page-content/matrimonios-content";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getDictionary("es");
  return buildMetadata({ locale: "es", path: "/matrimonios", title: m.matrimonios_page.metadata.title, description: m.matrimonios_page.metadata.description });
}

export default async function Page() {
  const m = await getDictionary("es");
  return <MatrimoniosContent m={m} />;
}

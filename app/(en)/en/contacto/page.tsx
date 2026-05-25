import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { ContactoContent } from "@/components/page-content/contacto-content";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getDictionary("en");
  return buildMetadata({ locale: "en", path: "/contacto", title: m.contacto_page.metadata.title, description: m.contacto_page.metadata.description });
}

export default async function Page() {
  const m = await getDictionary("en");
  return <ContactoContent m={m} />;
}

import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/metadata";
import { MenuContent } from "@/components/page-content/menu-content";

export async function generateMetadata(): Promise<Metadata> {
  const m = await getDictionary("en");
  return buildMetadata({ locale: "en", path: "/menu", title: m.menu.metadata.title, description: m.menu.metadata.description });
}

export default async function Page() {
  const m = await getDictionary("en");
  return <MenuContent m={m} locale="en" />;
}

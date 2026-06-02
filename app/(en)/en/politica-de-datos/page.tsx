import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { LegalContent } from "@/components/page-content/legal-content";
import { LEGAL } from "@/lib/legal";

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: "en",
    path: "/politica-de-datos",
    title: "Data Processing Policy · La Palma y El Tucán Hotel",
    description:
      "Personal data protection and processing policy for La Palma y El Tucán Hotel (Coffee and Adventure S.A.S), under Colombia's Law 1581 of 2012.",
  });
}

export default function Page() {
  return <LegalContent doc={LEGAL.en.privacy} />;
}

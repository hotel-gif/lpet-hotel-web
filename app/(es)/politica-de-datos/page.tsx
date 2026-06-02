import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { LegalContent } from "@/components/page-content/legal-content";
import { LEGAL } from "@/lib/legal";

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: "es",
    path: "/politica-de-datos",
    title: "Política de tratamiento de datos · La Palma y El Tucán Hotel",
    description:
      "Política de protección y tratamiento de datos personales de La Palma y El Tucán Hotel (Coffee and Adventure S.A.S), conforme a la Ley 1581 de 2012.",
  });
}

export default function Page() {
  return <LegalContent doc={LEGAL.es.privacy} />;
}

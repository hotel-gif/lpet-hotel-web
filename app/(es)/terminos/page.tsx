import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { LegalContent } from "@/components/page-content/legal-content";
import { LEGAL } from "@/lib/legal";

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: "es",
    path: "/terminos",
    title: "Términos y Condiciones · La Palma y El Tucán Hotel",
    description:
      "Términos y condiciones de reserva, cancelación, check-in/check-out y políticas del hotel La Palma y El Tucán (Coffee and Adventure S.A.S).",
  });
}

export default function Page() {
  return <LegalContent doc={LEGAL.es.terms} />;
}

import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { LegalContent } from "@/components/page-content/legal-content";
import { LEGAL } from "@/lib/legal";

export function generateMetadata(): Metadata {
  return buildMetadata({
    locale: "en",
    path: "/terminos",
    title: "Terms & Conditions · La Palma y El Tucán Hotel",
    description:
      "Booking, cancellation, check-in/check-out and hotel policies for La Palma y El Tucán Hotel (Coffee and Adventure S.A.S).",
  });
}

export default function Page() {
  return <LegalContent doc={LEGAL.en.terms} />;
}

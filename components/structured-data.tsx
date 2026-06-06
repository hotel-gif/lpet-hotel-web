import type { Dictionary } from "@/lib/i18n";
import { reservationUrl } from "@/lib/booking";

const SITE_URL = "https://lapalmayeltucanhotel.com";

/**
 * Schema LodgingBusiness/Hotel para Rich Results de Google.
 * Incluye `telephone` — el campo que FALTABA en el JSON-LD del sitio WordPress original.
 */
export function HotelSchema({ m }: { m: Dictionary }) {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Hotel", "LodgingBusiness"],
    name: "La Palma y El Tucán Hotel",
    description: m.metadata.description,
    url: SITE_URL,
    telephone: "+57-318-9565617",
    email: "reservations@lapalmayeltucan.com",
    priceRange: "$$$",
    petsAllowed: true,
    starRating: { "@type": "Rating", ratingValue: "5" },
    image: [`${SITE_URL}/img/hero.webp`, `${SITE_URL}/img/intro-hotel.jpg`],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Finca Las Nubes, Vereda San Cayetano",
      addressLocality: "Zipacón",
      addressRegion: "Cundinamarca",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 4.7836,
      longitude: -74.3811,
    },
    numberOfRooms: 10,
    amenityFeature: [
      "Coffee tour incluido",
      "Restaurante farm-to-table",
      "Bosque de niebla",
      "Ducha al aire libre",
      "Pet friendly",
      "Eventos y matrimonios",
    ].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: 81,
      bestRating: "5",
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: reservationUrl(),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Schema FAQPage — replica las 6 preguntas frecuentes del home.
 * El sitio WordPress original tenía un FAQPage rico; lo preservamos para no perder rich results.
 */
export function FaqSchema({ m }: { m: Dictionary }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: m.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

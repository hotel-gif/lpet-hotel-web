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
    // Coordenadas tomadas de la ficha del hotel en Cloudbeds (la fuente que usa
    // recepción). Las anteriores —4.7836, -74.3811— caían 2,8 km al norte de la
    // finca, y en búsquedas locales esa señal cuenta.
    geo: {
      "@type": "GeoCoordinates",
      latitude: 4.75881,
      longitude: -74.38017,
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
    // Sin `aggregateRating` a propósito. El que había (4.9 · 81 reseñas) salía
    // de las 81 reseñas de Booking.com que muestra la sección de opiniones, y
    // Google prohíbe declarar reseñas de terceros como calificación propia. La
    // sanción no son las estrellas: es una acción manual que retira TODOS los
    // resultados enriquecidos del sitio. Seguir mostrando las opiniones de
    // Booking y Tripadvisor en la página es correcto; declararlas aquí no.
    // Para recuperarlo hace falta recoger reseñas propias en el sitio.
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

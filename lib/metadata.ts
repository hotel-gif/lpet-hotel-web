import type { Metadata } from "next";
import type { Locale } from "./i18n";

const SITE = "https://lapalmayeltucanhotel.com";

/**
 * Construye la metadata de una página con canonical + hreflang (es/en/x-default)
 * + Open Graph/Twitter. `path` es la ruta SIN prefijo de idioma ("" para home,
 * "/alojamiento", etc.).
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  image = "/img/hero.webp",
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const esUrl = `${SITE}${path || "/"}`;
  const enUrl = `${SITE}/en${path}`;
  const canonical = locale === "en" ? enUrl : esUrl;

  return {
    title,
    description,
    metadataBase: new URL(SITE),
    alternates: {
      canonical,
      languages: { es: esUrl, en: enUrl, "x-default": esUrl },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "La Palma y El Tucán Hotel",
      locale: locale === "en" ? "en_US" : "es_CO",
      type: "website",
      images: [{ url: image, width: 1920, height: 1080, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

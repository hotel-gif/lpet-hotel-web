import type { MetadataRoute } from "next";

// Necesario para `output: export` (GitHub Pages): genera /sitemap.xml estático.
export const dynamic = "force-static";

const SITE_URL = "https://lapalmayeltucanhotel.com";

type Entry = {
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

const PAGES: Entry[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/alojamiento", changeFrequency: "monthly", priority: 0.9 },
  { path: "/eventos", changeFrequency: "monthly", priority: 0.9 },
  { path: "/experiencias", changeFrequency: "monthly", priority: 0.9 },
  { path: "/matrimonios", changeFrequency: "monthly", priority: 0.9 },
  { path: "/menu", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contacto", changeFrequency: "yearly", priority: 0.7 },
];

// Landings servidas desde `public/<slug>/` (ver next.config.ts). Van aparte de
// PAGES porque son solo en español: no tienen versión /en y meterlas ahí
// generaría URLs inexistentes en el hreflang.
//
// Fuera del sitemap a propósito (9-sep-2026): `/bodas-en-finca` y
// `/eventos-corporativos-finca` duplican a `/matrimonios` y `/eventos`, y
// declararlas aquí con la misma prioridad las hacía competir entre sí —
// `/matrimonios` estaba en posición 2,3 y `/bodas-en-finca` en 38,8.
// Siguen vivas y accesibles porque son landings de Google Ads; su canonical
// apunta ahora a la página orgánica que gana. No redirigir: rompería los anuncios.
const LANDINGS: Entry[] = [
  { path: "/birdwatching", changeFrequency: "monthly", priority: 0.9 },
  { path: "/coffee-tour", changeFrequency: "monthly", priority: 0.9 },
  { path: "/escapada-romantica", changeFrequency: "monthly", priority: 0.9 },
  { path: "/escapadas-cerca-de-bogota", changeFrequency: "monthly", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const landings = LANDINGS.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  // El llms.txt no está enlazado desde ninguna página, así que Google no tenía
  // cómo descubrirlo: cuatro días después de publicarlo seguía sin rastrear.
  // Va aquí con prioridad baja — es un archivo de referencia para los asistentes
  // de IA, no una página que deba competir en búsquedas.
  const llms = {
    url: `${SITE_URL}/llms.txt`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.3,
  };

  return [llms, ...landings, ...PAGES.flatMap(({ path, changeFrequency, priority }) => {
    const es = `${SITE_URL}${path || "/"}`;
    const en = `${SITE_URL}/en${path}`;
    const languages = { es, en };

    return [
      { url: es, lastModified, changeFrequency, priority, alternates: { languages } },
      {
        url: en,
        lastModified,
        changeFrequency,
        priority: Math.max(0.1, priority - 0.1),
        alternates: { languages },
      },
    ];
  })];
}

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
const LANDINGS: Entry[] = [
  { path: "/bodas-en-finca", changeFrequency: "monthly", priority: 0.9 },
  { path: "/eventos-corporativos-finca", changeFrequency: "monthly", priority: 0.9 },
  { path: "/birdwatching", changeFrequency: "monthly", priority: 0.9 },
  { path: "/coffee-tour", changeFrequency: "monthly", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const landings = LANDINGS.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  return [...landings, ...PAGES.flatMap(({ path, changeFrequency, priority }) => {
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

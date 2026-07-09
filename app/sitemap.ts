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

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PAGES.flatMap(({ path, changeFrequency, priority }) => {
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
  });
}

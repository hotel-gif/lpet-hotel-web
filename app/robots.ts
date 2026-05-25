import type { MetadataRoute } from "next";

// Necesario para `output: export` (GitHub Pages): genera /robots.txt estático.
export const dynamic = "force-static";

const SITE_URL = "https://lapalmayeltucanhotel.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

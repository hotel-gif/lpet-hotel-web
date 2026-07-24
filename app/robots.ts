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
        // OJO: aqui NO va "/_next/". Bloquearlo dejaba fuera el CSS, los chunks de
        // JS y —sobre todo— las 362 imagenes del sitio, que Next sirve por
        // /_next/image. Google necesita el CSS y el JS para renderizar la pagina
        // como la ve un huesped, y sin acceso a /_next/image ninguna foto del
        // hotel puede aparecer en Google Imagenes ni la pueden leer los
        // rastreadores de IA. Solo se bloquean las rutas sin valor de busqueda.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

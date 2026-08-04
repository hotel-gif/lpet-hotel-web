import type { NextConfig } from "next";

// Solo en el build para GitHub Pages se activan estas opciones (vía variables de
// entorno en el workflow). En local y en Vercel/Cloudflare el sitio sigue siendo
// Next.js nativo (SSR + optimización de imágenes).
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Landing pages que antes vivían en subdominios y ahora se sirven como carpetas
// del dominio oficial. El build de cada una (repos aparte, Vite) se copia a
// `public/<slug>/`; aquí solo se resuelve la URL limpia y se redirige el
// subdominio viejo. Ver README → "Landings".
// El slug lleva long tail propio a propósito: la landing no debe pelear la
// misma búsqueda que la página institucional del sitio (/matrimonios).
const landings = [
  { slug: "bodas-en-finca", subdomain: "bodas.lapalmayeltucanhotel.com" },
  { slug: "eventos-corporativos-finca", subdomain: "eventos.lapalmayeltucanhotel.com" },
  { slug: "birdwatching", subdomain: "birdwatching.lapalmayeltucanhotel.com" },
  { slug: "coffee-tour", subdomain: "coffee.lapalmayeltucanhotel.com" },
];

// Rutas que alcanzaron a estar publicadas con otro nombre. Se mantienen vivas
// para no romper links ya compartidos.
const legacyPaths = [{ from: "/bodas", to: "/bodas-en-finca" }];

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export", trailingSlash: true } : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  images: isStaticExport
    ? { loader: "custom", loaderFile: "./image-loader.ts" }
    : { formats: ["image/avif", "image/webp"] },
  // Next sirve `public/` tal cual, pero no resuelve el index.html de una
  // carpeta: sin esto `/bodas` daría 404 y solo funcionaría `/bodas/index.html`.
  async rewrites() {
    return landings.map(({ slug }) => ({
      source: `/${slug}`,
      destination: `/${slug}/index.html`,
    }));
  },
  // Los subdominios viejos quedaron en 404 tras mover el DNS a Vercel. El
  // redirect va aquí y no en el panel de Vercel porque allí el destino no
  // admite una ruta, solo otro dominio.
  async redirects() {
    return [
      ...landings.map(({ slug, subdomain }) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: subdomain }],
        destination: `https://lapalmayeltucanhotel.com/${slug}`,
        statusCode: 301,
      })),
      ...legacyPaths.map(({ from, to }) => ({
        source: from,
        destination: to,
        statusCode: 301,
      })),
    ];
  },
};

export default nextConfig;

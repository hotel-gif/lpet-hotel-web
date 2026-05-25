import type { NextConfig } from "next";

// Solo en el build para GitHub Pages se activan estas opciones (vía variables de
// entorno en el workflow). En local y en Vercel/Cloudflare el sitio sigue siendo
// Next.js nativo (SSR + optimización de imágenes).
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export", trailingSlash: true } : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  images: isStaticExport
    ? { loader: "custom", loaderFile: "./image-loader.ts" }
    : { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;

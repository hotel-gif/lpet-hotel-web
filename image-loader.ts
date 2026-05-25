// Loader de imágenes para el export estático (GitHub Pages).
// `next/image` con export NO antepone el basePath al src, así que las imágenes
// quedaban en /img/... (raíz) en vez de /<repo>/img/... → 404.
// Este loader antepone el basePath manualmente. En local/Vercel/Cloudflare el
// basePath está vacío, así que devuelve el src tal cual.
export default function imageLoader({ src }: { src: string }): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (/^https?:\/\//.test(src)) return src; // URLs absolutas: sin tocar
  return `${base}${src}`;
}

import "../globals.css";
import { getDictionary } from "@/lib/dictionaries";
import { SiteShell } from "@/components/site-shell";

export default async function EsLayout({ children }: { children: React.ReactNode }) {
  const m = await getDictionary("es");
  return (
    <SiteShell locale="es" m={m}>
      {children}
    </SiteShell>
  );
}

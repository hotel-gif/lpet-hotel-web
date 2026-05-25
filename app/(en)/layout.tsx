import "../globals.css";
import { getDictionary } from "@/lib/dictionaries";
import { SiteShell } from "@/components/site-shell";

export default async function EnLayout({ children }: { children: React.ReactNode }) {
  const m = await getDictionary("en");
  return (
    <SiteShell locale="en" m={m}>
      {children}
    </SiteShell>
  );
}

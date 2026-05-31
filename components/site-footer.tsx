import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

export function SiteFooter({ m, locale }: { m: Dictionary; locale: Locale }) {
  const t = m.footer;
  const nav = m.nav;
  const prefix = locale === "en" ? "/en" : "";
  return (
    <footer className="bg-forest-dark text-cream mt-24 pt-16 pb-8">
      <div className="container-wide grid md:grid-cols-4 gap-10">
        <div>
          <p className="text-paper text-lg mb-2 font-medium">La Palma y el Tucán</p>
          <p className="text-cream/70 text-sm leading-relaxed">{t.tagline}</p>
          <p className="text-cream/55 text-xs mt-4 leading-relaxed">{t.address}</p>
        </div>

        <div>
          <h4 className="text-paper mb-4 text-sm font-medium">{t.explore}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href={`${prefix}/alojamiento`} className="text-cream/75 hover:text-cream transition-colors">{nav.accommodation}</Link></li>
            <li><Link href={`${prefix}/experiencias`} className="text-cream/75 hover:text-cream transition-colors">{nav.experiences}</Link></li>
            <li><Link href={`${prefix}/matrimonios`} className="text-cream/75 hover:text-cream transition-colors">{nav.weddings}</Link></li>
            <li><Link href={`${prefix}/eventos`} className="text-cream/75 hover:text-cream transition-colors">{nav.events}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-paper mb-4 text-sm font-medium">{t.contact_title}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:+573189565617" className="text-cream/75 hover:text-cream transition-colors">+57 318 956 5617</a></li>
            <li><a href="mailto:reservations@lapalmayeltucan.com" className="text-cream/75 hover:text-cream transition-colors">reservations@lapalmayeltucan.com</a></li>
            <li>
              <a href="https://hotels.cloudbeds.com/reservation/i0wxBO" target="_blank" rel="noopener" className="text-cream/75 hover:text-cream transition-colors">
                {nav.book}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-paper mb-4 text-sm font-medium">{t.legal_title}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-cream/75 hover:text-cream transition-colors">{t.terms}</a></li>
            <li><a href="#" className="text-cream/75 hover:text-cream transition-colors">{t.privacy}</a></li>
          </ul>
        </div>
      </div>

      <div className="container-wide mt-12 pt-6 border-t border-cream/10 flex justify-between text-xs text-cream/50 flex-wrap gap-3">
        <span>© {new Date().getFullYear()} Coffee and Adventure S.A.S · {t.rights}</span>
        <span className="text-cream/35">{locale.toUpperCase()}</span>
      </div>
    </footer>
  );
}

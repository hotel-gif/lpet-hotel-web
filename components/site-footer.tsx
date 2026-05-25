import type { Dictionary } from "@/lib/i18n";

export function SiteFooter({ m }: { m: Dictionary }) {
  const t = m.footer;
  const nav = m.nav;
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
            <li><a href="#cabanas" className="text-cream/75 hover:text-cream transition-colors">{nav.accommodation}</a></li>
            <li><a href="#experiences" className="text-cream/75 hover:text-cream transition-colors">{nav.experiences}</a></li>
            <li><a href="#weddings" className="text-cream/75 hover:text-cream transition-colors">{nav.weddings}</a></li>
            <li><a href="#events" className="text-cream/75 hover:text-cream transition-colors">{nav.events}</a></li>
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
        <span className="text-cream/35">ES · Next.js</span>
      </div>
    </footer>
  );
}

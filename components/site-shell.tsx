import Script from "next/script";
import { fontVars } from "@/lib/fonts";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageLoadOverlay } from "@/components/page-load-overlay";
import { RouteShell } from "@/components/route-shell";
import { HotelSchema } from "@/components/structured-data";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { ViewTransitions } from "@/components/view-transitions";
import type { Dictionary, Locale } from "@/lib/i18n";

const GTM_ID = "GTM-KVQTF8FS";

/**
 * Cascarón completo del documento (<html><head><body>) compartido por ambos
 * layouts de idioma. Cada layout solo le pasa su `locale` + diccionario.
 */
export function SiteShell({
  locale,
  m,
  children,
}: {
  locale: Locale;
  m: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={locale}
      className={fontVars}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Activa el reveal (blur-in one-shot) ANTES del paint, sin flash. Sin
            JS o con prefers-reduced-motion el contenido queda siempre visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-ready');}}catch(e){}",
          }}
        />
        <noscript>
          <style>{`.scroll-fade,.stagger-item{opacity:1!important;transform:none!important;}`}</style>
        </noscript>
        <HotelSchema m={m} />
        {/* Google Tag Manager */}
        <Script id="gtm-base" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body
        style={{ fontFamily: "var(--font-gotham), system-ui, sans-serif" }}
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:rounded focus:bg-paper focus:px-4 focus:py-2 focus:text-forest-dark focus:shadow-lg"
        >
          {locale === "en" ? "Skip to content" : "Saltar al contenido"}
        </a>
        <ViewTransitions />
        <PageLoadOverlay />
        <SiteHeader m={m} locale={locale} />
        <main id="main">
          <RouteShell>{children}</RouteShell>
        </main>
        <SiteFooter m={m} locale={locale} />
        <WhatsAppFab m={m} />
      </body>
    </html>
  );
}

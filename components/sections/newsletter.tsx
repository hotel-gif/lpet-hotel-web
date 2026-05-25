"use client";

import Image from "next/image";
import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

export function Newsletter({ m }: { m: Dictionary }) {
  const t = m.newsletter as {
    title_part1: string;
    title_highlight: string;
    title_part2: string;
    lead: string;
    name_placeholder: string;
    email_placeholder: string;
    terms: string;
    cta_label: string;
    report_abuse: string;
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accept, setAccept] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email) || !accept) return;
    setSent(true);
    setName("");
    setEmail("");
    setAccept(false);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#e8e6df" }}>
      {/* Container con padding lateral y vertical — NO full-bleed */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Wrapper con imagen de fondo y modal centrado */}
        <div className="relative min-h-[700px] md:min-h-[800px] overflow-hidden flex items-center justify-center">
          {/* Imagen de fondo panorámica */}
          <Image
            src="/img/newsletter-bg.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            quality={90}
          />

          {/* Modal blanco */}
          <div className="relative z-10 max-w-2xl w-full mx-4 p-10 md:p-16 bg-white shadow-xl">
            <h2 className="text-2xl md:text-3xl lg:text-[2rem] text-center mb-6 leading-snug text-forest-dark">
              ¿Listo para visitar La Palma y El Tucán Hotel? ¡Suscríbete y obtén un{" "}
              <strong className="font-bold">10% de descuento</strong>!
            </h2>
            <p className="text-sm md:text-base text-ink-soft text-center mb-10 leading-relaxed max-w-md mx-auto">
              Regístrate para recibir ofertas exclusivas para alojamiento o eventos en nuestro hotel.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre — label arriba */}
              <div>
                <label htmlFor="nl-name" className="block text-sm text-ink-soft mb-2 font-medium">
                  Nombre - Name
                </label>
                <input
                  id="nl-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-forest/15 bg-[#f5f5f3] text-sm focus:outline-none focus:border-forest focus:bg-white transition-colors rounded-sm"
                />
              </div>

              {/* Email — label arriba con asterisco rojo */}
              <div>
                <label htmlFor="nl-email" className="block text-sm text-ink-soft mb-2 font-medium">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  id="nl-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-forest/15 bg-[#f5f5f3] text-sm focus:outline-none focus:border-forest focus:bg-white transition-colors rounded-sm"
                />
              </div>

              {/* Checkbox términos */}
              <label className="flex items-start gap-2.5 text-sm text-ink-soft cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={accept}
                  onChange={(e) => setAccept(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-forest shrink-0"
                  required
                />
                <span>
                  Acepto los Términos de Uso <span className="text-red-500">*</span>
                </span>
              </label>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 text-base font-medium text-white rounded-sm transition-colors hover:opacity-90"
                style={{ backgroundColor: "#1a73e8" }}
              >
                Newsletter
              </button>
            </form>

            <div className="text-center mt-5">
              <a href="#" className="text-[11px] text-ink-soft/60 hover:text-ink-soft underline">
                Reportar un abuso
              </a>
            </div>

            {sent && (
              <p className="mt-4 text-sm text-forest text-center">
                ✓ ¡Gracias! Te enviaremos las ofertas pronto.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

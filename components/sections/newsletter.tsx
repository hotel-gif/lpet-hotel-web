"use client";

import Image from "next/image";
import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { submitForm } from "@/lib/forms";

export function Newsletter({ m }: { m: Dictionary }) {
  const t = m.newsletter;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accept, setAccept] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email) || !accept) return;
    setError(false);
    setSending(true);
    // Envío real vía webhook n8n → aviso a reservations@lapalmayeltucan.com.
    const ok = await submitForm({ type: "newsletter", email, name });
    setSending(false);
    if (!ok) {
      setError(true);
      return;
    }
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
            src="/img/newsletter-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            quality={90}
          />

          {/* Modal blanco */}
          <div className="relative z-10 max-w-2xl w-full mx-4 p-10 md:p-16 bg-white shadow-xl">
            <h2 className="text-2xl md:text-3xl lg:text-[2rem] text-center mb-6 leading-snug text-forest-dark">
              {t.title_part1}
              <strong className="font-bold">{t.title_highlight}</strong>
              {t.title_part2}
            </h2>
            <p className="text-sm md:text-base text-ink-soft text-center mb-10 leading-relaxed max-w-md mx-auto">
              {t.lead}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre — label arriba */}
              <div>
                <label htmlFor="nl-name" className="block text-sm text-ink-soft mb-2 font-medium">
                  {t.name_placeholder}
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
                  {t.terms} <span className="text-red-500">*</span>
                </span>
              </label>

              <button type="submit" disabled={sending} className="btn btn-primary w-full mt-2 disabled:opacity-60">
                {t.cta}
              </button>
            </form>

            {sent && (
              <p className="mt-4 text-sm text-forest text-center" aria-live="polite">
                ✓ {t.success}
              </p>
            )}
            {error && (
              <p className="mt-4 text-sm text-red-600 text-center" aria-live="polite">
                {t.error}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useId, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { reservationUrl } from "@/lib/booking";

const DAY_MS = 86_400_000;
const toISODate = (d: Date) => d.toISOString().slice(0, 10);

type BookingLabels = {
  checkin: string;
  checkout: string;
  cta: string;
};

/**
 * Barra de reserva directa del hero: el huésped elige llegada y salida y
 * el botón abre el motor de Cloudbeds con esas fechas ya seleccionadas.
 * Reemplaza al antiguo botón que abría Cloudbeds en blanco.
 */
export function BookingBar({ labels, locale }: { labels: BookingLabels; locale: Locale }) {
  const today = toISODate(new Date());
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const inId = useId();
  const outId = useId();

  // La salida nunca puede ser el mismo día (o antes) que la llegada.
  const minCheckout = checkin ? toISODate(new Date(new Date(checkin).getTime() + DAY_MS)) : today;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = reservationUrl(locale, { checkin, checkout });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="booking-bar mx-auto flex w-full max-w-2xl min-w-0 flex-col gap-3 rounded-3xl border border-paper/25 bg-paper/12 p-3 text-left backdrop-blur-md sm:flex-row sm:items-end sm:gap-3 sm:rounded-[2rem] sm:p-2.5 sm:pl-5"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <label htmlFor={inId} className="text-[11px] font-medium uppercase tracking-[0.14em] text-paper/85">
          {labels.checkin}
        </label>
        <input
          id={inId}
          type="date"
          required
          min={today}
          value={checkin}
          onChange={(e) => {
            const v = e.target.value;
            setCheckin(v);
            // Si la salida quedó inválida respecto a la nueva llegada, la limpiamos.
            if (checkout && v && checkout <= v) setCheckout("");
          }}
          className="date-field w-full min-w-0 max-w-full rounded-full border-0 bg-paper/95 px-4 py-2.5 text-sm text-forest-dark outline-none focus:ring-2 focus:ring-gold/70"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <label htmlFor={outId} className="text-[11px] font-medium uppercase tracking-[0.14em] text-paper/85">
          {labels.checkout}
        </label>
        <input
          id={outId}
          type="date"
          required
          min={minCheckout}
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
          className="date-field w-full min-w-0 max-w-full rounded-full border-0 bg-paper/95 px-4 py-2.5 text-sm text-forest-dark outline-none focus:ring-2 focus:ring-gold/70"
        />
      </div>

      <button type="submit" className="btn btn-rose shrink-0 justify-center sm:self-stretch">
        {labels.cta}
      </button>
    </form>
  );
}

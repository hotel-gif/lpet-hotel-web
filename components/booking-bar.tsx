"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { reservationUrl } from "@/lib/booking";
import { DateRangePicker, type DateRangeLabels } from "@/components/date-range-picker";

type BookingLabels = DateRangeLabels & {
  cta: string;
};

/** YYYY-MM-DD en hora LOCAL (nunca toISOString: en Colombia, UTC-5, corre el
 * día después de las 7 p.m. si se usa UTC). */
function toISODateLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Barra de reserva directa del hero: el huésped elige llegada y salida con
 * un selector de rango propio (dos toques, sin botón "Aceptar") y el botón
 * abre el motor de Cloudbeds con esas fechas ya seleccionadas.
 */
export function BookingBar({ labels, locale }: { labels: BookingLabels; locale: Locale }) {
  const [checkin, setCheckin] = useState<Date | null>(null);
  const [checkout, setCheckout] = useState<Date | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Si falta alguna fecha, abrimos el calendario en vez de enviar (sin `required` nativo).
    if (!checkin || !checkout) {
      setPickerOpen(true);
      return;
    }
    const url = reservationUrl(locale, {
      checkin: toISODateLocal(checkin),
      checkout: toISODateLocal(checkout),
    });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="booking-bar mx-auto flex w-full max-w-2xl min-w-0 flex-col gap-3 rounded-3xl border border-paper/25 bg-paper/12 p-3 text-left backdrop-blur-md sm:flex-row sm:items-end sm:gap-3 sm:rounded-[2rem] sm:p-2.5 sm:pl-5"
    >
      <DateRangePicker
        locale={locale}
        checkin={checkin}
        checkout={checkout}
        onChange={(range) => {
          setCheckin(range.checkin);
          setCheckout(range.checkout);
        }}
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        labels={labels}
        anchorRef={formRef}
      />

      <button type="submit" className="btn btn-rose shrink-0 justify-center sm:self-stretch">
        {labels.cta}
      </button>
    </form>
  );
}

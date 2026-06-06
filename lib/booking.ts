import type { Locale } from "@/lib/i18n";

/**
 * Código de propiedad del hotel en el motor de reservas Cloudbeds.
 * OJO: el anterior (`i0wxBO`) está MUERTO y devuelve 400; el real es `yB0fEt`
 * (tomado del botón "Reserva Directa" en vivo de lapalmayeltucanhotel.com).
 */
export const RESERVATION_CODE = "yB0fEt";

/**
 * URL del motor de reservas de Cloudbeds. El path sigue el idioma del sitio
 * (`/es` o `/en`) y los precios se muestran en pesos (`currency=cop`).
 * Acepta fechas opcionales (formato YYYY-MM-DD) que Cloudbeds precarga vía
 * querystring `checkin`/`checkout`.
 */
export function reservationUrl(
  locale: Locale = "es",
  opts?: { checkin?: string; checkout?: string },
): string {
  const url = new URL(`https://hotels.cloudbeds.com/${locale}/reservation/${RESERVATION_CODE}`);
  url.searchParams.set("currency", "cop");
  if (opts?.checkin) url.searchParams.set("checkin", opts.checkin);
  if (opts?.checkout) url.searchParams.set("checkout", opts.checkout);
  return url.toString();
}

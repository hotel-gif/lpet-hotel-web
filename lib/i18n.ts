// Tipos y constantes de internacionalización (importable desde server y client).
import type esDict from "@/messages/es.json";

/** El diccionario completo. `en.json` debe tener exactamente las mismas claves que `es.json`. */
export type Dictionary = typeof esDict;

export type Locale = "es" | "en";

export const locales = ["es", "en"] as const;
export const defaultLocale: Locale = "es";

/** Etiqueta legible de cada idioma (para el selector). */
export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

import "server-only";
import type { Dictionary, Locale } from "./i18n";

// Carga diferida del diccionario por idioma (solo en el servidor).
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import("@/messages/es.json").then((m) => m.default as Dictionary),
  en: () => import("@/messages/en.json").then((m) => m.default as Dictionary),
};

export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  (dictionaries[locale] ?? dictionaries.es)();

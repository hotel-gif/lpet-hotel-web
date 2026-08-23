/**
 * Reseñas del hotel en Google, vía Places API.
 *
 * La clave vive en una variable de entorno y esta función solo corre en el
 * servidor: el navegador nunca la ve. Google cobra por consulta, así que la
 * respuesta se cachea 24 horas — las reseñas cambian poco y sin caché cada
 * visitante generaría una llamada facturada.
 *
 * ⚠️ Al mostrar estos datos, Google exige tres cosas (ver `reviews.tsx`):
 * el nombre y la foto de quien escribió con enlace a su perfil, su logo
 * visible, y un enlace de vuelta a la ficha en Maps. No son opcionales.
 *
 * ⚠️ Y una que NO se puede hacer: declarar esta calificación como
 * `aggregateRating` del hotel en los datos estructurados. Son reseñas de un
 * tercero; hacerlo expone el sitio a perder todos sus resultados enriquecidos.
 */

/** Identificador del hotel en Google. Se busca una vez y no cambia. */
const PLACE_ID = "ChIJX0HirQFwP44RDYvo1qJ4nS4";

/** Google devuelve como máximo 5, y las elige él ("las más relevantes"). */
const MAX_RESENAS = 5;

export type ResenaGoogle = {
  autor: string;
  foto: string | null;
  perfil: string | null;
  estrellas: number;
  texto: string;
  cuando: string;
};

export type DatosGoogle = {
  calificacion: number;
  total: number;
  mapsUrl: string;
  resenas: ResenaGoogle[];
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Array<{
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: { displayName?: string; photoUri?: string; uri?: string };
  }>;
};

/**
 * Devuelve la calificación y hasta 5 reseñas, o `null` si algo falla. Nunca
 * lanza: la sección de reseñas debe seguir en pie aunque Google no responda.
 *
 * @param locale idioma en que se piden las reseñas ("es" o "en")
 */
export async function getResenasGoogle(locale: string): Promise<DatosGoogle | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) {
    console.error("[resenas] falta GOOGLE_PLACES_API_KEY");
    return null;
  }

  const campos = [
    "rating",
    "userRatingCount",
    "googleMapsUri",
    "reviews",
  ].join(",");

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=${locale}`,
      {
        headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": campos },
        // Caché de 24 h: Google cobra por consulta y las reseñas casi no cambian.
        next: { revalidate: 86_400 },
      },
    );
    if (!res.ok) {
      console.error(`[resenas] Places respondió ${res.status}`);
      return null;
    }

    const data = (await res.json()) as PlacesResponse;
    if (typeof data.rating !== "number") return null;

    return {
      calificacion: data.rating,
      total: data.userRatingCount ?? 0,
      mapsUrl: data.googleMapsUri ?? "",
      resenas: (data.reviews ?? []).slice(0, MAX_RESENAS).map((r) => ({
        autor: r.authorAttribution?.displayName ?? "",
        foto: r.authorAttribution?.photoUri ?? null,
        perfil: r.authorAttribution?.uri ?? null,
        estrellas: r.rating ?? 5,
        // `originalText` conserva el idioma en que se escribió; `text` viene
        // traducido al idioma pedido. Se prefiere el traducido y se cae al
        // original cuando Google no lo traduce.
        texto: r.text?.text ?? r.originalText?.text ?? "",
        cuando: r.relativePublishTimeDescription ?? "",
      })),
    };
  } catch (e) {
    console.error("[resenas] no se pudo consultar Google", e);
    return null;
  }
}

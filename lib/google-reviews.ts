import { GoogleAuth } from "google-auth-library";

/**
 * Reseñas del hotel en Google, vía Places API.
 *
 * Esta función solo corre en el servidor: el navegador nunca ve las
 * credenciales. Google cobra por consulta, así que la respuesta se cachea 24
 * horas — las reseñas cambian poco y sin caché cada visitante generaría una
 * llamada facturada.
 *
 * ## Cómo se autentica
 *
 * Hay dos caminos y se prefiere el primero:
 *
 * 1. **Cuenta de servicio** (`GOOGLE_SERVICE_ACCOUNT_JSON`). Es lo que exige la
 *    política de la organización del hotel, que **prohíbe las claves de API**.
 *    Además una clave aquí no se podría restringir por dominio: la petición
 *    sale del servidor y no lleva la cabecera `Referer` que Google necesita
 *    para esa comprobación.
 * 2. **Clave de API** (`GOOGLE_PLACES_API_KEY`), el modo anterior. Se conserva
 *    como respaldo para que el sitio no dependa de que la migración termine, y
 *    para poder volver atrás sin desplegar. Cuando la cuenta de servicio esté
 *    en producción y estable, esta rama se puede borrar.
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
 * Cabeceras de autenticación para Places.
 *
 * Con cuenta de servicio hay que mandar además `X-Goog-User-Project`: sin ese
 * dato Google no sabe a qué proyecto facturar la consulta y responde 403.
 *
 * El cliente de `GoogleAuth` se guarda entre llamadas porque cachea el token
 * y lo renueva solo; crear uno nuevo en cada petición pediría un token cada vez.
 */
let clienteAuth: GoogleAuth | null = null;

async function cabecerasAuth(): Promise<Record<string, string> | null> {
  const sa = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (sa) {
    try {
      const credentials = JSON.parse(sa);
      clienteAuth ??= new GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/cloud-platform"],
      });
      const token = await clienteAuth.getAccessToken();
      if (token) {
        return {
          Authorization: `Bearer ${token}`,
          "X-Goog-User-Project": credentials.project_id,
        };
      }
      console.error("[resenas] la cuenta de servicio no devolvió token");
    } catch (e) {
      // Un JSON mal pegado en Vercel no debe dejar la sección sin reseñas:
      // se avisa y se intenta con la clave, si todavía existe.
      console.error("[resenas] cuenta de servicio inválida, se usa la clave", e);
    }
  }

  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (key) return { "X-Goog-Api-Key": key };

  console.error("[resenas] no hay credenciales: falta GOOGLE_SERVICE_ACCOUNT_JSON y GOOGLE_PLACES_API_KEY");
  return null;
}

/**
 * Devuelve la calificación y hasta 5 reseñas, o `null` si algo falla. Nunca
 * lanza: la sección de reseñas debe seguir en pie aunque Google no responda.
 *
 * @param locale idioma en que se piden las reseñas ("es" o "en")
 */
export async function getResenasGoogle(locale: string): Promise<DatosGoogle | null> {
  const cabeceras = await cabecerasAuth();
  if (!cabeceras) return null;

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
        headers: { ...cabeceras, "X-Goog-FieldMask": campos },
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

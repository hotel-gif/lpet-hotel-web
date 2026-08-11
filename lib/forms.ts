// Envío de los formularios del sitio (contacto + newsletter) a `/api/crm`, que
// corre en el servidor y los registra en Bitrix24 (ver app/api/crm/route.ts).
// Antes apuntaba directo a un webhook de n8n que solo reenviaba por correo; ese
// aviso se conserva desde el servidor, pero el destino real ahora es el CRM.
// La llamada es de mismo origen, así que ya no depende de CORS.
export const FORM_ENDPOINT = "/api/crm";

/** Envía el payload al endpoint. Devuelve true si el servidor respondió OK. */
export async function submitForm(payload: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

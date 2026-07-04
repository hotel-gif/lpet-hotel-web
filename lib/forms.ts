// Envío de los formularios del sitio (contacto + newsletter) a un webhook de
// n8n que reenvía por correo a reservations@lapalmayeltucan.com.
// Reemplaza al backend de WordPress (Fluent Forms), que no existe en el sitio
// estático. El webhook tiene CORS habilitado para el origen del sitio.
export const FORM_WEBHOOK = "https://jhona.app.n8n.cloud/webhook/hotel-form";

/** Envía el payload al webhook. Devuelve true si el servidor respondió OK. */
export async function submitForm(payload: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch(FORM_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

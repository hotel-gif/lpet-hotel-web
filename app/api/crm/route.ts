// Recibe los formularios del sitio (contacto + newsletter) y los registra en
// Bitrix24. Corre en el servidor de Vercel a propósito: la URL del webhook de
// Bitrix es la llave completa del CRM (scope `crm` entero), y llamándola desde
// el navegador quedaría escrita en el bundle público — cualquiera podría leer
// o borrar los ~6.900 contactos y ~6.100 deals. Por eso el secreto vive en una
// variable de entorno y nunca sale del servidor.
//
//   contacto   → Contacto + Deal en el embudo Prospectos (7), etapa "Validación"
//   newsletter → solo Contacto (un suscriptor no es una oportunidad comercial)
//
// ⚠️ Este archivo no sobrevive al build estático (`STATIC_EXPORT=true`, el de
// GitHub Pages): `output: "export"` no admite handlers POST. El dominio oficial
// corre en Vercel con SSR, que sí los soporta.

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WEBHOOK = process.env.BITRIX_WEBHOOK_URL;

// El aviso por correo a reservations@ lo manda hoy el workflow de n8n. Se deja
// como reenvío opcional para no perderlo al sacar n8n del camino: si la
// variable no está, simplemente no se envía y Bitrix notifica al responsable.
const EMAIL_WEBHOOK = process.env.FORM_EMAIL_WEBHOOK;

// Diego Velez (1) y Gerwin Gacia (11739): los dos que ya concentran los
// contactos y deals del CRM. Se reparten uno y uno.
const RESPONSABLES = [1, 11739];

const EMBUDO_PROSPECTOS = 7;
// Las etapas de este embudo están renombradas: la primera columna es
// PREPAYMENT_INVOICE ("Validación"), NO la que se llama NEW — que aquí es
// "Casos Especiales" y significa otra cosa.
const ETAPA_INICIAL = "C7:PREPAYMENT_INVOICE";
const TIPO_PROSPECTO = "UC_8743PS"; // TYPE_ID "Prospecto"
const ORIGEN_WEB = "WEB"; // SOURCE_ID "Sitio Web"

/**
 * Reparto entre responsables derivado del email, sin estado: en serverless no
 * hay dónde guardar el turno. Reparte parejo y, de yapa, un mismo remitente
 * siempre cae en la misma persona, que así conserva el hilo.
 */
function elegirResponsable(email: string): number {
  let h = 0;
  for (let i = 0; i < email.length; i++) h = (h * 31 + email.charCodeAt(i)) >>> 0;
  return RESPONSABLES[h % RESPONSABLES.length];
}

const limpiar = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
const emailValido = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

/**
 * Bitrix guarda COMMENTS como HTML: en texto plano los saltos de línea se
 * pierden y el mensaje se lee como un párrafo corrido. Se escapa lo que llega
 * (nadie inyecta marcado en el CRM) y solo los saltos se vuelven <br>.
 */
const aHtml = (texto: string) =>
  texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\r?\n/g, "<br>");

async function bitrix<T>(metodo: string, cuerpo: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${WEBHOOK}${metodo}.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cuerpo),
  });
  const data = await res.json();
  if (data.error) {
    throw new Error(`${metodo}: ${data.error_description || data.error}`);
  }
  return data.result as T;
}

/** Devuelve el ID del contacto que ya tenga ese correo, o null si no existe. */
async function buscarContacto(email: string): Promise<number | null> {
  const r = await bitrix<{ CONTACT?: number[] }>("crm.duplicate.findbycomm", {
    type: "EMAIL",
    values: [email],
    entity_type: "CONTACT",
  });
  return r?.CONTACT?.[0] ?? null;
}

/**
 * Reutiliza el contacto si el correo ya está en la base — con ~6.900 contactos
 * cargados, crear uno nuevo por cada mensaje ensuciaría el CRM. Nunca modifica
 * el existente: solo lo devuelve para engancharle el deal.
 */
async function obtenerOCrearContacto(datos: {
  nombre: string;
  apellido: string;
  email: string;
  comentario: string;
  responsable: number;
}): Promise<{ id: number; creado: boolean }> {
  const existente = await buscarContacto(datos.email);
  if (existente) return { id: existente, creado: false };

  const id = await bitrix<number>("crm.contact.add", {
    fields: {
      NAME: datos.nombre,
      LAST_NAME: datos.apellido,
      EMAIL: [{ VALUE: datos.email, VALUE_TYPE: "WORK" }],
      TYPE_ID: TIPO_PROSPECTO,
      SOURCE_ID: ORIGEN_WEB,
      SOURCE_DESCRIPTION: datos.comentario,
      ASSIGNED_BY_ID: datos.responsable,
      OPENED: "Y",
    },
    params: { REGISTER_SONET_EVENT: "Y" },
  });
  return { id, creado: true };
}

/** Reenvía al webhook de n8n para el correo a reservations@. Nunca lanza. */
async function avisarPorCorreo(payload: unknown): Promise<boolean> {
  if (!EMAIL_WEBHOOK) return false;
  try {
    const res = await fetch(EMAIL_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "json" }, { status: 400 });
  }

  const tipo = limpiar(body.type, 40).toLowerCase() || "contacto";
  const email = limpiar(body.email, 150).toLowerCase();
  if (!emailValido(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }

  // El correo sale primero: si el CRM falla, el mensaje no se pierde igual.
  const correoOk = await avisarPorCorreo(body);
  const responsable = elegirResponsable(email);

  // Sin credencial no se puede escribir en el CRM, pero el formulario NO debe
  // romperse por eso: si el correo salió, el mensaje llegó igual. Cubre el
  // despiste de desplegar antes de cargar la variable en Vercel.
  if (!WEBHOOK) {
    console.error("[crm] falta BITRIX_WEBHOOK_URL — no se registró en el CRM");
    return correoOk
      ? NextResponse.json({ ok: true, crm: false })
      : NextResponse.json({ ok: false, error: "config" }, { status: 500 });
  }

  try {
    if (tipo === "newsletter") {
      // Sin deal: es una suscripción, no una oportunidad. Queda en la base con
      // el origen marcado para poder segmentarla después en campañas.
      const nombre = limpiar(body.name ?? body.nombre, 100);
      const { id, creado } = await obtenerOCrearContacto({
        nombre: nombre || email.split("@")[0],
        apellido: "",
        email,
        comentario: "Newsletter — lapalmayeltucanhotel.com",
        responsable,
      });
      return NextResponse.json({ ok: true, contactId: id, creado });
    }

    const nombre = limpiar(body.first_name, 100);
    const apellido = limpiar(body.last_name, 100);
    const asunto = limpiar(body.subject, 200);
    const mensaje = limpiar(body.message, 5000);

    const { id: contactId, creado } = await obtenerOCrearContacto({
      nombre: nombre || email.split("@")[0],
      apellido,
      email,
      comentario: "Formulario de contacto — lapalmayeltucanhotel.com",
      responsable,
    });

    const titulo = [nombre, apellido].filter(Boolean).join(" ") || email;
    const dealId = await bitrix<number>("crm.deal.add", {
      fields: {
        TITLE: asunto ? `${titulo} — ${asunto}` : `${titulo} — Contacto web`,
        CATEGORY_ID: EMBUDO_PROSPECTOS,
        STAGE_ID: ETAPA_INICIAL,
        CONTACT_ID: contactId,
        SOURCE_ID: ORIGEN_WEB,
        SOURCE_DESCRIPTION: "Formulario de contacto — lapalmayeltucanhotel.com",
        COMMENTS: aHtml(mensaje),
        ASSIGNED_BY_ID: responsable,
        OPENED: "Y",
      },
      params: { REGISTER_SONET_EVENT: "Y" },
    });

    return NextResponse.json({ ok: true, contactId, dealId, creado });
  } catch (e) {
    // Si el correo sí salió, el mensaje está a salvo: se responde OK para no
    // mostrarle un error al visitante por una falla interna del CRM.
    console.error("[crm]", e);
    if (correoOk) return NextResponse.json({ ok: true, crm: false });
    return NextResponse.json({ ok: false, error: "crm" }, { status: 502 });
  }
}

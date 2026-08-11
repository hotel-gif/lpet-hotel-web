"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { submitForm } from "@/lib/forms";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Indicativos para el selector. Colombia primero (la mayoría de las consultas)
 * y detrás los mercados de donde llegan los huéspedes extranjeros. La `key` va
 * aparte del `code` porque EE.UU. y Canadá comparten el +1 y el value de un
 * <option> tiene que ser único.
 */
const INDICATIVOS = [
  { key: "CO", code: "+57", label: "🇨🇴 Colombia" },
  { key: "US", code: "+1", label: "🇺🇸 Estados Unidos" },
  { key: "CA", code: "+1", label: "🇨🇦 Canadá" },
  { key: "MX", code: "+52", label: "🇲🇽 México" },
  { key: "ES", code: "+34", label: "🇪🇸 España" },
  { key: "GB", code: "+44", label: "🇬🇧 Reino Unido" },
  { key: "DE", code: "+49", label: "🇩🇪 Alemania" },
  { key: "FR", code: "+33", label: "🇫🇷 Francia" },
  { key: "IT", code: "+39", label: "🇮🇹 Italia" },
  { key: "NL", code: "+31", label: "🇳🇱 Países Bajos" },
  { key: "CH", code: "+41", label: "🇨🇭 Suiza" },
  { key: "BR", code: "+55", label: "🇧🇷 Brasil" },
  { key: "AR", code: "+54", label: "🇦🇷 Argentina" },
  { key: "CL", code: "+56", label: "🇨🇱 Chile" },
  { key: "PE", code: "+51", label: "🇵🇪 Perú" },
  { key: "EC", code: "+593", label: "🇪🇨 Ecuador" },
  { key: "PA", code: "+507", label: "🇵🇦 Panamá" },
  { key: "AU", code: "+61", label: "🇦🇺 Australia" },
];

export function ContactoForm({ m }: { m: Dictionary }) {
  const t = m.contacto_page.form;
  const [status, setStatus] = useState<Status>("idle");
  const [shake, setShake] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    // El indicativo viaja unido al número: en el CRM se necesita el teléfono
    // completo para poder marcar o escribir por WhatsApp sin recomponerlo.
    const phoneCode = String(formData.get("phone_code") || "");
    const phoneNumber = String(formData.get("phone") || "").trim();
    const payload = {
      type: "contacto",
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      phone: phoneNumber ? `${phoneCode} ${phoneNumber}` : "",
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    // Envío real vía webhook n8n → correo a reservations@lapalmayeltucan.com.
    const ok = await submitForm(payload);
    if (ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  // Dispara el shake cuando el navegador bloquea el submit por campos inválidos.
  function handleInvalid() {
    setShake(true);
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="success-check bg-paper border border-forest-dark/15 p-8 md:p-10 flex flex-col items-center text-center"
        style={{ fontFamily: "var(--font-gotham), sans-serif" }}
      >
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-forest mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              className="check-path"
              d="M5 13l4 4L19 7"
              stroke="#fbf8f1"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="text-lg md:text-xl text-forest-dark leading-[1.6]">
          {t.success}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-forest underline"
        >
          {t.send_another}
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full border border-forest-dark/25 bg-transparent px-5 py-4 text-base text-forest-dark placeholder:text-forest-dark/55 focus:outline-none focus:border-forest-dark transition-colors";

  return (
    <form
      onSubmit={handleSubmit}
      onInvalid={handleInvalid}
      onAnimationEnd={() => setShake(false)}
      className={`space-y-4${shake ? " form-shake" : ""}`}
      style={{ fontFamily: "var(--font-gotham), sans-serif" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="first_name"
          required
          aria-label={t.first_name}
          placeholder={t.first_name}
          className={inputClass}
        />
        <input
          name="last_name"
          required
          aria-label={t.last_name}
          placeholder={t.last_name}
          className={inputClass}
        />
      </div>
      <input
        name="email"
        type="email"
        required
        aria-label={t.email}
        placeholder={t.email}
        className={inputClass}
      />
      {/* Indicativo + número. En móvil el selector va arriba y el número debajo;
          desde md comparten fila con el selector angosto. */}
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,11rem)_1fr] gap-4">
        <select
          name="phone_code"
          defaultValue="+57"
          aria-label={t.phone_code}
          className={`${inputClass} appearance-none cursor-pointer`}
        >
          {INDICATIVOS.map((p) => (
            <option key={p.key} value={p.code}>
              {p.label} {p.code}
            </option>
          ))}
        </select>
        <input
          name="phone"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          aria-label={t.phone}
          placeholder={t.phone}
          className={inputClass}
        />
      </div>
      <input name="subject" aria-label={t.subject} placeholder={t.subject} className={inputClass} />
      <textarea
        name="message"
        required
        rows={6}
        aria-label={t.message}
        placeholder={t.message}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center bg-forest-dark text-paper px-10 py-3.5 text-sm tracking-[0.05em] hover:bg-forest transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? t.sending : t.submit}
      </button>
      {status === "error" && (
        <p className="text-sm text-[#a14a5a] mt-2" role="alert">{t.error}</p>
      )}
    </form>
  );
}

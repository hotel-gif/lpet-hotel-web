"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactoForm({ m }: { m: Dictionary }) {
  const t = m.contacto_page.form;
  const [status, setStatus] = useState<Status>("idle");
  const [shake, setShake] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const payload = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    // TODO: conectar a webhook n8n o Server Action
    // Por ahora simulamos un envío exitoso tras 600ms
    console.log("contacto submit", payload);
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
    e.currentTarget.reset();
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

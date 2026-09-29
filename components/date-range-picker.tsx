"use client";

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "@/lib/i18n";

/**
 * Selector de rango de fechas (llegada/salida) de la barra de reserva.
 * Reemplaza los dos <input type="date"> nativos: en Android obligaban a abrir
 * el calendario, elegir el día, tocar "Aceptar" y repetir para la salida.
 * Aquí un solo calendario compartido resuelve la llegada Y la salida en DOS
 * toques (el segundo cierra solo), con bottom sheet en celular y popover de
 * dos meses en computador.
 */

export type DateRangeLabels = {
  /** Etiqueta del campo "Llegada". */
  checkin: string;
  /** Etiqueta del campo "Salida". */
  checkout: string;
  /** Texto cuando aún no hay fecha elegida (ej. "Elegir fecha"). */
  chooseDate: string;
  /** "noche" en singular. */
  night: string;
  /** "noches" en plural. */
  nights: string;
  /** Texto/aria-label del botón de cerrar. */
  close: string;
  /** aria-label de la flecha "mes anterior". */
  prevMonth: string;
  /** aria-label de la flecha "mes siguiente". */
  nextMonth: string;
  /** aria-label del diálogo del calendario. */
  calendarLabel: string;
};

export type DateRange = { checkin: Date | null; checkout: Date | null };

type Props = {
  locale: Locale;
  checkin: Date | null;
  checkout: Date | null;
  onChange: (range: DateRange) => void;
  /** Controlado por el padre: permite abrir el calendario desde el submit. */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  labels: DateRangeLabels;
  /** Elemento contra el cual se ancla el popover de escritorio (la barra completa). */
  anchorRef: React.RefObject<HTMLElement | null>;
};

const DAY_MS = 86_400_000;

/** YYYY-MM-DD en hora LOCAL (nunca toISOString: en Colombia corre el día tras las 7pm). */
function dateKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

/** Matriz de semanas (lunes a domingo) para un mes dado; casillas fuera de mes = null. */
function getMonthMatrix(month: Date): (Date | null)[][] {
  const year = month.getFullYear();
  const m = month.getMonth();
  const daysInMonth = new Date(year, m + 1, 0).getDate();
  // getDay(): 0=domingo..6=sábado -> lo convertimos a 0=lunes..6=domingo.
  const firstWeekday = (new Date(year, m, 1).getDay() + 6) % 7;
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, m, day));
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function intlLocale(locale: Locale): string {
  return locale === "en" ? "en-US" : "es-ES";
}

/** Mayúscula solo en la primera letra (Intl en es-ES devuelve "octubre de 2026" en minúsculas;
 * la clase `capitalize` de Tailwind pone mayúscula en CADA palabra -> "Octubre De 2026", mal). */
function capitalizeFirst(s: string): string {
  return s.length ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

/** Encabezados de mes ("Octubre de 2026" / "October 2026"), vía Intl según locale. */
function formatMonthTitle(month: Date, locale: Locale): string {
  return capitalizeFirst(new Intl.DateTimeFormat(intlLocale(locale), { month: "long", year: "numeric" }).format(month));
}

/** Nombres de días lun..dom / Mon..Sun, vía Intl (5-11 ene 2026 es una semana lun-dom conocida). */
function getWeekdayLabels(locale: Locale): string[] {
  const fmt = new Intl.DateTimeFormat(intlLocale(locale), { weekday: "short" });
  const labels: string[] = [];
  for (let i = 0; i < 7; i++) labels.push(fmt.format(new Date(2026, 0, 5 + i)));
  return labels;
}

/** Fecha legible del campo: "vie 10 oct" (es) / "Fri, Oct 10" (en). */
function formatFieldDate(date: Date, locale: Locale): string {
  const loc = intlLocale(locale);
  const weekday = new Intl.DateTimeFormat(loc, { weekday: "short" }).format(date);
  const month = new Intl.DateTimeFormat(loc, { month: "short" }).format(date);
  const day = date.getDate();
  return locale === "en" ? `${weekday}, ${month} ${day}` : `${weekday} ${day} ${month}`;
}

/** Fecha completa para aria-label: "sábado, 10 de octubre de 2026". */
function formatFullDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

type Phase = "closed" | "entering" | "open" | "closing";
type Mode = "checkin" | "checkout";
type OpenIntent = "checkin" | "checkout" | null;

export function DateRangePicker({ locale, checkin, checkout, onChange, open, onOpenChange, labels, anchorRef }: Props) {
  const dialogId = useId();
  const reducedMotion = usePrefersReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>("closed");
  const [mode, setMode] = useState<Mode>("checkin");
  const [viewMonth, setViewMonth] = useState<Date>(() => startOfMonth(checkin ?? new Date()));
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [anchorPos, setAnchorPos] = useState<{ top: number; left: number; maxHeight: number | null } | null>(null);
  const [pendingFocusKey, setPendingFocusKey] = useState<string | null>(null);

  const openIntentRef = useRef<OpenIntent>(null);
  const checkinBtnRef = useRef<HTMLButtonElement | null>(null);
  const checkoutBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const dayRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const wasOpenRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const today = useMemo(() => startOfDay(new Date()), []);
  const currentMonthStart = useMemo(() => startOfMonth(today), [today]);
  const weekdayLabels = useMemo(() => getWeekdayLabels(locale), [locale]);

  const nights = checkin && checkout ? Math.round((checkout.getTime() - checkin.getTime()) / DAY_MS) : 0;

  useEffect(() => setMounted(true), []);

  function registerDayRef(key: string, el: HTMLButtonElement | null) {
    if (el) dayRefs.current.set(key, el);
    else dayRefs.current.delete(key);
  }

  function returnFocus() {
    lastTriggerRef.current?.focus();
  }

  function requestClose() {
    if (phase === "closing" || phase === "closed") return;
    onOpenChange(false);
    if (reducedMotion) {
      setPhase("closed");
      returnFocus();
      return;
    }
    setPhase("closing");
  }

  function openWith(intent: OpenIntent, triggerEl: HTMLButtonElement | null) {
    openIntentRef.current = intent;
    lastTriggerRef.current = triggerEl;
    onOpenChange(true);
  }

  // Sincroniza el prop controlado `open` con la máquina de animación interna.
  useEffect(() => {
    const wasOpen = wasOpenRef.current;
    wasOpenRef.current = open;
    if (open && !wasOpen) {
      const intent = openIntentRef.current;
      openIntentRef.current = null;
      const initialMode: Mode = intent === "checkin" ? "checkin" : intent === "checkout" ? (checkin ? "checkout" : "checkin") : checkin && !checkout ? "checkout" : "checkin";
      setMode(initialMode);
      setViewMonth(startOfMonth(checkin ?? today));
      setPhase(reducedMotion ? "open" : "entering");
    } else if (!open && (phase === "open" || phase === "entering")) {
      requestClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // "entering" -> "open" en el siguiente frame para que la transición CSS corra.
  useEffect(() => {
    if (phase !== "entering") return;
    const id1 = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(() => setPhase("open"));
      return () => cancelAnimationFrame(id2);
    });
    return () => cancelAnimationFrame(id1);
  }, [phase]);

  function handlePanelTransitionEnd(e: React.TransitionEvent<HTMLDivElement>) {
    if (e.propertyName !== "transform" && e.propertyName !== "opacity") return;
    if (phase === "closing") {
      setPhase("closed");
      returnFocus();
    }
  }

  // Escape + bloqueo de scroll mientras está abierto.
  useEffect(() => {
    if (phase === "closed") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Posición del popover de escritorio, anclado bajo la barra completa.
  // Si no cabe debajo, se abre arriba; si tampoco cabe arriba, se centra
  // verticalmente con scroll interno. La altura se mide con `scrollHeight`
  // (altura real del contenido, NO afectada por el `max-height` que nosotros
  // mismos aplicamos) para no entrar en bucle con el propio reposicionamiento.
  useLayoutEffect(() => {
    if (phase === "closed") return;
    function update() {
      const isDesktop = window.matchMedia("(min-width: 640px)").matches;
      if (!isDesktop || !anchorRef.current) {
        setAnchorPos(null);
        return;
      }
      const rect = anchorRef.current.getBoundingClientRect();
      const panelEl = panelRef.current;
      const panelHeight = panelEl ? panelEl.scrollHeight : 0;
      const panelWidth = 640;
      const margin = 12;
      const left = Math.min(Math.max(rect.left, margin), Math.max(margin, window.innerWidth - panelWidth - margin));
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      let top: number;
      let maxHeight: number | null = null;
      if (panelHeight === 0 || spaceBelow >= panelHeight + margin) {
        // Por defecto (o antes de conocer la altura real) abrimos debajo.
        top = rect.bottom + 10;
      } else if (spaceAbove >= panelHeight + margin) {
        // No cabe debajo: lo abrimos arriba de la barra.
        top = rect.top - panelHeight - 10;
      } else {
        // No cabe ni arriba ni abajo (viewport bajo, ej. laptop sin scroll):
        // se centra verticalmente y el contenido hace scroll interno.
        maxHeight = window.innerHeight - 32;
        top = Math.max(margin, (window.innerHeight - Math.min(panelHeight, maxHeight)) / 2);
      }
      setAnchorPos({ top, left, maxHeight });
    }
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    const ro = new ResizeObserver(update);
    if (panelRef.current) ro.observe(panelRef.current);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      ro.disconnect();
    };
  }, [phase, anchorRef]);

  // Foco inicial al abrir: el día de llegada elegido, o si no, hoy.
  useEffect(() => {
    if (phase !== "open") return;
    const target = checkin ?? today;
    const key = dateKey(target);
    const el = dayRefs.current.get(key);
    if (el) el.focus();
    else panelRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Foco pendiente tras navegar de mes con las flechas del teclado.
  useEffect(() => {
    if (!pendingFocusKey) return;
    const el = dayRefs.current.get(pendingFocusKey);
    if (el) {
      el.focus();
      setPendingFocusKey(null);
    }
  }, [pendingFocusKey, viewMonth]);

  function handleDaySelect(day: Date) {
    if (mode === "checkin") {
      onChange({ checkin: day, checkout: null });
      setMode("checkout");
      return;
    }
    // mode === "checkout"
    if (!checkin || day <= checkin) {
      onChange({ checkin: day, checkout: null });
      setMode("checkout");
      return;
    }
    onChange({ checkin, checkout: day });
    setMode("checkin");
    requestClose();
  }

  function canGoPrev() {
    return startOfMonth(viewMonth).getTime() > currentMonthStart.getTime();
  }

  function goPrevMonth() {
    if (canGoPrev()) setViewMonth((m) => addMonths(m, -1));
  }

  function goNextMonth() {
    setViewMonth((m) => addMonths(m, 1));
  }

  function moveFocus(from: Date, deltaDays: number) {
    const target = addDays(from, deltaDays);
    if (target < today) return;
    const key = dateKey(target);
    const el = dayRefs.current.get(key);
    if (el) {
      el.focus();
      return;
    }
    // El día objetivo no está en un mes visible: navegamos y dejamos el foco pendiente.
    const targetMonthStart = startOfMonth(target);
    const clamped = targetMonthStart.getTime() < currentMonthStart.getTime() ? currentMonthStart : targetMonthStart;
    setPendingFocusKey(key);
    setViewMonth(clamped);
  }

  function handleDayKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, day: Date) {
    let delta = 0;
    if (e.key === "ArrowLeft") delta = -1;
    else if (e.key === "ArrowRight") delta = 1;
    else if (e.key === "ArrowUp") delta = -7;
    else if (e.key === "ArrowDown") delta = 7;
    else return;
    e.preventDefault();
    moveFocus(day, delta);
  }

  const previewEnd = checkout ?? (mode === "checkout" && hoverDate && checkin && hoverDate > checkin ? hoverDate : null);

  function dayClasses(day: Date): string {
    const disabled = day < today;
    const isCheckin = isSameDay(day, checkin);
    const isCheckout = isSameDay(day, checkout);
    const isEndpoint = isCheckin || isCheckout;
    const inRange = !!checkin && !!previewEnd && day.getTime() > checkin.getTime() && day.getTime() < previewEnd.getTime();
    const isToday = isSameDay(day, today);

    const base = "flex h-11 w-11 items-center justify-center rounded-full text-sm transition-colors sm:h-9 sm:w-9 sm:text-[13px] motion-reduce:transition-none";
    if (disabled) return `${base} cursor-not-allowed text-ink-soft/30`;
    if (isEndpoint) return `${base} bg-forest text-paper font-medium`;
    if (inRange) return `${base} bg-gold-soft/60 text-forest-dark`;
    if (isToday) return `${base} text-forest-dark ring-1 ring-forest/40`;
    return `${base} text-forest-dark hover:bg-gold-soft/40`;
  }

  function renderMonth(month: Date, hiddenOnMobile: boolean) {
    const weeks = getMonthMatrix(month);
    return (
      <div className={hiddenOnMobile ? "hidden sm:block" : undefined}>
        <p className="mb-3 text-center text-sm font-medium text-forest-dark">{formatMonthTitle(month, locale)}</p>
        <div className="grid grid-cols-7 gap-x-0.5" aria-hidden="true">
          {weekdayLabels.map((w, i) => (
            <span key={`${w}-${i}`} className="flex h-6 items-center justify-center text-[10px] uppercase tracking-wide text-forest-dark/50 sm:h-5">
              {w}
            </span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 justify-items-center gap-x-0.5 gap-y-1">
          {weeks.flatMap((week, wi) =>
            week.map((day, di) => {
              if (!day) return <span key={`e-${wi}-${di}`} aria-hidden="true" />;
              const key = dateKey(day);
              const disabled = day < today;
              const isCheckin = isSameDay(day, checkin);
              const isCheckout = isSameDay(day, checkout);
              return (
                <button
                  key={key}
                  ref={(el) => registerDayRef(key, el)}
                  type="button"
                  disabled={disabled}
                  aria-label={formatFullDate(day, locale)}
                  aria-pressed={isCheckin || isCheckout}
                  className={dayClasses(day)}
                  onClick={() => handleDaySelect(day)}
                  onMouseEnter={() => setHoverDate(day)}
                  onMouseLeave={() => setHoverDate((d) => (isSameDay(d, day) ? null : d))}
                  onKeyDown={(e) => handleDayKeyDown(e, day)}
                >
                  {day.getDate()}
                </button>
              );
            }),
          )}
        </div>
      </div>
    );
  }

  const showPanel = phase !== "closed";
  const entered = phase === "open";
  const transitionBase = "transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none motion-reduce:duration-0";
  const panelClassName = [
    "fixed inset-x-0 bottom-0 z-[10000] flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-3xl bg-paper shadow-[0_-20px_60px_-20px_rgba(18,34,24,0.35)] outline-none",
    "sm:inset-x-auto sm:bottom-auto sm:w-[40rem] sm:max-h-none sm:rounded-3xl sm:shadow-[0_30px_80px_-30px_rgba(18,34,24,0.45)]",
    transitionBase,
    entered ? "translate-y-0 opacity-100 sm:translate-y-0" : "translate-y-full opacity-0 sm:translate-y-2",
  ].join(" ");
  const backdropClassName = [
    "fixed inset-0 z-[9999] bg-forest-dark/55 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none",
    "transition-opacity duration-300 motion-reduce:transition-none motion-reduce:duration-0",
    entered ? "opacity-100" : "opacity-0",
  ].join(" ");

  const fieldButtonClass =
    "date-field flex w-full min-w-0 max-w-full items-center justify-between gap-2 rounded-full border-0 bg-paper/95 px-4 py-2.5 text-left text-sm text-forest-dark outline-none focus:ring-2 focus:ring-gold/70";

  return (
    <>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span aria-hidden="true" className="text-[11px] font-medium uppercase tracking-[0.14em] text-paper/85">
          {labels.checkin}
        </span>
        <button
          ref={checkinBtnRef}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={showPanel}
          aria-label={`${labels.checkin}: ${checkin ? formatFullDate(checkin, locale) : labels.chooseDate}`}
          onClick={() => openWith("checkin", checkinBtnRef.current)}
          className={fieldButtonClass}
        >
          <span className={checkin ? "" : "text-forest-dark/50"}>{checkin ? formatFieldDate(checkin, locale) : labels.chooseDate}</span>
          <CalendarIcon />
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span aria-hidden="true" className="text-[11px] font-medium uppercase tracking-[0.14em] text-paper/85">
          {labels.checkout}
        </span>
        <button
          ref={checkoutBtnRef}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={showPanel}
          aria-label={`${labels.checkout}: ${checkout ? formatFullDate(checkout, locale) : labels.chooseDate}`}
          onClick={() => openWith("checkout", checkoutBtnRef.current)}
          className={fieldButtonClass}
        >
          <span className={checkout ? "" : "text-forest-dark/50"}>{checkout ? formatFieldDate(checkout, locale) : labels.chooseDate}</span>
          <CalendarIcon />
        </button>
      </div>

      {showPanel &&
        mounted &&
        createPortal(
          <>
            <div className={backdropClassName} aria-hidden="true" onClick={requestClose} />
            <div
              ref={panelRef}
              id={dialogId}
              role="dialog"
              aria-modal="true"
              aria-label={labels.calendarLabel}
              tabIndex={-1}
              className={panelClassName}
              style={
                anchorPos
                  ? {
                      top: anchorPos.top,
                      left: anchorPos.left,
                      ...(anchorPos.maxHeight != null ? { maxHeight: anchorPos.maxHeight } : null),
                    }
                  : undefined
              }
              onTransitionEnd={handlePanelTransitionEnd}
            >
              {/* Resumen: Llegada → Salida + noches */}
              <div className="flex items-center justify-between gap-3 border-b border-forest-dark/10 px-5 py-4 sm:px-6">
                <div aria-live="polite" className="min-w-0 text-sm text-forest-dark">
                  <span className="font-medium">{checkin ? formatFieldDate(checkin, locale) : labels.chooseDate}</span>
                  <span className="mx-1.5 text-forest-dark/50" aria-hidden="true">→</span>
                  <span className="font-medium">{checkout ? formatFieldDate(checkout, locale) : labels.chooseDate}</span>
                  {nights > 0 && (
                    <span className="ml-2 text-forest-dark/60">
                      · {nights} {nights === 1 ? labels.night : labels.nights}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={requestClose}
                  aria-label={labels.close}
                  className="shrink-0 rounded-full p-1.5 text-forest-dark/60 transition-colors hover:bg-forest-dark/5 hover:text-forest-dark"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Navegación de mes */}
              <div className="flex items-center justify-between px-5 pt-4 sm:px-6">
                <button
                  type="button"
                  onClick={goPrevMonth}
                  disabled={!canGoPrev()}
                  aria-label={labels.prevMonth}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-forest-dark transition-colors hover:bg-forest-dark/5 disabled:cursor-not-allowed disabled:text-ink-soft/25 disabled:hover:bg-transparent"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={goNextMonth}
                  aria-label={labels.nextMonth}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-forest-dark transition-colors hover:bg-forest-dark/5"
                >
                  ›
                </button>
              </div>

              {/* Meses (1 en celular, 2 en computador) */}
              <div
                className="grid min-h-0 flex-1 grid-cols-1 gap-6 overflow-y-auto px-4 pb-5 sm:grid-cols-2 sm:px-6 sm:pb-6"
                onMouseLeave={() => setHoverDate(null)}
              >
                {renderMonth(viewMonth, false)}
                {renderMonth(addMonths(viewMonth, 1), true)}
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-forest-dark/45">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

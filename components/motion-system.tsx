"use client";

import { useEffect } from "react";

/**
 * Motor de animaciones del rediseño (diseñado por "Claude diseños"), portado a
 * React. El CSS (estados .reveal/.in/.out, clip-reveal, entrada/salida del hero)
 * vive en globals.css; aquí solo se añaden/quitan clases y se setean variables
 * (--d, --hero-exit). Montar UNA vez en la página (p. ej. la home).
 *
 * Animaciones:
 *  - .reveal (+ data-anim=left/right/scale/fade): entrada/salida bidireccional
 *  - [data-stagger]: escalona los .reveal hijos con --d
 *  - .clip-reveal: cortina (clip-path) en <img>
 *  - .hero + .line: entrada escalonada al cargar (.loaded)
 *  - .hero-inner: salida del hero ligada al scroll (--hero-exit)
 *  - [data-count]: count-up de números (reseñas)
 *  - [data-parallax]: parallax por scroll
 */
type CountEl = HTMLElement & { _counting?: boolean };

export function MotionSystem() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---------- hero entrance (al cargar) ----------
    const heroEl = document.querySelector<HTMLElement>(".hero");
    const rafId = requestAnimationFrame(() =>
      requestAnimationFrame(() => heroEl?.classList.add("loaded"))
    );

    // ---------- count-up (9.5 / 5.0) ----------
    const countUp = (raw: Element) => {
      const el = raw as CountEl;
      if (el._counting) return;
      const target = parseFloat(el.dataset.count || "0");
      const dec = parseInt(el.dataset.dec || "0", 10);
      if (reduce) { el.textContent = target.toFixed(dec); return; }
      el._counting = true;
      const dur = 1400, t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
        el.textContent = (target * e).toFixed(dec);
        if (p < 1) requestAnimationFrame(tick);
        else { el.textContent = target.toFixed(dec); el._counting = false; }
      };
      requestAnimationFrame(tick);
    };

    // ---------- scroll reveal — bidireccional ----------
    const inGroup = new Set<Element>();
    document.querySelectorAll("[data-stagger]").forEach((g) =>
      g.querySelectorAll(".reveal").forEach((c) => inGroup.add(c))
    );

    const enter = (el: Element) => {
      el.classList.remove("out");
      if (el.hasAttribute("data-stagger")) {
        el.querySelectorAll<HTMLElement>(".reveal").forEach((c, i) => {
          c.style.setProperty("--d", i * 110 + "ms");
          c.classList.remove("out");
          c.classList.add("in");
        });
      } else {
        el.classList.add("in");
      }
      el.querySelectorAll("[data-count]").forEach(countUp);
      if (el.hasAttribute("data-count")) countUp(el);
    };

    const leave = (el: Element, aboveTop: boolean) => {
      const reset = (c: Element) => {
        c.classList.remove("in");
        (c as HTMLElement).style.setProperty("--d", "0ms");
        c.classList.toggle("out", aboveTop);
      };
      if (el.hasAttribute("data-stagger")) el.querySelectorAll(".reveal").forEach(reset);
      else reset(el);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) enter(e.target);
          else leave(e.target, e.boundingClientRect.top < 0);
        });
      },
      { threshold: 0.14, rootMargin: "-6% 0px -10% 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => { if (!inGroup.has(el)) io.observe(el); });
    document.querySelectorAll("[data-stagger]").forEach((el) => io.observe(el));
    document.querySelectorAll(".score-row").forEach((el) => io.observe(el));

    // ---------- hero exit (desvanecido ligado al scroll) ----------
    let heroScroll: (() => void) | null = null;
    if (heroEl && !reduce) {
      let hTick = false;
      const heroUpdate = () => {
        hTick = false;
        const h = heroEl.offsetHeight || window.innerHeight;
        const p = Math.min(Math.max(window.scrollY / (h * 0.85), 0), 1);
        heroEl.style.setProperty("--hero-exit", p.toFixed(3));
      };
      heroScroll = () => { if (!hTick) { requestAnimationFrame(heroUpdate); hTick = true; } };
      window.addEventListener("scroll", heroScroll, { passive: true });
      heroUpdate();
    }

    // ---------- parallax ----------
    const pxEls = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    let pxScroll: (() => void) | null = null;
    let pxResize: (() => void) | null = null;
    if (!reduce && pxEls.length) {
      let ticking = false;
      const update = () => {
        ticking = false;
        for (const el of pxEls) {
          const r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > window.innerHeight + 200) continue;
          const speed = parseFloat(el.dataset.parallax || "0");
          const center = r.top + r.height / 2 - window.innerHeight / 2;
          el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0) scale(1.06)`;
        }
      };
      pxScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
      pxResize = update;
      window.addEventListener("scroll", pxScroll, { passive: true });
      window.addEventListener("resize", pxResize, { passive: true });
      update();
    }

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      if (heroScroll) window.removeEventListener("scroll", heroScroll);
      if (pxScroll) window.removeEventListener("scroll", pxScroll);
      if (pxResize) window.removeEventListener("resize", pxResize);
    };
  }, []);

  return null;
}

# La Palma y El Tucán — Hotel boutique cerca de Bogotá

Sitio web del hotel **La Palma y El Tucán** (LP&ET): hotel boutique entre cafetales
sostenibles, a 90 minutos de Bogotá. Bilingüe ES/EN, reservas vía Cloudbeds.

🔗 **En vivo:** https://jbenavides-dotcom.github.io/lpet-hotel-web/

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** (CSS-first; tokens y utilidades en `app/globals.css`)
- **pnpm** como gestor de paquetes
- Bilingüe ES/EN con rutas separadas: `app/(es)` y `app/(en)`
- Imágenes optimizadas (WebP) con loader propio para GitHub Pages
- Despliegue como **export estático** a **GitHub Pages**

## Desarrollo

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Build de producción (igual que el CI)

El sitio se publica como export estático con un `basePath` (vive en `/lpet-hotel-web`).
Para reproducir el build del CI en local (en Git Bash hace falta `MSYS_NO_PATHCONV=1`
para que el `/` no se convierta en ruta de Windows):

```bash
MSYS_NO_PATHCONV=1 STATIC_EXPORT=true NEXT_PUBLIC_BASE_PATH=/lpet-hotel-web pnpm build
# genera ./out
```

## Despliegue

Automático con **GitHub Actions** (`.github/workflows/deploy-pages.yml`): cada
**push a `main`** hace el export estático y lo publica en GitHub Pages.

## Decisiones de arquitectura / gotchas

- **Navegación interna en GitHub Pages → usar `SmartLink`, no `<Link>` directo.**
  Next App Router con `output: export` + `basePath` tiene un bug: al hacer clic en
  un enlace interno (incluso un `<a>` plano) el router **duplica el basePath**
  (`/lpet-hotel-web/lpet-hotel-web/...`) → 404. La carga directa de cada página sí
  funciona. `components/smart-link.tsx` lo resuelve: en el build con basePath
  renderiza un `<a>` con la URL correcta y fuerza `window.location` en el click
  (navegación real del navegador); en dev/Vercel (sin basePath) usa `<Link>` nativo
  (SPA). Header, footer y CTAs internos importan `SmartLink as Link`.

- **Animaciones de scroll** (`components/animate-on-scroll.tsx`): cada sección
  entra con fade/blur-in y, cuando ya casi salió por arriba (su borde inferior cruza
  el centro del viewport), se atenúa suave (solo opacidad ~0.72, sin blur ni
  movimiento). El ritmo se ajusta con `--reveal-dur` y `--leave-dur` en `:root`
  (no usar `--anim-scale`, que afecta a todo). Respeta `prefers-reduced-motion`.

- **Hojas decorativas** (`/img/hojas.png` en cabañas y sostenibilidad): ocultas en
  móvil con `hidden md:block` (en pantallas angostas tapaban el contenido).

- **i18n:** `Dictionary = typeof esDict` (`lib/i18n.ts`). `messages/en.json` debe
  tener exactamente las mismas claves que `messages/es.json`.

## Bitácora de cambios

### 2026-05-31 — Pulido, contenido y correcciones (sesión con Claude Code)

- **Animaciones de scroll:** entrada más lenta y elegante (1.5s) y salida suave
  visible sin marear; se eliminó el blur de la salida (desenfocaba el texto) y se
  cambió el disparo para no atenuar contenido que aún se está leyendo.
- **Sección "Impacto en la comunidad"** añadida dentro de *Nuestra sostenibilidad*;
  se eliminó el texto duplicado de la sección inferior, que pasó a ser *Cómo llegar*
  conservando el mapa de ubicación.
- **Hojas decorativas:** se ocultan en móvil (`hidden md:block`).
- **Navegación entre páginas en GitHub Pages arreglada** (basePath duplicado) con el
  nuevo componente `SmartLink`.
- **SEO:** el H1 del hero ahora incluye la frase clave *"Hotel boutique cerca de
  Bogotá"* (antes solo *"La Palma y El Tucán"*).
- Verificación de cada cambio con Chrome headless (desktop y móvil) y un mock que
  imita GitHub Pages para la navegación.

---

*Hecho con Next.js. Contenido y marca © Coffee and Adventure S.A.S.*

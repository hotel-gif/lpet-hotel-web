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

### 2026-06-01 — Retroalimentación de Lina, parte 1 (sin imágenes)

Primeras 6 páginas del documento *CAMBIOS EN WEB 2*, solo lo que no depende de
fotos nuevas (los reemplazos de fotos y el cambio de logo quedan pendientes):

- **LinkedIn** del footer/header corregido al perfil del **hotel**
  (`la-palma-el-tucán-hotel`), antes apuntaba a la finca.
- **"Cómo llegar":** el botón *Instrucciones de llegada* abre el PDF
  (`public/docs/como-llegar-lpet-hotel.pdf`) **dentro de una ventana** (modal con
  el PDF embebido + enlace "abrir en pestaña nueva" de respaldo en móviles), en vez
  de descargarlo (`components/como-llegar-modal.tsx`). El mapa se acotó a una pantalla.
- **"Ver cabañas"** (home) ahora **navega a `/alojamiento`** (antes era un ancla
  que no llevaba a ninguna parte). Se hiló `locale` Home → `Cabanas`.
- **Experiencias (textos):** "El Tour de Café está incluido en tu estadía",
  título *Degustación de cafés de especialidad*, "café de especialidad" en el
  punto 1, y nuevo texto del *Coffee Tour / Day Tour* (ES + EN).
- **Áreas sociales:** nuevo texto del *Ver más* (ES + EN).
- **Sostenibilidad:** título unificado *"Sostenibilidad e impacto en la
  comunidad"* (se quitó el subtítulo separado).
- **Legales:** nuevas landings **Términos y Condiciones** y **Política de
  tratamiento de datos** (ES + EN) en `lib/legal.ts` + `LegalContent`, con el
  texto real del sitio oficial; enlazadas desde el footer. El header va **sólido**
  en estas páginas sin hero (`heroless`) para que el menú sea legible.
- **Tipografía:** se subió la raíz (16 → 17px, `html { font-size: 106.25% }`) para
  agrandar el texto de cuerpo sin tocar los títulos; botones a 15px.
- **Amenidades (cabañas):** se rediseñaron los iconos de *Deck* (baranda de
  terraza) y *Alpargatas* (calzado) que no correspondían.
- **Pendiente** (necesita capturas/fotos): *Reserva directa* "seleccionar fechas
  desde la web", reemplazos de fotos del Drive, logo de la & rosada, hojas → café,
  fusión visual de secciones y la nota estadía/reserva de la degustación.

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

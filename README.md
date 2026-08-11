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

Automático en **Vercel**: cada **push a `main`** de `hotel-gif/lpet-hotel-web`
despliega el sitio como **Next.js nativo (SSR)**. El dominio oficial
`lapalmayeltucanhotel.com` apunta ahí (verificado: responde `Server: Vercel`).

> El export estático a GitHub Pages (`STATIC_EXPORT=true`) quedó como camino de
> respaldo y ya no tiene workflow de CI. **No sirve para producción:**
> `output: "export"` no admite handlers POST, así que `/api/crm` —el que
> registra los formularios en Bitrix24— no existiría en ese build.

## Variables de entorno

En Vercel (Project → Settings → Environment Variables) y en `.env.local` para
desarrollo. Ninguna lleva `NEXT_PUBLIC_`: son secretos de servidor.

| Variable | Obligatoria | Para qué |
|---|---|---|
| `BITRIX_WEBHOOK_URL` | sí | Webhook entrante de Bitrix24 con scope `crm`. **Con barra final.** Se usa el webhook "crm_only", no el "full" que opera Sofía. |
| `FORM_EMAIL_WEBHOOK` | no | Webhook de n8n que avisa por correo a `reservations@`. Si se quita, solo queda la notificación interna de Bitrix al responsable. |

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

- **Formularios → Bitrix24 (`app/api/crm/route.ts`).** Los dos formularios del
  sitio (contacto y newsletter) pasan por `lib/forms.ts` → `POST /api/crm`, que
  corre **en el servidor**. Nunca llamar a Bitrix desde el navegador: esa URL es
  la llave completa del CRM y en el bundle público quedaría a la vista de
  cualquiera.
  - *contacto* → Contacto + **Deal** en el embudo **Prospectos (7)**.
  - *newsletter* → **solo Contacto** (un suscriptor no es una oportunidad).
  - ⚠️ **Las etapas del embudo 7 están renombradas.** La primera columna es
    `C7:PREPAYMENT_INVOICE` = "Validación"; `C7:NEW` **no** es el inicio, es
    "Casos Especiales". Usar la constante `ETAPA_INICIAL`, no la convención.
  - Antes de crear un contacto se busca el correo con `crm.duplicate.findbycomm`
    y se reutiliza el existente: hay ~6.900 contactos y duplicar los ensucia.
  - Los responsables se reparten entre Diego Velez (1) y Gerwin Gacia (11739)
    con un hash del correo — en serverless no hay dónde guardar el turno, y así
    un mismo remitente siempre cae en la misma persona.
  - `COMMENTS` en Bitrix es HTML: el mensaje se escapa y los saltos de línea se
    convierten a `<br>`, o se leería como un párrafo corrido.
  - **Teléfono:** el formulario de contacto lo pide **obligatorio**, con selector
    de indicativo (`INDICATIVOS` en `contacto-form.tsx`, Colombia por defecto).
    Viaja unido al número (`+57 300…`) y se guarda como `PHONE`/`MOBILE`. Se
    repite dentro de `COMMENTS` del deal a propósito: si el correo ya existía,
    su ficha no se toca —solo hay permiso de creación— y ese sería el único
    sitio donde quedaría el número.

## Bitácora de cambios

### 2026-08-09 — Los formularios entran a Bitrix24 (antes solo mandaban correo)

Contacto y newsletter llegaban únicamente como correo a `reservations@` vía un
webhook de n8n; en el CRM no quedaba rastro. Ahora se registran en Bitrix24
desde `app/api/crm/route.ts` (Route Handler, servidor de Vercel) y n8n queda
fuera del camino: solo se conserva como aviso opcional por correo.

- `lib/forms.ts` apunta a `/api/crm` (mismo origen, ya no depende de CORS).
  `submitForm()` mantiene su firma, así que los componentes no se tocaron.
- **Por qué Deal y no Lead:** los 2.008 "leads" del CRM son correos que Bitrix
  captura solo (Booking, Search Console, publicidad), todos `SOURCE_ID=EMAIL`
  y ya marcados como convertidos. Leads con fuente `WEB`: 0. Un formulario ahí
  se entierra. El embudo Prospectos, en cambio, movió 343 deals en dos meses.
- Probado end-to-end contra el CRM real: alta, deduplicación por correo,
  reparto de responsable, rechazo de correo inválido y formato multilínea.

- **Lencería de lujo:** icono nuevo de **cama** (`bed`, cama de perfil con almohada);
  antes reusaba el de toallas (`towels`, ya eliminado por quedar sin uso).
- **Alpargatas:** el icono pasó a una **chancla / flip-flop** (vista superior con
  correa en Y), a pedido. (El `label` sigue "Alpargatas".)
- **Deck:** se mantiene la **baranda** actual (se evaluó cambiarlo a sofá pero se
  dejó como estaba).
- Cambios en `components/sections/alojamiento/amenidades.tsx` (mapa `ICONS`) y en el
  `icon` del ítem en `messages/{es,en}.json`.

### 2026-06-06 — Sostenibilidad: vuelve el subtítulo "Impacto en la comunidad"

- A pedido de Jacobo (revierte la unificación que pidió Lina en la parte 1): la
  sección **Sostenibilidad** vuelve a su estructura de dos niveles → título
  principal **"Nuestra sostenibilidad"** (`Our sustainability`) + subtítulo
  **"Impacto en la comunidad"** (`Community impact`) antes del segundo párrafo.
- Se reañadió el `<h3>{t.impactTitle}</h3>` en `sustainability.tsx` y se revirtió
  el `title` en `messages/{es,en}.json`. El key `impactTitle` ya existía.

### 2026-06-06 — Botones de reserva en rosado de marca + URL Cloudbeds centralizada

- **Color rosado de marca** (`#f27b9a`, el de la "&" del logo) añadido como token
  `--color-rose` (+ `--color-rose-dark` para hover) y utilidad `btn-rose`.
- **Botones de reserva ahora rosados:** el de la barra del hero (*Reserva Directa*),
  el *Reservar* del header (desktop y móvil) y el CTA de la página de Alojamiento.
- **URL de Cloudbeds centralizada** en `lib/booking.ts` (`reservationUrl(locale, {checkin, checkout})`).
  Al hacerlo se descubrió que **el código `i0wxBO` seguía en 4 sitios más** (header,
  footer, structured-data/JSON-LD y CTA de Alojamiento), todos rotos con 400 →
  corregidos a `yB0fEt`. Ahora ningún botón usa el código muerto.

### 2026-06-06 — Hojas decorativas eliminadas

- A pedido (y resolviendo el punto de Lina de evitar conflicto con los
  diseñadores originales), se **quitaron las hojas decorativas** (`/img/hojas.png`)
  de las secciones **Cabañas** y **Sostenibilidad**, junto con sus animaciones CSS
  ya sin uso (`leaf-entrance`, `leaf-sway`, `.leaf-animated*`). En vez de
  reemplazarlas por ramitas de café, se eliminan. El asset `hojas.png` queda en
  `public/img` por si se necesita, pero ya no se referencia.

### 2026-06-05 — Reserva directa con selección de fechas (home)

- **Reserva directa = elegir fechas desde la web** (punto del doc de Lina). Se
  **quitó el botón** "Reserva Directa" del hero (que abría el motor de Cloudbeds
  en blanco) y se reemplazó por una **barra de reserva** con selección de
  **Llegada / Salida** (`components/booking-bar.tsx`, client component).
- Al enviar, abre el motor de **Cloudbeds** con las fechas ya seleccionadas vía
  querystring: `…/{es|en}/reservation/yB0fEt?currency=cop&checkin=YYYY-MM-DD&checkout=YYYY-MM-DD`
  (parámetros oficiales del Booking Engine). La salida se valida para no ser
  igual/anterior a la llegada.
- **Bug corregido:** el código de propiedad que estaba en el hero (`i0wxBO`) ya
  **no existe en Cloudbeds y devolvía 400**. El código real (tomado del botón en
  vivo del sitio oficial) es **`yB0fEt`** con `currency=cop`. El path usa el
  idioma del sitio (`/es` o `/en`).
- La barra vive dentro de `.hero-actions` para conservar la animación de entrada
  del hero; etiquetas en `messages/{es,en}.json` (`hero.book_checkin/book_checkout`).

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

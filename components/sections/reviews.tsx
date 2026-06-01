import type { Dictionary } from "@/lib/i18n";

interface Rating {
  platform: string;
  score: string;
  extra: string;
}

interface Review {
  text: string;
  author: string;
  source: string;
}

// Colores del original
const STARS_GOLD = "#c9a227";
const BOOKING_BLUE = "#003580";
const TRIPADVISOR_GREEN = "#00aa6c";
const TEXT_DARK = "#352d2a"; // var(--secondary-d-1)
const BORDER_LIGHT = "#e8e3da"; // var(--secondary-l-2)
const QUOTE_BORDER = "#a14a5a"; // var(--primary-d-2) — burgundy

const SERIF = "var(--font-serif), 'Baskervville', Georgia, serif";
const SANS = "var(--font-gotham), 'Lato', system-ui, sans-serif";

function getPlatformColor(platform: string): string {
  const p = platform.toLowerCase();
  if (p.includes("booking")) return BOOKING_BLUE;
  if (p.includes("tripadvisor")) return TRIPADVISOR_GREEN;
  return TEXT_DARK;
}

export function Reviews({ m }: { m: Dictionary }) {
  const t = m.reviews as {
    title: string;
    lead: string;
    ratings: Rating[];
    items: Review[];
  };

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: "#e8e6df" }}>
      <div className="container-wide" style={{ maxWidth: "1100px", padding: "0 16px" }}>
        {/* Encabezado centrado */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight"
            style={{ color: TEXT_DARK, fontFamily: SERIF }}
          >
            {t.title}
          </h2>
          {/* Línea decorativa burgundy */}
          <div className="w-24 h-px mx-auto mb-8" style={{ backgroundColor: QUOTE_BORDER }} />
          <p className="leading-relaxed" style={{ color: TEXT_DARK, fontFamily: SANS }}>
            {t.lead}
          </p>
        </div>

        {/* Cards de ratings (.scores) — max-width 760px */}
        <div
          className="score-row grid grid-cols-1 md:grid-cols-2 mx-auto"
          style={{ gap: "24px", maxWidth: "760px", margin: "24px auto 0" }}
        >
          {t.ratings.map((rating) => (
            <article
              key={rating.platform}
              className="text-center flex flex-col items-center"
              style={{
                background: "#fff",
                padding: "32px 24px",
                gap: "10px",
                border: `1px solid ${BORDER_LIGHT}`,
                boxShadow: "0 6px 20px rgba(53,45,42,0.06)",
                transition: "transform .25s ease, box-shadow .25s ease",
              }}
            >
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: "1.15rem",
                  letterSpacing: "0.02em",
                  color: getPlatformColor(rating.platform),
                }}
              >
                {rating.platform}
              </div>
              <div
                data-count={rating.score}
                data-dec={String((rating.score.split(".")[1] || "").length)}
                style={{
                  fontFamily: SERIF,
                  fontSize: "2.5rem",
                  lineHeight: 1,
                  color: TEXT_DARK,
                  fontWeight: 400,
                }}
              >
                {rating.score}
              </div>
              <div style={{ color: STARS_GOLD, fontSize: "1.1rem", letterSpacing: "2px" }}>
                ★★★★★
              </div>
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: "0.85rem",
                  color: "#666",
                  letterSpacing: "0.02em",
                }}
              >
                {rating.extra}
              </div>
            </article>
          ))}
        </div>

        {/* Quotes (.quotes) — max-width 980px */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "24px", maxWidth: "980px", margin: "24px auto 0" }}
        >
          {t.items.map((review, i) => (
            <article
              key={i}
              className="relative flex flex-col"
              style={{
                background: "#fff",
                padding: "34px 28px",
                borderLeft: `3px solid ${QUOTE_BORDER}`,
                gap: "16px",
                boxShadow: "0 6px 20px rgba(53,45,42,0.05)",
              }}
            >
              {/* Comilla decorativa Baskervville */}
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  top: "4px",
                  left: "16px",
                  fontFamily: SERIF,
                  fontSize: "3.5rem",
                  color: BORDER_LIGHT,
                  lineHeight: 1,
                }}
              >
                &ldquo;
              </span>

              {/* Texto del review italic Baskervville */}
              <p
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontSize: "1.05rem",
                  lineHeight: 1.55,
                  color: TEXT_DARK,
                  position: "relative",
                  zIndex: 1,
                  margin: 0,
                  paddingTop: "24px",
                }}
              >
                &quot;{review.text}&quot;
              </p>

              {/* qmeta: autor+stars izquierda, src derecha */}
              <div
                className="flex items-center justify-between"
                style={{
                  borderTop: `1px solid ${BORDER_LIGHT}`,
                  paddingTop: "14px",
                  gap: "12px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: SANS,
                      fontSize: "0.9rem",
                      color: TEXT_DARK,
                      fontWeight: 700,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {review.author}
                  </div>
                  <div
                    style={{
                      color: STARS_GOLD,
                      fontSize: "0.85rem",
                      letterSpacing: "2px",
                      marginTop: "4px",
                    }}
                  >
                    ★★★★★
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: "0.78rem",
                    color: "#888",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {review.source}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

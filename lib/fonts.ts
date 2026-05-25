import localFont from "next/font/local";
import { Baskervville } from "next/font/google";

export const gotham = localFont({
  src: [
    { path: "../app/fonts/GothamBook.ttf", weight: "400", style: "normal" },
    { path: "../app/fonts/GothamBold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-gotham",
  display: "swap",
});

// Baskervville: serif elegante para titulares (h1, h2) — mismo que el sitio original
export const baskervville = Baskervville({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const fontVars = `${gotham.variable} ${baskervville.variable}`;

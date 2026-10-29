import { Barlow_Condensed, Fraunces } from "next/font/google";

/**
 * Polices de titres des mini-sites, pour que chaque métier ait sa propre allure.
 * Elles ne remplacent que `font-display` à l'intérieur d'une maquette.
 */
const condensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  preload: false,
});

const serif = Fraunces({
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export type DisplayFont = "sans" | "condensed" | "serif";

export const displayFonts: Record<DisplayFont, string | undefined> = {
  sans: undefined,
  condensed: condensed.style.fontFamily,
  serif: serif.style.fontFamily,
};

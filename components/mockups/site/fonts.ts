import { Schibsted_Grotesk } from "next/font/google";

/**
 * Polices des sites d'exemple : une par métier, pour que chacun ait sa propre
 * voix. Chargées seulement quand la maquette s'affiche (preload: false).
 */
const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: false,
});

export const siteFonts = {
  /** Plombier : grotesque solide, lisible, sans effet. */
  plombier: schibsted.style.fontFamily,
};

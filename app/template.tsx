"use client";

import { useEffect } from "react";
import * as m from "motion/react-m";

// Pas de fondu au premier chargement (affichage immédiat, meilleur LCP) ;
// seules les navigations suivantes sont animées.
let firstLoad = true;

/** Transition douce à chaque changement de page. */
export default function Template({ children }: { children: React.ReactNode }) {
  const initial = firstLoad ? false : { opacity: 0, y: 8 };
  useEffect(() => {
    firstLoad = false;
  }, []);

  return (
    <m.div
      initial={initial}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}

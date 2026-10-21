"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Défilement fluide (Lenis), désactivé si l'utilisateur préfère réduire les animations. */
export function SmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    let lenis: Lenis | null = null;
    const onChange = () => media.matches && lenis?.destroy();

    // Démarré quand le navigateur est libre, pour ne pas ralentir l'affichage initial
    const start = () => {
      lenis = new Lenis({ autoRaf: true, anchors: { offset: -80 }, lerp: 0.12 });
      media.addEventListener("change", onChange);
    };
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = idle(start);

    return () => {
      cancel(handle);
      media.removeEventListener("change", onChange);
      lenis?.destroy();
    };
  }, []);

  return null;
}

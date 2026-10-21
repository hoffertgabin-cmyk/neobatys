"use client";

import { useEffect } from "react";

/** Révèle les éléments [data-reveal] lorsqu'ils entrent dans l'écran (une seule fois). */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const scan = (root: ParentNode) =>
      root.querySelectorAll("[data-reveal]:not([data-visible])").forEach((el) => io.observe(el));
    scan(document);

    // Nouveaux éléments (changement de page, filtres…)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            if (node.matches("[data-reveal]:not([data-visible])")) io.observe(node);
            scan(node);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}

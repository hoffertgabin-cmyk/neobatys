"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Signale chaque page vue au compteur de l'admin. Aucun cookie, aucun identifiant de visiteur. */
export function PageViewPing() {
  const pathname = usePathname();
  useEffect(() => {
    navigator.sendBeacon("/api/vue", JSON.stringify({ path: pathname }));
  }, [pathname]);
  return null;
}

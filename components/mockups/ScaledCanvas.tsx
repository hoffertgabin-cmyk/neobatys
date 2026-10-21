"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Affiche un contenu dessiné à taille fixe (width × height) mis à l'échelle
 * de son conteneur, pour garder les proportions exactes d'une maquette.
 */
export function ScaledCanvas({
  width,
  height,
  children,
  className,
}: {
  width: number;
  height: number;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width));
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ transform: `scale(${scale})`, visibility: scale ? undefined : "hidden" }}
      >
        {children}
      </div>
    </div>
  );
}

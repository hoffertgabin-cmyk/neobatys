"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  /** Inclinaison 3D max en degrés (0 pour désactiver) */
  tilt?: number;
  theme?: "light" | "dark";
};

/**
 * Carte avec halo orange qui suit la souris sur la bordure, élévation et léger tilt 3D.
 * Aucun re-render React : la position est passée en variables CSS.
 */
export function SpotlightCard({
  children,
  className,
  innerClassName,
  tilt = 4,
  theme = "light",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
    if (tilt && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const rx = ((y / rect.height) * 2 - 1) * -tilt;
      const ry = ((x / rect.width) * 2 - 1) * tilt;
      el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
    }
  }

  function onPointerLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{
        transform: "perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
      }}
      className={cn(
        "group/spot relative rounded-2xl p-px transition-[transform,translate,scale,box-shadow] duration-300 ease-out will-change-transform",
        "hover:shadow-lift",
        theme === "dark" ? "bg-white/10" : "bg-nuit/8 shadow-soft",
        className,
      )}
    >
      {/* Bordure lumineuse */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgb(249 115 22 / 0.9), transparent 60%)",
        }}
      />
      <div
        className={cn(
          "relative h-full rounded-[15px] p-6 sm:p-7",
          theme === "dark" ? "bg-nuit-soft text-white" : "bg-white",
          innerClassName,
        )}
      >
        {/* Lueur intérieure douce */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[15px] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
          style={{
            background:
              "radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgb(249 115 22 / 0.08), transparent 50%)",
          }}
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

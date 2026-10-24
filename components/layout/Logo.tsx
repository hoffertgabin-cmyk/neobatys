import { useId } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/** Logo provisoire NEOBATYS (pictogramme toit + équerre). TODO: remplacer par votre logo définitif si besoin. */
export function LogoMark({ className }: { className?: string }) {
  // Le logo apparaît deux fois (menu et pied de page) : l'id du dégradé doit être unique
  const gradientId = useId();
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("size-9", className)}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F97316" />
          <stop offset="1" stopColor="#FB923C" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill={`url(#${gradientId})`} />
      <path
        d="M9 21.5 20 11l11 10.5"
        fill="none"
        stroke="#171717"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 20v9.5h13V20"
        fill="none"
        stroke="#171717"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18 29.5v-5h4v5" fill="#171717" />
    </svg>
  );
}

export function Logo({
  theme = "dark",
  className,
}: {
  theme?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, retour à l'accueil`}
      className={cn("inline-flex items-center gap-2.5 rounded-lg", className)}
    >
      <LogoMark />
      <span
        className={cn(
          "font-display text-lg font-extrabold tracking-[0.08em]",
          theme === "dark" ? "text-white" : "text-nuit",
        )}
      >
        NEO
        <span className={theme === "dark" ? "text-chantier-light" : "text-chantier-dark"}>
          BATYS
        </span>
      </span>
    </Link>
  );
}

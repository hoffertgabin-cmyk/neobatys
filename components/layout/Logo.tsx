import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/**
 * Pictogramme NEOBATYS : maison blanche au toit orange sur fond nuit.
 * Sur fond sombre (pied de page), le carré passe en acier avec un liseré pour rester visible.
 */
export function LogoMark({
  theme = "light",
  className,
}: {
  theme?: "light" | "dark";
  className?: string;
}) {
  const dark = theme === "dark";
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("size-9", className)}>
      <rect
        x="0.5"
        y="0.5"
        width="39"
        height="39"
        rx="10.5"
        fill={dark ? "#2E2E2E" : "#171717"}
        stroke={dark ? "rgba(255,255,255,0.12)" : "#171717"}
      />
      <path
        d="M9 21.5 20 11l11 10.5"
        fill="none"
        stroke={dark ? "#FB923C" : "#F97316"}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 20v9.5h13V20"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18 29.5v-5h4v5" fill="#FFFFFF" />
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
      <LogoMark theme={theme} />
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

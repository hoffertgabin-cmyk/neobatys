import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  tone?: "orange" | "light" | "dark" | "outline";
  className?: string;
};

const tones = {
  orange: "bg-chantier/15 text-chantier-dark ring-chantier/25",
  light: "bg-white/10 text-white ring-white/15",
  dark: "bg-nuit text-white ring-nuit",
  outline: "bg-white text-ardoise-dark ring-nuit/10",
};

export function Badge({ children, tone = "orange", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Badge signalant un contenu d'exemple ou une maquette fictive. */
export function PlaceholderBadge({
  className,
  label = "Exemple",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-dashed border-current px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase",
        className,
      )}
    >
      {label}
    </span>
  );
}

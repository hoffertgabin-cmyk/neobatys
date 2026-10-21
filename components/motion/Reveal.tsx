import { cn } from "@/lib/utils";

/**
 * Apparitions au défilement en CSS pur (fondu + légère translation).
 * Les éléments [data-reveal] sont révélés par <RevealObserver /> (IntersectionObserver) :
 * aucun composant d'animation à hydrater, et le contenu reste visible sans JavaScript.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;

type Tag = "div" | "li" | "ul" | "ol" | "article";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Délai en secondes */
  delay?: number;
  /** Décalage vertical initial en pixels */
  y?: number;
  as?: Tag;
};

export function Reveal({ children, className, delay, y, as: Component = "div" }: RevealProps) {
  const style = {
    ...(delay ? { "--reveal-delay": `${delay}s` } : {}),
    ...(y !== undefined ? { "--reveal-y": `${y}px` } : {}),
  } as React.CSSProperties;
  return (
    <Component data-reveal className={className} style={style}>
      {children}
    </Component>
  );
}

/** Conteneur dont les enfants <StaggerItem> apparaissent en cascade. */
export function Stagger({
  children,
  className,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
}) {
  return (
    <Component data-stagger className={className}>
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
}) {
  return (
    <Component data-reveal className={cn(className)}>
      {children}
    </Component>
  );
}

import { cn } from "@/lib/utils";

/**
 * Bandeau défilant en CSS pur (transform uniquement).
 * Le contenu est dupliqué pour une boucle sans à-coup ; la copie est masquée aux lecteurs d'écran.
 */
export function Marquee({ items, className }: { items: readonly string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10"
    >
      {items.map((item) => (
        <li key={item} className="flex items-center gap-6 sm:gap-10">
          <span className="font-display text-xl font-semibold whitespace-nowrap sm:text-2xl">
            {item}
          </span>
          <span aria-hidden="true" className="size-2 rotate-45 bg-chantier" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("group flex overflow-hidden mask-fade-x", className)}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

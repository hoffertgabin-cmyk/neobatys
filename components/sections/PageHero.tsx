import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  breadcrumb: string;
  /** Page parente affichée entre l'accueil et la page courante. */
  parent?: { label: string; href: string };
  children?: React.ReactNode;
  compact?: boolean;
};

/** En-tête pastel des pages secondaires (H1 unique de la page). */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  parent,
  children,
  compact = false,
}: Props) {
  return (
    <section
      className={
        "relative isolate overflow-hidden bg-aurora text-nuit " +
        (compact ? "pt-36 pb-14 sm:pt-40" : "pt-36 pb-20 sm:pt-44 sm:pb-24")
      }
    >
      <div className="container-site">
        <nav aria-label="Fil d'Ariane" className="mb-8 text-sm text-ardoise-dark">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-nuit">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            {parent && (
              <>
                <li>
                  <Link href={parent.href} className="hover:text-nuit">
                    {parent.label}
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-3.5" />
                </li>
              </>
            )}
            <li aria-current="page" className="text-nuit">
              {breadcrumb}
            </li>
          </ol>
        </nav>
        <div className="max-w-3xl animate-fade-up">
          <Badge tone="outline">
            <span className="size-1.5 rounded-full bg-chantier" aria-hidden="true" />
            {eyebrow}
          </Badge>
          <h1 className="mt-6 text-4xl leading-[1.04] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ardoise-dark sm:text-xl">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-9 flex flex-col gap-3 sm:flex-row">{children}</div>}
        </div>
      </div>
    </section>
  );
}

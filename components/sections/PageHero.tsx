import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Blobs } from "./Hero";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  breadcrumb: string;
  children?: React.ReactNode;
  compact?: boolean;
};

/** En-tête sombre des pages secondaires (H1 unique de la page). */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  children,
  compact = false,
}: Props) {
  return (
    <section
      className={
        "relative isolate overflow-hidden bg-nuit text-white " +
        (compact ? "pt-32 pb-14 sm:pt-36" : "pt-32 pb-20 sm:pt-40 sm:pb-24")
      }
    >
      <Blobs />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-blueprint-dark mask-fade" />
      <div className="container-site">
        <nav aria-label="Fil d'Ariane" className="mb-8 text-sm text-ardoise-light">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-white">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="text-white">
              {breadcrumb}
            </li>
          </ol>
        </nav>
        <div className="max-w-3xl animate-fade-up">
          <Badge tone="light">
            <span className="size-1.5 rounded-full bg-chantier" aria-hidden="true" />
            {eyebrow}
          </Badge>
          <h1 className="mt-6 text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ardoise-light sm:text-xl">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-9 flex flex-col gap-3 sm:flex-row">{children}</div>}
        </div>
      </div>
    </section>
  );
}

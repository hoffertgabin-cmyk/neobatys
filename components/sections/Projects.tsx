import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { interestHref, mockupsOnly, projectMeta, projects, type Project } from "@/content/projects";
import { tradeSites } from "@/content/trade-sites";
import { sectionsCopy } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MockupPreview } from "@/components/mockups/MockupPreview";

/** Page du métier, où la maquette complète se parcourt. */
const tradeHref = (p: Project) => {
  const trade = tradeSites.find((t) => t.mockup === p.mockup);
  return trade ? `/sites-internet/${trade.slug}` : "/sites-internet";
};

/**
 * Cartes des maquettes (ou des vraies réalisations) : une image fixe, légère,
 * chargée au défilement ; le clic mène à la page du métier.
 * `featured` : seulement les projets cochés « Sur l'accueil », avec un lien vers tous les métiers.
 */
export function Projects({ featured = false }: { featured?: boolean }) {
  const shown = featured ? projects.filter((p) => p.featured).slice(0, 3) : projects;
  const copy = mockupsOnly ? sectionsCopy.projects.mockups : sectionsCopy.projects;

  return (
    <Section id="realisations" theme="sand" aria-labelledby="realisations-titre">
      <SectionHeading
        id="realisations-titre"
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((project) => (
          <li
            key={project.title}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-nuit/5 transition-shadow hover:shadow-lift"
          >
            <div className="relative aspect-[8/5] w-full overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`Site réalisé pour ${project.title}`}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <MockupPreview
                    project={project}
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 48vw, 94vw"
                  />
                )}
              </div>
              {project.placeholder && (
                <PlaceholderBadge
                  label="Maquette"
                  className="absolute top-3 right-3 bg-white text-ardoise-dark"
                />
              )}
            </div>
            <div className="p-5">
              <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-ardoise-dark uppercase">
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: project.theme.primary }}
                />
                {projectMeta(project)}
              </p>
              <h3 className="mt-1.5 text-lg font-bold">
                <Link
                  href={tradeHref(project)}
                  className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-3 focus-visible:after:outline-chantier"
                >
                  {project.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-ardoise">{project.description}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-nuit">
                  Voir la maquette
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
                {/* Au-dessus du lien qui couvre la carte : mène au formulaire pré-rempli. */}
                <Button
                  href={interestHref(project)}
                  variant="ghost"
                  className="relative z-10 h-9 px-4 text-[13px]"
                >
                  Cette maquette m&apos;intéresse
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {featured && (
        <div className="mt-10 text-center">
          <Button href="/sites-internet#realisations" variant="ghost" arrow>
            Voir tous les métiers
          </Button>
        </div>
      )}
    </Section>
  );
}

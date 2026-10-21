"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as m from "motion/react-m";
import { Maximize2, X } from "lucide-react";
import { projects, type Project } from "@/content/projects";
import { site } from "@/content/site";
import { sectionsCopy } from "@/content/home";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderBadge } from "@/components/ui/Badge";
import { ScaledCanvas } from "@/components/mockups/ScaledCanvas";
import { MOCKUP_HEIGHT, MOCKUP_WIDTH, TradeSiteMockup } from "@/components/mockups/TradeSiteMockup";

const ALL = "Tous";

/** Aperçu de la maquette dans la carte : le haut du site, coupé en bas. */
function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="absolute inset-0" style={{ backgroundColor: project.theme.soft }}>
      <div className="absolute inset-x-5 top-5 overflow-hidden rounded-t-xl shadow-lift ring-1 ring-nuit/8">
        <ScaledCanvas width={MOCKUP_WIDTH} height={MOCKUP_HEIGHT}>
          <TradeSiteMockup project={project} />
        </ScaledCanvas>
      </div>
    </div>
  );
}

/** Fenêtre d'agrandissement d'une maquette. */
function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (project && dialog && !dialog.open) dialog.showModal();
  }, [project]);

  return (
    <dialog
      ref={ref}
      data-lenis-prevent
      aria-labelledby="maquette-titre"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      className="m-auto w-[min(1040px,calc(100%-2rem))] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-nuit/70 backdrop:backdrop-blur-sm"
    >
      {project && (
        <div className="overflow-hidden rounded-3xl bg-white shadow-lift">
          <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-ardoise-dark uppercase">
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: project.theme.primary }}
                />
                {project.trade} · {project.city}
                {site.showPlaceholderBadges && project.placeholder && (
                  <PlaceholderBadge className="text-ardoise-dark" />
                )}
              </p>
              <h3 id="maquette-titre" className="mt-1.5 text-xl font-bold sm:text-2xl">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-ardoise-dark">{project.description}</p>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-sable text-nuit ring-1 ring-nuit/5 transition-colors hover:bg-sable-dark"
            >
              <X aria-hidden="true" className="size-5" />
              <span className="sr-only">Fermer</span>
            </button>
          </div>
          <div
            className="px-3 pb-3 sm:px-6 sm:pb-6"
            style={{ backgroundColor: project.theme.soft }}
          >
            <div className="overflow-hidden rounded-2xl shadow-lift ring-1 ring-nuit/8 sm:mt-0">
              <ScaledCanvas width={MOCKUP_WIDTH} height={MOCKUP_HEIGHT}>
                <TradeSiteMockup project={project} />
              </ScaledCanvas>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

export function Projects() {
  const filters = [ALL, ...Array.from(new Set(projects.map((p) => p.trade)))];
  const [active, setActive] = useState(ALL);
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = active === ALL ? projects : projects.filter((p) => p.trade === active);

  return (
    <Section id="realisations" theme="sand" aria-labelledby="realisations-titre">
      <SectionHeading
        id="realisations-titre"
        eyebrow={sectionsCopy.projects.eyebrow}
        title={sectionsCopy.projects.title}
        subtitle={sectionsCopy.projects.subtitle}
      />

      <div
        role="group"
        aria-label="Filtrer par métier"
        className="mt-10 flex flex-wrap justify-center gap-2"
      >
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={active === f}
            onClick={() => setActive(f)}
            className={cn(
              "h-10 rounded-full px-4 text-sm font-semibold transition-colors",
              active === f
                ? "bg-nuit text-white"
                : "bg-white text-ardoise-dark ring-1 ring-nuit/10 hover:text-nuit",
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} réalisation{visible.length > 1 ? "s" : ""} affichée
        {visible.length > 1 ? "s" : ""}
      </p>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <m.li
            key={`${active}-${project.title}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="group overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-nuit/5 transition-shadow hover:shadow-lift"
          >
            <button
              type="button"
              onClick={() => setSelected(project)}
              className="relative block aspect-[4/3] w-full overflow-hidden text-left"
            >
              <span className="sr-only">Agrandir la maquette : {project.title}</span>
              <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`Site réalisé pour ${project.title}`}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <ProjectPreview project={project} />
                )}
              </div>
              {site.showPlaceholderBadges && project.placeholder && (
                <PlaceholderBadge className="absolute top-3 right-3 bg-white text-ardoise-dark" />
              )}
              <span
                aria-hidden="true"
                className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 translate-y-2 items-center gap-1.5 rounded-full bg-nuit px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-lift transition-[opacity,translate] duration-300 group-hover:translate-y-0 group-hover:opacity-100"
              >
                <Maximize2 className="size-3.5" /> Voir la maquette
              </span>
            </button>
            <div className="p-5">
              <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-ardoise-dark uppercase">
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: project.theme.primary }}
                />
                {project.trade} · {project.city}
              </p>
              <h3 className="mt-1.5 text-lg font-bold">{project.title}</h3>
              <p className="mt-1 text-sm text-ardoise">{project.description}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-sable px-2.5 py-1 text-xs font-medium text-ardoise-dark"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </m.li>
        ))}
      </ul>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}

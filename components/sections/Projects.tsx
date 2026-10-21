"use client";

import { useState } from "react";
import Image from "next/image";
import * as m from "motion/react-m";
import { projects, type Project } from "@/content/projects";
import { site } from "@/content/site";
import { sectionsCopy } from "@/content/home";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderBadge } from "@/components/ui/Badge";

const ALL = "Tous";

/** Aperçu dessiné quand aucune capture n'est fournie. */
function ProjectPreview({ project }: { project: Project }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 bg-sable-dark p-4">
      <div className="h-full overflow-hidden rounded-lg bg-white shadow-soft ring-1 ring-nuit/5">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="h-2 w-14 rounded-full" style={{ backgroundColor: project.accent }} />
          <span className="h-2 w-8 rounded-full bg-nuit/10" />
        </div>
        <div className="mx-2 h-[45%] rounded-md bg-nuit p-3">
          <span className="block h-2.5 w-2/3 rounded-full bg-white/80" />
          <span className="mt-1.5 block h-2 w-1/2 rounded-full bg-white/30" />
          <span
            className="mt-3 block h-4 w-16 rounded-full"
            style={{ backgroundColor: project.accent }}
          />
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-8 rounded bg-sable" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const filters = [ALL, ...Array.from(new Set(projects.map((p) => p.trade)))];
  const [active, setActive] = useState(ALL);
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
            <div className="relative aspect-[4/3] overflow-hidden">
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
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold tracking-wide text-chantier-dark uppercase">
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
    </Section>
  );
}

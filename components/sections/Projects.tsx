"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import * as m from "motion/react-m";
import { Maximize2, X } from "lucide-react";
import { mockupsOnly, projects, type Project } from "@/content/projects";
import { sectionsCopy } from "@/content/home";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderBadge } from "@/components/ui/Badge";
import { ScaledCanvas } from "@/components/mockups/ScaledCanvas";
import { MOCKUP_HEIGHT, MOCKUP_WIDTH, TradeSiteMockup } from "@/components/mockups/TradeSiteMockup";

const ALL = "Tous";

/** Métier et ville ; la ville d'une maquette fictive n'est pas affichée. */
const projectMeta = (p: Project) => (p.placeholder ? p.trade : `${p.trade} · ${p.city}`);

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

type Viewport = { mode: "scale"; scale: number } | { mode: "fluid"; width: number; height: number };

/**
 * Taille de la maquette dans la fenêtre : mise à l'échelle sur grand écran,
 * en pleine largeur (sans zoom, pour garder des boutons lisibles) sur mobile.
 */
function useViewport(open: boolean) {
  const headerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState<Viewport | null>(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!open || !box) return;
    const measure = () => {
      const width = box.clientWidth;
      if (width === 0) return;
      const free = window.innerHeight - (headerRef.current?.offsetHeight ?? 0);
      if (width >= MOCKUP_WIDTH) {
        const scale = Math.min(width / MOCKUP_WIDTH, Math.max(0.6, (free - 64) / MOCKUP_HEIGHT));
        setViewport({ mode: "scale", scale });
      } else {
        setViewport({ mode: "fluid", width, height: Math.max(360, free - 28) });
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [open]);

  return { headerRef, boxRef, viewport };
}

/** Fenêtre d'agrandissement : la maquette devient un site navigable. */
function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { headerRef, boxRef, viewport } = useViewport(project !== null);

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
      className="m-auto max-h-[calc(100dvh-1rem)] w-[min(1040px,calc(100%-1rem))] max-w-none overflow-auto bg-transparent p-0 backdrop:bg-nuit/70 backdrop:backdrop-blur-sm sm:w-[min(1040px,calc(100%-2rem))]"
    >
      {project && (
        <div className="overflow-hidden rounded-2xl bg-white shadow-lift sm:rounded-3xl">
          <div ref={headerRef} className="flex items-start justify-between gap-4 p-4 sm:p-6">
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-ardoise-dark uppercase">
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: project.theme.primary }}
                />
                {projectMeta(project)}
                {project.placeholder && (
                  <PlaceholderBadge label="Maquette" className="text-ardoise-dark" />
                )}
              </p>
              <h3 id="maquette-titre" className="mt-1.5 text-lg font-bold sm:text-2xl">
                {project.title}
              </h3>
              <p className="mt-1 hidden text-sm text-ardoise-dark sm:block">
                {project.description} Naviguez dans la maquette : menus, boutons et formulaires
                fonctionnent (rien n&apos;est envoyé).
              </p>
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
            className="px-2 pb-2 sm:px-6 sm:pb-6"
            style={{ backgroundColor: project.theme.soft }}
          >
            <div ref={boxRef}>
              {viewport?.mode === "scale" && (
                <div
                  className="relative mx-auto overflow-hidden rounded-2xl shadow-lift ring-1 ring-nuit/8"
                  style={{
                    width: MOCKUP_WIDTH * viewport.scale,
                    height: MOCKUP_HEIGHT * viewport.scale,
                  }}
                >
                  <div
                    className="absolute top-0 left-0 origin-top-left"
                    style={{ transform: `scale(${viewport.scale})` }}
                  >
                    <TradeSiteMockup key={project.title} project={project} interactive />
                  </div>
                </div>
              )}
              {viewport?.mode === "fluid" && (
                <div className="overflow-hidden rounded-xl shadow-lift ring-1 ring-nuit/8">
                  <TradeSiteMockup
                    key={project.title}
                    project={project}
                    interactive
                    width={viewport.width}
                    height={viewport.height}
                  />
                </div>
              )}
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
  const copy = mockupsOnly ? sectionsCopy.projects.mockups : sectionsCopy.projects;
  const noun = mockupsOnly ? "maquette" : "réalisation";

  return (
    <Section id="realisations" theme="sand" aria-labelledby="realisations-titre">
      <SectionHeading
        id="realisations-titre"
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
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
        {visible.length} {noun}
        {visible.length > 1 ? "s" : ""} affichée{visible.length > 1 ? "s" : ""}
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
            <div className="relative aspect-[4/3] w-full overflow-hidden">
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
              {project.placeholder && (
                <PlaceholderBadge
                  label="Maquette"
                  className="absolute top-3 right-3 bg-white text-ardoise-dark"
                />
              )}
              <span
                aria-hidden="true"
                className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 translate-y-2 items-center gap-1.5 rounded-full bg-nuit px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-lift transition-[opacity,translate] duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
              >
                <Maximize2 className="size-3.5" /> Naviguer dans la maquette
              </span>
              {/* Bouton posé par-dessus : la maquette contient elle-même des boutons. */}
              <button
                type="button"
                onClick={() => setSelected(project)}
                className="absolute inset-0 z-10 rounded-t-2xl focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-chantier"
              >
                <span className="sr-only">Agrandir la maquette : {project.title}</span>
              </button>
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

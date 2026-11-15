"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { X } from "lucide-react";
import { interestHref, projectMeta, type Project } from "@/content/projects";
import { PlaceholderBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCKUP_HEIGHT, MOCKUP_WIDTH } from "./size";

/**
 * Le code des maquettes (16 sites d'exemple) n'est chargé qu'à l'ouverture
 * de la fenêtre : les pages restent légères tant qu'on ne clique pas.
 */
const TradeSiteMockup = dynamic(() => import("./TradeSiteMockup").then((m) => m.TradeSiteMockup), {
  ssr: false,
  loading: () => (
    <div className="grid size-full place-items-center text-sm text-ardoise-dark">
      Chargement de la maquette…
    </div>
  ),
});

type Viewport = { mode: "scale"; scale: number } | { mode: "fluid"; width: number; height: number };

/**
 * Taille de la maquette dans la fenêtre : réduite pour montrer la version bureau
 * entière sur grand écran, en pleine largeur (version téléphone) sur mobile.
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
      if (width >= 760) {
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
export function MockupDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
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
            <Button href={interestHref(project)} arrow className="ml-auto shrink-0 max-sm:hidden">
              Cette maquette m&apos;intéresse
            </Button>
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
                <div
                  className="overflow-hidden rounded-xl shadow-lift ring-1 ring-nuit/8"
                  style={{ height: viewport.height }}
                >
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

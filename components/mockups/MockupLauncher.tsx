"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import type { Project } from "@/content/projects";
import { MockupDialog } from "./MockupDialog";

/**
 * Capture du premier écran de la maquette ; au clic, la maquette complète
 * s'ouvre dans une fenêtre et se parcourt comme un vrai site.
 */
export function MockupLauncher({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-xl text-left shadow-lift ring-1 ring-nuit/8 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-chantier"
      >
        <span className="relative block aspect-[16/10]">
          <Image
            src={`/images/maquettes/apercus/${project.mockup}.jpg`}
            alt={`Premier écran de la maquette ${project.title}`}
            fill
            priority
            sizes="(min-width: 768px) 720px, 94vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </span>
        <span className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-nuit px-5 py-3 text-sm font-semibold whitespace-nowrap text-white shadow-lift transition-transform group-hover:-translate-y-0.5">
          <Maximize2 aria-hidden="true" className="size-4" /> Parcourir la maquette
        </span>
      </button>
      <MockupDialog project={open ? project : null} onClose={() => setOpen(false)} />
    </>
  );
}

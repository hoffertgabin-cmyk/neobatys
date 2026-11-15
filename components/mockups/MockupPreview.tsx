import Image from "next/image";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * Aperçu fixe d'une maquette : une capture de son premier écran
 * (public/images/maquettes/apercus/<métier>.jpg), bien plus légère que la maquette elle-même.
 * Pour refaire les captures après une modification : voir README, « Maquettes de sites ».
 */
export function MockupPreview({
  project,
  sizes,
  priority = false,
  className,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("absolute inset-0", className)}
      style={{ backgroundColor: project.theme.soft }}
    >
      <div className="absolute inset-x-5 top-5 bottom-0 overflow-hidden rounded-t-xl shadow-lift ring-1 ring-nuit/8">
        <Image
          src={`/images/maquettes/apercus/${project.mockup}.jpg`}
          alt={`Aperçu de la maquette ${project.title}`}
          width={1440}
          height={900}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

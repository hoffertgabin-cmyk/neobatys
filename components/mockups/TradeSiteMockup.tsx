"use client";

import type { ComponentType } from "react";
import type { Project, TradeMockup } from "@/content/projects";
import { SITE_HEIGHT, SITE_WIDTH, type SiteProps } from "./site/frame";
import * as plombier from "./site/plombier";
import * as electricien from "./site/electricien";
import * as macon from "./site/macon";
import * as menuisier from "./site/menuisier";
import * as couvreur from "./site/couvreur";
import * as peintre from "./site/peintre";
import * as chauffagiste from "./site/chauffagiste";
import * as carreleur from "./site/carreleur";
import * as charpentier from "./site/charpentier";

/**
 * Maquettes de sites par métier (components/mockups/site/<métier>.tsx) :
 * figées dans les cartes, navigables dans la fenêtre agrandie (`interactive`).
 * Chaque module exporte `Site` et `desktop` (format 1280 × 800, sinon ancien 720 × 540).
 */
export const MOCKUP_WIDTH = 720;
export const MOCKUP_HEIGHT = 540;

const sites: Record<TradeMockup, { Site: ComponentType<SiteProps>; desktop: boolean }> = {
  plombier,
  electricien,
  macon,
  menuisier,
  couvreur,
  peintre,
  chauffagiste,
  carreleur,
  charpentier,
};

/** Taille de référence de la maquette d'un métier. */
export function mockupSize(mockup: TradeMockup) {
  return sites[mockup].desktop
    ? { width: SITE_WIDTH, height: SITE_HEIGHT }
    : { width: MOCKUP_WIDTH, height: MOCKUP_HEIGHT };
}

export function TradeSiteMockup({
  project,
  interactive = false,
  width,
  height,
}: {
  project: Project;
  interactive?: boolean;
  width?: number;
  height?: number;
}) {
  const { Site } = sites[project.mockup];
  const size = mockupSize(project.mockup);
  return (
    <Site
      project={project}
      interactive={interactive}
      width={width ?? size.width}
      height={height ?? size.height}
    />
  );
}

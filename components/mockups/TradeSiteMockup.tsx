"use client";

import type { ComponentType } from "react";
import type { Project, TradeMockup } from "@/content/projects";
import type { SiteProps } from "./trade/kit";
import { PlombierSite } from "./trade/plombier";
import { ElectricienSite } from "./trade/electricien";
import { MaconSite } from "./trade/macon";
import { MenuisierSite } from "./trade/menuisier";
import { CouvreurSite } from "./trade/couvreur";
import { PeintreSite } from "./trade/peintre";
import { ChauffagisteSite } from "./trade/chauffagiste";
import { CarreleurSite } from "./trade/carreleur";
import { CharpentierSite } from "./trade/charpentier";

/**
 * Maquettes de sites par métier, dessinées en code aux couleurs de `project.theme`.
 * Chaque métier est un petit site navigable (components/mockups/trade/) :
 * figé dans les cartes, utilisable dans la fenêtre agrandie (`interactive`).
 * Taille de référence : 720 × 540, mise à l'échelle par <ScaledCanvas>.
 */
export const MOCKUP_WIDTH = 720;
export const MOCKUP_HEIGHT = 540;

const sites: Record<TradeMockup, ComponentType<SiteProps>> = {
  plombier: PlombierSite,
  electricien: ElectricienSite,
  macon: MaconSite,
  menuisier: MenuisierSite,
  couvreur: CouvreurSite,
  peintre: PeintreSite,
  chauffagiste: ChauffagisteSite,
  carreleur: CarreleurSite,
  charpentier: CharpentierSite,
};

export function TradeSiteMockup({
  project,
  interactive = false,
  width = MOCKUP_WIDTH,
  height = MOCKUP_HEIGHT,
}: {
  project: Project;
  interactive?: boolean;
  width?: number;
  height?: number;
}) {
  const Site = sites[project.mockup];
  return <Site project={project} interactive={interactive} width={width} height={height} />;
}

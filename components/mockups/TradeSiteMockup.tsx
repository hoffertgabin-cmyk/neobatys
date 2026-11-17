"use client";

import type { ComponentType } from "react";
import type { Project, TradeMockup } from "@/content/projects";
import type { SiteProps } from "./site/frame";
import { MOCKUP_HEIGHT, MOCKUP_WIDTH } from "./size";
import * as plombier from "./site/plombier";
import * as electricien from "./site/electricien";
import * as macon from "./site/macon";
import * as menuisier from "./site/menuisier";
import * as couvreur from "./site/couvreur";
import * as peintre from "./site/peintre";
import * as chauffagiste from "./site/chauffagiste";
import * as carreleur from "./site/carreleur";
import * as charpentier from "./site/charpentier";
import * as platrier from "./site/platrier";
import * as serrurier from "./site/serrurier";
import * as paysagiste from "./site/paysagiste";
import * as terrassier from "./site/terrassier";
import * as isolation from "./site/isolation";
import * as etancheur from "./site/etancheur";
import * as constructeur from "./site/constructeur";
import * as facadiste from "./site/facadiste";

/**
 * Maquettes de sites par métier (components/mockups/site/<métier>.tsx), au format
 * 1280 × 800 : chargées seulement dans la fenêtre agrandie (MockupDialog), les cartes
 * affichant une capture fixe (MockupPreview).
 */
const sites: Record<TradeMockup, { Site: ComponentType<SiteProps> }> = {
  plombier,
  electricien,
  macon,
  menuisier,
  couvreur,
  peintre,
  chauffagiste,
  carreleur,
  charpentier,
  platrier,
  serrurier,
  paysagiste,
  terrassier,
  isolation,
  etancheur,
  constructeur,
  facadiste,
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
  const { Site } = sites[project.mockup];
  return <Site project={project} interactive={interactive} width={width} height={height} />;
}

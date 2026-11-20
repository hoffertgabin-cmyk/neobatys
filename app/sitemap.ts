import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { digitalisationPage } from "@/content/pages";
import { softwareGuides } from "@/content/software";
import { tradeSites } from "@/content/trade-sites";
import { zones } from "@/content/zones";
import { frenchDateToIso } from "@/lib/seo";

// lastModified seulement pour les pages qui affichent une date de mise à jour réelle
const routes: { path: string; priority: number; updated?: string }[] = [
  { path: "/", priority: 1 },
  { path: "/sites-internet", priority: 0.9 },
  ...tradeSites.map((t) => ({ path: `/sites-internet/${t.slug}`, priority: 0.7 })),
  { path: "/logiciel", priority: 0.9 },
  { path: "/intelligence-artificielle", priority: 0.9 },
  { path: "/tarifs", priority: 0.9 },
  { path: "/guides", priority: 0.8 },
  {
    path: "/digitaliser-son-entreprise",
    priority: 0.8,
    updated: digitalisationPage.updated,
  },
  ...softwareGuides.map((g) => ({
    path: `/logiciel/${g.slug}`,
    priority: 0.7,
    updated: g.updated,
  })),
  ...zones.map((z) => ({ path: `/artisans/${z.slug}`, priority: 0.8, updated: z.updated })),
  { path: "/contact", priority: 0.8 },
  { path: "/mentions-legales", priority: 0.2 },
  { path: "/politique-de-confidentialite", priority: 0.2 },
  { path: "/conditions-generales-de-vente", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, updated }) => ({
    url: new URL(path, site.url).toString(),
    lastModified: updated ? frenchDateToIso(updated) : undefined,
    changeFrequency: "monthly",
    priority,
  }));
}

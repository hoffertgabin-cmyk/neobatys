import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { mockupProject, type TradeMockup } from "@/content/projects";
import { TradeSiteMockup } from "@/components/mockups/TradeSiteMockup";

/**
 * Page de travail, en local seulement (404 en ligne) : affiche une maquette seule,
 * en plein écran, pour fabriquer son image d'aperçu (scripts/apercus-maquettes.mjs).
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function MockupCapturePage({
  params,
}: PageProps<"/apercu-maquette/[mockup]">) {
  if (process.env.NODE_ENV !== "development") notFound();
  const project = mockupProject((await params).mockup as TradeMockup);
  if (!project) notFound();
  return (
    <div className="fixed inset-0 z-[9999] bg-white">
      {/* Masque le badge de l'outil de développement de Next.js sur la capture. */}
      <style>{"nextjs-portal{display:none!important}"}</style>
      <TradeSiteMockup project={project} />
    </div>
  );
}

"use client";

// Provisoire : maquette en préparation.
import { SiteFrame, type SiteProps } from "./frame";

export const desktop = true;

export function Site(props: SiteProps) {
  return (
    <SiteFrame
      {...props}
      header={null}
      pages={[
        {
          id: "home",
          label: "Accueil",
          path: "/",
          render: () => <p className="p-20 text-[40px] font-bold">Clé & Fer</p>,
        },
      ]}
    />
  );
}

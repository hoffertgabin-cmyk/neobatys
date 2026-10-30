import { MessageSquare, Mic, Receipt, Star } from "lucide-react";
import { cn } from "@/lib/utils";

// Données fictives, uniquement pour illustrer l'interface
const kpis = [
  { label: "Demandes de devis", value: "38", trend: "▲ ce mois-ci", accent: false },
  {
    label: "Demandes traitées par l'IA",
    value: "64",
    trend: "réponse en quelques minutes",
    accent: false,
  },
  { label: "Heures gagnées", value: "31 h", trend: "estimation mensuelle", accent: true },
  { label: "Impayés relancés", value: "9", trend: "▲ 7 réglés", accent: false },
];
const months = [
  { label: "Mai", value: 38 },
  { label: "Juin", value: 46 },
  { label: "Juil.", value: 52 },
  { label: "Août", value: 49 },
  { label: "Sept.", value: 71 },
  { label: "Oct.", value: 92 },
];
const agents = [
  {
    Icon: MessageSquare,
    title: "Réponse aux demandes",
    text: "Site, Google, réseaux",
    tone: "bg-lavande",
  },
  { Icon: Mic, title: "Devis à la voix", text: "Dicté → devis PDF", tone: "bg-peche" },
  { Icon: Receipt, title: "Relances impayés", text: "Factures en retard", tone: "bg-rose" },
  { Icon: Star, title: "Avis Google", text: "Après chaque chantier", tone: "bg-menthe" },
];
const events = [
  "Devis n° 0412 envoyé · salle de bain",
  "Nouveau client · rénovation, Metz",
  "Facture réglée après relance",
];

/** Console NEOBATYS du hero, faite en HTML/CSS (pas une image). */
export function ConsoleMockup({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-3xl bg-white/90 p-4 text-nuit shadow-[0_40px_90px_-30px_rgb(23_23_23/0.35)] ring-1 ring-nuit/8 backdrop-blur select-none sm:p-6",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold tracking-[-0.02em] sm:text-base">NEOBATYS · Console</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 sm:text-xs">
          <span className="size-1.5 rounded-full bg-emerald-500" />4 assistants IA actifs
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl p-3 ring-1 ring-nuit/8 sm:p-4">
            <p className="truncate text-[11px] text-ardoise sm:text-xs">{k.label}</p>
            <p
              className={cn(
                "mt-1 text-2xl font-semibold tracking-[-0.04em] tabular-nums sm:text-3xl",
                k.accent && "text-chantier-dark",
              )}
            >
              {k.value}
            </p>
            <p className="mt-0.5 truncate text-[10px] text-emerald-700 sm:text-[11px]">{k.trend}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl p-3 ring-1 ring-nuit/8 sm:p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold sm:text-sm">Nouveaux clients</p>
            <p className="rounded-full bg-sable px-2 py-0.5 text-[10px] text-ardoise-dark">
              6 derniers mois
            </p>
          </div>
          <div className="mt-4 flex h-28 items-end gap-2 sm:h-36 sm:gap-3">
            {months.map((m) => (
              <div key={m.label} className="flex h-full flex-1 flex-col justify-end gap-1.5">
                <span
                  className="w-full rounded-t-lg rounded-b-sm"
                  style={{
                    height: `${m.value}%`,
                    backgroundImage: "linear-gradient(180deg, #f6c4d6, #c9cdfb)",
                  }}
                />
                <span className="text-center text-[10px] text-ardoise">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-3 ring-1 ring-nuit/8 sm:p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold sm:text-sm">Assistants IA</p>
            <p className="flex items-center gap-1 text-[10px] text-ardoise">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
              en direct
            </p>
          </div>
          <ul className="mt-3 space-y-2">
            {agents.map(({ Icon, title, text, tone }) => (
              <li key={title} className="flex items-center gap-2.5">
                <span className={cn("grid size-8 shrink-0 place-items-center rounded-xl", tone)}>
                  <Icon className="size-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold">{title}</span>
                  <span className="block truncate text-[10px] text-ardoise">{text}</span>
                </span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  actif
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="mt-3 hidden flex-wrap gap-2 sm:flex">
        {events.map((e) => (
          <li
            key={e}
            className="flex items-center gap-1.5 rounded-full bg-sable px-3 py-1 text-[11px] text-ardoise-dark"
          >
            <span className="size-1.5 rounded-full bg-chantier" />
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
}

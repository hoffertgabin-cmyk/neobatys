import { Bell, ChartColumn, FileText, LayoutDashboard, Receipt, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// Données fictives, uniquement pour illustrer l'interface
const bars = [42, 58, 50, 66, 61, 78, 72, 88, 80, 94, 86, 100];
const invoices = [
  {
    client: "M. Martin",
    label: "Salle de bain",
    amount: "3 480 €",
    status: "Payée",
    tone: "bg-emerald-100 text-emerald-800",
  },
  {
    client: "Mme Petit",
    label: "Tableau électrique",
    amount: "1 250 €",
    status: "Relance J+7",
    tone: "bg-amber-100 text-amber-800",
  },
  {
    client: "SCI Les Tilleuls",
    label: "Toiture",
    amount: "8 900 €",
    status: "Envoyée",
    tone: "bg-sky-100 text-sky-800",
  },
];

/** Aperçu du logiciel de gestion, fait en HTML/CSS (pas une image). */
export function DashboardMockup({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "overflow-hidden rounded-2xl bg-white text-nuit shadow-[0_40px_80px_-24px_rgb(0_0_0/0.5)] ring-1 ring-nuit/10 select-none",
        className,
      )}
    >
      <div className="flex">
        {/* Barre latérale */}
        <div
          className={cn(
            "flex-col gap-1 bg-acier p-3 text-white/70",
            compact ? "hidden" : "hidden sm:flex",
          )}
        >
          <span className="mb-2 grid size-7 place-items-center rounded-lg bg-gradient-chantier text-[10px] font-black text-nuit">
            N
          </span>
          {[LayoutDashboard, FileText, Receipt, Users, ChartColumn].map((Icon, i) => (
            <span
              key={i}
              className={cn(
                "grid size-7 place-items-center rounded-lg",
                i === 0 && "bg-white/10 text-chantier-light",
              )}
            >
              <Icon className="size-3.5" />
            </span>
          ))}
        </div>
        <div className="min-w-0 flex-1 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] text-ardoise">Bonjour</p>
              <p className="text-[13px] font-bold">Tableau de bord</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative grid size-7 place-items-center rounded-full bg-sable">
                <Bell className="size-3.5" />
                <span className="absolute top-1 right-1 size-1.5 rounded-full bg-chantier" />
              </span>
              <span className="rounded-full bg-gradient-chantier px-2.5 py-1 text-[9px] font-semibold">
                + Nouveau devis
              </span>
            </div>
          </div>
          {/* Indicateurs */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { label: "CA du mois", value: "18 450 €", trend: "+12 %" },
              { label: "Devis en attente", value: "7", trend: "3 à relancer" },
              { label: "Impayés", value: "1 250 €", trend: "−40 %" },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-xl bg-sable/70 p-2.5 ring-1 ring-nuit/5">
                <p className="truncate text-[8px] text-ardoise-dark">{kpi.label}</p>
                <p className="mt-0.5 text-[12px] font-bold whitespace-nowrap tabular-nums">
                  {kpi.value}
                </p>
                <p className="truncate text-[8px] font-semibold text-emerald-700">{kpi.trend}</p>
              </div>
            ))}
          </div>
          {/* Graphique */}
          <div className="mt-3 rounded-xl p-2.5 ring-1 ring-nuit/8">
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-semibold">Chiffre d&apos;affaires</p>
              <p className="text-[8px] text-ardoise">12 derniers mois</p>
            </div>
            <div className="mt-2 flex h-16 items-end gap-1">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className={cn(
                    "flex-1 origin-bottom rounded-t-[3px]",
                    i === bars.length - 1 ? "bg-gradient-chantier" : "bg-acier/80",
                  )}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          {/* Factures */}
          {!compact && (
            <div className="mt-3 space-y-1.5">
              {invoices.map((inv) => (
                <div
                  key={inv.client}
                  className="flex items-center gap-2 rounded-lg px-1.5 py-1 text-[9px]"
                >
                  <span className="grid size-5 place-items-center rounded-md bg-sable">
                    <Receipt className="size-2.5" />
                  </span>
                  <span className="min-w-0 flex-1 truncate">
                    <b>{inv.client}</b> <span className="text-ardoise">· {inv.label}</span>
                  </span>
                  <span className="font-semibold tabular-nums">{inv.amount}</span>
                  <span
                    className={cn("rounded-full px-1.5 py-0.5 text-[8px] font-semibold", inv.tone)}
                  >
                    {inv.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

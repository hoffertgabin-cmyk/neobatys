import { Check, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

/** Téléphone affichant un devis en cours de création (dessiné en code). */
export function PhoneMockup({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "w-[180px] rounded-[28px] bg-nuit p-2 shadow-[0_30px_60px_-16px_rgb(0_0_0/0.55)] ring-1 ring-white/15 select-none",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[22px] bg-white text-nuit">
        <div className="mx-auto mt-1.5 h-1.5 w-12 rounded-full bg-nuit/15" />
        <div className="p-3">
          <div className="flex items-center gap-1.5">
            <FileText className="size-3 text-chantier-dark" />
            <p className="text-[10px] font-bold">Devis n° 2026-042</p>
          </div>
          <p className="mt-0.5 text-[8px] text-ardoise-dark">Rénovation salle de bain</p>
          <div className="mt-2.5 space-y-1.5">
            {[
              ["Dépose ancienne baignoire", "420 €"],
              ["Receveur extra-plat 120×80", "690 €"],
              ["Faïence murale (12 m²)", "1 140 €"],
              ["Main d'œuvre", "1 230 €"],
            ].map(([label, price]) => (
              <div
                key={label}
                className="flex justify-between gap-2 rounded-md bg-sable/80 px-1.5 py-1 text-[8px]"
              >
                <span className="truncate">{label}</span>
                <span className="font-semibold whitespace-nowrap tabular-nums">{price}</span>
              </div>
            ))}
          </div>
          <div className="mt-2.5 flex justify-between border-t border-nuit/10 pt-2 text-[9px] font-bold">
            <span>Total HT</span>
            <span className="tabular-nums">3 480 €</span>
          </div>
          <div className="mt-2.5 flex items-center justify-center gap-1 rounded-full bg-gradient-chantier py-1.5 text-[9px] font-semibold">
            <Check className="size-3" /> Envoyer pour signature
          </div>
        </div>
      </div>
    </div>
  );
}
